import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://rahmatullo9984:rahmat_9984@cluster0.twapc.mongodb.net/food-del').then(()=>{console.log("DB Connected")});
}
