"use client";

import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Input } from "@/Components/Elements/Inputs";
import { LoginButton } from "@/Components/Elements/Buttons";

const Login = () => {
  const [nisn, setNisn] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        {
          nisn,
          password,
        }
      );

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
    } catch (err) {
      Swal.fire({
        title: "Gagal!",
        text: "NISN atau password salah!",
        icon: "error",
      });
    }
  };

  return (
    <div className="Login w-full h-screen justify-center items-center flex">
      <form
        onSubmit={handleLogin}
        className="bg-[#F0F0F0] shadow-2xl w-[24rem] h-fit rounded-lg pt-14 pb-20 flex justify-center"
      >
        <div className="gap-5 flex flex-col">
          <div className="text-center">
            <label className="text-3xl font-semibold">Login</label>
          </div>
          <div className="mt-4 w-70">
            <div className="flex flex-col gap-1 w-full h-fit">
              <label className="block text-base">NISN</label>
              <Input
                type="text"
                placeholder="Contoh: 123456789"
                value={nisn}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNisn(e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1 w-full h-fit">
              <label className="block text-base">Password</label>
              <Input
                type="password"
                placeholder="Password anda"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
          </div>
          <LoginButton text="Login" width="full" />
        </div>
      </form>
    </div>
  );
};

export default Login;
