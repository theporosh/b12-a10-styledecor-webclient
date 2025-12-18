import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignedProjects = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['bookings', user?.email, 'assigned'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/bookings/decorator?decoratorEmail=${user.email}&assignStatus=assigned`
            );
            return res.data;
        }
    });


    const updateStatus = async (booking, status) => {
        const payload = {
            projectStatus: status,
            decoratorId: booking.assignedDecorator.decoratorId
        };

        const res = await axiosSecure.patch(
            `/bookings/project-status/${booking._id}`,
            payload
        );

        if (res.data.modifiedCount) {
            Swal.fire({
                icon: 'success',
                title: `Project ${status}`,
                timer: 1500,
                showConfirmButton: false
            });
            refetch();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-[#1E595D] mb-6">
                My Assigned Projects ({bookings.length})
            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white rounded-xl shadow-md p-4">
                        <img
                            src={booking.image}
                            alt={booking.serviceTitle}
                            className="h-40 w-full object-cover rounded-lg mb-3"
                        />

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
                            Customer: {booking.customerName}
                        </p>
                        <p className="text-sm text-gray-500">
                            Location: {booking.locations}
                        </p>

                        <p className="text-sm text-gray-500">
                            Date: {booking.bookingDate}
                        </p>
                        <p className="text-sm text-gray-500">
                            Price: ৳{booking.price}
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                            Tracking ID: {booking.trackingId}
                        </p>


                        {/* Status Badge */}
                        <div className="mt-4 flex justify-between items-center">
                            <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full
                            ${booking.projectStatus === 'completed'
                                    ? 'bg-green-100 text-green-700'
                                    : booking.projectStatus === 'started'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {booking.projectStatus || 'assigned'}
                            </span>

                            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                                {booking.status}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 space-y-2">
                            <button
                                disabled={booking.projectStatus !== 'assigned'}
                                onClick={() => updateStatus(booking, 'started')}
                                className="w-full py-2 rounded-lg bg-blue-500 text-white disabled:opacity-40"
                            >
                                Start Project
                            </button>

                            <button
                                disabled={booking.projectStatus !== 'started'}
                                onClick={() => updateStatus(booking, 'completed')}
                                className="w-full py-2 rounded-lg bg-green-600 text-white disabled:opacity-40"
                            >
                                Mark as Completed
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {bookings.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No assigned projects yet
                </p>
            )}
        </div>
    );
};

export default AssignedProjects;
