import React from "react";
import { Link } from "react-router";
import { FaFeather } from "react-icons/fa";


const Logo = () => {
    return (
        <Link
            to="/"
            className="flex items-center group select-none cursor-pointer"
        >
            {/* Icon */}
            <span className="text-3xl text-[#829A4D] group-hover:text-[#C8A870] transition duration-300">
                <FaFeather />
            </span>

            {/* Brand Name */}
            <div className="ml-2 leading-tight">
                <h1 className="text-2xl font-bold tracking-wide text-[#1E595D] group-hover:text-[#C8A870] transition duration-300">
                    Style<span className="text-[#C8A870] group-hover:text-[#1E595D] transition duration-300">Decor</span>
                </h1>
                <p className="text-xs uppercase tracking-wider text-gray-500 group-hover:text-[#829A4D] transition">
                    Appointment & Decoration
                </p>
            </div>
        </Link>
    );
};

export default Logo;
