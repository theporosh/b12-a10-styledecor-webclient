import React, { useState } from "react";
import { NavLink } from "react-router";
import {
    FaUserCircle,
    FaBars,
    FaTimes,
    FaAngleDown,
    FaTachometerAlt,
} from "react-icons/fa";
import Logo from "../../../components/Logo/Logo";


const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Example user auth
    const user = { name: "StyleDecor", loggedIn: true };
    const isLoggedIn = user.loggedIn;

   
    const links = (
        <>
            <li>
                <NavLink to="/" className="nav-link">
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/services" className="nav-link">
                    Services
                </NavLink>
            </li>

            <li>
                <NavLink to="/about" className="nav-link">
                    About Us
                </NavLink>
            </li>

            <li>
                <NavLink to="/contact" className="nav-link">
                    Contact
                </NavLink>
            </li>

            {isLoggedIn && (
                <li>
                    <NavLink to="/dashboard" className="nav-link flex items-center gap-2">
                        <FaTachometerAlt className="text-lg" />
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">

                {/* Logo */}
                <Logo></Logo>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-10">
                    {links}
                </ul>

                {/* Profile - Desktop */}
                <div className="hidden md:block relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-1 text-3xl text-[#1E595D] hover:text-[#C8A870] transition"
                    >
                        <FaUserCircle />
                        <FaAngleDown className="text-xl" />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-xl border border-gray-100 py-2 animate-fade">
                            <NavLink to="/profile" className="dropdown-item">
                                My Profile
                            </NavLink>
                            <NavLink to="/appointments" className="dropdown-item">
                                Appointments
                            </NavLink>

                            <div className="border-t my-1" />

                            <button className="dropdown-item text-red-600 hover:bg-red-50">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-3xl text-[#1E595D]"
                >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-50 border-t border-gray-200 animate-slide-down">
                    <ul className="flex flex-col p-4 space-y-4 text-lg">{links}</ul>

                    {/* Mobile Profile */}
                    <div className="px-4 border-t pt-4 pb-2 space-y-3">
                        {isLoggedIn ? (
                            <>
                                <NavLink to="/profile" className="mobile-item">
                                    My Profile
                                </NavLink>
                                <NavLink to="/appointments" className="mobile-item">
                                    Appointments
                                </NavLink>

                                <button className="mobile-item text-red-600">
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="mobile-item">
                                    Log In
                                </NavLink>
                                <NavLink to="/register" className="mobile-item">
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
