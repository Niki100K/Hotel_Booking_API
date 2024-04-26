<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deleted Reservation</title>
</head>
<body>
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <h1 class="text-2xl font-bold">Deleted Reservation Details</h1>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p><strong>Room Id:</strong> {{ $booking->room_id }}</p>
                    <p><strong>Customer Id:</strong> {{ $booking->customer_id }}</p>
                </div>
                <div>
                    <p><strong>Check-In Date:</strong> {{ $booking->check_in_date }}</p>
                    <p><strong>Check-Out Date:</strong> {{ $booking->check_out_date }}</p>
                    <p><strong>Total Price:</strong> {{ $booking->total_price }} $</p>
                </div>
            </div>
        </div>
</body>
</html>