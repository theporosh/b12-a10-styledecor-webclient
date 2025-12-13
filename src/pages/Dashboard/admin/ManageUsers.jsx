import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaUserShield, FaUserMinus } from "react-icons/fa";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        const roleInfo = { role: 'admin' };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} is now an Admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleRemoveAdmin = user => {
        const roleInfo = { role: 'user' };
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.displayName} removed from Admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1E595D] mb-6 text-center">
                Manage <span className="text-[#C8A870]">Users</span> ({users.length})
            </h2>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
                    <thead className="bg-[#1E595D] text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">User</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-center">Role</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b hover:bg-gray-50">
                                {/* User info */}
                                <td className="py-4 px-4 flex items-center gap-3">
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="w-12 h-12 rounded-full object-cover border"
                                    />
                                    <span className="font-semibold">{user.displayName}</span>
                                </td>

                                {/* Email */}
                                <td className="py-4 px-4 text-gray-700">
                                    {user.email}
                                </td>

                                {/* Role Badge */}
                                <td className="py-4 px-4 text-center">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${user.role === "admin"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {user.role.toUpperCase()}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="py-4 px-4 text-center">
                                    {user.role === "admin" ? (
                                        <button
                                            onClick={() => handleRemoveAdmin(user)}
                                            className="flex items-center gap-1 mx-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                        >
                                            <FaUserMinus /> Remove
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="flex items-center gap-1 mx-auto px-4 py-2 bg-[#1E595D] text-white rounded-lg hover:bg-[#17484a] transition"
                                        >
                                            <FaUserShield /> Make Admin
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
