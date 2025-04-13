import Label from "@/Components/Elements/Labels/Label";

const TextArea = (props) => {
  return (
    <>
      <Label
        htmlFor="detailALasan"
        text="Tambahan Alasan"
        className="text-base"
      />
      <textarea
        className="focus:border-[#6384E9] border-gray-300 hover:border-[#6384E9] outline-none duration-150 ease-in text-black border-[2px] p-3 text-sm rounded-md bg-white resize-none w-full h-20"
        placeholder={props.placeholder}
        name={props.setDetailAlasan}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        {...props}
      ></textarea>
    </>
  );
};

export default TextArea;
