import Label from "../../Elements/Labels/Label";

const DropdownPackAlasan = (props) => {
  return (
    <div>
      <Label htmlFor="alasan" text="Alasan" className="text-base" />
      <select
        name={props.name}
        id={props.id}
        className="focus:border-[#6384E9] hover:border-[#6384E9] font-light outline-none focus:shadow-md hover:shadow-md duration-150 ease-in text-gray-500 border-[2px] px-2 mb-2 py-[0.5rem] rounded-md text-sm w-full"
        value={props.value}
        onChange={props.onChange}
      >
        <option value="">Pilih Alasan</option>
        <option value="Membaca">Membaca</option>
        <option value="Meminjam">Meminjam</option>
        <option value="Lainnya">Lainnya</option>
      </select>
    </div>
  );
};

export default DropdownPackAlasan;
