import { useAllMajors } from "@/Hooks/useMajor";
import { useDashboardContext } from "@/context/DashboardContext";
import { useItemContext } from "@/context/ItemContext";
import PresenceTableWrapper from "@/Components/Fragments/Table/PresenceTableWrapper";
import { PrimaryButton } from "@/Components/Elements/Buttons";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
import { useState } from "react";
// TODO PAGINATION SESUAI DENGAN RESPONSE DARI BE-NYA

const ManajemenJurusan = () => {
  const { setActiveContent } = useDashboardContext();
  const { setSelectedItem } = useItemContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, totalPages, loading, error } = useAllMajors(
    currentPage,
    itemsPerPage
  );

  const handleEdit = (row) => {
    setSelectedItem(row);
    setActiveContent("Edit Jurusan");
  };

  const handleDelete = async (row) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: `Jurusan dengan nama ${row.major_name} akan dihapus.`,
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
        await axios.delete(`${backendUrl}/major/${row.id_major}`, {
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
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Gagal menghapus data.",
        });
      }
    }

    setActiveContent("Manajemen Jurusan");
  };

  const columns = [
    { header: "ID", field: "__index" },
    { header: "Nama Jurusan", field: "major_fullname" },
    { header: "Panggilan Jurusan", field: "major_name" },
    { header: "Durasi", field: "duration" },
    {
      header: "",
      render: (row) => (
        <div className="flex flex-row gap-2 text-base">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            {/* SVG Edit */}
            Edit
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-600 hover:underline flex items-center gap-1"
          >
            {/* SVG Delete */}
            Hapus
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <div className="flex w-full flex-row justify-between gap-5">
        <div className="w-fit h-fit flex items-center">
          <p className="font-bold text-3xl">Jurusan</p>
        </div>
        <PrimaryButton
          onClick={() => setActiveContent("Buat Jurusan")}
          text="Tambah Jurusan"
        />
      </div>

      <div className="w-full h-fit py-2 bg-white shadow-md rounded-xl flex-col flex gap-1">
        <PresenceTableWrapper
          key={refreshKey}
          data={data}
          columns={columns}
          totalPages={totalPages}
          loading={loading}
          error={!!error}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          onPerPageChange={(perPage) => {
            setItemsPerPage(perPage);
            setCurrentPage(1);
          }}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default ManajemenJurusan;
