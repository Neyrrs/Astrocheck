import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import PresenceRoute from "./Routes/PresenceRoute.js";
import AccountRoute from "./Routes/AccountRoute.js";
import MajorRoute from "./Routes/MajorRoute.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Koneksi berhasil ke database!"))
  .catch((err) => console.error("Koneksi gagal:", err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", AccountRoute);
app.use("/major", MajorRoute);
app.use("/presence", PresenceRoute);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server running in port http://localhost:${process.env.PORT}`);
});
