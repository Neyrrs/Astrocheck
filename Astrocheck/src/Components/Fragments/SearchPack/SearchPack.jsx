import Search from "../../Elements/Icons/Search";
import SearchInput from "../../Elements/Inputs/SearchInput";
const SearchPack = () => {
  return (
    <div className="flex border-2 h-10 rounded-md hover:border-[#6384E9] active:border-[#6384E9] ease-in-out duration-300 items-center">
      <Search />
      <SearchInput />
    </div>
  );
};

export default SearchPack;
