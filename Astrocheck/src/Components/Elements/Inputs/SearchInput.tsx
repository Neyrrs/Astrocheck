type SearchInputProps = {
  onBlur?: () => void;
  onFocus?: () => void;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  [key: string]: any;
};

const SearchInput = (props: SearchInputProps) => {
  return (
    <input
      type="text"
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      name={props.name}
      id={props.id}
      onClick={props.onClick}
      onChange={props.onChange}
      placeholder={props.placeholder || "Search"}
      className="text-base font-medium outline-none w-full text-slate-800 h-fit"
    />
  );
};

export default SearchInput;
