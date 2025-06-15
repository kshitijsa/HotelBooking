import React, { Children, useContext,useState,useEffect, use } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useUser,useAuth} from '@clerk/clerk-react'
import { createContext } from 'react';
import {toast} from 'react-hot-toast';
axios.defaults.baseURL = import .meta.env.VITE_API_URL;
const AppContext = createContext();


export const AppProvider = ({children}) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const {user} = useUser();
    const {getToken} = useAuth(); 

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);

    const fetchUser = async () => {
        try{
            const {data} = await axios.get('/api/user',{headers:{Authorization:`Bearer ${await getToken()}`}});
            if(data.succese){
                setIsOwner(data.role === 'hotelOwner');
                setSearchedCities(data.recentSearchedCities);
            }
            else{
                setTimeout(()=>{
                    fetchUser();
                },5000);
            }
        }catch(error){
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if(user) {
            fetchUser();
        }
    }, [user]);

    const value = {
        axios,isOwner,setIsOwner,showHotelReg,setShowHotelReg,user,getToken,navigate,currency,searchedCities,

    };
    return (
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
    );
}

export const useAppContext = ()=> useContext(AppContext);