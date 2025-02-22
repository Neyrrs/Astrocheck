import { useEffect, useState } from "react";
import SearchPack from "../../SearchPack/SearchPack";
import axios from "axios";

const ManajemenAbsen = () => {
  const [presences, setpresences] = useState([]);
  useEffect(() => {
    const fetchUsersPresence = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get("http://localhost:3000/Presence/allUsersPresence", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setpresences(response.data);
      } catch (error) {
        console.error("Gagal mengambil data presensi:", error);
      }
    };

    fetchUsersPresence();
  }, []);

  const tablePadding = "p-[10px]";

  return (
    <div className="h-screen">
      <div className="relative w-[full] h-[80px]">
        <div className="absolute w-80 top-5 right-0">
          <SearchPack width="fit" />
        </div>
      </div>
      <div className="overflow-scroll border-t-2 border-spacing-9 py-5 border-slate-400">
        <table className="w-full border-collapse">
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
            {presences.map((data, index) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManajemenAbsen;
