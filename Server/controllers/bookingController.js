import transporter from "../Config/nodemailer.js";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
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
    console.log('Check availability for:', { room, checkInDate, checkOutDate });
    console.log('Found bookings:', bookings);
    return bookings.length === 0; // true if no overlapping bookings
};

export const checkAvailabilityAPI = async (
    req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvailable });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

console.log('createBooking called');
export const createBooking = async (req,res)=>{
    try {
        const { roomId, checkInDate, checkOutDate, guest } = req.body;
        const user = req.user._id;

        // Before Booking Check Availability
        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room: roomId
        });

        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not Available" });
        }
        // Get totalPrice from Room
        const roomData = await Room.findById(roomId).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        // calculate totalPrice based on nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;
        const booking = await Booking.create({
            user,
            room: roomId,
            hotel: roomData.hotel._id,
            guests: +guest,
            checkInDate,
            checkOutDate,
            totalPrice,
        });
        
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: "Hotel Booking Details",
            html: `
                <h2>Booking Details</h2>
                <p>Dear ${req.user.username}</p>
                <p>Thank you for booking with us!</p>
                <ul>
                    <li><strong>Room:</strong> ${booking.id}</li>
                    <li><strong>Hotel:</strong> ${roomData.hotel.name}</li>
                    <li><strong>Hotel Address:</strong> ${roomData.hotel.address}</li>
                    <li><strong>Check-in Date:</strong> ${booking.checkInDate.toDateString()}</li>
                    <li><strong>Check-out Date:</strong> ${booking.checkOutDate.toDateString()}</li>
                    <li><strong>Total Price:</strong> ${process.env.CURRENCY || '$'} ${booking.totalPrice} / night</li>
                    <li><strong>Guests:</strong> ${guest}</li>
                </ul>
                <p>We look forward to welcoming you!</p>
                <p>If you need any changes feel free to contact us.</p>
            `
        };
        console.log('Attempting to send booking email to:', mailOptions.to);
        if (mailOptions.to) {
            console.log('Attempting to send booking email to:', mailOptions.to);
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error('Error sending booking email:', err);
                } else {
                    console.log('Booking email sent:', info);
                }
            });
        } else {
            console.error('No recipient email defined for booking confirmation.');
        }

        res.json({ success: true, message: "Booking Created successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "failed to create booking" });
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
       const hotel = await Hotel.findOne({owner:req.user._id});
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
