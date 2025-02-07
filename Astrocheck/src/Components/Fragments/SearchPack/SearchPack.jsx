import Search from "../../Elements/Icons/Search";
import SearchInput from "../../Elements/Inputs/SearchInput";
const SearchPack = (props) => {
  return (
    <div className={`flex border-2 h-10 rounded-md hover:border-[#6384E9] bg-white w-full active:border-[#6384E9] ease-in-out duration-300 items-center`}>
      <Search />
      <SearchInput />
    </div>
  );
};

export default SearchPack;
