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
import MyBookings from "../pages/Dashboard/user/MyBookings";
import PaymentHistory from "../pages/Dashboard/user/PaymentHistory";
import ManageServices from "../pages/Dashboard/admin/ManageServices";
import ManageDecorators from "../pages/Dashboard/admin/ManageDecorators";
import RevenueAnalytics from "../pages/Dashboard/admin/RevenueAnalytics";
import AssignedProjects from "../pages/Dashboard/decorator/AssignedProjects";
import CompletedProjectStatus from "../pages/Dashboard/decorator/CompletedProjectStatus";
import Payment from "../pages/Dashboard/admin/Payment";
import PaymentSuccess from "../pages/Dashboard/admin/paymentSuccess";
import PaymentCancelled from "../pages/Dashboard/admin/PaymentCancelled";
import Decorators from "../pages/Decorators/Decorators";
import ApproveDecorators from "../pages/Dashboard/admin/ApproveDecorators";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import { Component } from "lucide-react";
import AboutUs from "../pages/Home/AboutUs/AboutUs";
import Contact from "../pages/Home/Contact/Contact";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import UserProfile from "../pages/Dashboard/user/UserProfile";
import AssignDecorators from "../pages/Dashboard/admin/AssignDecorators";
import DecoratorRoute from "./DecoratorRoute";



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
      {
        path: "/about" ,
        Component: AboutUs ,
      },
      {
        path: "/contact" ,
        Component: Contact,
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
        element: <AdminRoute>
          <ApproveDecorators></ApproveDecorators>
        </AdminRoute>,
      },
      {
        path: 'assign-decorators',
        element: <AdminRoute>
          <AssignDecorators></AssignDecorators>
        </AdminRoute>,
      },
      {
        path: 'manage-users',
        element: <AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>,
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
        element: <DecoratorRoute>
          <AssignedProjects></AssignedProjects>
        </DecoratorRoute>,
      },
      {
        path: 'completed-project',
        element: <DecoratorRoute>
          <CompletedProjectStatus></CompletedProjectStatus>
        </DecoratorRoute>,
      },
    ]
  },
   {
        path: "/*",
        element: <ErrorPage></ErrorPage>,
    },


]);
