import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import DecoratorDetails from "../pages/Home/DecoratorDetails/DecoratorDetails";

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
    ]
  },
]);
