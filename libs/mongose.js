import mongoose from "mongoose";


const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (e) {
        console.error("❌ Mongose Error: " + e.message)
    }
};

export default connectMongo;