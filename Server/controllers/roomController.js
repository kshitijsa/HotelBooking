import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
import { v2 as cloudinary } from 'cloudinary';

//API to create a new room for a hotel
export const createRoom = async (req, res) => {
    try{
        const {roomType,pricePerNight,amenities} = req.body;
        console.log('req.user:', req.user);
        // Find hotel by owner (user's _id)
        const hotel = await Hotel.findOne({owner: req.user._id});
        if(!hotel){
            return res.json({
                success:false,
                message:"You are not authorized to create a room for this hotel"
            });
        }

        // upload images to cloudinary
        const uploadedImages = req.files.map( async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        }); 
        const images = await Promise.all(uploadedImages);

        await Room.create({
            hotel:hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images
        });
        res.json({
            success:true,
            message:"Room Created Successfully"
        });
        }catch(error) {
            res.json({
                success:false,
                message:error.message
            });
        }
}

//API to get all rooms of a hotel
export const getRooms = async (req, res) => {
    try{
        const rooms = await Room.find({isAvailable:true}).populate('hotel').sort({createdAt:-1});
        res.json({success:true, rooms});
    }
    catch(error) {
        res.json({
            success:false,
            message:error.message
        });
    }
}

//API to get owners rooms of a hotel
export const getOwnerRooms = async (req,res) => {
     console.log('🧪 req.user:', req.user); 
    try{
        const hotelData =  await Hotel.findOne({owner:req.user._id});
        const rooms = await Room.find({hotel:hotelData._id.toString()}).populate('hotel')
        res.json({
            success:true,
            rooms
        });
    }catch(error) {
        res.json({
            success:false,
            message:error.message
        });
    }
}

// Api to toggle availibility of a room
export const toggleRoomAvailability = async (req, res) => {
    try{
        const {roomId} = req.body;
        const room = await Room.findById(roomId);
        room.isAvailable = !room.isAvailable;
        await room.save();
        res.json({
            success:true,
            message:`Room is now ${room.isAvailable ? 'available' : 'not available'}`
        });
    }catch(error) {
        res.json({
            success:false,
            message:error.message
        });
    }
}