// import React,{useState} from 'react'
// import Title from '../../components/Title'
// import { useAppContext } from '../../context/AppContext'
// import { useEffect } from 'react';
// import toast from 'react-hot-toast'
// // import { roomsDummyData } from '../../assets/assets';

// const ListRoom = () => {
//   const[rooms, setRooms] = useState([]);
//   const {axios,getToken,user} = useAppContext();
//   // fetch rooms of the hotel owner
//   const fetchRooms = async () => {
//     try {
//       const { data } = await axios.get('/api/rooms/owner', {
//         headers: { Authorization: `Bearer ${getToken()}` }
//       });
//       if (data.success) {
//         setRooms(data.rooms);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error('Error fetching rooms:', error.message);
//     }
//   };

//    const toggleAvailability = async (roomId) => {
//     try {
//       const { data } = await axios.post('/api/rooms/toggle-availability', { roomId }, {
//         headers: { Authorization: `Bearer ${getToken()}` }
//       });
//       if (data.success) {
//         toast.success('Room availability toggled successfully');
//         fetchRooms(); 
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error('Error toggling room availability:', error.message);
//     }
//   };
//   useEffect(() => {
//     if(user){
//       fetchRooms();
//     }
//   },[user]);

 
//   return (
//     <div>
//       <Title align='left' font='outfit' title='Room Listing' subtitle='View, edit,or manage all listed rooms.Keep the information up-to-date to provide the best experience for users.'/>  
//       <p className='text-gray-500 mt-8'>All Rooms</p>
//       <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
//          <table className='w-full'>
//                     <thead className='bg-gray-50'>
//                         <tr>
//                             <th className='py-3 px-4 text-gray-800 font-medium '>Name </th>
//                             <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility </th>
//                             <th className='py-3 px-4 text-gray-800 font-medium  text-center'>Price / night</th>
//                             <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody className='text-sm'>
//                         {
//                           rooms.map((item,index)=>(
//                             <tr key={index}>
//                               <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
//                                 {item.roomType}
//                               </td>
//                               <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
//                                 {item.amenities.join(', ')}
//                               </td>
//                               <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
//                                 {item.pricePerNight}
//                               </td>
//                               <td className='py-3 px-4 border-t border-gray-300 text-sm text-red-500 text-center'>
//                                  <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3' htmlFor={`room-${item._id}`}>
//                                   <input onChange={()=>toggleAvailability(item._id)} type="checkbox" className='sr-only peer' checked={item.isAvailable} />
//                                   <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
//                                   <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
//                                  </label>
//                               </td>
//                             </tr>
//                           ))
//                         }
//                     </tbody>
//         </table>      
//       </div>
//     </div>
//   )
// }

// export default ListRoom

import React, { useState, useEffect } from 'react';
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user ,currency} = useAppContext();

  // Fetch rooms owned by current hotel owner
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms/owner', {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error fetching rooms: ' + error.message);
    }
  };

  // Optimistically toggle room availability
  const toggleAvailability = async (roomId) => {
    try {
      const { data } = await axios.post(
        '/api/rooms/toggle-availability',
        { roomId },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      if (data.success) {
        toast.success(data.message || 'Room availability toggled');
        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room._id === roomId ? { ...room, isAvailable: !room.isAvailable } : room
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error toggling room availability: ' + error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listing"
        subtitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />

      <p className="text-gray-500 mt-8">All Rooms</p>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Price / night
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Availability
              </th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {rooms.map((item) => (
              <tr key={item._id}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.amenities.join(', ')}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden text-center">
                  {currency} {item.pricePerNight}
                </td>
                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <label
                    className="relative inline-flex items-center cursor-pointer"
                    htmlFor={`room-${item._id}`}
                  >
                    <input
                      id={`room-${item._id}`}
                      onChange={() => toggleAvailability(item._id)}
                      type="checkbox"
                      className="sr-only peer"
                      checked={item.isAvailable}
                      readOnly // required for controlled input
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                  {/* Optional debug label */}
                  <div className="text-xs mt-1 text-gray-500">
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
