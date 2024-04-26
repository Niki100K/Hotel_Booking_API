import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Dashboard({ auth, bookings }) {
    const [resetConfirmation, setResetConfirmation] = useState(false);
    const [bookingToReset, setBookingToReset] = useState(null);
    const { delete: destroy } = useForm({});
    const handleResetConfirmation = (bookingId) => {
        setResetConfirmation(true);
        setBookingToReset(bookingId);
    };

    const handleResetBooking = () => {
        setResetConfirmation(false);
        setBookingToReset(null);
        destroy(route('booking.destroy', {id: bookingToReset}));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <main className="mt-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Check-in date: {booking.check_in_date}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Check-out date: {booking.check_out_date}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Total price: ${booking.total_price}
                            </p>
                            <button
                                onClick={() => handleResetConfirmation(booking.id)}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Reset Booking
                            </button>
                        </div>
                    ))}
                </div>
            </main>
            {resetConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg">
                        <p className="text-lg text-gray-800 mb-4">Are you sure you want to reset this booking?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setResetConfirmation(false)}
                                className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleResetBooking}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
