import { useState, useEffect } from "react";
import SearchPack from "../../SearchPack/SearchPack";
import axios from "axios";

const ManajemenAkun = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get("http://localhost:3000/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Gagal mengambil data presensi:", error);
      }
    };

    fetchUsers();
  }, []);

  const tablePadding = "p-[10px]";

  return (
    <div className="h-fit">
      <div className="relative w-full h-[80px]">
        <div className="absolute w-80 top-5 right-0">
          <SearchPack width="fit" />
        </div>
      </div>
      <div className="overflow-scroll border-t-2 border-spacing-9 py-5 h-screen border-slate-400">
        <table className="w-full border-collapse">
          <thead>
            <tr className="whitespace-nowrap pb-5 text-gray-500 text-base">
              <td className={tablePadding}>ID</td>
              <td className={tablePadding}>NISN</td>
              <td className={tablePadding}>Nama Lengkap</td>
              <td className={tablePadding}>Nama Tampilan</td>
              <td className={tablePadding}>Kelas</td>
              <td className={tablePadding}>Jurusan</td>
              <td className={tablePadding}>Email</td>
              <td className={tablePadding}>Password</td>
            </tr>
          </thead>
          <tbody>
            {users.map((data, index) => (
              <tr
                key={index}
                className={`whitespace-nowrap ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"
                }`}
              >
                { users.role === "admin" ? "" :
                  <>
                    <td className={`${tablePadding} text-center`}>
                      {index + 1}
                    </td>
                    <td className={tablePadding}>{data.nisn}</td>
                    <td className={tablePadding}>{data.fullName}</td>
                    <td className={tablePadding}>{data.nickname || "None"}</td>
                    <td className={`${tablePadding} text-center`}>
                      {data.kelas || "Admin"}
                    </td>
                    <td className={tablePadding}>{data.jurusan || "None"}</td>
                    <td className={`${tablePadding} text-left`}>
                      {data.email || "None"}
                    </td>
                    <td className={`${tablePadding} text-left`}>
                      *****
                    </td>
                  </>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManajemenAkun;
