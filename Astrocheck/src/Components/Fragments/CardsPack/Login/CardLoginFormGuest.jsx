import { useState } from 'react'
import { LoginButton } from '../../../Elements/Buttons';
import { Input } from '../../../Elements/Inputs';
import Swal from 'sweetalert2';
import axios from 'axios';

const CardLoginFormGuest = () => {
    const [nisn, setNisn] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          "http://localhost:3000/login",
          {
            nisn,
            password,
          }
        );
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
                <label className="block text-sm">Username</label>
                <Input
                  type="text"
                  placeholder="Contoh: 123456789"
                  value={username}
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
            <p className="text-center text-xs text-gray-500">Login sebagai Guru/pendatang</p>
          </div>
        </div>
      </div>
    );
}

export default CardLoginFormGuest