import Search from "../../Elements/Icons/Search";
import SearchInput from "../../Elements/Inputs/SearchInput";
const SearchPack = (props) => {
  return (
    <div className={`flex px-2 py-1 border-2 h-11 rounded-md hover:border-[#6384E9] bg-white w-full active:border-[#6384E9] ease-in-out duration-300 items-center`}>
      <Search />
      <SearchInput onClick={props.onClick} onChange={props.onChange} name={props.name} id={props.id} placeholder={props.placeholder}/>
    </div>
  );
};

export default SearchPack;
