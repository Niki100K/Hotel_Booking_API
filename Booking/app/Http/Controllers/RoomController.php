<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function show(string $id)
    {
        $room = Room::findOrFail($id);
        
        if ($room->status === 'unavailable') {
            return Redirect::back()->with('error', 'This room is currently unavailable.');
        }
        
        $reservations = Booking::where('room_id', $id)->get();
        
        return Inertia::render('Room/Room', [
            'room' => $room,
            'reservations' => $reservations,
        ]);
    }
}
