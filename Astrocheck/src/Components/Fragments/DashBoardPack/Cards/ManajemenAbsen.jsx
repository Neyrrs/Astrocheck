import { useAllPresence } from "@/Hooks/usePresence";
import PresenceTableWrapper from "../../Table/PresenceTableWrapper";
import CardSummary from "./CardSummary.jsx";
import { PrimaryButton } from "@/Components/Elements/Buttons";

const ManajemenAbsen = () => {
  const { allPresences } = useAllPresence();
  const presences = allPresences?.presence;
  if (!presences) return null;
  const historyColumns = [
    { header: "ID", field: "__index" },
    { header: "Nama Lengkap", field: "fullName" },
    { header: "Tanggal Presensi", field: "date" },
    { header: "Waktu Masuk", field: "time" },
    { header: "Alasan", field: "reason" },
    { header: "Spesifik Alasan", field: "detailReason" },
    { header: "", field: '<button>Delete</button>'},
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
      <div className="flex justify-between items-center w-full"></div>
      <div className="w-full h-fit bg-white rounded-xl pb-5 flex-col flex gap-3">
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
