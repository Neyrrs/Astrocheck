import { useAllPresence } from "@/Hooks/usePresence";
import { useDashboardContext } from "@/context/DashboardContext";
import { useItemContext } from "@/context/ItemContext";
import PresenceTableWrapper from "@/Components/Fragments/Table/PresenceTableWrapper";
import CardSummary from "./CardSummary";
import { PrimaryButton } from "@/Components/Elements/Buttons";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
import { useState } from "react";

const ManajemenPresensi = () => {
  const { summary, allPresences } = useAllPresence();
  const { setActiveContent } = useDashboardContext();
  const { setSelectedItem } = useItemContext();
  const [refreshKey, setRefreshKey] = useState(0);

  const presences = allPresences?.presence;
  if (!presences) return null;

  const handleEdit = (row) => {
    setSelectedItem(row);
    setActiveContent("Edit Presensi");
  };

  const historyColumns = [
    { header: "ID", field: "__index" },
    { header: "Nama Lengkap", field: "fullname" },
    { header: "Tanggal Presensi", field: "date" },
    { header: "Waktu Masuk", field: "time" },
    { header: "Alasan", field: "reason" },
    { header: "Spesifik Alasan", field: "detail_reason" },
    {
      header: "Aksi",
      render: (row) => (
        <div className="flex flex-row gap-2 text-base">
          <button
            onClick={() => handleEdit(row)}
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            <svg
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.34601 9.63357L4.35561 7.10957C4.51653 6.70748 4.75739 6.34224 5.06361 6.03597L10.5996 0.501573C10.9179 0.183313 11.3495 0.0045166 11.7996 0.0045166C12.2497 0.0045166 12.6813 0.183313 12.9996 0.501573C13.3179 0.819833 13.4967 1.25149 13.4967 1.70157C13.4967 2.15166 13.3179 2.58331 12.9996 2.90157L7.46361 8.43597C7.15721 8.74237 6.79161 8.98397 6.38921 9.14477L3.86601 10.1544C3.79332 10.1835 3.71369 10.1906 3.63698 10.1749C3.56028 10.1591 3.48989 10.1212 3.43452 10.0659C3.37916 10.0105 3.34126 9.9401 3.32552 9.8634C3.30979 9.7867 3.31691 9.70706 3.34601 9.63437V9.63357Z"
                fill="#4E68E3"
              />
              <path
                d="M1.79961 3.09997C1.79961 2.54797 2.24761 2.09997 2.79961 2.09997H6.99961C7.15874 2.09997 7.31135 2.03676 7.42387 1.92424C7.5364 1.81172 7.59961 1.6591 7.59961 1.49997C7.59961 1.34084 7.5364 1.18823 7.42387 1.07571C7.31135 0.963187 7.15874 0.899973 6.99961 0.899973H2.79961C2.21613 0.899973 1.65655 1.13176 1.24397 1.54434C0.831394 1.95692 0.599609 2.5165 0.599609 3.09997V10.7C0.599609 11.2834 0.831394 11.843 1.24397 12.2556C1.65655 12.6682 2.21613 12.9 2.79961 12.9H10.3996C10.9831 12.9 11.5427 12.6682 11.9552 12.2556C12.3678 11.843 12.5996 11.2834 12.5996 10.7V6.49997C12.5996 6.34084 12.5364 6.18823 12.4239 6.07571C12.3114 5.96319 12.1587 5.89997 11.9996 5.89997C11.8405 5.89997 11.6879 5.96319 11.5753 6.07571C11.4628 6.18823 11.3996 6.34084 11.3996 6.49997V10.7C11.3996 11.252 10.9516 11.7 10.3996 11.7H2.79961C2.24761 11.7 1.79961 11.252 1.79961 10.7V3.09997Z"
                fill="#4E68E3"
              />
            </svg>
            Edit
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-red-600 hover:underline flex items-center gap-1"
          >
            <svg
              width="12"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.99968 0.300049C4.41621 0.300049 3.85663 0.531834 3.44405 0.944414C3.03147 1.35699 2.79968 1.91657 2.79968 2.50005V2.85445C2.16368 2.91605 1.53248 2.99525 0.907683 3.09285C0.828682 3.10361 0.752618 3.13001 0.683936 3.17051C0.615254 3.211 0.555332 3.26478 0.507671 3.3287C0.460011 3.39261 0.425567 3.46539 0.406354 3.54277C0.38714 3.62015 0.383542 3.70059 0.39577 3.77937C0.407997 3.85816 0.435805 3.93372 0.477568 4.00164C0.519331 4.06956 0.574213 4.12847 0.639004 4.17494C0.703796 4.2214 0.777199 4.25449 0.854924 4.27226C0.932648 4.29003 1.01314 4.29214 1.09168 4.27845L1.21088 4.26085L1.88368 12.6752C1.92773 13.2266 2.17784 13.7411 2.58421 14.1164C2.99058 14.4916 3.52337 14.7 4.07648 14.7H7.92208C8.4752 14.7002 9.00809 14.492 9.41461 14.1169C9.82112 13.7418 10.0714 13.2274 10.1157 12.676L10.7885 4.26005L10.9077 4.27845C11.0634 4.29967 11.2213 4.25891 11.3473 4.16494C11.4734 4.07097 11.5575 3.9313 11.5816 3.77596C11.6057 3.62062 11.5679 3.46202 11.4762 3.33427C11.3846 3.20653 11.2465 3.11984 11.0917 3.09285C10.4635 2.99508 9.83252 2.91557 9.19968 2.85445V2.50005C9.19968 1.91657 8.9679 1.35699 8.55532 0.944414C8.14274 0.531834 7.58316 0.300049 6.99968 0.300049H4.99968ZM5.99968 2.70005C6.67168 2.70005 7.33808 2.72005 7.99968 2.76005V2.50005C7.99968 1.94805 7.55168 1.50005 6.99968 1.50005H4.99968C4.44768 1.50005 3.99968 1.94805 3.99968 2.50005V2.76005C4.66128 2.72005 5.32768 2.70005 5.99968 2.70005ZM4.86368 5.67605C4.85732 5.51692 4.788 5.36684 4.67098 5.25881C4.55395 5.15079 4.39881 5.09368 4.23968 5.10005C4.08055 5.10641 3.93047 5.17573 3.82245 5.29276C3.71443 5.40978 3.65732 5.56492 3.66368 5.72405L3.90368 11.724C3.90683 11.8028 3.92547 11.8802 3.95854 11.9518C3.9916 12.0234 4.03844 12.0878 4.09639 12.1413C4.15433 12.1948 4.22224 12.2363 4.29625 12.2636C4.37025 12.2908 4.44889 12.3032 4.52768 12.3C4.60648 12.2969 4.68388 12.2783 4.75547 12.2452C4.82705 12.2121 4.89143 12.1653 4.94492 12.1073C4.9984 12.0494 5.03995 11.9815 5.06719 11.9075C5.09444 11.8335 5.10683 11.7548 5.10368 11.676L4.86368 5.67605ZM8.33568 5.72405C8.33883 5.64526 8.32644 5.56661 8.29919 5.49261C8.27195 5.41861 8.2304 5.3507 8.17692 5.29276C8.12343 5.23481 8.05905 5.18797 7.98747 5.15491C7.91588 5.12184 7.83848 5.1032 7.75968 5.10005C7.60055 5.09368 7.44541 5.15079 7.32839 5.25881C7.21137 5.36684 7.14205 5.51692 7.13568 5.67605L6.89568 11.676C6.89253 11.7548 6.90493 11.8335 6.93217 11.9075C6.95941 11.9815 7.00096 12.0494 7.05445 12.1073C7.10793 12.1653 7.17231 12.2121 7.2439 12.2452C7.31549 12.2783 7.39289 12.2969 7.47168 12.3C7.55048 12.3032 7.62912 12.2908 7.70312 12.2636C7.77712 12.2363 7.84503 12.1948 7.90298 12.1413C7.96092 12.0878 8.00776 12.0234 8.04083 11.9518C8.07389 11.8802 8.09253 11.8028 8.09568 11.724L8.33568 5.72405Z"
                fill="#DC2626"
              />
            </svg>
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
          <p className="font-bold text-xl">Kehadiran</p>
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

export default ManajemenPresensi;
