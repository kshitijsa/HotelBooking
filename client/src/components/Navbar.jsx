import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { useAppContext } from '../context/AppContext.jsx';
import LoginSignupModal from './LoginSignupModal.jsx';

const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
);

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/room' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' }
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const location = useLocation();
    const { navigate, user, setShowHotelReg, isOwner, logout } = useAppContext();

    useEffect(() => {
        if (location.pathname !== '/') {
            setIsScrolled(true);
            return;
        } else {
            setIsScrolled(false);
        }
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>
            {/* Logo */}
            <Link to="/" >
                <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled ? "invert opacity-80" : ""}`} />
            </Link>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </a>
                ))}
                {user && (
                    <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`} onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true)}>
                        {isOwner ? 'Dashboard' : 'List Your Hotel'}
                    </button>
                )}
            </div>
            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4">
                <img src={assets.searchIcon} alt="search" className={`${isScrolled ? 'invert' : ''} h-7 transition-all duration-500`} />
                {/* Account */}
                {user ? (
                    <div className="relative flex items-center gap-2">
                        <button
                            onClick={() => navigate('/my-bookings')}
                            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-800"
                        >
                            My Bookings
                        </button>
                        <button
                            onClick={logout}
                            className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-sm text-white ml-2"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowLoginModal(true)}
                        className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500"
                    >
                        Login / Signup
                    </button>
                )}
            </div>
            {/* Login/Signup Modal */}
            {showLoginModal && <LoginSignupModal onClose={() => setShowLoginModal(false)} />}
        </nav>
    );
};

export default Navbar;