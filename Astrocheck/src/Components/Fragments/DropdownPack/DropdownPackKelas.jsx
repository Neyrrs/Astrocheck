import Label from "@/Components/Elements/Labels/Label";

const DropdownPackKelas = (props) => {
  return (
    <div>
      <Label htmlFor="kelas" text="Kelas" className="text-base" />
      <select
        name={props.name}
        id={props.id}
        className="focus:border-[#6384E9] hover:border-[#6384E9] font-light outline-none focus:shadow-md hover:shadow-md duration-150 ease-in text-black border-[2px] px-2 mb-2 py-[0.5rem] rounded-md text-sm w-full"
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      >
        <option value="">Pilih Kelas</option>
        <option value="X">X</option>
        <option value="XI">XI</option>
        <option value="XII">XII</option>
        <option value="XIII">XIII</option>
      </select>
    </div>
  );
};

export default DropdownPackKelas;
