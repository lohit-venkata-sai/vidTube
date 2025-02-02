import mongoose from "mongoose";
import DB_NAME from "../constants.js";

async function dbConnect() {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoBD connected to DB host${DB_NAME} ${connection}`);

    } catch (error) {
        console.log('mongoDB connection error',error);
        process.exit(1);
    }
}

export default dbConnect;