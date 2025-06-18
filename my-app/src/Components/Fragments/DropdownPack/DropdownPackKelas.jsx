import Label from "@/Components/Elements/Labels/Label";

const DropdownPackKelas = (props) => {
  return (
    <div>
      <Label htmlFor="kelas" text="Kelas" className="text-base" />
      <select
        name={props.name}
        className={`${props.disabled ? 'border-[#dbdbdb] bg-[#fafafa]' : ''} font-normal outline-none border-gray-300 hover:shadow-md duration-200 ease-in-out text-black border-[2px] px-2 mb-2 py-[0.5rem] rounded-md text-sm w-full`}
        value={props.value || ""}
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
