import React from 'react';
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link } from 'react-router';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log("Logged In:", data);
    };

    const handleGoogleLogin = () => {
        console.log("Google Login Triggered");
        // Firebase Auth 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-gray-200">

                {/* Heading */}
                <h2 className="text-3xl font-bold text-center text-[#1E595D]">
                    Welcome Back!
                </h2>
                <p className="text-center text-gray-600 mt-2">
                    Login to continue your <span className="text-[#C8A870]">StyleDecor</span> journey
                </p>

                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 py-3 rounded-lg mt-6 shadow-sm transition"
                >
                    <FaGoogle className="text-red-500 text-xl" />
                    <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">OR</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A870]"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A870]"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#1E595D] hover:bg-[#17474A] text-white py-3 rounded-lg font-semibold text-lg transition"
                    >
                        Login
                    </button>
                </form>

                {/* Bottom Links */}
                <p className="text-center text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-[#C8A870] font-medium hover:underline">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
