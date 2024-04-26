<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function show() {
        $customer_id = Auth::id();
        $customer = Customer::find($customer_id);
        $bookings = $customer->bookings;
        return Inertia::render('Dashboard', [
            'bookings' => $bookings,
        ]);

    }
}
