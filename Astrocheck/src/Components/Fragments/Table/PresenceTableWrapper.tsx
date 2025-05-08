import { useState } from "react";
import DynamicTable from "./DynamicTable";
import SearchPack from "../SearchPack/SearchPack";

const PresenceTableWrapper = ({
  data = [],
  columns = [],
  itemsPerPage = 5,
  loading = false,
  error = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="relative w-full flex justify-end items-center h-fit px-5">
        <div className="w-60">
          <SearchPack width="fit" />
        </div>
      </div>
      <DynamicTable
        columns={columns}
        data={currentItems}
        loading={loading}
        error={error}
        startIndex={indexOfFirstItem}
      />

      <div className="flex justify-between px-5 items-center mt-4">
        {currentPage > 1 && (
          <button
            onClick={handlePrev}
            className="px-4 py-1 bg-transparent text-black font-medium border-2 border-[#e5e5e5] rounded-md"
          >
            Prev
          </button>
        )}
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <button
            onClick={handleNext}
            className="px-4 py-1 bg-transparent text-black font-medium border-2 border-[#e5e5e5] rounded-md"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default PresenceTableWrapper;
