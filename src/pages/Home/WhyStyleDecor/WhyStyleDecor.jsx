import React from "react";
import { motion } from "framer-motion";
import { FaClock, FaPalette, FaUserTie, FaCheckCircle } from "react-icons/fa";

const features = [
    {
        icon: <FaClock />,
        title: "Smart Scheduling",
        desc: "Book your preferred date & time with real-time decorator availability.",
    },
    {
        icon: <FaPalette />,
        title: "Premium Decoration Packages",
        desc: "From weddings to birthdays — choose from our beautifully curated themes.",
    },
    {
        icon: <FaUserTie />,
        title: "Expert Decorators",
        desc: "Certified professionals with specialized expertise for each event.",
    },
    {
        icon: <FaCheckCircle />,
        title: "End-to-End Service",
        desc: "On-site setup to completion — we handle everything seamlessly.",
    },
];

const WhyStyleDecor = () => {
    return (
        <section className="py-20 bg-white" id="why-us">
            <div className="max-w-6xl mx-auto px-4 text-center">

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-[#1E595D]"
                >
                    Why Choose <span className="text-[#C8A870]">StyleDecor?</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-4 text-gray-600 max-w-2xl mx-auto"
                >
                    We bring creativity, professionalism, and seamless service to make your decoration experience smoother than ever.
                </motion.p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

                    {features.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="p-8 rounded-2xl shadow-md border bg-white hover:shadow-lg hover:-translate-y-1 transition"
                        >
                            <div className="w-14 h-14 mx-auto flex items-center justify-center text-3xl rounded-full bg-[#1E595D] text-white">
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-semibold text-[#1E595D] mt-5">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 mt-2">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default WhyStyleDecor;
