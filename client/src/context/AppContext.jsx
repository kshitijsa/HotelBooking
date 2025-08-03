import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const AppContext = createContext();


export const AppProvider = ({children}) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    // Manual auth state
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });
    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [rooms, setRooms] = useState([]);

    // Get token from localStorage
    const getToken = () => localStorage.getItem('token');

    // Manual login
    const login = (userObj, token) => {
        setUser(userObj);
        localStorage.setItem('user', JSON.stringify(userObj));
        localStorage.setItem('token', token);
    };

    // Manual logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/users', { headers: { Authorization: `Bearer ${getToken()}` } });
            if (data.success) {
                setIsOwner(data.role === 'hotelOwner');
                setSearchedCities(data.recentSearchedCities);
            } else {
                setTimeout(() => {
                    fetchUser();
                }, 5000);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchRooms = async () => {
        try{
            const { data } = await axios.get('/api/rooms')
            if (data.success) {
                setRooms(data.rooms);
            } else {
                toast.error(data.message);
            }}catch (error) {
                toast.error('Error fetching rooms: ' + error.message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const value = {
        axios, isOwner, setIsOwner,rooms, setRooms,showHotelReg, setShowHotelReg, user, getToken, login, logout, setUser, navigate, currency, searchedCities, setSearchedCities,
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);