import Navbar from "../../Components/Fragments/Navigation-bar/Navbar.jsx";
import SearchPack from "../../Components/Fragments/SearchPack/SearchPack.jsx";
import { useState } from "react";

const Login = () => {
  let numberList = 1;
  const data = [
    {
      id: 1,
      nama: "Biru Kheza Maharley",
      jamMasuk: "08:00",
      jamKeluar: "17:00",
      alasan: "Membaca",
      tanggal: "2024-11-01",
    },
    {
      id: 2,
      nama: "Biru Kheza Maharley",
      jamMasuk: "08:00",
      jamKeluar: "17:00",
      alasan: "Meminjam",
      tanggal: "2024-11-01",
    },
    {
      id: 3,
      nama: "Biru Kheza Maharley",
      jamMasuk: "08:00",
      jamKeluar: "17:00",
      alasan: "Membaca",
      tanggal: "2024-11-02",
    },
    {
      id: 4,
      nama: "Biru Kheza Maharley",
      jamMasuk: "08:00",
      jamKeluar: "17:00",
      alasan: "Lainnya",
      tanggal: "2024-11-03",
    },
  ];

  const [filter, setFilter] = useState("All");
  const filteredData =
    filter === "All" ? data : data.filter((item) => item.alasan === filter);

  return (
    <div>
      <Navbar />
      <div className="title-bg mt-14 h-20 px-14 flex w-full items-center">
        <p className="text-black text-xl">Riwayat Absen</p>
      </div>
      <div className="px-14">
        <div className="relative w-full h-[80px]">
          <div className="absolute w-80 top-5 right-0">
            <SearchPack width="fit" />
          </div>
        </div>
        <div className="border-b-2 gap-10 flex py-2 px-5">
          <button onClick={() => setFilter("All")}>All ({data.length})</button>
          <button onClick={() => setFilter("Membaca")}>
            Membaca ({data.filter((item) => item.alasan === "Membaca").length})
          </button>
          <button onClick={() => setFilter("Meminjam")}>
            Meminjam ({data.filter((item) => item.alasan === "Meminjam").length}
            )
          </button>
          <button onClick={() => setFilter("Lainnya")}>
            Lainnya ({data.filter((item) => item.alasan === "Lainnya").length})
          </button>
        </div>
        <div className="mt-5">
          <div className="flex px-5 mb-5 text-gray-500">
            <p className="mr-[2rem] w-2">ID</p>
            <p className="mr-[22rem]">Nama</p>
            <p className="mr-[8.5rem]">Tanggal Absen</p>
            <p className="mr-[6rem]">Jam Masuk</p>
            <p className="mr-[8.5rem]">Jam Keluar</p>
            <p>Alasan</p>
          </div>
          {filteredData.map((item) => (
            <div key={item.id} className="border-b border-t py-2 px-5 flex">
              <p className="mr-[2rem] w-2">{numberList++}</p>
              <p className="mr-[15rem]">{item.nama}</p>
              <p className="mr-[10rem] w-24">{item.tanggal}</p>
              <p className="mr-[10rem] w-10">{item.jamMasuk}</p>
              <p className="mr-[11rem] w-10">{item.jamKeluar}</p>
              <p className="text-left">{item.alasan}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
