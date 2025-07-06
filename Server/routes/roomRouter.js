import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; 
import { createRoom } from "../controllers/roomController.js";
import { get } from "mongoose";
import { getRooms, getOwnerRooms, toggleRoomAvailability } from "../controllers/roomController.js";
const roomRouter = express.Router();

roomRouter.post("/", protect, upload.array("images", 10), createRoom);
roomRouter.get("/",getRooms);
roomRouter.get("/owner", protect, getOwnerRooms);
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability);

export default roomRouter;