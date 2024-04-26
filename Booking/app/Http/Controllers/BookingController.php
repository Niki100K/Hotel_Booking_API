<?php

namespace App\Http\Controllers;

use App\Mail\DeletedReservationMail;
use App\Mail\NewReservationMail;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $id)
    {
        $request->validate([
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date',
            'paymentOption' => 'required|string',
            'firstPayment' => 'nullable|numeric',
        ]);

        $startDate = new \DateTime($request->check_in_date);
        $endDate = new \DateTime($request->check_out_date);
        $numberOfDays = $startDate->diff($endDate)->days;

        if (!Auth::check()) {
            return Inertia::render('Auth/Login');
        }

        $customer_id = Auth::id();
        $room = Room::findOrFail($id);
        if ($room->status === 'unavailable') {
            abort(401);
        }
        
        $booking = Booking::create([
            'room_id' => $id,
            'customer_id' => $customer_id,
            'check_in_date' => $request->check_in_date,
            'check_out_date' => $request->check_out_date,
            'total_price' => $room->price_per_night * $numberOfDays,
        ]);

        Payment::create([
            'booking_id' => $booking->id,
            'amount' => $request->paymentOption == 'single' ? $booking->total_price : $request->firstPayment,
            'payment_date' => now(),
            'status' => $request->paymentOption == 'single' ? 'paid' : 'pending',
        ]);
        // change in with email alerts hotel staff
        Mail::to('niki_kaloianov@abv.bg')->send(new NewReservationMail($booking));

        return Redirect::to('/');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $booking = Booking::findOrFail($id);
    
        if ($booking->customer_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }
    
        $booking->delete();
        error_log($booking);
        // change in with email alerts hotel staff
        Mail::to('niki_kaloianov@abv.bg')->send(new DeletedReservationMail($booking));
    
        return Redirect::to('/');
    }
}
