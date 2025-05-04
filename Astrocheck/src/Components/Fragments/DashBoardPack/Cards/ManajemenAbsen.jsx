import { useAllPresence } from "@/Hooks/usePresence";
import { useDashboardContext } from "@/context/DashboardContext";
import { usePresenceContext } from "@/context/PresenceContext";
import PresenceTableWrapper from "../../Table/PresenceTableWrapper";
import CardSummary from "./CardSummary.jsx";
import { PrimaryButton } from "@/Components/Elements/Buttons";

const ManajemenAbsen = () => {
  const { allPresences } = useAllPresence();
  const { setActiveContent } = useDashboardContext();
  const { setSelectedPresence } = usePresenceContext();

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
        <button
          onClick={() => handleEdit(row)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex w-full flex-row justify-end gap-5">
        <PrimaryButton link="/absen" text="Tambah Presensi" />
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
