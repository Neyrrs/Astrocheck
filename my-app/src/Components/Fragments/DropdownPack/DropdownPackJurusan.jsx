import Label from "@/Components/Elements/Labels/Label";

const DropdownPackJurusan = (props) => {
  return (
    <div>
      <Label htmlFor="Jurusan" text="Jurusan" className="text-base" />
      <select
        name={props.name}
        id={props.id}
        className={`${props.disabled ? 'border-[#dbdbdb] bg-[#fafafa]' : ''} outline-none border-gray-300 hover:shadow-md duration-200 ease-in-out text-black border-[2px] px-2 py-[0.5rem] font-normal rounded-md text-sm w-full`}
        value={props.value || ""}
        onChange={props.onChange}
        disabled={props.disabled}
      >
        <option value="">Pilih Jurusan</option>
        <option value="RPL 1">RPL 1</option>
        <option value="RPL 2">RPL 2</option>
        <option value="SIJA 1">SIJA 1</option>
        <option value="SIJA 2">SIJA 2</option>
        <option value="TKJ 1">TKJ 1</option>
        <option value="TKJ 2">TKJ 2</option>
        <option value="DKV 1">DKV 1</option>
        <option value="DKV 2">DKV 2</option>
        <option value="DKV 3">DKV 3</option>
        <option value="DKV 4">DKV 4</option>
        <option value="DPIB 1">DPIB 1</option>
        <option value="DPIB 2">DPIB 2</option>
        <option value="TOI 1">TOI 1</option>
        <option value="TOI 2">TOI 2</option>
        <option value="TKP 1">TKP </option>
        <option value="TKP 2">TKP </option>
        <option value="TP 1">TP 1</option>
        <option value="TP 2">TP 2</option>
        <option value="TFLM 1">TFLM 1</option>
        <option value="TFLM 2">TFLM 2</option>
        <option value="TKR 1">TKR 1</option>
        <option value="TKR 2">TKR 2</option>
        <option value="TKR 3">TKR 3</option>
      </select>
    </div>
  );
};

export default DropdownPackJurusan;
