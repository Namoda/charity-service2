import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";

const navLinks = [
    { name: 'Home', route: '/' },
    { name: 'Volunteers', route: '/volunteers' },
    { name: 'Donation', route: '/donations' },
    { name: 'About', route: '/about' },
    { name: 'Gallary', route: '/gallary' },
];

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff0000",
        },
        secondary: {
            main: "#00ff00",
        },
    },
});

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHome, setIsHome] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [navBg, setNavBg] = useState('bg-gradient-to-r from-purple-500 via-pink-500 to-red-500');
    const user = true;

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const darkClass = 'dark';
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add(darkClass);
        } else {
            root.classList.remove(darkClass);
        }
    }, [isDarkMode]);

    useEffect(() => {
        setIsHome(location.pathname === '/');
        setIsLogin(location.pathname === '/login');
        setIsFixed(location.pathname === '/register' || location.pathname === '/login');
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;
            setScrollPosition(currentPosition);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (scrollPosition > 100) {
            if (isHome) {
                setNavBg('bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:text-white text-black');
            } else {
                setNavBg('bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:bg-black dark:text-white text-black');
            }
        } else {
            setNavBg(`${isHome || location.pathname === '/' ? 'bg-transparent' : 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'} dark:text-white text-white`);
        }
    }, [scrollPosition, isHome, location.pathname]);

    const handleLogout = () => {
        console.log("Log out");
    };

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`${isHome ? navBg : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:bg-black backdrop-blur-2xl"} ${isFixed ? 'static' : 'fixed'} top-0 transition-colors duration-500 ease-in-out w-full z-10`}
        >
            <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
                <div className='px-4 py-4 flex items-center justify-between'>
                    {/* Logo */}
                    <div onClick={() => navigate('/')} className='flex-shrink-0 cursor-pointer pl-7 md:p-0 flex-items-center'>
                        <h1 className='text-2xl inline-flex gap-3 items-center font-bold text-white'>Kind Heart Charity Service <img src="/logo.png" alt='' className='w-30 h-12' /></h1>
                        <p className='font-bold text-[13px] tracking-[8px] text-white'>Quick Explore</p>
                    </div>
                    {/* Mobile menu icon */}
                    <div className='md:hidden flex items-center'>
                        <button type="button" onClick={toggleMobileMenu} className="text-white hover:text-gray-300 focus:outline-none">
                            <FaBars className="h-6 w-6 hover:text-primary" />
                        </button>
                    </div>
                    {/* Navigation links */}
                    <div className='hidden md:block text-white'>
                        <div className='flex'>
                            <ul className='ml-10 flex items-center space-x-4 pr-4'>
                                {navLinks.map((link) => (
                                    <li key={link.route}>
                                        <NavLink
                                            to={link.route}
                                            style={{ whiteSpace: "nowrap" }}
                                            className={({ isActive }) =>
                                                `font-bold ${isActive ? 'text-yellow-300' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-white dark:text-white'}`} hover:text-yellow-300 duration-300`
                                            }
                                        >
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))}
                                {/* Based on user */}
                                {!user ? isLogin ? (
                                    <li><NavLink to="/register" className={({ isActive }) =>
                                        `font-bold ${isActive ? 'text-yellow-300' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-white dark:text-white'}`} hover:text-yellow-300 duration-300`
                                    }>Register</NavLink></li>
                                ) : (
                                    <li><NavLink to="/login" className={({ isActive }) =>
                                        `font-bold ${isActive ? 'text-yellow-300' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-white dark:text-white'}`} hover:text-yellow-300 duration-300`
                                    }>Login</NavLink></li>
                                ) : (
                                    <>
                                        <li>
                                            <NavLink to='/dashboard' className={({ isActive }) =>
                                                `font-bold ${isActive ? 'text-yellow-300' : `${navBg.includes('bg-transparent') ? 'text-white' : 'text-white dark:text-white'}`} hover:text-yellow-300 duration-300`
                                            }>Dashboard</NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={handleLogout} className='font-bold px-3 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 duration-300'>Logout</NavLink>
                                        </li>
                                    </>
                                )}
                                {/* Color toggle */}
                                <li>
                                    <ThemeProvider theme={theme}>
                                        <div className='flex flex-col justify-center items-center'>
                                            <Switch onChange={() => setIsDarkMode(!isDarkMode)} />
                                            <h1 className='text-[8px] text-white'>Light/Dark</h1>
                                        </div>
                                    </ThemeProvider>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default NavBar;
