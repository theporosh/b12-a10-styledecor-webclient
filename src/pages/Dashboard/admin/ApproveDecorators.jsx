import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ApproveDecorators = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: decorators = [], isLoading } = useQuery({
        queryKey: ['decorators', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/decorators');
            return res.data;
        }
    });

    const handleAction = async (decorator, action) => {
        try {
            if (action === 'delete') {
                await axiosSecure.delete(`/decorators/${decorator._id}`);
                toast.error("Decorator Deleted!");
            } else {
                await axiosSecure.patch(`/decorators/${decorator._id}`, { status: action, email: decorator.email });

                if (action === "approved") {
                    toast.success("Decorator Approved Successfully!");
                }
                if (action === "rejected") {
                    toast("Decorator Rejected!", {
                        icon: "⚠️",
                    });
                }
            }

            queryClient.invalidateQueries(['decorators', 'pending']);
        } catch (error) {
            console.error(error);
            toast.success('Action failed!');
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#1E595D] mb-6">
                <span className="text-[#C8A870]">Decorators</span> Pending Approval
            </h2>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {decorators.map(decorator => (
                    <div
                        key={decorator._id}
                        className="bg-white shadow-lg hover:shadow-xl transition rounded-xl p-5 flex flex-col items-center relative"
                    >
                        {/* Status Badge */}
                        <span
                            className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full 
                                ${decorator.status === 'pending' && 'bg-yellow-200 text-yellow-700'}
                                ${decorator.status === 'approved' && 'bg-green-200 text-green-700'}
                                ${decorator.status === 'rejected' && 'bg-red-200 text-red-700'}
                            `}
                        >
                            {decorator.status.toUpperCase()}
                        </span>

                        <img
                            src={decorator.image}
                            alt={decorator.name}
                            className="w-24 h-24 rounded-full object-cover mb-4 border"
                        />

                        <h3 className="text-xl font-semibold text-[#1E595D]">{decorator.name}</h3>
                        <h3 className="text-sm font-semibold text-[#1E595D]">{decorator.email}</h3>
                        <p className="text-gray-600">{decorator.specialty}</p>
                        <p className="text-gray-500 text-sm mt-1">
                            ⭐ {decorator.rating} • {decorator.reviews} reviews
                        </p>

                        {/* ACTION BUTTONS */}
                        <div className="mt-5 flex flex-wrap gap-2 justify-center">
                            <button
                                onClick={() => handleAction(decorator, 'approved')}
                                className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                                <FaCheck /> Accept
                            </button>

                            <button
                                onClick={() => handleAction(decorator, 'rejected')}
                                className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                            >
                                <FaTimes /> Reject
                            </button>

                            <button
                                onClick={() => handleAction(decorator, 'delete')}
                                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApproveDecorators;
