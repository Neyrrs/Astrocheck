import Navbar from "../../Components/Fragments/Navigation-bar/Navbar.jsx";
import SearchPack from "../../Components/Fragments/SearchPack/SearchPack.jsx";
import { useState } from "react";

const History = () => {
  const data = [
    { id: 1, nama: "Biru Kheza Maharley", jamMasuk: "08:00", jamKeluar: "17:00", alasan: "Membaca", tanggal: "2024-11-01" },
    { id: 2, nama: "Biru Kheza Maharley", jamMasuk: "08:00", jamKeluar: "17:00", alasan: "Meminjam", tanggal: "2024-11-01" },
    { id: 3, nama: "Biru Kheza Maharley", jamMasuk: "08:00", jamKeluar: "17:00", alasan: "Membaca", tanggal: "2024-11-02" },
    { id: 4, nama: "Biru Kheza Maharley", jamMasuk: "08:00", jamKeluar: "17:00", alasan: "Lainnya", tanggal: "2024-11-03" },
  ];

  const [filter, setFilter] = useState("All");
  const filteredData = filter === "All" ? data : data.filter((item) => item.alasan === filter);

  return (
    <div>
      <Navbar />
      <div className="title-bg mt-14 h-20 px-14 flex w-full items-center">
        <p className="text-black text-xl">Riwayat Absen</p>
      </div>
      <div className="px-14">
        <div className="relative w-full h-[80px]">
          <div className="absolute w-80 top-5 right-0">
            <SearchPack width="fit" />
          </div>
        </div>
        <div className="border-b-2 flex gap-10 py-2 px-5">
          {["All", "Membaca", "Meminjam", "Lainnya"].map((type) => (
            <button key={type} onClick={() => setFilter(type)}>
              {type} ({type === "All" ? data.length : data.filter((item) => item.alasan === type).length})
            </button>
          ))} 
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-500 border-b">
              {["ID", "Nama", "Tanggal Absen", "Jam Masuk", "Jam Keluar", "Alasan"].map((header, index) => (
                <th key={index} className="text-left font-light py-4 px-5">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-5">{index + 1}</td>
                <td className="py-2 px-5">{item.nama}</td>
                <td className="py-2 px-5">{item.tanggal}</td>
                <td className="py-2 px-5">{item.jamMasuk}</td>
                <td className="py-2 px-5">{item.jamKeluar}</td>
                <td className="py-2 px-5">{item.alasan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;