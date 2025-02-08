import { useState } from "react";
import { Input } from "../../Elements/Inputs";
import { LoginButton } from "../../Elements/Buttons";
import axios from "axios";
import Swal from "sweetalert2";

const CardLoginForm = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login button clicked!");
    console.log("Username:", Username);
    console.log("Password:", Password);
    try {
      const response = await axios.post(
        "http://localhost:3000/Accounts/login",
        {
          Username,
          Password,
        }
      );
      console.log("response:", response);
      localStorage.setItem("Token", true);
      Swal.fire({
        title: "Login berhasil!",
        text: `Selamat datang, ${Username}!`,
        icon: "success",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.log("error:", error);
      Swal.fire({
        title: "Gagal!",
        text: "Username atau password salah!",
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
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="block text-sm">Password</label>
              <Input
                type="password"
                placeholder="Password anda"
                value={Password}
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
