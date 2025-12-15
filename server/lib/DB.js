import mongoose from "mongoose";

// Function to connect mongodb
export const connectDB = async ()=>{
    try {
        mongoose.connection.on('connected',()=>console.log("DataBase is connected"));

        await mongoose.connect(`${process.env.MONGODB_URL}/chatApp`);
    } catch (error) {
       console.log(error); 
    }
}