import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignDecorators = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedDecorator, setSelectedDecorator] = useState({});

    // Pending assign bookings
    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', 'pending-assign'],
        queryFn: async () => {
            const res = await axiosSecure.get(
                '/bookings?assignStatus=pending-assign'
            );
            return res.data;
        }
    });

    // Approved & available decorators
    const { data: decorators = [] } = useQuery({
        queryKey: ['decorators', 'available'],
        queryFn: async () => {
            const res = await axiosSecure.get(
                '/decorators?status=approved&workStatus=available'
            );
            return res.data;
        }
    });

    // Assign handler
    const handleAssign = async (booking) => {
        if (!selectedDecorator[booking._id]) {
            return Swal.fire({
                icon: 'warning',
                title: 'Select a decorator first'
            });
        }

        const payload = {
            decoratorId: selectedDecorator[booking._id]._id,
            decoratorName: selectedDecorator[booking._id].name,
            decoratorEmail: selectedDecorator[booking._id].email
        };

        const res = await axiosSecure.patch(
            `/bookings/assign/${booking._id}`,
            payload
        );

        if (res.data.modifiedCount) {
            Swal.fire({
                icon: 'success',
                title: 'Decorator Assigned',
                timer: 1500,
                showConfirmButton: false
            });
            refetch();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-[#1E595D] mb-6">
                Assign Decorators
                <span className="text-[#C8A870] ml-2">
                    ({bookings.length})
                </span>
            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between"
                    >
                        {/* Booking Info */}
                        <div>
                            <img
                                src={booking.image}
                                alt={booking.serviceTitle}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />

                            <h3 className="font-semibold text-lg text-[#1E595D]">
                                {booking.serviceTitle}
                            </h3>

                            <p className="text-sm text-gray-500">
                                Category: {booking.category}
                            </p>

                            <p className="text-sm text-gray-500">
                                Customer: {booking.customerName}
                            </p>

                            <p className="text-sm text-gray-500">
                                Booking Date: {booking.bookingDate}
                            </p>

                            <p className="text-sm text-gray-500">
                                Payment Status: {booking.status}
                            </p>

                            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                                Pending Assignment
                            </span>
                        </div>

                        {/* Assign Section */}
                        <div className="mt-4 space-y-3">
                            <select
                                className="w-full border rounded-lg p-2"
                                defaultValue=""
                                onChange={(e) => {
                                    const decorator = decorators.find(
                                        (d) => d._id === e.target.value
                                    );
                                    setSelectedDecorator((prev) => ({
                                        ...prev,
                                        [booking._id]: decorator
                                    }));
                                }}
                            >
                                <option value="" disabled>
                                    Select Decorator
                                </option>
                                {decorators.map((decorator) => (
                                    <option
                                        key={decorator._id}
                                        value={decorator._id}
                                    >
                                        {decorator.name} • {decorator.specialty}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={() => handleAssign(booking)}
                                className="w-full bg-[#1E595D] text-white py-2 rounded-lg hover:bg-[#174649]"
                            >
                                Assign Decorator
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {bookings.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No pending assignments 🎉
                </p>
            )}
        </div>
    );
};

export default AssignDecorators;
