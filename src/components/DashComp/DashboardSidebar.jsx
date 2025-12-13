import { useState } from "react";
import { Link } from "react-router";
import {
    FaBars,
    FaUser,
    FaCalendarCheck,
    FaMoneyBillWave,
    FaTools,
    FaChartArea,
    FaUsersCog,
    FaHome,
} from "react-icons/fa";
// import useAuth from "../../hooks/useAuth";
import { RiUserCommunityFill } from "react-icons/ri";
import useRole from "../../hooks/useRole";

const DashboardSidebar = () => {  //{ role }

    // const { role } = useAuth();
    const { role } = useRole();
    // console.log("ROLE FROM HOOK in DashboardSidebar:", role);

    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div
            className={`h-screen bg-[#1E595D] text-white transition-all duration-300 p-4 ${isOpen ? "w-64" : "w-20"
                }`}
        >
            {/* Toggle Button */}
            <button
                className="text-white mb-6 text-xl"
                onClick={toggleSidebar}
            >
                <FaBars />
            </button>

            {/* Menu Items */}
            <ul className="space-y-4">
                {/* Common Menu */}
                <li>
                    <Link 
                   
                    className="flex items-center gap-3 hover:text-[#C8A870]" to="/">
                        <FaHome />
                        {isOpen && <span>Dashboard Home</span>}
                    </Link>
                </li>

                {/* USER DASHBOARD */}
                {role === "user" && (
                    <>
                        <li>
                            <Link className="flex items-center gap-3" to="/dashboard/profile">
                                <FaUser />
                                {isOpen && "My Profile"}
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center gap-3" to="/dashboard/bookings">
                                <FaCalendarCheck />
                                {isOpen && "My Bookings"}
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center gap-3" to="/dashboard/payments">
                                <FaMoneyBillWave />
                                {isOpen && "Payment History"}
                            </Link>
                        </li>
                    </>
                )}

                {/* ADMIN DASHBOARD */}
                {role === "admin" && (    //"admin"
                    <>
                        <li>
                            <Link className="flex items-center gap-3" to="/dashboard/services">
                                <FaTools />
                                {isOpen && "Manage Services"}
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center gap-3" to="/dashboard/decorators">
                                <FaUsersCog />
                                {isOpen && "Manage Decorators"}
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center gap-3" to="/dashboard/approve-decorators">
                                <RiUserCommunityFill />
                                {isOpen && "Approve Decorators"}
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center gap-3" to="/dashboard/manage-users">
                                <FaUser></FaUser>
                                {isOpen && "Manage Users"}
                            </Link>
                        </li>

                        <li>
                            <Link className="flex items-center gap-3" to="/dashboard/analytics">
                                <FaChartArea />
                                {isOpen && "Analytics"}
                            </Link>
                        </li>
                    </>
                )}

                {/* DECORATOR DASHBOARD */}
                {role === "decorator" && (   //"decorator"
                    <>
                        <li>
                            <Link className="flex items-center gap-3" to="/dashboard/projects">
                                <FaCalendarCheck />
                                {isOpen && "My Assigned Projects"}
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center gap-3" to="/dashboard/status">
                                <FaTools />
                                {isOpen && "Update Status"}
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default DashboardSidebar;
