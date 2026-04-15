// import mongoose from 'mongoose'

// export const connectDB =async () =>{
//     try{
//         console.log("ENV:", process.env.MONGO_URI);
//         const conn=await mongoose.connect(process.env.MONGO_URI)
//         console.log(`MongoDB Connected: ${conn.connection.host}`)
//     } catch (error){
//         console.log("Error connection to MongoDB:",error.message)
//         process.exit(1);
//     }
// }
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("ENV:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4   // 🔥 THIS FIXES YOUR ERROR
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connection to MongoDB:", error.message);
    process.exit(1);
  }
};