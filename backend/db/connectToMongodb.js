import mongoose from "mongoose";

const connectToMongodb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to mongodb");
    }catch(error)
    {
        console.log("Error in connecting MongoDb" + error);
    }
}

export default connectToMongodb;