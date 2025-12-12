import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const ApproveDecorators = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: decorators = [], isLoading } = useQuery({
        queryKey: ['decorators', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/decorators');
            return res.data.filter(d => d.status === 'pending');
        }
    });

    const handleAction = async (id, action) => {
        try {
            if (action === 'delete') {
                await axiosSecure.delete(`/decorators/${id}`);
            } else {
                await axiosSecure.patch(`/decorators/${id}`, { status: action });
            }
            queryClient.invalidateQueries(['decorators', 'pending']);
        } catch (error) {
            console.error(error);
            alert('Action failed!');
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#1E595D] mb-6">
                <span className="text-[#C8A870]">Decorators</span> Pending Approval: {decorators.length}
            </h2>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {decorators.map(decorator => (
                    <div key={decorator._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                        <img
                            src={decorator.image}
                            alt={decorator.name}
                            className="w-24 h-24 rounded-full object-cover mb-4"
                        />
                        <h3 className="text-xl font-semibold text-[#1E595D]">{decorator.name}</h3>
                        <p className="text-gray-600">{decorator.specialty}</p>
                        <p className="text-gray-500 text-sm">Rating: {decorator.rating} | Reviews: {decorator.reviews}</p>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => handleAction(decorator._id, 'approved')}
                                className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                                <FaCheck /> Accept
                            </button>
                            <button
                                onClick={() => handleAction(decorator._id, 'rejected')}
                                className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                            >
                                <FaTimes /> Reject
                            </button>
                            <button
                                onClick={() => handleAction(decorator._id, 'delete')}
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
