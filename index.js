import cors from "cors";
import express from "express";
import router from "./routes/route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/",router);

app.get("/",(req,res) =>
{
    res.send("Server running");
});

export default app;
