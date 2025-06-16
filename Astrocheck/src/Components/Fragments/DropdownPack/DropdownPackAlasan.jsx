import Label from "@/Components/Elements/Labels/Label";

const DropdownPackAlasan = ({
  register, // optional RHF
  name = "reason",
  value,
  onChange,
  error,
  id,
}) => {
  const hasRegister = typeof register === "function";
  const hasControlled = value !== undefined && onChange !== undefined;

  return (
    <div>
      <Label htmlFor={id || name} text="Alasan" className="text-base" />
      <select
        id={id || name}
        name={name}
        {...(hasRegister ? register(name) : {})}
        {...(hasControlled ? { value, onChange } : {})}
        className="focus:border-[#6384E9] border-gray-300 hover:border-[#6384E9] font-normal outline-none focus:shadow-md hover:shadow-md duration-150 ease-in text-black border-[2px] px-2 mb-2 py-[0.5rem] rounded-md text-sm w-full"
      >
        <option value="">Pilih Alasan</option>
        <option value="Membaca">Membaca</option>
        <option value="Meminjam">Meminjam</option>
        <option value="Lainnya">Lainnya</option>
      </select>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default DropdownPackAlasan;
