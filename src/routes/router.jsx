import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import DecoratorDetails from "../pages/Home/DecoratorDetails/DecoratorDetails";
import Coverage from "../pages/ServiceCoverageMap/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AllServices from "../pages/AllServices/AllServices";
import ServiceDetails from "../pages/AllServices/ServiceDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import UserProfile from "../pages/Dashboard/user/UserProfile";
import MyBookings from "../pages/Dashboard/user/MyBookings";
import PaymentHistory from "../pages/Dashboard/user/PaymentHistory";
import ManageServices from "../pages/Dashboard/admin/ManageServices";
import ManageDecorators from "../pages/Dashboard/admin/ManageDecorators";
import RevenueAnalytics from "../pages/Dashboard/admin/RevenueAnalytics";
import AssignedProjects from "../pages/Dashboard/decorator/AssignedProjects";
import ProjectStatus from "../pages/Dashboard/decorator/ProjectStatus";
import Payment from "../pages/Dashboard/admin/Payment";
import PaymentSuccess from "../pages/Dashboard/admin/paymentSuccess";
import PaymentCancelled from "../pages/Dashboard/admin/PaymentCancelled";
import Decorators from "../pages/Decorators/Decorators";
import ApproveDecorators from "../pages/Dashboard/admin/ApproveDecorators";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/decorators",
        element: <PrivateRoute>
          <Decorators></Decorators>
        </PrivateRoute>,
      },
      {
        path: "/decorators/:id",
        element: <DecoratorDetails></DecoratorDetails>,
      },
      {
        path: "/services/:id",
        element: <ServiceDetails></ServiceDetails>,
      },
      {
        path: "/allServices",
        Component: AllServices,
      },
      {
        path: "/coverage",
        Component: Coverage,
      },
    ]
  },

  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      }
    ]
  },

  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: 'profile',
        element: <UserProfile></UserProfile>,
      },
      {
        path: 'bookings',
        element: <MyBookings></MyBookings>,
      },
      {
        path: 'payments',
        element: <PaymentHistory></PaymentHistory>,
      },

      // Admin
      {
        path: 'services',
        element: <ManageServices></ManageServices>,
      },
      {
        path: 'decorators',
        element: <ManageDecorators></ManageDecorators>,
      },
      {
        path: 'approve-decorators',
        element: <ApproveDecorators></ApproveDecorators>,
      },
      {
        path: 'payment/:bookingId',
        element: <Payment></Payment>,
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: 'payment-cancelled',
        element: <PaymentCancelled></PaymentCancelled>,
      },
      {
        path: 'analytics',
        element: <RevenueAnalytics></RevenueAnalytics>,
      },

      // Decorator
      {
        path: 'projects',
        element: <AssignedProjects></AssignedProjects>,
      },
      {
        path: 'status',
        element: <ProjectStatus></ProjectStatus>,
      },
    ]
  }


]);
