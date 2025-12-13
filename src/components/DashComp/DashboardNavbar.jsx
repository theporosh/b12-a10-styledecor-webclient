import { useState } from "react";
import { FaBell, FaBars } from "react-icons/fa";

import { useLocation } from "react-router";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";


const DashboardNavbar = ({ onToggleSidebar }) => {
    const { user, logOut } = useAuth();

    const { role } = useRole();

    const [openDropdown, setOpenDropdown] = useState(false);

    const location = useLocation();

    const handleLogout = () => {
        logOut();
        setOpenDropdown(false);
    };

    return (
        <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">

            {/* Mobile Sidebar Toggle */}
            <button
                className="text-2xl text-[#1E595D] md:hidden"
                onClick={onToggleSidebar}
            >
                <FaBars />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold text-[#1E595D]">
                Dashboard
            </h2>

            {/* Right Section */}
            <div className="flex items-center gap-6 relative">

                {/* Notification */}
                <button className="relative text-2xl text-[#1E595D] hover:text-[#C8A870] transition">
                    <FaBell />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                        0
                    </span>
                </button>

                {/* User Avatar + Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setOpenDropdown(!openDropdown)}
                        className="flex items-center gap-3"
                    >
                        <img
                            src={user?.photoURL || "https://i.ibb.co.com/6RdXpDJM/defuser.png"}
                            alt="avatar"
                            className="w-10 h-10 rounded-full border"
                        />

                        <div className="hidden md:block text-left">
                            <p className="font-semibold text-[#1E595D]">
                                {user?.displayName || "User"}
                            </p>
                            <span className="text-xs bg-[#1E595D] text-white px-2 rounded">
                                {/* {user?.role || "User"} */}
                                {role}
                            </span>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {openDropdown && (
                        <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-lg border py-2 z-50">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {
                                    window.location.href = "/dashboard/profile";
                                    setOpenDropdown(false);
                                }}
                            >
                                👤 My Profile
                            </button>

                            <button
                                state={location.state}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                🚪 Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;


