import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CardForm = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/Accounts/login", {
        Username,
        Password,
      });
      localStorage.setItem("Token", true); 
      Swal.fire({
        title: "Login berhasil!",
        text: `Selamat datang, ${Username}!`,
        icon: "success",
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Username atau password salah!",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-[#F0F0F0] shadow-2xl w-[27rem] h-[30rem] rounded-md py-14 flex justify-center">
      <div>
        <div className="flex text-center">
          <label className="text-2xl w-full font-semibold text-center">
            Login
          </label>
        </div>
        <div className="mt-8 w-[18rem]">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Masukkan Username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md"
              placeholder="Masukkan Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-7">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
