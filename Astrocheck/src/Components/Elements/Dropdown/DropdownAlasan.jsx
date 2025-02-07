import React from "react";

const DropdownAlasan = ({ setAlasan, alasan }) => {
  return (
    <select
      name="alasan"
      id="alasan"
      className="focus:border-[#6384E9] hover:border-[#6384E9] outline-none focus:shadow-md hover:shadow-md duration-150 ease-in text-gray-500 border-[2px] px-1 mb-2 py-[0.3rem] rounded-md text-xs w-full"
      value={alasan} // Menghubungkan state alasan
      onChange={(e) => setAlasan(e.target.value)} // Update alasan saat dropdown berubah
    >
      <option value="">Pilih Alasan</option>
      <option value="Sakit">Sakit</option>
      <option value="Izin">Izin</option>
    </select>
  );
};

export default DropdownAlasan;
