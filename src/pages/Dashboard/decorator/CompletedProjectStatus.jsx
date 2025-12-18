import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedProjectStatus = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/bookings/decorator?decoratorEmail=${user.email}&projectStatus=completed`
            );
            return res.data;
        }
    });

    // 80% payout for decorator
    const calculatePayout = (booking) => {
        const commissionRate = 0.8;
        return Math.round(booking.price * commissionRate);
    };

    const totalEarnings = bookings.reduce(
        (sum, booking) => sum + calculatePayout(booking),
        0
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-[#1E595D]">
                    Completed Projects
                </h2>
                <p className="text-gray-500 mt-1">
                    All successfully completed services
                </p>
            </div>

            {/* Earnings Summary */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
                <h3 className="text-lg font-semibold text-green-800">
                    Earnings Summary
                </h3>
                <div className="mt-3 flex justify-between items-center">
                    <p className="text-gray-600">
                        Completed Projects
                    </p>
                    <p className="font-semibold">
                        {bookings.length}
                    </p>
                </div>
                <div className="mt-2 flex justify-between items-center">
                    <p className="text-gray-600">
                        Total Earnings
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                        ৳{totalEarnings}
                    </p>
                </div>

                <button
                    disabled={bookings.length === 0}
                    className="mt-4 w-full py-2 rounded-lg bg-green-600 text-white font-semibold disabled:opacity-40"
                >
                    Cash Out
                </button>
            </div>

            {/* Completed Projects List */}
            {bookings.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                        >
                            <img
                                src={booking.image}
                                alt={booking.serviceTitle}
                                className="h-40 w-full object-cover"
                            />

                            <div className="p-4">
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
                                    Date: {booking.bookingDate}
                                </p>

                                <div className="mt-3 flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Service Price
                                    </span>
                                    <span className="font-semibold">
                                        ৳{booking.price}
                                    </span>
                                </div>

                                <div className="mt-1 flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Your Earnings
                                    </span>
                                    <span className="font-semibold text-green-600">
                                        ৳{calculatePayout(booking)}
                                    </span>
                                </div>

                                <div className="mt-4 flex justify-between items-center">
                                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                        Completed
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        ID: {booking.trackingId}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-16">
                    <p className="text-lg font-medium">
                        No completed projects yet
                    </p>
                    <p className="text-sm mt-1">
                        Finish assigned projects to see earnings here
                    </p>
                </div>
            )}
        </div>
    );
};

export default CompletedProjectStatus;