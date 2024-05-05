import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../src/layouts/MainLayout";
import Home from "../src/pages/Home/Home";
import Volunteers from "../src/pages/Volunteers/Volunteer"
import Login from "../src/pages/user/Login";
import Register from "../src/pages/user/Register";
import Donations from "../src/pages/Donation/Donations";
import About from "../src/pages/About/About";


export const router = createBrowserRouter([
    {
        path: "/",
        element:<MainLayout/>,
        children: [
            {
                path: "/",
                element:<Home/>,
            },
            {
                path: "/volunteers",
                element: <Volunteers/>
            },
            {
                path: "/donations",
                element: <Donations/>
            },

            {
                path: "/about",
                element: <About/>
            },


        ]
    },
    {
        path: "/login",
        element:<Login/>
    },

    {
        path: "/register",
        element:<Register/>
    }
]);