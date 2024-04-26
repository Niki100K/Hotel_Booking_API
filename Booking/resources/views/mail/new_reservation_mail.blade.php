<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Reservation</title>
</head>
<body>
    <div class="container mx-auto mt-8">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <h1 class="text-2xl font-bold">New Reservation Details</h1>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p><strong>Check-In Date:</strong> {{ $request->check_in_date }}</p>
                    <p><strong>Check-Out Date:</strong> {{ $request->check_out_date }}</p>
                    <p><strong>Total Price:</strong> {{ $request->total_price }} $</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
