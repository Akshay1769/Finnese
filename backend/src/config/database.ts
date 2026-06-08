import mongoose from "mongoose";

const connectDatabase =  async () :Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDatabase;
