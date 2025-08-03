// import React,{useState} from 'react'
// import { useNavigate } from 'react-router-dom'
// import { assets, facilityIcons, roomsDummyData } from '../assets/assets';
// import StarRating from '../components/StarRating';

// const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
//        return(
//         <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
//             <input type="checkbox" checked={selected} onChange={(e)=>onChange(e.target.checked,label)}/>
//             <span className='font-light select-none'>{label}</span>
//         </label>
//        )
// }

// const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
//        return(
//         <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
//             <input type="radio" checked={selected} onChange={()=>onChange(label)}/>
//             <span className='font-light select-none'>{label}</span>
//         </label>
//        )
// }

// const AllRooms = () => {
//     const nevigate = useNavigate();
//     const [openFilter, setOpenFilter] = useState(false);

//     const roomTypes  = [
//         "Single Bed",
//         "Double Bed",
//         "Luxury Bed",
//         "Family suite",
//     ]
    
//     const priceRange = [
//         "0 t0 500",
//         "500 to 1000",
//         "1000 to 2000", 
//         "2000 to 3000", 
//     ]
//     const sortOptions = [
//         "Price: Low to High",
//         "Price: High to Low",
//         "Newest First",
//     ]

//   return (
//     <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
//         <div >
//             <div className='flex flex-col items-start text-left'>
//               <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
//               <p className='text-sm md:text-base text-gray text-gray-500/90 mt-2 max-w-174'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</p>
//             </div>
             
//              {roomsDummyData.map((room) => (
//             <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pd-30 last:border-0'>
//                 <img
//                     onClick={() => { nevigate(`/room/${room._id}`); scrollTo(0, 0); }}
//                     src={room.images[0]}
//                     alt="hotel-img"
//                     title='view Room Details'
//                     className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'
//                 />

//                 <div className='md:w-1/2 flex flex-col gap-2'>
//                     <p className='text-gray-500'>{room.hotel.city}</p>
//                     <p onClick={() => { nevigate(`/room${room._id}`); scrollTo(0, 0); }} className='text-gray-800 text-3xl font-playpair cursor-pointer'>{room.hotel.name}</p>

//                     <div className=' flex items-center'>
//                         <StarRating />
//                         <p className='ml-2'>200+review</p>
//                     </div>
//                     <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
//                         <img src={assets.locationIcon} alt="location-icon" />
//                         <span>{room.hotel.address}</span>
//                     </div>
//                     {/* Room Amenities */}
//                     <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
//                         {room.amenities.map((item, index) => (
//                             <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
//                                 <img className='w-5 h-5' src={facilityIcons[item]} alt={item} />
//                                 <p className='text-xs'>{item}</p>
//                             </div>
//                         ))}
//                     </div>
//                     {/*Room Price per rate */}
//                     <p className='text-xl font-medium text-gray-700'>${room.pricePerNight}</p>
//                 </div>
//             </div>
//         ))}

//         </div>
//         {/* Filter */}
//         <div className='bg-white w-80 border border-gray-300 text-gray-600'>
//           <div className={`flex items-center justify-between px-5 py-2.5 border-b border-gray-300 min-lg:border-b ${openFilter && 'border-b'}`}>
//             <p className='text-base font-medium text-gray-800'>FILTERS</p>

//             <div className='text-xs cursor-pointer '>
//                 <span onClick={()=> setOpenFilter(!openFilter)} className='hidden lg:block'>{openFilter ?'HIDE':'SHOW'}</span>
//                 <span className='lg:hidden'>CLEAR</span>
//             </div>
//           </div>

//           <div className={`${openFilter ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700`}>
//             <div className='px-5 pt-5'>
//                 <p className='font-medium text-gray-800 pb-2'>Popular Filters</p>
//                 {roomTypes.map((room, index) => (
//                     <CheckBox key={index} label={room}/>
//                 ))}
//             </div>
//             <div className='px-5 pt-5'>
//                 <p className='font-medium text-gray-800 pb-2'>Price Range</p>
//                 {priceRange.map((range, index) => (
//                     <CheckBox key={index} label={range}/>
//                 ))}
//             </div>
//             <div className='px-5 pt-5 pb-7'>
//                 <p className='font-medium text-gray-800 pb-2'>Sort By</p>
//                 {sortOptions.map((option, index) => (
//                     <RadioButton key={index} label={option}/>
//                 ))}
//             </div>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default AllRooms


import React, { useState, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import StarRating from '../components/StarRating'
import { useAppContext } from '../context/AppContext'
// import { set } from 'mongoose'

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
      <span className='font-light select-none'>{label}</span>
    </label>
  )
}

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input type="radio" checked={selected} onChange={() => onChange(label)} />
      <span className='font-light select-none'>{label}</span>
    </label>
  )
}

