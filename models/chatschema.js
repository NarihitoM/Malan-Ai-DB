import mongoose from "mongoose";

const chatmessage = new mongoose.Schema({
    id: { type: String, requied: true },
    messages: [
    {
      sender: { type: String, required: true },
      text: { type: String, default: "" },
      files: [{ name: String, url: String }],
      fileDownload: { name: String, url: String },
      createdAt: { type: Date, default: Date.now },
    }
  ]
},
    {
        timestamps: true,
        collection: "chat"
    });

export default mongoose.model("MaLanAiChat", chatmessage);