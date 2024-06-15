import mongoose from "mongoose";

export const conn = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected");
    } catch (error) {
        console.log(error)
    }
}