const AllRooms = () => {
  const [searchParam, setSearchParam] = useSearchParams('');
  const {rooms, navigate, currency} = useAppContext();
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState({
    roomTypes: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState('');


  // const [selectedRoomTypes, setSelectedRoomTypes] = useState([])
  // const [selectedPriceRange, setSelectedPriceRange] = useState('')
  // const [selectedSortOption, setSelectedSortOption] = useState('')

  // const handleRoomTypeChange = (checked, label) => {
  //   if (checked) {
  //     setSelectedRoomTypes([...selectedRoomTypes, label])
  //   } else {
  //     setSelectedRoomTypes(selectedRoomTypes.filter((item) => item !== label))
  //   }
  // }

  // const handlePriceRangeChange = (checked, label) => {
  //   if (checked) {
  //     setSelectedPriceRange(label)
  //   } else {
  //     setSelectedPriceRange('')
  //   }
  // }

  // const handleSortChange = (label) => {
  //   setSelectedSortOption(label)
  // }


  const roomTypes = [
    "Single Bed",
    "Double Bed",
    "Luxury Bed",
    "Family suite",
  ]

  const priceRange = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ]

  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Newest First",
  ]

  const handleRoomTypeChange = (checked, value,type) => {
    setSelectedFilter((prevFilters)=>{
      const updatedFilters = {...prevFilters};
      if(type === 'roomTypes') {
        if(checked) {
          updatedFilters.roomTypes.push(value);
        } else {
          updatedFilters.roomTypes = updatedFilters.roomTypes.filter(item => item !== value);
        }
      } 
      return updatedFilters;
    })
  }

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  }

  //function to check if room matches the selected room types 
  const matchRoomType = (room) => {
    const roomTypes = Array.isArray(selectedFilter.roomTypes) ? selectedFilter.roomTypes : [];
    return roomTypes.length === 0 || roomTypes.includes(room.roomType);
  }

  //function to check if room matches the selected price range
  const matchPriceRange = (room) => {
    const priceRanges = Array.isArray(selectedFilter.priceRange) ? selectedFilter.priceRange : [];
    return priceRanges.length === 0 || priceRanges.some(range => {
      const [min, max] = range.split(' to ').map(Number);
      return room.pricePerNight >= min && room.pricePerNight <= max;
    });
  }

  //function to sort rooms based on selected sort option
  const sortRooms = (rooms) => {
    if (selectedSort === "Price: Low to High") {
      return rooms.slice().sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (selectedSort === "Price: High to Low") {
      return rooms.slice().sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (selectedSort === "Newest First") {
      return rooms.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return rooms;
  }

  //filter Destination
  const filterDestination = (rooms) => {
    const destination = searchParam.get('destination');
    if (!destination) 
      return true;
    return rooms.hotel.city.toLowerCase().includes(destination.toLowerCase());
  }

  //filter rooms based on selected filters
  const filteredRooms = useMemo(() => {
    const filtered = rooms.filter(room =>
      matchRoomType(room) &&
      matchPriceRange(room) &&
      filterDestination(room)
    );
    return sortRooms(filtered);
  }, [rooms, selectedFilter, selectedSort, searchParam]);
 
  //clear all filters
  const clearFilters = () => {
    setSelectedFilter({
      roomTypes: [],
      priceRange: [],
    });
    setSearchParam([]);
    setSelectedSort('');
  }

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilter((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (type === 'roomTypes') {
        if (checked) {
          updatedFilters.roomTypes = [...updatedFilters.roomTypes, value];
        } else {
          updatedFilters.roomTypes = updatedFilters.roomTypes.filter(item => item !== value);
        }
      } else if (type === 'priceRange') {
        if (checked) {
          updatedFilters.priceRange = [...updatedFilters.priceRange, value];
        } else {
          updatedFilters.priceRange = updatedFilters.priceRange.filter(item => item !== value);
        }
      }
      return updatedFilters;
    });
  }


  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div>
        <div className='flex flex-col items-start text-left'>
          <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
          <p className='text-sm md:text-base text-gray text-gray-500/90 mt-2 max-w-174'>
            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
          </p>
        </div>

        {filteredRooms.map((room) => (
          <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pd-30 last:border-0'>
            <img
              onClick={() => {
                navigate(`/room/${room._id}`)
                scrollTo(0, 0)
              }}
              src={room.images[0]}
              alt="hotel-img"
              title='view Room Details'
              className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'
            />

            <div className='md:w-1/2 flex flex-col gap-2'>
              <p className='text-gray-500'>{room.hotel.city}</p>
              <p
                onClick={() => {
                  navigate(`/room/${room._id}`)
                  scrollTo(0, 0)
                }}
                className='text-gray-800 text-3xl font-playpair cursor-pointer'
              >
                {room.hotel.name}
              </p>

              <div className='flex items-center'>
                <StarRating />
                <p className='ml-2'>200+ review</p>
              </div>

              <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
              </div>

              {/* Room Amenities */}
              <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                {room.amenities.map((item, index) => (
                  <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                    <img className='w-5 h-5' src={facilityIcons[item]} alt={item} />
                    <p className='text-xs'>{item}</p>
                  </div>
                ))}
              </div>

              {/* Room Price */}
              <p className='text-xl font-medium text-gray-700'>${room.pricePerNight}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className='bg-white w-80 border border-gray-300 text-gray-600'>
        <div className={`flex items-center justify-between px-5 py-2.5 border-b border-gray-300 min-lg:border-b ${openFilter && 'border-b'}`}>
          <p className='text-base font-medium text-gray-800'>FILTERS</p>
          <div className='text-xs cursor-pointer'>
            <span onClick={() => setOpenFilter(!openFilter)} className='hidden lg:block'>
              {openFilter ? 'HIDE' : 'SHOW'}
            </span>
            <span className='lg:hidden'>CLEAR</span>
          </div>
        </div>

        <div className={`${openFilter ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700`}>
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Popular Filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={(Array.isArray(selectedFilter.roomTypes) ? selectedFilter.roomTypes : []).includes(room)}
                onChange={(checked) => handleFilterChange(checked, room, 'roomTypes')}
              />
            ))}
          </div>

          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Price Range</p>
            {priceRange.map((range, index) => (
              <CheckBox
                key={index}
                label={range}
                selected={(Array.isArray(selectedFilter.priceRange) ? selectedFilter.priceRange : []).includes(range)}
                onChange={(checked) => handleFilterChange(checked, range, 'priceRange')}
              />
            ))}
          </div>

          <div className='px-5 pt-5 pb-7'>
            <p className='font-medium text-gray-800 pb-2'>Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={selectedSort === option}
                onChange={()=>handleSortChange(option)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllRooms
