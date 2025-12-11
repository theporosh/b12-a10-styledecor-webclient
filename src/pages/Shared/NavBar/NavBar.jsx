import React, { useState } from "react";
import { NavLink } from "react-router";
import {
    FaUserCircle,
    FaBars,
    FaTimes,
    FaAngleDown,
    FaTachometerAlt,
    FaMapMarkerAlt,
} from "react-icons/fa";
import Logo from "../../../components/Logo/Logo";
import { LiaHomeSolid } from "react-icons/lia";
import { GrServices } from "react-icons/gr";
import { MdRoundaboutLeft } from "react-icons/md";
import { SlSupport } from "react-icons/sl";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";


const NavBar = () => {

    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => toast.success("You signed out successfully"))
            .catch(error => {
                console.log(error)
            })
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Example user auth
    // const user = { name: "StyleDecor", loggedIn: true };
    // const isLoggedIn = user.loggedIn;


    const links = (
        <>
            <li>
                <NavLink to="/" className="nav-link flex items-center gap-2">
                    <LiaHomeSolid />  Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/allServices" className="nav-link flex items-center gap-2">
                    <GrServices /> Services
                </NavLink>
            </li>

            <li>
                <NavLink to="/about" className="nav-link flex items-center gap-2">
                    <MdRoundaboutLeft /> About Us
                </NavLink>
            </li>

            <li>
                <NavLink to="/contact" className="nav-link flex items-center gap-2">
                    <SlSupport /> Contact
                </NavLink>
            </li>
            <li>
                <NavLink to="/coverage" className="nav-link flex items-center gap-2">
                    <FaMapMarkerAlt /> Coverage
                </NavLink>
            </li>

            {user && (
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
            <div className="w-11/12 mx-auto px-4 flex justify-between items-center h-20">

                  {/* <div className="div">{user && user.email}</div> */}

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

                            {user ? (
                                <>

                                    <NavLink to="/profile" className="dropdown-item">
                                        👤 My Profile
                                    </NavLink>
                                    <NavLink to="/appointments" className="dropdown-item">
                                        📅 Appointments
                                    </NavLink>

                                    <div className="border-t my-1" />

                                    <button onClick={handleLogOut}
                                        className="dropdown-item text-red-600 hover:bg-red-50">
                                        🚪 Sign Out
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

                        {user ? (
                            <>
                                <NavLink to="/profile" className="mobile-item">
                                    👤 My Profile
                                </NavLink>
                                <NavLink to="/appointments" className="mobile-item">
                                    📅 Appointments
                                </NavLink>

                                <button onClick={handleLogOut}
                                    className="mobile-item text-red-600">
                                    🚪 Sign Out
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
