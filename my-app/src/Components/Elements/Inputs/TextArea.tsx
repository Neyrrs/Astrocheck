import Label from "@/Components/Elements/Labels/Label";

type TextAreaProps = {
  placeholder?: string;
  setDetailAlasan?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  height?: string;
  [key: string]: any;
};

const TextArea = (props: TextAreaProps) => {
  return (
    <>
      <Label
        htmlFor="detailALasan"
        text="Tambahan Alasan"
        className="text-base"
      />
      <textarea
        className={`focus:border-[#6384E9] border-gray-300 hover:border-[#6384E9] outline-none duration-150 ease-in text-black border-[2px] p-3 text-sm rounded-md bg-white resize-none w-full ${props.height || 'h-20'}`}
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
