import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
    
    const { registerUser, signInGoogle, updateUserProfile } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    // console.log('in the register page', location);

    const axiosSecure = useAxiosSecure();

    const [showPassword, setShowPassword] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // const handleRegistration = (data) => {

    //     console.log("Register Data:", data);
    // };


    const handleRegistration = (data) => {

        // console.log('after register', data);
        // console.log('after register', data.photo[0]);
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then((result) => {
                // console.log(result.user);

                // 1. store the image in form data
                const formData = new FormData()
                formData.append('image', profileImg)

                // 2. send the photo to store and get the url
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        // console.log('after image upload', res.data.data.url)
                        const photoURL = res.data.data.url;

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database');
                                }
                            })

                        // update user profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('user profile updated done')
                                navigate(location.state || '/');
                                // navigate('/');
                                toast.success("Registration successful!");
                            })
                            .catch(error => {
                                console.log(error)
                                const errorMessage = error.message;
                                toast.success(errorMessage);
                            })
                    })


            })
            .catch(error => {
                console.log(error)
                const errorMessage = error.message;
                toast.success(errorMessage);
            })
    }



    const handleGoogleRegister = () => {
        // console.log("Google Register Clicked");
        signInGoogle()
            .then(result => {
                // console.log(result.user);


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
                        toast.success("Google registration successful!");
                    })

            })
            .catch(error => {
                console.log(error)
                const errorMessage = error.message;
                toast.success(errorMessage);
            })
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

                    {/* Profile Image Upload */}
                    <div>
                        <label className="block font-medium mb-2">Upload Profile Image</label>

                        <div className="border-2 border-dashed border-[#1E595D] bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 transition">

                            <label className="flex flex-col items-center gap-2 cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 text-[#1E595D]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l-4-4m4 4l4-4"
                                    />
                                </svg>

                                <p className="text-gray-700 font-medium">
                                    Click to upload profile picture
                                </p>

                                <p className="text-gray-400 text-sm">
                                    JPG, PNG under 2 MB
                                </p>

                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("photo", {
                                        required: "Profile image is required",
                                        onChange: (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setPreviewImage(URL.createObjectURL(file));
                                            }
                                        }
                                    })}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Preview Box */}
                        {previewImage && (
                            <div className="mt-3 w-32 h-32 rounded-lg overflow-hidden border">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {errors.photo && (
                            <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
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
                            className="absolute right-3 top-10 cursor-pointer text-gray-600"
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
                    <Link
                        state={location.state}
                        to="/login" className="text-[#C8A870] font-medium hover:underline">
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;
