import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import PresenceRoute from "./Routes/PresenceRoute.js";
import AccountRoute from "./Routes/AccountRoute.js";
import dotenv from "dotenv";
import helmet from "helmet";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Koneksi berhasil ke database!"))
  .catch((err) => console.error("Koneksi gagal:", err));

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(AccountRoute);
app.use("/presence", PresenceRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running in port http://localhost:${process.env.PORT}`);
});
