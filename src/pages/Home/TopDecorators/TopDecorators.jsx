import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const decorators = [
    {
        id: 1,
        name: "Afsana Rahman",
        specialty: "Wedding & Stage Decoration",
        rating: 4.9,
        reviews: 132,
        image: "https://i.ibb.co.com/rRX6tyD6/toppp1.avif"
    },
    {
        id: 2,
        name: "Tanvir Hossain",
        specialty: "Home Interior & Lighting",
        rating: 4.8,
        reviews: 98,
        image: "https://i.ibb.co.com/XZv8Hj5b/toppp2.avif"
    },
    {
        id: 3,
        name: "Mim Chowdhury",
        specialty: "Ceremony Floral Decoration",
        rating: 4.7,
        reviews: 120,
        image: "https://i.ibb.co.com/5hFCXgF4/toppp3.avif"
    },
    {
        id: 4,
        name: "Rahim Uddin",
        specialty: "Outdoor Event & Luxury Setup",
        rating: 4.85,
        reviews: 110,
        image: "https://i.ibb.co.com/9HKt0GGj/toppp4.avif"
    }
];

const TopDecorators = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="w-11/12 mx-auto">

                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-center text-[#1E595D]"
                >
                    Top Rated <span className="text-[#C8A870]">Decorators</span>
                </motion.h2>

                <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">
                    Our most trusted decorators with specialization in weddings,
                    interior setups, ceremonies, and premium home decoration services.
                </p>

                {/* Decorator Cards */}
                <div className="grid md:grid-cols-4 gap-8 mt-14">

                    {decorators.map((decorator, index) => (
                        <motion.div
                            key={decorator.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-2 duration-300"
                        >

                            {/* Decorator Image */}
                            <div className="flex justify-center">
                                <img
                                    src={decorator.image}
                                    alt={decorator.name}
                                    className="w-28 h-28 object-cover rounded-full shadow-md border-4 border-[#C8A870]/30"
                                />
                            </div>

                            {/* Name */}
                            <h3 className="text-xl font-bold text-center mt-5 text-[#1E595D]">
                                {decorator.name}
                            </h3>

                            {/* Specialty */}
                            <p className="text-center text-gray-600 mt-1">
                                {decorator.specialty}
                            </p>

                            {/* Rating */}
                            <div className="flex justify-center items-center mt-4">
                                <FaStar className="text-[#C8A870] text-lg" />
                                <span className="ml-1 font-semibold">{decorator.rating}</span>
                                <span className="ml-2 text-gray-500 text-sm">
                                    ({decorator.reviews} reviews)
                                </span>
                            </div>

                            {/* View Profile Button */}
                            <div className="text-center mt-6">
                                <Link 
                                to={`/decorators/${decorator.id}`}
                                className="px-6 py-2 bg-[#1E595D] text-white rounded-lg shadow hover:bg-[#15494d] transition">
                                    View Profile
                                </Link>
                            </div>

                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default TopDecorators;
