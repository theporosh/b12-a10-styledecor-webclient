import React from "react";
import { useParams } from "react-router";
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";


const decorators = [
    {
        id: 1,
        name: "Afsana Rahman",
        specialty: "Wedding & Stage Decoration",
        rating: 4.9,
        reviews: 132,
        experience: "7+ Years",
        completedProjects: 240,
        location: "Banani, Dhaka",
        contact: "+8801789-443322",
        about:
            "Afsana is a certified wedding and event decoration specialist with 6+ years of experience. She is known for elegant stage setups, premium floral arrangements, and high-budget corporate event styling.",
        gallery: [
            "https://i.ibb.co.com/PsZYqCKV/gal1.avif",
            "https://i.ibb.co.com/GQJwTs5h/gal2.avif",
            "https://i.ibb.co.com/dsRDSrg5/gal33.avif",
        ],
        image: "https://i.ibb.co.com/rRX6tyD6/toppp1.avif"
    },
    {
        id: 2,
        name: "Tanvir Hossain",
        specialty: "Home Interior & Lighting",
        rating: 4.8,
        reviews: 98,
        experience: "5+ Years",
        completedProjects: 180,
        location: "Dhanmondi, Dhaka",
        contact: "+8801899-112233",
        about:
            "Tanvir specializes in luxury interior setups, ambient lighting design, and home celebration decoration. His modern lighting concepts are admired by many clients.",
        gallery: [
            "https://i.ibb.co.com/S42HxQJ4/gal4.avif",
            "https://i.ibb.co.com/Ng93NjQ7/gal5-2.webp",
            "https://i.ibb.co.com/ZRwXJmjG/gal66.webp",
        ],
        image: "https://i.ibb.co.com/XZv8Hj5b/toppp2.avif"
    },
    {
        id: 3,
        name: "Mim Chowdhury",
        specialty: "Ceremony Floral Decoration",
        rating: 4.7,
        reviews: 120,
        experience: "6+ Years",
        completedProjects: 210,
        location: "Uttara, Dhaka",
        contact: "+8801400-332211",
        about:
            "Mim is a floral decoration expert working in weddings, birthday ceremonies, and outdoor floral events. She is known for creative and colorful floral work.",
        gallery: [
            "https://i.ibb.co.com/WNC51Rj8/gal7.avif",
            "https://i.ibb.co.com/4w1WbSRj/gal8.avif",
            "https://i.ibb.co.com/bMDDWsZw/gal9.avif",
        ],
        image: "https://i.ibb.co.com/5hFCXgF4/toppp3.avif"
    },
    {
        id: 4,
        name: "Rahim Uddin",
        specialty: "Outdoor Event & Luxury Setup",
        rating: 4.85,
        reviews: 110,
        experience: "8+ Years",
        completedProjects: 260,
        location: "Gulshan, Dhaka",
        contact: "+8801600-551122",
        about:
            "Rahim is an outdoor event specialist with years of experience in luxury ceremonies, receptions, and premium outdoor event setups.",
        gallery: [
            "https://i.ibb.co.com/LDW2s1mw/gal10.avif",
            "https://i.ibb.co.com/0RFf1pCX/gal11.avif",
            "https://i.ibb.co.com/RTpJ16sg/gal11-2.avif",
        ],
        image: "https://i.ibb.co.com/9HKt0GGj/toppp4.avif"
    }
];

const DecoratorDetails = () => {
    const { id } = useParams();
    const decorator = decorators.find((d) => d.id === Number(id));

    if (!decorator) {
        return <h2 className="text-center mt-20 text-xl">Decorator Not Found</h2>;
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="w-11/12 mx-auto grid md:grid-cols-2 gap-10 items-start">

                {/* LEFT: IMAGE + INFO */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white p-8 rounded-2xl shadow-lg"
                >
                    <img
                        src={decorator.image}
                        alt={decorator.name}
                        className="w-40 h-40 object-cover mx-auto rounded-full border-4 border-[#C8A870]/40"
                    />

                    <h2 className="text-3xl font-bold text-center mt-5 text-[#1E595D]">
                        {decorator.name}
                    </h2>

                    <p className="text-center text-gray-600 mt-1">
                        {decorator.specialty}
                    </p>

                    {/* Rating */}
                    <div className="flex justify-center items-center mt-4">
                        <FaStar className="text-[#C8A870]" />
                        <span className="font-semibold ml-1">{decorator.rating}</span>
                        <span className="text-gray-500 ml-2">
                            ({decorator.reviews} reviews)
                        </span>
                    </div>

                    {/* Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-gray-700">

                        <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                            <FaCalendarAlt className="text-[#1E595D] text-2xl mb-2" />
                            <p className="font-semibold">Experience</p>
                            <p className="text-sm">{decorator.experience}</p>
                        </div>

                        <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                            <FaMapMarkerAlt className="text-[#1E595D] text-2xl mb-2" />
                            <p className="font-semibold">Location</p>
                            <p className="text-sm">{decorator.location}</p>
                        </div>

                        <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                            <FaPhoneAlt className="text-[#1E595D] text-2xl mb-2" />
                            <p className="font-semibold">Contact</p>
                            <p className="text-sm">{decorator.contact}</p>
                        </div>
                    </div>

                    {/* Book Button */}
                    <div className="text-center mt-6">
                        <button className="px-8 py-3 bg-[#1E595D] text-white rounded-xl text-lg shadow hover:bg-[#18494c] transition">
                            Book Appointment
                        </button>
                    </div>
                </motion.div>

                {/* RIGHT: ABOUT + GALLERY */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* About
                    <h3 className="text-2xl font-semibold text-[#1E595D]">
                        About Decorator
                    </h3>
                    <p className="text-gray-600 mt-3 leading-relaxed">
                        {decorator.about}
                    </p> */}

                    {/* Description */}
                    <div className="mt-10">
                        <h3 className="text-xl font-semibold text-gray-800">About the Decorator</h3>
                        <p className="text-gray-600 mt-3 leading-relaxed">
                            {decorator.name} is one of our top-rated decorators specializing in {decorator.specialty}.
                            With over {decorator.experience} of professional experience and {decorator.completedProjects}+ completed projects,
                            they are known for premium quality, creative design approach, and excellent client satisfaction.
                        </p>
                    </div>

                    {/* Gallery */}
                    <h3 className="text-2xl font-semibold text-[#1E595D] mt-10">
                        Recent Decoration Work
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {decorator.gallery.map((img, index) => (
                            <motion.img
                                key={index}
                                src={img}
                                className="rounded-lg shadow-md hover:scale-105 transition"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                                alt="decor work"
                            />
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default DecoratorDetails;
