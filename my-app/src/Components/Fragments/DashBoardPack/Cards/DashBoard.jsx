"use client";

import { LineChart } from "@/Components/Fragments/DashBoardPack/Charts";
import { useAllPresence } from "@/Hooks/usePresence";
import { CardLainnya, CardMembaca, CardMeminjam } from "./CardPresences";
import ProfileImage from "@/Components/Elements/Icons/ProfileImage";
import PresenceTableWrapper from "@/Components/Fragments/Table/PresenceTableWrapper";
import { useEffect, useState } from "react";
import { useAllProfiles } from "@/Hooks/useProfile";

const DashBoardPack = () => {
  const { user } = useAllProfiles();
  const { fullYear, allPresences } = useAllPresence();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentDate, setCurrentDate] = useState("");

  const fullYearData = fullYear?.logsPerMonth?.map((item) => item.count) ?? [];

  useEffect(() => {
    const date = new Date();
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(
      date
    );
    setCurrentDate(formattedDate);
  }, []);
  const LineChartData = {
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [{ label: "Absen Bulanan", data: fullYearData }],
  };

  const dashboardColumns = [
    { header: "ID", field: "__index" },
    { header: "Nama Lengkap", field: "fullname" },
    { header: "Kelas", field: "grade" },
    { header: "Jurusan", field: "major" },
    { header: "Tanggal Presensi", field: "date" },
    { header: "Alasan", field: "reason" },
    { header: "Spesifik Alasan", field: "detail_reason" },
  ];

  return (
    <div>
      <div className="dashboard-container flex-col gap-5 flex bg-[#f0f0f0]">
        <div className="flex w-full flex-row gap-5">
          <div className="bg-white w-full h-25 gap-3 flex flex-row items-center rounded-xl px-5 ">
            <ProfileImage size="w-12 h-12" className="rounded-full" />
            <div className="h-fit w-fit">
              <p className="text-lg font-semibold">Welcome</p>
              <p className="text-slate-500 text-sm">{user?.fullname}</p>
            </div>
          </div>
          <div className="bg-white w-full h-25 gap-3 flex flex-row items-center justify-between rounded-xl px-5 ">
            <div className="h-fit w-fit flex flex-col gap-2">
              <p className="text-lg font-semibold">Dashboard Admin Panel</p>
              <p className="text-slate-500 text-sm">{currentDate}</p>
            </div>
            <svg
              width="71"
              height="52"
              viewBox="0 0 71 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2151_5100)">
                <path
                  d="M35.5186 51.9245C36.7844 51.9245 37.8106 50.9219 37.8106 49.6852C37.8106 48.4484 36.7844 47.4458 35.5186 47.4458C34.2527 47.4458 33.2266 48.4484 33.2266 49.6852C33.2266 50.9219 34.2527 51.9245 35.5186 51.9245Z"
                  fill="#A6CCFF"
                />
                <path
                  d="M35.5162 13.5382C39.3199 13.5382 42.4035 10.5248 42.4035 6.80755C42.4035 3.09032 39.3199 0.0769043 35.5162 0.0769043C31.7124 0.0769043 28.6289 3.09032 28.6289 6.80755C28.6289 10.5248 31.7124 13.5382 35.5162 13.5382Z"
                  fill="#A6CCFF"
                />
                <path
                  d="M57.5371 14.964L63.9299 12.522L62.3987 17.9233L54.3999 46.1305L51.7148 44.5215L57.5371 14.964Z"
                  fill="#BED8FF"
                />
                <path
                  d="M62.1512 18.7969H70.9487L55.9599 47.9924L54.4004 46.1304L62.1512 18.7969Z"
                  fill="#DAE8FF"
                />
                <path
                  d="M13.4905 14.964L7.09766 12.522L8.62895 17.9233L16.6277 46.1305L19.3128 44.5215L13.4905 14.964Z"
                  fill="#BED8FF"
                />
                <path
                  d="M8.8776 18.7969H0.0800781L15.069 47.9924L16.6284 46.1304L8.8776 18.7969Z"
                  fill="#DAE8FF"
                />
                <path
                  d="M39.6728 17.2621L35.5156 24.742V33.6379C36.8185 32.6864 38.3217 32.0403 39.9123 31.748C41.6452 31.4328 43.4295 31.5417 45.1105 32.0653C43.3734 31.8723 41.6149 32.053 39.9545 32.5951C38.3009 33.1363 36.786 34.0288 35.5156 35.2105V37.2863C36.8186 36.3353 38.3218 35.6897 39.9123 35.3978C41.6452 35.0819 43.4297 35.1908 45.1105 35.7151C43.3735 35.5207 41.6148 35.7009 39.9545 36.2435C38.3007 36.7851 36.7859 37.6781 35.5156 38.8603V40.9291C36.8186 39.9781 38.3218 39.3324 39.9123 39.0406C41.6452 38.7247 43.4297 38.8336 45.1105 39.3579C43.3735 39.1635 41.6148 39.3437 39.9545 39.8863C38.3012 40.4281 36.7865 41.3206 35.5156 42.5017V49.6852C35.8861 48.9709 37.8696 45.3351 42.4452 43.845C47.1165 42.3227 51.0088 44.1707 51.716 44.5215L58.8202 8.45703L39.6728 17.2621Z"
                  fill="#A6CCFF"
                />
                <path
                  d="M31.117 31.7522C32.7079 32.0448 34.2115 32.6909 35.515 33.6421V24.742L31.3564 17.2579L12.209 8.45142L19.3132 44.5159C20.0176 44.1651 23.9141 42.3171 28.5841 43.8394C33.1596 45.3295 35.1431 48.9653 35.515 49.6796V42.5016C34.2405 41.3195 32.7224 40.4262 31.0658 39.8834C29.4092 39.3406 27.6535 39.1613 25.9202 39.3579C27.5315 38.8522 29.2403 38.731 30.9078 39.004C32.5752 39.277 34.1542 39.9366 35.5164 40.929V38.8602C34.2451 37.6791 32.7299 36.7866 31.0761 36.2449C29.4159 35.7023 27.6571 35.5221 25.9202 35.7165C27.5315 35.2108 29.2403 35.0896 30.9078 35.3626C32.5752 35.6356 34.1542 36.2952 35.5164 37.2877V35.2146C34.2451 34.0335 32.7299 33.141 31.0761 32.5993C29.4158 32.0571 27.6572 31.8765 25.9202 32.0695C27.6007 31.5461 29.3845 31.4372 31.117 31.7522Z"
                  fill="#A6CCFF"
                />
                <path
                  d="M34.7168 41.8251L35.5155 49.6852C35.7804 47.0647 36.0457 44.4432 36.3115 41.8209L35.5113 42.4946L34.7168 41.8251Z"
                  fill="#A6CCFF"
                />
                <path
                  d="M34.709 34.5297L35.5148 37.2905L36.3178 34.5297L35.5148 35.2147L34.709 34.5297Z"
                  fill="#A6CCFF"
                />
                <path
                  d="M34.7207 38.1864L35.5152 40.929L36.3154 38.1823L35.5152 38.8602L34.7207 38.1864Z"
                  fill="#A6CCFF"
                />
                <path
                  d="M33.1016 24.1493L25.9199 32.0695V39.3579L35.512 46.28L45.1096 39.3579L45.1082 32.0695L37.9265 24.1493L35.5134 33.6658L33.1016 24.1493Z"
                  fill="#A6CCFF"
                />
                <path
                  d="M31.3574 17.2621C32.7427 22.7305 34.1284 28.1984 35.5146 33.6658L39.6732 17.2621C38.287 19.7577 36.9012 22.251 35.516 24.742L31.3574 17.2621Z"
                  fill="#BED8FF"
                />
              </g>
              <defs>
                <clipPath id="clip0_2151_5100">
                  <rect width="71" height="52" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flex flex-row items-center w-full gap-10">
          {[CardMembaca, CardMeminjam, CardLainnya].map((Card, index) => (
            <div key={index} className="w-full flex gap-5">
              <Card />
            </div>
          ))}
        </div>
        <div className="bg-white w-full h-80 rounded-lg px-20 py-10">
          <LineChart
            data={LineChartData?.datasets[0]?.data}
            labels={LineChartData?.labels}
            label={LineChartData?.datasets[0]?.label}
          />
        </div>
        <div className="w-full h-fit bg-white rounded-xl pb-5 flex-col flex gap-3">
          <div className="px-5 w-full h-fit flex items-center py-5 border-b-2 border-slate-300">
            <p className="font-semibold text-xl">Terakhir Absen</p>
          </div>
          <PresenceTableWrapper
            data={allPresences?.presence}
            columns={dashboardColumns}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalPages={Math.ceil((allPresences?.presence?.length || 0) / itemsPerPage)}
            onPageChange={setCurrentPage}
            onPerPageChange={setItemsPerPage}
            loading={!allPresences}
            error={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardPack;
