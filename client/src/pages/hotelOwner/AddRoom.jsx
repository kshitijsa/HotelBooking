import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { compressImage } from '../../utils/imageCompressor'

const AddRoom = () => {
    const { axios, getToken } = useAppContext();
    const [images,setImages] = useState({
        1:null,
        2:null,
        3:null,
        4:null
    })
    const [inputs ,setInputs] = useState({
        roomType:'',
        pricePerNight:0,
        amenities:{
            'Free WiFi':false,
            'Free BreakFast':false,
            'Room Service':false,
            'Moutain View':false,
        }
    })
    const [loading ,setLoading] = useState(false);
    const handleImageChange = async (e, key) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        try {
            // Compress to 100x100px
            const compressed = await compressImage(file, 0.2, 100);
            setImages(prev => ({ ...prev, [key]: compressed }));
        } catch (err) {
            setImages(prev => ({ ...prev, [key]: file }));
        } finally {
            setLoading(false);
        }
    };
    const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!inputs.roomType || !inputs.pricePerNight || !inputs.amenities || Object.values(images).some(image => image === null)) {
        alert('Please fill all fields');
        return;
    }
    setLoading(true);
    try{
      const formData = new FormData();
      formData.append('roomType', inputs.roomType);
      formData.append('pricePerNight', inputs.pricePerNight);
      formData.append('amenities', JSON.stringify(Object.keys(inputs.amenities).filter(amenity => inputs.amenities[amenity])));
      for (const key of Object.keys(images)) {
        if (images[key]) {
          formData.append('images', images[key]);
        }
      }
      const getToken = () => localStorage.getItem('token');
      console.log(await getToken());
      
      const {data} = await axios.post('/api/rooms/',formData,{headers:{Authorization:`Bearer ${await getToken()}`}});
      if(data.success){
        toast.success(data.message);
        setInputs({
          roomType:'',
          pricePerNight:0,
          amenities:{
            'Free WiFi':false,
            'Free BreakFast':false,
            'Room Service':false,
            'Moutain View':false,
          }
        });
        setImages({
          1:null,
          2:null,
          3:null,
          4:null
        });
      }
      else{
        toast.error(data.message);
      }
    }catch(error){
    toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <form action="" onSubmit={onSubmitHandler}>
      <Title align='left' title='Add Room' subtitle='Fill in the details carefully and accurate room details,pricing,and amenities,to enhance the user booking experience.'></Title>
      <p className='text-gray-800 mt-10'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => (
            <label htmlFor={`roomImages${key}`} key={key}>
                <img src={images[key] ? URL.createObjectURL(images[key]):assets.uploadArea} alt="" />
                <input type="file" accept='image/*' id={`roomImages${key}`} hidden onChange={e=>handleImageChange(e, key)} />
            </label>
        ))}
      </div>
      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Room Type</p>
          <select className='border border-gray-300 opacity-70 mt-1 rounded p-2 w-full' value={inputs.roomType} name="" id="" onChange={e=> setInputs({...inputs,roomType:e.target.value})}>
            <option value="">Select Room type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Family">Family</option>
          </select>
        </div>
        <div>
          <p className='mt-4 text-gray-800'>
            price <span className='text-xs'>night</span>
          </p>
          <input type="number" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24' value={inputs.pricePerNight} onChange={e=>setInputs({...inputs,pricePerNight:e.target.value})}/>
        </div>
      </div>
      <p className='text-gray-800 mt-4'>Amenities</p>
      <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
        {Object.keys(inputs.amenities).map(((amenity,index)=>(
          <div key={index}>
            <input type="checkbox" id={`amenities${index+1}`} checked={inputs.amenities[amenity]} onChange={()=>setInputs({...inputs,amenities:{...inputs.amenities,[amenity]:!inputs.amenities[amenity]}})} />
            <label htmlFor={`amenities${index+1}`}>{amenity}</label>
          </div>
        )))}
      </div>
      <button className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer' disabled={loading}>{loading ? 'Processing...' : 'Add Room'}</button>
    </form>
  )
}

export default AddRoom