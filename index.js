
import express from 'express'
import morgan from 'morgan';
import 'dotenv/config'
import mongoose from 'mongoose';
import authRouter from './routers/auth.js';

const app = express()
const PORT = 4000;

app.use(express.json())
app.use(morgan('tiny'))

// console.log(`MongoDB URI: ${process.env.MONGODBURI}`);


// MOngoDB Connection
mongoose.connect(process.env.MONGODBURI)
.then(()=> console.log("MongoDB Connected Successfully"))
.catch((err) => console.error("MongoDB Connection Error:", err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on Port${PORT}`);
})
    