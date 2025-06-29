import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import connectDB  from './Config/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRouter.js';
import hotelRouter from './routes/hotelRouter.js';
import connectCloudnary from './Config/cloudnary.js';
import roomRouter from './routes/roomRouter.js';
import bookingRouter from './routes/bookingRouter.js';

connectDB();
connectCloudnary()
const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())

// Api to listen to clerk webhooks
app.use("/api/clerk",clerkWebhooks);
app.get('/',(req,res)=>res.send('Hello world!'));

app.use('/api/users',userRouter);
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)
app.use('/api/bookings',bookingRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// module.exports = app;
