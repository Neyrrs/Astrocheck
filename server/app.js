import express from "express";
import cors from "cors";
import PresenceRoute from "./Routes/PresenceRoute.js";
import AccountRoute from "./Routes/AccountRoute.js";
import MajorRoute from "./Routes/MajorRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", AccountRoute);
app.use("/major", MajorRoute);
app.use("/presence", PresenceRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running in port http://localhost:${process.env.PORT}`);
});
