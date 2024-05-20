import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../src/layouts/MainLayout";
import Home from "../src/pages/Home/Home";
import Volunteers from "../src/pages/Volunteers/Volunteer"
import Login from "../src/pages/user/Login";
import Register from "../src/pages/user/Register";
import Donations from "../src/pages/Donation/Donations";
import About from "../src/pages/About/About";
import SingleDonation from "../src/pages/Donation/SingleDonation";
import DashboardLayout from "../src/layouts/Dashboardlayout";
import Dashboard from "../src/pages/Dashboard/Dashboard";
import DonnerCP from "../src/pages/Dashboard/Donner/DonnerCP";
import EnrolledDonations from "../src/pages/Dashboard/Donner/Enroll/EnrolledDonations";
import SelectedDonation from "../src/pages/Dashboard/Donner/Enroll/SelectedDonation";
import MyPaymentHistory from "../src/pages/Dashboard/Donner/Payment/History/MyPaymentHistory";
import Payment from "../src/pages/Dashboard/Donner/Payment/Payment";
import AsVolunteer from "../src/pages/Dashboard/Donner/Apply/AsVolunteer";
import VolunteerCP from "../src/pages/Dashboard/Volunteer/VolunteerCP";
import AddDonation from "../src/pages/Dashboard/Volunteer/AddDonation";
import MyDonations from "../src/pages/Dashboard/Volunteer/MyDonations";
import UpdateUser from "../src/pages/Dashboard/Admin/users/UpdateUser";
import ManageDonations from "../src/pages/Dashboard/Admin/users/ManageDonations";
import ManageUsers from "../src/pages/Dashboard/Admin/users/ManageUsers";
import AdminHome from "../src/pages/Dashboard/Admin/users/AdminHome";
import Gallary from "../src/pages/Gallary/Gallary"



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

            {
                path: "/gallary",
                element: <Gallary/>
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
    },
    {
        path: "/donations/:id",
        element:<SingleDonation/>,
        loader: ({params}) => fetch(`http://localhost:3000/donations/${params.id}`)
    },
    {
        path: "/dashboard",
        element: <DashboardLayout/>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: "donner-cp/",
                element: <DonnerCP/>
            },
        {
            path: "enrolled-donation",
            element: <EnrolledDonations/>
        },
        {
            path: "my-selected",
            element:<SelectedDonation/>
        },
        {
            path: "my-payments",
            element: <MyPaymentHistory/>
        },
        {
            path: "apply-volunteer",
            element: <AsVolunteer/>
        },
        {
            path: "user/payment",
            element: <Payment/>
        },
        /*Volunteer*/
        {
            path: "volunteer-cp",
            element: <VolunteerCP/>
        },
        {
            path: "add-donation",
            element:<AddDonation/>
        },
        {
            path: "my-donations",
            element: <MyDonations/>
        },
       
        

        /*Admin */
        /*Volunteer*/
        {
            path: "manage-users",
            element: <ManageUsers/>
        },
        {
            path: "update-user/:id",
            element:<UpdateUser/>,
            loader:({ params }) => fetch(`http://localhost:3000/users/${params.id}`)
        },
        {
            path: "admin-home",
            element: <AdminHome/>
        },
        {
            path: "manage-donation",
            element: <ManageDonations/>
        },
       
        ]
    }
]);