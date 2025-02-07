import React from "react";

const DropdownKelas = ({ setKelas, kelas }) => {
  return (
    <select
      name="Kelas"
      id="Kelas"
      className="focus:border-[#6384E9] hover:border-[#6384E9] outline-none focus:shadow-md hover:shadow-md duration-150 ease-in text-gray-500 border-[2px] px-1 mb-2 py-[0.3rem] rounded-md text-xs w-full"
      value={kelas} // Menghubungkan state kelas
      onChange={(e) => setKelas(e.target.value)} // Update kelas saat dropdown berubah
    >
      <option value="">Pilih Kelas</option> {/* Tambahkan option default */}
      <option value="X">X</option>
      <option value="XI">XI</option>
      <option value="XII">XII</option>
      <option value="XIII">XIII</option>
    </select>
  );
};

export default DropdownKelas;
