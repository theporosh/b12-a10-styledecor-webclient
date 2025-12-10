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
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      }
    ]
  }
]);
