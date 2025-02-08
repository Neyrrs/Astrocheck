import express from "express";
import Account from "../Models/AccountSchema.js";

const router = express.Router();

router.post("/Accounts/login", async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const user = await Account.findOne({ Username, Password });

    if (!user) {
      return res.status(401).json({ message: "Username atau password salah!" });
    }

    res.json({ message: "Login berhasil!", user });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

export default router;
