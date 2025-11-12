import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let connect = false;

export async function mongoconnect() {
    if (connect) return;
    await  mongoose.connect((process.env.MONGO_URI),
{
    dbName:"malanai"
});
    connect = true;
    console.log("Mongo DB is running");
}
