import React, { useState, useEffect } from 'react';
import './Room.css';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Room({ room, reservations }) {
    const [reservedDates, setReservedDates] = useState([]);
    const [totalDays, setTotalDays] = useState(0);
    useEffect(() => {
        const reservedDatesList = [];
        reservations.forEach(reservation => {
            const startDate = new Date(reservation.check_in_date);
            const endDate = new Date(reservation.check_out_date);
            for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
                reservedDatesList.push(new Date(currentDate));
            }
        });
        setReservedDates(reservedDatesList);
    }, [reservations]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route(`room`, {id: room.id}));
    };

    const { data, setData, post, processing, errors } = useForm({
        check_in_date: '',
        check_out_date: '',
        paymentOption: 'single',
        firstPayment: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('room.store'));
    };

    const [calendarValue, setCalendarValue] = useState(null);

    useEffect(() => {
        const isDateReserved = reservedDates.some(reservedDate => {
            const checkInDate = new Date(data.check_in_date);
            const checkOutDate = new Date(data.check_out_date);
            return reservedDate >= checkInDate && reservedDate <= checkOutDate;
        });
        if (isDateReserved) {
            setData({
                ...data,
                check_in_date: '',
                check_out_date: '',
            });
            setCalendarValue(null);
        }
    }, [data.check_in_date, data.check_out_date, reservedDates]);

    useEffect(() => {
        if (data.check_in_date && data.check_out_date) {
            const startDate = new Date(data.check_in_date);
            const endDate = new Date(data.check_out_date);
            const numberOfDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
            setTotalDays(numberOfDays);
        } else {
            setTotalDays(0);
        }
    }, [data.check_in_date, data.check_out_date]);

    const handleFirstPaymentChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '')
        const maxFirstPayment = totalDays * room.price_per_night * 0.6;
        if (value > maxFirstPayment) {
            setData('firstPayment', (maxFirstPayment).toFixed(2));
        } else {
            setData('firstPayment', value);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold my-8">Room Information</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-xl font-semibold">{room.title}</p>
                        <p className="text-gray-500">Type: {room.type}</p>
                        <p className="text-gray-500">Description: {room.description}</p>
                        <p className="text-gray-500">Price per Night: ${room.price_per_night}</p>
                        <p className="text-gray-500">Max Occupancy: {room.max_occupancy}</p>
                        {data.paymentOption === 'multiple' && (
                            <p className="text-gray-500 mt-4">
                                Please enter the first payment amount. Note that the first payment should not exceed 60% of the total price.
                            </p>
                        )}
                        {totalDays !== 0 && (
                            <p className="text-gray-500">Total Price: ${((room.price_per_night * totalDays).toFixed(2))}</p>
                        )}
                        <p className="text-gray-500">Total Days: {totalDays}</p>

                        {data.check_in_date !== '' && data.check_out_date !== '' &&
                            <div>
                                <InputLabel htmlFor="payment_option">Payment Option:</InputLabel>
                                <select
                                    id="payment_option"
                                    name="payment_option"
                                    required
                                    value={data.paymentOption}
                                    onChange={(e) => setData('paymentOption', e.target.value)}
                                >
                                    <option value="single">Single Payment</option>
                                    <option value="multiple">Multiple Payments</option>
                                </select>
                            </div>
                        }

                        {data.paymentOption === 'multiple' && (
                            <>
                                <InputLabel htmlFor="first_payment">First Payment:</InputLabel>
                                <TextInput
                                    id="first_payment"
                                    type="text"
                                    name="first_payment"
                                    value={data.firstPayment}
                                    onChange={handleFirstPaymentChange}
                                    required
                                    maxLength="10"
                                />
                            </>
                        )}

                        <button
                            onClick={handleSubmit}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            disabled={processing}
                        >
                            Complete Booking
                        </button>
                        {Object.keys(errors).length > 0 && (
                            <div className="text-red-500 mb-4">
                                <ul>
                                    {Object.values(errors).map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <form onSubmit={submit}>
                        <div className="calendar-container">
                            <Calendar
                                selectRange
                                onChange={(dates) => {
                                    setCalendarValue(dates);
                                    setData({
                                        ...data,
                                        check_in_date: dates[0]?.toISOString().split('T')[0],
                                        check_out_date: dates[1]?.toISOString().split('T')[0]
                                    });
                                }}
                                value={calendarValue}
                                tileDisabled={({ date }) =>
                                    date < new Date() || reservedDates.some((info) => date.toISOString().split('T')[0] === info.toISOString().split('T')[0])
                                }
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
