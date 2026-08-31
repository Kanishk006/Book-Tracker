import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("DB is connected");
        })
        .catch((error) =>{
            console.log("Error : " , error.message);
    });
    
app.use("/api/books" , bookRoutes);



app.get("/" , (req,res) =>{
    res.json({
        message: "Book Tracker is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

