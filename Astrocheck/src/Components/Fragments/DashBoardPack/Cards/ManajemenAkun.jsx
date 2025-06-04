"use client";

import { useAllPresence } from "@/Hooks/usePresence";
import { useDashboardContext } from "@/context/DashboardContext";
import { useItemContext } from "@/context/ItemContext";
import PresenceTableWrapper from "@/Components/Fragments/Table/PresenceTableWrapper.tsx";
import CardSummary from "./CardSummary.jsx";
import { PrimaryButton } from "@/Components/Elements/Buttons";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
import { useState } from "react";
import { useAllProfiles } from "@/Hooks/useProfile.js";
import Image from "next/image.js";

const ManajemenAkun = () => {
  const { summary, allPresences } = useAllPresence();
  const { setActiveContent } = useDashboardContext();
  const { setSelectedItem } = useItemContext();
  const [refreshKey, setRefreshKey] = useState(0);
  const { users: rawUsers } = useAllProfiles();

  const users = rawUsers?.map((user) => ({
    ...user,
    id: user._id,
  }));
  const presences = allPresences?.presence;
  if (!presences) return null;

  const handleEdit = (row) => {
    const userWithId = { ...row, id: row._id };
    setSelectedItem(userWithId); 
    setActiveContent("Edit Akun");
  };

  const historyColumns = [
    { header: "ID", field: "__index" },
    { header: "NIS", field: "nis" },
    { header: "Role", field: "role" },
    { header: "Nama Lengkap", field: "fullName" },
    { header: "Kelas", field: "grade" },
    { header: "Angkatan", field: "generation" },
    { header: "Status", field: "status" },
    {
      header: "Jurusan",
      render: (row) => row?.idMajor?.major_name ?? "-",
    },
    {
      header: "Profile",
      render: (row) =>
        row?.profilePicture?.secure_url ? (
          <Image
            src={row.profilePicture.secure_url}
            alt="Profile"
            width={50}
            height={50}
          />
        ) : (
          "-"
        ),
    },
    {
      header: "Aksi",
      render: (row) => (
        <div className="flex flex-row gap-2 text-base">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-600 hover:underline"
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (row) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: `Akun dengan nama ${row.fullName} akan dihapus.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        await axios.delete(`${backendUrl}/user/${row?._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Dihapus!",
          text: "Data berhasil dihapus.",
          toast: true,
          timer: 3000,
          position: "top-end",
          showConfirmButton: false,
          timerProgressBar: true,
        });
        setRefreshKey((prev) => prev + 1);
      } catch (error) {
        console.error("Error axiosnya",error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Gagal menghapus data.",
        });
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex w-full flex-row justify-end gap-5">
        <PrimaryButton
          onClick={() => setActiveContent("Buat Akun")}
          text="Tambah Akun"
        />
      </div>
      <div className="flex w-full flex-row gap-5">
        <CardSummary title={"Presensi Hari ini"} data={summary?.daily?.count} />
        <CardSummary
          title={"Presensi Bulan ini"}
          data={summary?.monthly?.count}
        />
        <CardSummary
          title={"Presensi Tahun ini"}
          data={summary?.yearly?.count}
        />
      </div>
      <div className="w-full h-fit bg-white shadow-md rounded-xl pb-5 flex-col flex gap-3">
        <div className="px-5 w-full h-fit flex items-center py-5 border-b-1 border-gray-300">
          <p className="font-bold text-xl">Terakhir Absen</p>
        </div>
        <PresenceTableWrapper
          key={refreshKey}
          data={users ?? []}
          columns={historyColumns}
          loading={false}
          itemsPerPage={5}
        />
      </div>
    </div>
  );
};

export default ManajemenAkun;
