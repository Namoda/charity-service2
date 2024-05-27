import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from "react-icons/bi";
import { FaHome, FaUsers } from "react-icons/fa";
import { IoSchoolSharp } from "react-icons/io5";
import { BsFillPostcardFill } from 'react-icons/bs';
import { SiGoogleclassroom, SiInstructure } from 'react-icons/si';
import { MdExplore, MdPayments } from 'react-icons/md';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Scroll from '../hooks/useScroll';
import { ClockLoader } from 'react-spinners';

const adminNavItems = [
  { to: "/dashboard/admin-home", icon: <BiHomeAlt className="text-2xl" />, label: "Dashboard Home" },
  { to: "/dashboard/manage-users", icon: <FaUsers className="text-2xl" />, label: "Manage Users" },
  { to: "/dashboard/manage-donation", icon: <BsFillPostcardFill className="text-2xl" />, label: "Manage Donation" },
];

const volunteerNavItem = [
  { to: "/dashboard/volunteer-cp", icon: <FaHome className="text-2xl" />, label: "Home" },
  { to: "/dashboard/add-donation", icon: <MdExplore className="text-2xl" />, label: "Add A Donation" },
  { to: "/dashboard/my-donations", icon: <IoSchoolSharp className="text-2xl" />, label: "My Donations" },
];

const donner = [
  { to: "/dashboard/donner-cp", icon: <BiHomeAlt className="text-2xl" />, label: "Dashboard" },
  { to: "/dashboard/enrolled-donation", icon: <SiGoogleclassroom className="text-2xl" />, label: "My Enroll" },
  { to: "/dashboard/my-selected", icon: <BiSelectMultiple className="text-2xl" />, label: "My Selected" },
  { to: "/dashboard/my-payments", icon: <MdPayments className="text-2xl" />, label: "Payment History" },
];

const lastMenuItems = [
  { to: "/", icon: <BiHomeAlt className="text-2xl" />, label: "Main Home" },
  { to: "/trending", icon: <MdExplore className="text-2xl" />, label: "Trending" },
  { to: "/browse", icon: <FaUsers className="text-2xl" />, label: "Following" },
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

  if(loader){
    return (
      <div className='flex justify-center items-center h-screen'>
        <ClockLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className={`${open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"} bg-[#FFB1B1] h-screen p-5 hidden md:block pt-8 relative duration-300`}>
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
            {volunteerNavItem.map((menuItem, index) => (
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
            {donner.map((menuItem, index) => (
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
      <div className="h-screen overflow-y-auto px-8 flex-1 bg-[#FFB1B1]">
        <Scroll />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
