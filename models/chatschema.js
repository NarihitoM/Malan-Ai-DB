import mongoose from "mongoose";

const chatmessage = new mongoose.Schema({
     id : {type: String, requied: true },
     message : {type: String , required : true}
},
{
    timestamps : true,
    collection : "chat"
});

export default mongoose.model("MaLanAiChat", chatmessage);