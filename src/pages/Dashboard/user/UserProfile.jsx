import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import Loading from '../../Shared/Loading/Loading';


const UserProfile = () => {
    const { user } = useAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();

    const { data: profile, isLoading } = useQuery({
        queryKey: ['userProfile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/users/profile?email=${user.email}`
            );
            // console.log(profile)
            return res.data;
        }
    });

    const formattedDate = profile?.createdAt
        ? new Date(profile.createdAt).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
        : "N/A";

    if (isLoading) {
        return (
            <div className="bg-white p-10 rounded-xl shadow text-center">
                <Loading></Loading>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10">

                {/* Header */}
                <h2 className="text-3xl font-bold text-[#1E595D] mb-2">
                    My <span className="text-[#C8A870]">Profile</span>
                </h2>
                <p className="text-gray-500 mb-8">
                    Personal account information
                </p>

                {/* Profile Content */}
                <div className="flex flex-col md:flex-row gap-8 items-center">

                    {/* Avatar */}
                    <img
                        src={profile?.photoURL}
                        alt="profile"
                        className="w-36 h-36 rounded-full border-4 border-[#C8A870] shadow object-cover"
                    />

                    {/* Info */}
                    <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-semibold text-lg text-[#1E595D]">
                                {profile?.displayName}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-semibold text-lg">
                                {profile?.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Role</p>
                            <span
                                className={`inline-block mt-1 px-4 py-1 rounded-full text-sm font-semibold
                                    ${role === 'admin'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}
                            >
                                {role?.toUpperCase()}
                            </span>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Member Since</p>
                            <p className="font-semibold text-lg">
                                {formattedDate}
                                {/* {new Date(profile?.createdAt).toLocaleDateString()} */}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t mt-10 pt-6 text-right">
                    <button
                        disabled
                        className="px-6 py-2 bg-[#1E595D] text-white rounded-lg opacity-60 cursor-not-allowed"
                    >
                        Edit Profile (Coming Soon)
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UserProfile;
