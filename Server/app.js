import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB  from './Config/db.js';
connectDB();
const app = express();
app.use(cors());

app.get('/',(req,res)=>res.send('Hello world!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
