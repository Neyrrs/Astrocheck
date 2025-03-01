import { useState } from "react";
import { LoginButton } from "../../../Elements/Buttons";
import { Input } from "../../../Elements/Inputs";
import Swal from "sweetalert2";
import axios from "axios";

const CardLoginFormGuest = () => {
  const [nisn, setNisn] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        nisn,
        password,
      });
      localStorage.setItem("Token", response.data.token);
      Swal.fire({
        title: "Login berhasil!",
        text: `Selamat datang, ${response.data.user.nickname}!`,
        icon: "success",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.log("error:", error);
      Swal.fire({
        title: "Gagal!",
        text: "NISN atau password salah!",
        icon: "error",
      });
    }
  };

  return (
    <div className="gap-5 flex flex-col">
      <div className="mt-8 w-[18rem]">
        <div>
          <label className="block text-sm">Username</label>
          <Input
            type="text"
            placeholder="Contoh: 123456789"
            value={nisn}
            onChange={(e) => setNisn(e.target.value)}
          />
          <label className="block text-sm">Password</label>
          <Input
            type="password"
            placeholder="Password anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <LoginButton onClick={handleLogin} text="Login" width="full" />
    </div>
  );
};

export default CardLoginFormGuest;
