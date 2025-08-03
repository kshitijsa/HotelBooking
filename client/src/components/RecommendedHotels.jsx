import React, { useEffect, useState } from 'react';
import HotelCard from './HotelCard';
import Title from './Title';
import { useAppContext } from '../context/AppContext';

const RecommendedHotels = () => {
  const { rooms, navigate, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    console.log('searchedCities:', searchedCities);
    rooms.forEach(room => {
      console.log('room.hotel.city:', room.hotel.city, 'included:', searchedCities.includes(room.hotel.city));
    });
    const filteredHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city));
    setRecommended(filteredHotels);
  }, [rooms, searchedCities]);

  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>
      <Title title='Recommended Hotels' subtitle='Discover our handpicked selection of exeptional properties around the world ,offering unparalled luxury and unforgettable experiences.' />

      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
        {recommended.length > 0 ? (
          recommended.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))
        ) : (
          <p>No recommended hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendedHotels;