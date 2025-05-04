import SearchPack from "@/Components/Fragments/SearchPack/SearchPack";
import { useAllPresence } from "@/Hooks/usePresence";
import PresenceTableWrapper from "../../Table/PresenceTableWrapper";

const ManajemenAbsen = () => {
  const { allPresences } = useAllPresence();
  const presences = allPresences?.data;
  if (!presences) return null;
  console.log("presences", presences);
  
  const tablePadding = "p-[10px]";
  const historyColumns = [
    { header: "ID", field: "__index" },
    { header: "Nama Lengkap", field: "fullName" },
    { header: "Tanggal Presensi", field: "date" },
    { header: "Waktu Masuk", field: "time" },
    { header: "Alasan", field: "reason" },
    { header: "Spesifik Alasan", field: "detailReason" },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Manajemen Absen</h1>
        <SearchPack placeholder="Search" />
      </div>
      <div
        className={`w-full h-full ${tablePadding} bg-white rounded-lg shadow-md`}
      >
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
