import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssignedProjects = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // const { data: bookings = [] } = useQuery({
    //     queryKey: ['bookings', user.email, 'assigned'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(
    //             `/bookings/decorators?decoratorEmail=${user.email}&assignStatus=assigned`
    //         );
    //         return res.data;
    //     }
    // });

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email, 'assigned'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/bookings/decorator?decoratorEmail=${user.email}&assignStatus=assigned`
            );
            return res.data;
        }
    });

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-[#1E595D] mb-6">
                Assigned Projects
                <span className="text-[#C8A870] ml-2">
                    ({bookings.length})
                </span>
            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                    >
                        {/* Image */}
                        <img
                            src={booking.image}
                            alt={booking.serviceTitle}
                            className="h-40 w-full object-cover"
                        />

                        {/* Content */}
                        <div className="p-4 flex flex-col justify-between h-full">
                            <div>
                                <h3 className="font-semibold text-lg text-[#1E595D]">
                                    {booking.serviceTitle}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Category: {booking.category}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Duration: {booking.duration}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Location: {booking.locations}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Date: {booking.bookingDate}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Customer: {booking.customerName}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Price: ৳{booking.price}
                                </p>

                                <p className="text-xs text-gray-400 mt-2">
                                    Tracking ID: {booking.trackingId}
                                </p>
                            </div>

                            {/* Status */}
                            <div className="mt-4 flex justify-between items-center">
                                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                    Assigned
                                </span>

                                <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {bookings.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No assigned projects yet 🛠️
                </p>
            )}
        </div>
    );
};

export default AssignedProjects;
