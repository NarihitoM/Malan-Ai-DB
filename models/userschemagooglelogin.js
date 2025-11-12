import mongoose  from "mongoose";

const userschemagoogle = new mongoose.Schema({
    googleemail: { type: String, required: true, unique: true },
    googlename: { type: String, required: true },
    googlepicture: { type: String, required: true },
    googleid: { type: String, required: true },
},
    {
        timestamps: true,
        collection: "googleusers",
    })

export default mongoose.model("MalanAIgoogle", userschemagoogle);