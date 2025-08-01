import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext.jsx'
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import { useAppContext } from '../context/AppContext.jsx'; 
const HotelReg = () => {
  const { setShowHotelReg,setIsOwner,getToken } = useAppContext();

  const [name,setName] = useState('');
  const [address,setAddress] = useState('');
  const [contact,setContact] = useState('');
  const [city,setCity] = useState('');
  const onSubmitHandler = async (event) => {
    console.log('first')
    event.preventDefault();
    try {
        console.log("first")
        const token = await getToken();
        console.log("Token:", token);
        const { data } = await axios.post('/api/hotels/', { name, contact, address, city }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (data.success) {
            toast.success(data.message);
            setShowHotelReg(false);
            setIsOwner(true);
        }
        console.log(data);
    } catch (error) {
        console.error("Registration error:", error);    
        toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div onClick={()=>setShowHotelReg(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
        <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmitHandler} className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
            <img src={assets.regImage} alt="reg-image" className='w-1/2 rounded-xl hidden md:block' />

            <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
            <img src={assets.closeIcon} alt="close-Icon"  className='absolute top-4 right-4 h-4 w-4 cursor-pointer' onClick={()=>setShowHotelReg(false)}/>
            <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>

            {/* Hotel Name */}
            <div className='w-full mt-4'>
                <label htmlFor="name" className='font-medium text-gray-500'>
                Hotel Name
            </label>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Type here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required />
            </div>

            {/* Phone */}
            <div className='w-full mt-4'>
                <label htmlFor="name" className='font-medium text-gray-500'>
                Phone 
            </label>
            <input onChange={(e)=>setContact(e.target.value)} value={contact} type="contact" placeholder='Type here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required />
            </div>
            {/* Address */}
            <div className='w-full mt-4'>
                <label htmlFor="name" className='font-medium text-gray-500'>
                Address
            </label>
            <input onChange={(e)=>setAddress(e.target.value)} value={address} type="address" placeholder='Type here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required />
            </div>

            {/* Select city drop dowm */}
            <div>
                <label htmlFor="city" className='font-medium text-gray-500'>City</label>
                <select onChange={(e)=>setCity(e.target.value)} value={city} className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required id="city">
                    <option value="">Select City</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <button className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6'>
                Register
            </button>
            </div>           
        </form>
    </div>
  )
}

export default HotelReg