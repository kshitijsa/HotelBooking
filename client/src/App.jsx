// import React from 'react'
// import Navbar from './components/Navbar'
// import { useLocation,Route,Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import Footer from './components/footer'
// import AllRooms from './pages/AllRooms'
// import RoomDetails from './pages/RoomDetails'
// import MyBooking from './pages/MyBooking'
// import HotelReg from './components/HotelReg'
// import Layout from './pages/hotelOwner/Layout'
// import Dashboard from './pages/hotelOwner/Dashboard'
// import AddRoom from './pages/hotelOwner/AddRoom'
// import ListRoom from './pages/hotelOwner/ListRoom'
// import {Toaster} from 'react-hot-toast'
// import { useAppContext } from './context/AppContext'
// function App() {
//   const isOwnerPath = useLocation().pathname.includes('owner')
//   const {showHotelReg} = useAppContext();

//   import { useAuth } from '@clerk/clerk-react';
// import { useEffect } from 'react';

// const LogToken = () => {
//   const { getToken } = useAuth();

//   useEffect(() => {
//     (async () => {
//       const token = await getToken();
//       console.log('Clerk Token:', token); // Copy this token from your browser console
//     })();
//   }, []);

//   return null;
// };

// // export default LogToken;

//   return (
//     <>
//       <div>
//         <Toaster/>
//         {!isOwnerPath && <Navbar/>}
//         {showHotelReg && <HotelReg/>}
//         <div className='min-h-[70vh]'>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/room" element={<AllRooms />} />
//             <Route path="/room/:id" element={<RoomDetails />} />
//             <Route path="/my-Bookings" element={<MyBooking />} />
//             <Route path="/owner" element={<Layout />}>
//               <Route index element={<Dashboard/>}/>
//               <Route path='add-room' element={<AddRoom/>}/>
//               <Route path='list-room' element={<ListRoom/>}/>
//             </Route>
//           </Routes>
//         </div>
//         <Footer/>
//       </div>
//     </>
//   )
// }

// export default App


import React, { useEffect } from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useAppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBooking from './pages/MyBooking';
import HotelReg from './components/HotelReg';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddRoom from './pages/hotelOwner/AddRoom';
import ListRoom from './pages/hotelOwner/ListRoom';

function App() {
  const isOwnerPath = useLocation().pathname.includes('owner');
  const { showHotelReg } = useAppContext();
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      console.log('Clerk Token:', token); // ← Use this token in Postman
    })();
  }, []);

  return (
    <>
      <div>
        <Toaster />
        {!isOwnerPath && <Navbar />}
        {showHotelReg && <HotelReg />}
        <div className='min-h-[70vh]'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room" element={<AllRooms />} />
            <Route path="/room/:id" element={<RoomDetails />} />
            <Route path="/my-Bookings" element={<MyBooking />} />
            <Route path="/owner" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path='add-room' element={<AddRoom />} />
              <Route path='list-room' element={<ListRoom />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
