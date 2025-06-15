import React ,{useState,useEffect, use} from 'react';
import { Link ,useNavigate,useLocation} from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { useClerk,useUser ,UserButton} from '@clerk/clerk-react';
// import { useState } from 'react';
import { SignOutButton } from "@clerk/clerk-react";
import { useAppContext } from  '../context/AppContext.jsx';

const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/room' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' },
    ];

    
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
   
    const location = useLocation();
    const {isSignedIn } = useUser();
    const { navigate,user,setShowHotelReg,isOwner } = useAppContext(); 

    
const [showDropdown, setShowDropdown] = useState(false);

    
    const {openSignIn} = useClerk();
    console.log(typeof openSignIn); // to see if it's a function

    // const user = useUser();

    useEffect(() => {
        if (location.pathname !== '/') {
            setIsScrolled(true);
            return;
        }
        else{
            setIsScrolled(false);
        } setIsScrolled(prev => location.pathname !== '/' ? true : prev);

        // setIsScrolled(prev => location.pathname !== '/'?true:prev);
        
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
                    <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
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
                    <img src={assets.searchIcon} alt="search" className={`${isScrolled && 'invert'} h-7 transition-all duration-500`} />
                    
                    {/* Account */}
                    {isSignedIn ? (
                      <div className="relative flex items-center gap-2">
                        <UserButton afterSignOutUrl="/" />

                        <button
                          onClick={() => navigate('/my-bookings')}
                          className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-800"
                        >
                          My Bookings
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={openSignIn}
                        className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500"
                      >
                        Login
                      </button>
                    )}
                    
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <img onClick={()=>setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="" className={`${isScrolled && "invert"} h-4`} />
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <img src={assets.closeIcon} alt="close-menu" className='h-6.5'/>
                    </button>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}

                    <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                        Dashboard
                    </button>

                    <button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Login
                    </button>
                </div>
            </nav>
    );
}
export default Navbar;