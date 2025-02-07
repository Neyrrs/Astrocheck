import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./Routes/PresenceRoute.js";
import AccountRoute from "./Routes/AccountRoute.js";

mongoose
  .connect("mongodb://localhost:27017/Astrocheck")
  .then(() => console.log("Koneksi berhasil ke database!"))
  .catch((err) => console.error("Koneksi gagal:", err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(AccountRoute);

app.listen(3000, () => {
  console.log(`Server running in port http://localhost:3000`);
});
