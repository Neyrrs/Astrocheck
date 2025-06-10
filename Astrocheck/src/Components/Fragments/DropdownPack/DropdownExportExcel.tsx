const DropdownExportExcel = ({ register, error, disabled }) => {
  return (
    <>
      <select
        {...register("jenis", { required: "Jenis export wajib dipilih" })}
        className={`${
          disabled ? "border-[#dbdbdb] bg-[#fafafa]" : ""
        }focus:border-[#6384E9] border-gray-300 hover:border-[#6384E9] font-normal outline-none focus:shadow-md hover:shadow-md duration-150 ease-in text-black border-[2px] px-2 mb-2 py-[0.5rem] rounded-md text-sm w-full`}
      >
        <option value="">Jenis export</option>
        <option value="bulanan">Bulanan</option>
        <option value="tahunan">Tahunan</option>
      </select>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </>
  );
};

export default DropdownExportExcel;
