import Search from "@/Components/Elements/Icons/Search.jsx";
import SearchInput from "@/Components/Elements/Inputs/SearchInput";
import { useState } from "react";

const SearchPack = (props) => {
  const [focus, setOnFocus] = useState(false);

  const handleOnFocus = () => {
    setOnFocus(true);
  }

  return (
    <div className={`flex px-2 py-1 border-2 h-11 ${focus ? "border-[#6384E9]" : "border-gray-300"} rounded-md hover:border-[#6384E9] bg-white w-full focus:border-[#6384E9] ease-in-out duration-300 items-center`}>
      <Search />
      <SearchInput onClick={props.onClick} onFocus={handleOnFocus} onBlur={() => setOnFocus(false)} onChange={props.onChange} name={props.name} id={props.id} placeholder={props.placeholder}/>
    </div>
  );
};

export default SearchPack;
