import { useAllPresence } from "@/Hooks/usePresence";
import { useDashboardContext } from "@/context/DashboardContext";
import { usePresenceContext } from "@/context/PresenceContext";
import PresenceTableWrapper from "../../Table/PresenceTableWrapper";
import CardSummary from "./CardSummary.jsx";
import { PrimaryButton } from "@/Components/Elements/Buttons";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
import { useState } from "react"; 

const ManajemenAbsen = () => {
  const { allPresences } = useAllPresence();
  const { setActiveContent } = useDashboardContext();
  const { setSelectedPresence } = usePresenceContext();
  const [refreshKey, setRefreshKey] = useState(0);

  const presences = allPresences?.presence;
  if (!presences) return null;

  const handleEdit = (row) => {
    setSelectedPresence(row);
    setActiveContent("Edit Presensi");
  };

  const historyColumns = [
    { header: "ID", field: "__index" },
    { header: "Nama Lengkap", field: "fullName" },
    { header: "Tanggal Presensi", field: "date" },
    { header: "Waktu Masuk", field: "time" },
    { header: "Alasan", field: "reason" },
    { header: "Spesifik Alasan", field: "detailReason" },
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
      text: `Presensi ${row.fullName} pada ${row.date} akan dihapus.`,
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
        await axios.delete(`${backendUrl}/presence/${row.id}`, {
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
        console.error(error);
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
          onClick={() => setActiveContent("Buat Presensi")}
          text="Tambah Presensi"
        />
      </div>
      <div className="flex w-full flex-row gap-5">
        <CardSummary title={"Presensi Hari ini"} data={50} />
        <CardSummary title={"Presensi Bulan ini"} data={200} />
        <CardSummary title={"Presensi Tahun ini"} data={3220} />
      </div>
      <div className="w-full h-fit bg-white shadow-md rounded-xl pb-5 flex-col flex gap-3">
        <div className="px-5 w-full h-fit flex items-center py-5 border-b-1 border-gray-300">
          <p className="font-bold text-xl">Terakhir Absen</p>
        </div>
        <PresenceTableWrapper
          key={refreshKey}
          data={presences}
          columns={historyColumns}
          loading={false}
          itemsPerPage={5}
        />
      </div>
    </div>
  );
};

export default ManajemenAbsen;
