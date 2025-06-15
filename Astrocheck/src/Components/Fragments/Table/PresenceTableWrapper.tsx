import { useState } from "react";
import DynamicTable from "./DynamicTable";
import SearchPack from "../SearchPack/SearchPack";
import { PresenceLog } from "@/types/presence";

type TableColumn = {
  header: string;
  field: string;
};

type Props = {
  data: PresenceLog[];
  columns: TableColumn[];
  loading?: boolean;
  error?: boolean;
  itemsPerPage?: number;
};

const PresenceTableWrapper = ({
  data = [],
  columns = [],
  loading = false,
  error = false,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / perPage);
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const renderPageNumbers = () => {
    const pageButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 border border-gray-300 rounded-md text-sm ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
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

      <div className="flex flex-col items-center gap-2 mt-6">
        {/* Pagination */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-black disabled:opacity-50"
          >
            Prev
          </button>

          {renderPageNumbers()}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-black disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm mt-2">
          <span className="text-gray-500">Per page</span>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            {[5, 10, 15, 20, 25, 50].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default PresenceTableWrapper;
