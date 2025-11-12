import cors from "cors";
import express from "express";
import router from "./routes/route.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",router);

app.get("/",(req,res) =>
{
    res.end("Server running");
});

app.listen(5000);
