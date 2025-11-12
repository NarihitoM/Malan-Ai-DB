import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    email: { type: String, required: true, },
    password: { type: String, required: true },
},
    {
        timestamps: true,
        collection: "users"
    })

export default mongoose.model("MalanAI", userschema);