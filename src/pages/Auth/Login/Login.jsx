import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Login = () => {
    // email: tom@jom.com, password: 123456As@

    const { signInUser, signInGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    console.log('in the login page', location);

    const axiosSecure = useAxiosSecure();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // const handleLogin = (data) => {
    //     console.log("Logged In:", data);
    // };

    const handleLogin = (data) => {
        console.log('form data', data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
                toast.success("Logged in successfully!");
            })
            .catch(error => {
                console.log(error)
                const errorMessage = error.message;
                toast.success(errorMessage);
            })
    }




    const handleGoogleLogin = () => {
        // console.log("Google Login Triggered");
        // Firebase Auth 
        signInGoogle()
            .then(result => {
                console.log(result.user);


                // create user in the database
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }
                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log('user google data has been stored', res.data);
                        navigate(location.state || '/');
                        toast.success("Google login successful!");
                    })


            })
            .catch(error => {
                console.log(error)
                const errorMessage = error.message;
                toast.success(errorMessage);
            })
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
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-200 py-3 rounded-lg mt-6 shadow-sm transition"
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
                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

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
                    <div className="relative">
                        <label className="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: "Password is required", minLength: 6 })}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8A870]"
                            placeholder="Enter your password"
                        />

                        {/* Eye Toggle Button */}
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[45px] cursor-pointer text-gray-600"
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


                        {/* Forgot Password */}
                        <div className="text-right mt-2">
                            <button
                                type="button"
                                className="text-sm text-[#1E595D] hover:underline font-semibold"
                                onClick={() => console.log("Forgot Password Clicked")}
                            >
                                Forgot Password?
                            </button>
                        </div>
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
                    <Link
                        state={location.state}
                        to="/register" className="text-[#C8A870] font-medium hover:underline">
                        Create Account
                    </Link>
                </p>
            </div >
        </div >
    );
};

export default Login;
