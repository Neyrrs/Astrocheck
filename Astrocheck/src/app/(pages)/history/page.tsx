"use client";

import { useState } from "react";
import SearchPack from "@/Components/Fragments/SearchPack/SearchPack.jsx";
import { useAllPresence } from "@/Hooks/usePresence.js";
import AuthGuard from "@/Components/AuthGuard/AuthGuard";

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
    <AuthGuard>
      <div className="title-bg mt-14 h-20 px-14 flex w-full items-center">
        <p className="text-black text-xl">Riwayat Absen</p>
      </div>
      <div className="px-14">
        <div className="relative w-full h-[80px]">
          <div className="absolute w-72 top-5 right-0">
            <SearchPack width="fit" />
          </div>
        </div>

        <div className="border-b-2 border-gray-300 flex gap-5 py-3 px-5">
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
        <table className="w-full border-collapse mt-2">
          <thead>
            <tr className="text-gray-500 border-b">
              {[
                "ID",
                "Nama",
                "Tanggal Absen",
                "Jam Masuk",
                "Alasan",
                "Detail Alasan"
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
                  <td className="py-2 px-5">{item.alasan}</td>
                  <td className="py-2 px-5">{item.detailAlasan}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  {error ? "Data tidak ditemukan" : "Loading..."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AuthGuard>
  );
};

export default History;
