import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleRegistration = (data) => {
        console.log("Register Data:", data);
    };

    const handleGoogleRegister = () => {
        console.log("Google Register Clicked");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 mt-10">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

                {/* Heading */}
                <h2 className="text-3xl font-bold text-center text-[#1E595D] mb-2">
                    Create an Account
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Join <span className="text-[#C8A870]">StyleDecor</span> and explore more
                </p>

                {/* Register Form */}
                <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E595D]"
                            placeholder="Enter your full name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E595D]"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Photo URL */}
                    <div>
                        <label className="block font-medium mb-1">Photo URL</label>
                        <input
                            type="url"
                            {...register("photo", { required: "Photo URL is required" })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E595D]"
                            placeholder="Enter photo URL"
                        />
                        {errors.photo && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.photo.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: 6,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
                            })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1E595D]"
                            placeholder="Enter password"
                        />

                        {/* Eye Toggle Button */}
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[39px] cursor-pointer text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.type === "minLength"
                                    ? "Password must be at least 6 characters"
                                    : errors.password.message}
                            </p>
                        )}
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.type === "pattern"
                                    ? "One uppercase, one lowercase letter, one number, and one special character are required."
                                    : errors.password.message}
                            </p>
                        )}


                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#1E595D] text-white py-2 rounded-lg font-semibold hover:bg-[#174649] transition"
                    >
                        Register
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Google Login */}
                <button
                    onClick={handleGoogleRegister}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                    <FaGoogle className="text-red-500 text-xl" />
                    <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>

                {/* Bottom Links */}
                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#C8A870] font-medium hover:underline">
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;
