type DisabledInputProps = {
  type?: string;
  placeholder?: string;
  width?: string | number;
  value?: string;
  readOnly?: boolean;
};

const DisabledInput = (props: DisabledInputProps) => {
  return (
    <input
      type={props.type}
      disabled={true}
      placeholder={props.placeholder || "Placeholder"}
      value={props.value}
      readOnly={props.readOnly || true}
      className={`text-sm font-normal border-[#dbdbdb] bg-[#fafafa] border-2 px-3 w-${props.width || "full"} ease-in-out hover:drop-shadow-md duration-150 border-gray-300 py-2 rounded-[5px]`}
    />
  );
};

export default DisabledInput;
