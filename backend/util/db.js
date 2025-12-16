import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connectsucessfully")
    }catch{
        console.log("connection faile");
    }
}

export default connectDB;