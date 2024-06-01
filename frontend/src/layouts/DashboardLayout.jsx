import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';
import { BiHomeAlt, BiLogInCircle, BiDonateHeart } from "react-icons/bi";
import { FaHome, FaUsers, FaHandsHelping } from "react-icons/fa";
import { IoIosAddCircle, IoIosGift } from "react-icons/io";
import { BsCardChecklist } from 'react-icons/bs';
import { MdOutlinePayment, MdOutlineVolunteerActivism } from 'react-icons/md';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Scroll from '../hooks/useScroll';
import { ClockLoader } from 'react-spinners';

const adminNavItems = [
  { to: "/dashboard/admin-home", icon: <BiHomeAlt className="text-2xl" />, label: "Dashboard Home" },
  { to: "/dashboard/manage-users", icon: <FaUsers className="text-2xl" />, label: "Manage Users" },
  { to: "/dashboard/manage-donation", icon: <BsCardChecklist className="text-2xl" />, label: "Manage Donations" },
  { to: "/dashboard/manage-application", icon: <BsCardChecklist className="text-2xl" />, label: "Application" },
];

const volunteerNavItems = [
  { to: "/dashboard/volunteer-cp", icon: <FaHome className="text-2xl" />, label: "Home" },
  { to: "/dashboard/add-donation", icon: <IoIosAddCircle className="text-2xl" />, label: "Add Donation" },
  { to: "/dashboard/my-donations", icon: <BiDonateHeart className="text-2xl" />, label: "My Donations" },
];

const donorNavItems = [
  { to: "/dashboard/donner-cp", icon: <BiHomeAlt className="text-2xl" />, label: "Dashboard" },
  { to: "/dashboard/enrolled-donation", icon: <IoIosGift className="text-2xl" />, label: "My Donations" },
  { to: "/dashboard/my-selected", icon: <FaHandsHelping className="text-2xl" />, label: "My Selected" },
  { to: "/dashboard/my-payments", icon: <MdOutlinePayment className="text-2xl" />, label: "Payment History" },
];

const lastMenuItems = [
  { to: "/", icon: <BiHomeAlt className="text-2xl" />, label: "Main Home" },
  { to: "/dashboard/contact", icon: <BiHomeAlt className="text-2xl" />, label: "Contact Us" },
];

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const { loader, logout } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!'
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire(
              'Logged out..!',
              'You are logged out.',
              'success'
            )
            navigate("/");
          })
          .catch((err) => {
            Swal.fire(
              'Error!',
              err.message,
              'error'
            )
          })
      }
    })
  }

  const role = currentUser?.role;

  if (loader) {
    return (
      <div className='flex justify-center items-center h-screen'>
        
      </div>
    );
  }

  const getBackgroundColor = () => {
    return role === 'volunteer' ? '#FFB1B1' : '#FFFFFF'; // Set your desired default color
  }

  return (
    <div className="flex">
      <div className={`h-screen ${open ? "w-72" : "w-[90px]"} bg-[#FFB1B1] p-5 hidden md:block pt-8 relative duration-300`}>
        <div className="flex gap-x-4 items-center">
          <img
            src='/logo.png'
            onClick={() => setOpen(!open)}
            className={`cursor-pointer h-[40px] duration-500 ${open && "rotate-[360deg]"}`}
            alt="Logo"
          />
          <h1
            onClick={() => setOpen(!open)}
            className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && "scale-0"}`}
          >
            Kind-Heart-Charity-Service
          </h1>
        </div>

        {/* Nav links */}
        {role === 'admin' && (
          <ul className="pt-6">
            <p className={`ml-3 text-light-gray-4 ${!open && "hidden"}`}><small>MENU</small></p>
            {adminNavItems.map((menuItem, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={menuItem.to}
                  className={({ isActive }) =>
                    `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                  }
                >
                  {menuItem.icon}
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {menuItem.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {role === 'volunteer' && (
          <ul className="pt-6">
            <p className={`ml-3 text-light-gray-4 ${!open && "hidden"}`}><small>MENU</small></p>
            {volunteerNavItems.map((menuItem, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={menuItem.to}
                  className={({ isActive }) =>
                    `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                  }
                >
                  {menuItem.icon}
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {menuItem.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {role === 'user' && (
          <ul className="pt-6">
            <p className={`ml-3 text-light-gray-4 ${!open && "hidden"}`}><small>MENU</small></p>
            {donorNavItems.map((menuItem, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={menuItem.to}
                  className={({ isActive }) =>
                    `flex ${isActive ? "bg-red-500 text-white" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                  }
                >
                  {menuItem.icon}
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {menuItem.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        <ul className="pt-6">
          <p className={`ml-3 uppercase text-light-gray-4 ${!open && "hidden"}`}><small>Useful Links</small></p>
          {lastMenuItems.map((menuItem, index) => (
            <li key={index} className="mb-2">
              <NavLink
                to={menuItem.to}
                className={({ isActive }) =>
                  `flex ${isActive ? "bg-dark-primary-3 text-dark-primary" : "text-[#413F44]"} duration-150 rounded-md p-2 cursor-pointer hover:bg-dark-primary-3 font-bold text-sm items-center gap-x-4`
                }
              >
                {menuItem.icon}
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {menuItem.label}
                </span>
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink
              onClick={handleLogout}
              className={({ isActive }) =>
                `flex ${isActive ? "bg-dark-primary-3 text-dark-primary" : "text-[#413F44]"} duration-150 rounded-md inline-flex p-2 cursor-pointer hover:bg-dark-primary-3 font-bold text-sm items-center gap-x-4`
              }
            >
              <BiLogInCircle className='text-2xl' />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="h-screen overflow-y-auto px-8 flex-1" style={{ backgroundColor: getBackgroundColor() }}>
        <Scroll />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

