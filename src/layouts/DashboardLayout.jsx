import { Outlet } from "react-router";

// import { useAuth } from "../hooks/useAuth";
import DashboardSidebar from "../components/DashComp/DashboardSidebar";
import DashboardNavbar from "../components/DashComp/DashboardNavbar";
// import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
    // const { user, role } = useAuth();  // role = "user" | "admin" | "decorator"

//     return (
//         <div className="flex bg-gray-100 min-h-screen">
//             {/* Sidebar */}
//             <DashboardSidebar role={role} />

//             {/* Main Content */}
//             <div className="flex-1 p-6">
//                 <Outlet></Outlet>
//             </div>
//         </div>
//     );
// };

return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
     <DashboardSidebar></DashboardSidebar>

      {/* Main Content */}
      <div className="flex-1">
        
        {/* Top Navbar */}
       <DashboardNavbar></DashboardNavbar>

        <div className="p-6">
         <Outlet></Outlet>
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;
