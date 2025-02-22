import { useState } from "react";
import { Input } from "../../../Elements/Inputs";
import { LoginButton } from "../../../Elements/Buttons";
import axios from "axios";
import Swal from "sweetalert2";

const CardLoginForm = () => {
  const [nisn, setNisn] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        nisn,
        password,
      });
  
      const token = response.data.token;
      localStorage.setItem("Token", token);
      const userData = response.data.user;
  
      Swal.fire({
        title: "Login berhasil!",
        text: `Selamat datang, ${userData.nickname || userData.fullName}!`,
        icon: "success",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "NISN atau password salah!",
        icon: "error",
      });
    }
  };
  

  return (
    <div className="bg-[#F0F0F0] shadow-2xl w-[25rem] h-fit rounded-lg pt-14 pb-20 flex justify-center">
      <div>
        <div className="flex text-center">
          <label className="text-[25px] w-full font-semibold text-center">
            Login
          </label>
        </div>
        <div className="gap-5 flex flex-col">
          <div className="mt-8 w-[18rem]">
            <div>
              <label className="block text-sm">NISN</label>
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
          <p className="text-center text-xs text-gray-500">Login sebagai siswa</p>
        </div>
      </div>
    </div>
  );
};

export default CardLoginForm;
