import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    // _id: {
    //     type: String,
    //     required: true,
    // },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { 
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false, 
        default: '',     
    },
    role: {
        type: String,
        enum: ['user', 'hotelOwner'],
        default: 'user',
    },
    recentSearchedCities: [{
        type: String,
        required: false, 
    }],
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;