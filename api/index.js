import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routers/user.router.js';

dotenv.config();

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to MongoDB Cluster...");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

app.use('/api/user', userRouter)

app.listen(3000, () => {
    console.log('Server is running on PORT 3000...');
})