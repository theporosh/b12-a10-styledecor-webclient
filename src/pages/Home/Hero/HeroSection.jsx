import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../../assets/heroImg.avif"; 
import { Link } from "react-router";


const HeroSection = () => {
    return (
        <section className="bg-white py-20 md:py-28">
            <div className="w-11/12 mx-auto grid md:grid-cols-2 gap-10 items-center">

                {/* LEFT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1E595D] leading-tight">
                        Transform Your Space with
                        <span className="text-[#C8A870]"> Premium Decoration Services</span>
                    </h1>

                    <p className="mt-5 text-gray-600 text-lg leading-relaxed">
                        StyleDecor helps you manage all decorations—from wedding ceremonies
                        to home arrangements—through smart appointment scheduling, decorator
                        availability tracking, and real-time project updates.
                    </p>

                    {/* CTA BUTTON */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <Link
                            to="/allServices"
                            className="inline-block mt-7 px-8 py-4 text-lg font-medium bg-[#1E595D] text-white rounded-xl shadow-md hover:shadow-xl hover:bg-[#18494c] transition-all duration-300"
                        >
                            Book Decoration Service
                        </Link>
                    </motion.div>

                    {/* Small Feature Icons */}
                    <motion.div
                        className="grid grid-cols-2 gap-4 mt-10 text-gray-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.7 }}
                    >
                        <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
                            <p className="font-semibold text-[#1E595D]">Instant Booking</p>
                            <p className="text-sm text-gray-500">
                                Choose a date & check availability
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
                            <p className="font-semibold text-[#1E595D]">On-site Services</p>
                            <p className="text-sm text-gray-500">
                                Home or ceremony decoration included
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
                            <p className="font-semibold text-[#1E595D]">Real-Time Tracking</p>
                            <p className="text-sm text-gray-500">
                                Track your project status live
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
                            <p className="font-semibold text-[#1E595D]">Secure Payments</p>
                            <p className="text-sm text-gray-500">
                                Pay for packages & services easily
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* RIGHT IMAGE / ANIMATION */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex justify-center"
                >
                    <motion.img
                        src={heroImg}
                        alt="Decoration Service"
                        className="w-[85%] md:w-full drop-shadow-xl"
                        animate={{ y: [0, -12, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default HeroSection;
