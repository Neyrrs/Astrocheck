import Navbar from "../../Components/Fragments/Navigation-bar/Navbar.jsx";
import SearchPack from "../../Components/Fragments/SearchPack/SearchPack.jsx";
import { useState } from "react";
import {usePresence} from "../../Hooks/usePresence.js";

const History = () => {
  const { presence, loading } = usePresence();

  const [filter, setFilter] = useState("All");
  const presenceData = presence || [];
  const filteredData =
    filter === "All"
      ? presenceData
      : presenceData.filter((item) => item.alasan === filter);

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
              {type} (
              {type === "All"
                ? presenceData.length
                : presenceData.filter((item) => item.alasan === type).length}
              )
            </button>
          ))}
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-500 border-b">
              {[
                "ID",
                "Nama",
                "Tanggal Absen",
                "Jam Masuk",
                "Jam Keluar",
                "Alasan",
              ].map((header, index) => (
                <th key={index} className="text-left font-light py-4 px-5">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item.id || `presence-${index}`} className="border-b">
                  <td className="py-2 px-5">{index + 1}</td>
                  <td className="py-2 px-5">{item.fullName}</td>
                  <td className="py-2 px-5">{item.date}</td>
                  <td className="py-2 px-5">{item.time || "-"}</td>
                  <td className="py-2 px-5">{item.jamKeluar || "-"}</td>
                  <td className="py-2 px-5">{item.alasan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
