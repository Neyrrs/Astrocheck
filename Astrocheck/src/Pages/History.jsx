import Navbar from "../Components/Navbar";
import Input from "../Components/Elements/Inputs/Input";
import { useState } from "react";

const Login = () => {
  const data = [
    { id: 1, nama: "Biru Kheza Maharley", alasan: "Membaca", tanggal: "2024-11-01" },
    { id: 2, nama: "Biru Kheza Maharley", alasan: "Meminjam", tanggal: "2024-11-01" },
    { id: 3, nama: "Biru Kheza Maharley", alasan: "Membaca", tanggal: "2024-11-02" },
    { id: 4, nama: "Biru Kheza Maharley", alasan: "Lainnya", tanggal: "2024-11-03" },
  ];

  const [filter, setFilter] = useState("All");
  const filteredData =
    filter === "All" ? data : data.filter((item) => item.alasan === filter);

  return (
    <div>
      <Navbar />
      <div className="title-bg mt-14 h-20 px-14 flex w-full items-center">
        <p className="text-black text-xl">Riwayat Absen</p>
      </div>
      <div className="px-14">
        <div className="inputSearch h-20 flex items-center justify-end">
          <Input />
        </div>
        <div className="border-b-2 gap-10 flex py-2 px-5">
          <button onClick={() => setFilter("All")}>
            All ({data.length})
          </button>
          <button onClick={() => setFilter("Membaca")}>
            Membaca ({data.filter((item) => item.alasan === "Membaca").length})
          </button>
          <button onClick={() => setFilter("Meminjam")}>
            Meminjam ({data.filter((item) => item.alasan === "Meminjam").length})
          </button>
          <button onClick={() => setFilter("Lainnya")}>
            Lainnya ({data.filter((item) => item.alasan === "Lainnya").length})
          </button>
        </div>
        <div className="mt-5">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="border-b py-2 px-5 flex"
            >
              <p className="mr-[30rem]">{item.nama}</p>
              <p className="mr-auto">{item.tanggal}</p>
              <p>{item.alasan}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Login;
