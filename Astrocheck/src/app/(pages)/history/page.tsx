"use client";

import { useState } from "react";
import Navbar from "@/Components/Fragments/Navigation-bar/Navbar";
import SearchPack from "@/Components/Fragments/SearchPack/SearchPack.jsx";
import { useAllPresence } from "@/Hooks/usePresence.js";

const History = () => {
  const { userPresence, error } = useAllPresence();
  const usePresenceArray = userPresence?.logs;
  const presenceArray = Array.isArray(usePresenceArray)
    ? usePresenceArray
    : usePresenceArray
    ? [usePresenceArray]
    : [];

  const [filter, setFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData =
    filter === "All"
      ? presenceArray
      : presenceArray.filter((item) => item.alasan === filter);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const cardStyle =
    "border-2 border-[#e5e5e5] w-80 p-5 h-30 rounded-2xl flex flex-col gap-y-1";

  return (
    <div>
      <Navbar />
      <div className="title-bg mt-14 h-20 px-14 flex w-full items-center">
        <p className="text-black text-xl">Riwayat Absen</p>
      </div>
      <div className="px-14">
        <div className="flex py-5 flex-row w-full gap-x-5">
          <div className={cardStyle}>
            <h1 className="font-medium text-gray-500">Presensi hari ini</h1>
            <p className="text-4xl font-semibold">10:50</p>
          </div>
          <div className={cardStyle}>
            <h1 className="font-medium text-gray-500">Presensi bulan ini</h1>
            <p className="text-4xl font-semibold">12 Hari</p>
          </div>
          <div className={cardStyle}>
            <h1 className="font-medium text-gray-500">Presensi tahun ini</h1>
            <p className="text-4xl font-semibold">32 Hari</p>
          </div>
          <div className={cardStyle}>
            <h1 className="font-medium text-gray-500">Presensi streak</h1>
            <p className="text-4xl font-semibold">30🔥</p>
          </div>
        </div>

        <div className="border-1 border-[#e5e5e5] py-3 mb-2 flex flex-col rounded-2xl">
          <div className="relative w-full flex justify-end items-center h-fit px-5">
            <div className="w-60">
              <SearchPack width="fit" />
            </div>
          </div>

          <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="text-black border-[#e5e5e5] border-1 bg-[#fafafa]">
                {[
                  "ID",
                  "Nama Lengkap",
                  "Tanggal Presensi",
                  "Waktu Masuk",
                  "Alasan",
                  "Spesifik Alasan",
                ].map((header, index) => (
                  <th key={index} className="text-left font-bold py-3 px-5">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr
                    key={item._id || `presence-${index}`}
                    className="border-b font-normal border-y-2 border-[#e5e5e5]"
                  >
                    <td className="py-5 px-5">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="py-5 px-5">
                      {item.fullName || "Tidak diketahui"}
                    </td>
                    <td className="py-5 px-5">{item.date}</td>
                    <td className="py-5 px-5">{item.time || "-"}</td>
                    <td className="py-5 px-5">{item.alasan}</td>
                    <td className="py-5 px-5">{item.detailAlasan}</td>
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

          <div className="flex justify-between px-5 items-center mt-4">
            {currentPage != 1 && (
              <button
                onClick={handlePrev}
                className="px-4 py-1 bg-transparent text-black font-medium border-2 border-[#e5e5e5] rounded-md disabled:opacity-50"
              >
                Prev
              </button>
            )}

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage != totalPages && (
              <button
                onClick={handleNext}
                className="px-4 py-1 bg-transparent text-black font-medium border-2 border-[#e5e5e5] rounded-md disabled:opacity-50"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
