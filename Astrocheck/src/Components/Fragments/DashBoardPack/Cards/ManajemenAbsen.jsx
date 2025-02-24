import SearchPack from "../../SearchPack/SearchPack";
import { useAllPresence } from "../../../../Hooks/usePresence";

const ManajemenAbsen = () => {
  const {allPresences} = useAllPresence();
  const presences = allPresences?.presence;

  const tablePadding = "p-[10px]";

  return (
    <div className="h-fit">
      <div className="relative w-[full] h-[80px]">
        <div className="absolute w-80 top-5 right-0">
          <SearchPack width="fit" />
        </div>
      </div>
      <div className="overflow-scroll border-t-2 border-spacing-9 py-5 border-slate-400">
        <table className="w-full border-collapse h-fit">
          <thead>
            <tr className="whitespace-nowrap pb-5 text-gray-500 text-base ">
              <td className={tablePadding}>ID</td>
              <td className={tablePadding}>NISN</td>
              <td className={tablePadding}>Nama Lengkap</td>
              <td className={tablePadding}>Kelas</td>
              <td className={tablePadding}>Jurusan</td>
              <td className={tablePadding}>Tanggal Absen</td>
              <td className={tablePadding}>Waktu Masuk</td>
              <td className={tablePadding}>Waktu Keluar</td>
              <td className={tablePadding}>Keterangan</td>
            </tr>
          </thead>
          <tbody>
            {presences?.map((data, index) => (
              <tr
                key={index}
                className={`whitespace-nowrap ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"
                }`}
              >
                <td className={`${tablePadding} text-center`}>{index + 1}</td>
                <td className={tablePadding}>{data.nisn || "None"}</td>
                <td className={tablePadding}>{data.fullName || "None"}</td>
                <td className={tablePadding}>{data.kelas || "None"}</td>
                <td className={tablePadding}>{data.jurusan || "None"}</td>
                <td className={tablePadding}>{data.date || "None"}</td>
                <td className={tablePadding}>{data.time || "None"}</td>
                <td className={tablePadding}>{data.waktuKeluar || "None"}</td>
                <td className={tablePadding}>{data.alasan || "None"}</td>
              </tr>
            ))|| (<p>Loading...</p>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManajemenAbsen;
