import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js";

// API to check availibility of a room
// export const checkAvailabilityAPI = async (req, res) => {
//     try{
//         const {room,checkInDate,checkOutDate} = req.body;
//         const isAvailable = await checkAvailabilityAPI({checkInDate,checkOutDate,room});
//         res.json({success:true,isAvailable})
//     }catch(error) {
//         res.json({success:false,message:error.message})
//     }
// }

export const checkAvailability = async ({ room, checkInDate, checkOutDate }) => {
    const bookings = await Booking.find({
        room,
        $or: [
            { checkInDate: { $lt: new Date(checkOutDate) }, checkOutDate: { $gt: new Date(checkInDate) } }
        ]
    });

    return bookings.length === 0; // true if no overlapping bookings
};

export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvailable });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const createBooking = async (req,res)=>{
    try{
        const {room,checkInDate,checkOutDate,guests} = req.body;
        const user =req.user._id;

        // Before Booking Check Availability
        const isAvailable = await checkAvailabilityAPI({
            checkInDate,
            checkOutDate,
            room
        })

        if(!isAvailable){
            return res.json({success:false,message:"Room is not Available"})
        }
        // Get totalPrice from Room
        const roomData = await Room.fondById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        // calculate totalPrice based on nights
        const checkIn = new Date(checkInDate)
        const checkOut  = new Date(checkOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime()
        const nights = Math.ceil(timeDiff / (1000*3600*24));

        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room,
            hotel:roomData.hotel._id,
            guests: +guests,
            checkInDate,
            checkOutDate,
            totalPrice,
        })
        res.json({success:true,message:"Booking Created successfully"})
    } catch(error){
        console.log(error);
        
        res.json({success:false,message:"failed to create booking"})
    }
}
// API to get all bookings for a user
export const getUserBooking = async (req,res) => {
    try{
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").sort({createdAt:-1})
        res.json({success:true,bookings})
    }catch(error){
        res.json({success:false,message:"failed to fetch bookings"});
    }
}

export const getHotelBookings = async (req,res) =>{
    try{
       const hotel = await Hotel.findOne({owner:req.auth.userId});
    if(!hotel){
        res.json({success:false,message:"No hotel found"});
    }
    const bookings = await Booking.find({hotel:hotel._id }).populate('room hotel user').sort({created:-1});
    // total booking
    const totalBookings = bookings.length;
    // Total Revenue
    const totalRevenue = bookings.reduce((acc,booking)=>acc+booking.totalPrice,0)

    res.json({success:true,dashboardData:{totalBookings,totalRevenue,bookings}})
    }catch(error){
        res.json({success:false,message:"Failed to fetch bokkings"})
    }
    
    
}
