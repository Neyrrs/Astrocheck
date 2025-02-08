import Label from "../../Elements/Labels/Label";

const TextArea = (props) => {
  return (
    <>
      <Label htmlFor="detailALasan" text="Tambahan Alasan" className="text-base" />
      <textarea
        className="focus:border-[#6384E9] hover:border-[#6384E9] outline-none duration-150 ease-in text-gray-500 border-[2px] p-2 text-sm rounded-md bg-white resize-none w-full h-20"
        placeholder={props.placeholder}
        name={props.setDetailAlasan}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      ></textarea>
    </>
  );
};

export default TextArea;
