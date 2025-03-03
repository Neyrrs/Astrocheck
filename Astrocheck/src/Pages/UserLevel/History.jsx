import { useState } from "react";
import Navbar from "@/Components/Fragments/Navigation-bar/Navbar.jsx";
import SearchPack from "@/Components/Fragments/SearchPack/SearchPack.jsx";
import { useAllPresence } from "../../Hooks/usePresence.js";

const History = () => {
  const { userPresence, error } = useAllPresence();
  const usePresenceArray = userPresence?.logs;
  const presenceArray = Array.isArray(usePresenceArray)
    ? usePresenceArray
    : usePresenceArray
    ? [usePresenceArray]
    : [];

  const [filter, setFilter] = useState("All");

  const filteredData =
    filter === "All"
      ? presenceArray
      : presenceArray.filter((item) => item.alasan === filter);

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

        <div className="border-b-2 flex gap-5 py-2 px-5">
          {["All", "Membaca", "Meminjam", "Lainnya"].map((type) => (
            <button key={type} onClick={() => setFilter(type)}>
              {type} (
              {type === "All"
                ? presenceArray.length
                : presenceArray.filter((item) => item.alasan === type).length}
              )
            </button>
          ))}
        </div>
        <table className="w-full border-collapse mt-4">
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
                <th key={index} className="text-left font-light py-2 px-5">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item._id || `presence-${index}`} className="border-b">
                  <td className="py-2 px-5">{index + 1}</td>
                  <td className="py-2 px-5">
                    {item.fullName || "Tidak diketahui"}
                  </td>
                  <td className="py-2 px-5">{item.date}</td>
                  <td className="py-2 px-5">{item.time || "-"}</td>
                  <td className="py-2 px-5">{"-"}</td>
                  <td className="py-2 px-5">{item.alasan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  {error ? "Data tidak ditemukan" : "Loading..."}
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
