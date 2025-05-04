"use client";

import { useState } from "react";
import Navbar from "@/Components/Fragments/Navigation-bar/Navbar";
import { useAllPresence } from "@/Hooks/usePresence.js";
import PresenceTableWrapper from "@/Components/Fragments/Table/PresenceTableWrapper";

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

  const historyColumns = [
    { header: "ID", field: "__index" },
    { header: "Nama Lengkap", field: "fullName" },
    { header: "Tanggal Presensi", field: "date" },
    { header: "Waktu Masuk", field: "time" },
    { header: "Alasan", field: "reason" },
    { header: "Spesifik Alasan", field: "detailReason" },
  ];

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

        <div className="border-1 border-[#e5e5e5] py-3 mb-2 gap-5 flex flex-col rounded-2xl">
         
            <PresenceTableWrapper
              data={filteredData}
              columns={historyColumns}
              loading={false}
              error={error}
              itemsPerPage={5}
            />
        </div>
      </div>
    </div>
  );
};

export default History;
