import mongoose from 'mongoose';

export let connection;
connection = await mongoose.connect(process.env.MONGODB_URI);