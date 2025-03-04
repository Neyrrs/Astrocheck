import Label from "@/Components/Elements/Labels/Label";

const DropdownPackJurusan = (props) => {
  return (
    <div>
      <Label htmlFor="Jurusan" text="Jurusan" className="text-base" />
      <select
        name={props.name}
        id={props.id}
        className="outline-none duration-150 ease-in text-black border-[2px] px-2 mb-2 py-[0.5rem] rounded-md text-sm w-full"
        value={props.value || ""}
        onChange={props.onChange}
        disabled={props.disabled}
      >
        <option value="">Pilih Kelas</option>
        <option value="RPL">RPL</option>
        <option value="SIJA">SIJA</option>
        <option value="TKJ">TKJ</option>
        <option value="DKV">DKV</option>
        <option value="DPIB">DPIB</option>
        <option value="TOI">TOI</option>
        <option value="TKP">TKP</option>
        <option value="TP">TP</option>
        <option value="TFLM">TFLM</option>
        <option value="TKR">TKR</option>
      </select>
    </div>
  );
};

export default DropdownPackJurusan;
