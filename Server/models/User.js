import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    usename: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { // <-- Add this field
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false, // <-- change here
        default: '',     // <-- or provide a default URL if you want
    },
    role: {
        type: String,
        enum: ['user', 'hotelOwner'],
        default: 'user',
    },
    recentSearchedCities: [{
        type: String,
        required: false, // <-- change here
    }],
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;