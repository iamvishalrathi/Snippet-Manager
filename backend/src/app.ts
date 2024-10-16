import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import snippetRoutes from "./routes/snippetRoutes";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api", snippetRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err));

    //Listen
    app.listen(5000, ()=>{
        console.log(`Server running on port ${PORT}`);
    })