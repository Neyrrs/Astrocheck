type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  disabled?: boolean;
  required?: boolean;
  width?: string | number;
  autoFocus?: boolean;
  autoComplete?: string;
};

const Input = (props: InputProps) => {
  return (
    <input
      onChange={props.onChange}
      accept={props.accept}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder || "Placeholder"}
      value={props.value}
      disabled={props.disabled}
      required={props.required ?? true}
      autoFocus={props.autoFocus}
      autoComplete={props.autoComplete || "off"}
      className={`focus:border-[#6384E9] hover:border-[#6384E9] border-gray-300 focus:shadow-md hover:shadow-md bg-white duration-150 ease-in outline-none border-[2px] px-3 mb-2 py-[1rem] h-[2rem] w-${props.width || "full"} text-sm rounded-[5px] font-normal`}
      {...props}
    />
  );
};

export default Input;
