import React from 'react'

const DropdownJurusan = () => {
  return (
    <>
        <select name="Jurusan" id="jurusan" className='focus:border-[#6384E9] hover:border-[#6384E9] outline-none focus:shadow-md hover:shadow-md duration-150 ease-in border-[2px] text-gray-500 px-1 mb-2 py-[0.4rem] rounded-md text-xs w-full'>
            <option value="Rekayasa Perangkat Lunak">Rekayasa Perangkat Lunak</option>
            <option value="Teknik Komputer dan Jaringan">Teknik Komputer dan Jaringan</option>
            <option value="Desain Komunikasi Visual">Desain Komunikasi Visual</option>
            <option value="Sistem Informasi Jaringan dan Aplikasi">Sistem Informasi Jaringan dan Aplikasi</option>
            <option value="Desain Permodelan Informasi Bangunan">Desain Permodelan Informasi Bangunan</option>
            <option value="Teknik Pemesinan">Teknik Pemesinan</option>
            <option value="Teknik Fabrikasi Logam dan Manufaktur">Teknik Fabrikasi Logam dan Manufaktur</option>
            <option value="Teknik Konstruksi Perumahan">Teknik Konstruksi Perumahan</option>
            <option value="Teknik Kendaraan Ringan">Teknik Kendaraan Ringan</option>
            <option value="Teknik Otomasi Industri">Teknik Otomasi Industri</option>
        </select>
    </>
  )
}

export default DropdownJurusan