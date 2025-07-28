import SearchPack from "@/Components/Fragments/SearchPack/SearchPack";
import React from "react";
import DynamicTable from "./DynamicTable";

type Major = {
  id_major: number;
  nis: string;
  fullname: string;
};

type TableColumn = {
  header: string;
  field: keyof Major | "__index";
  render?: (row: Major) => React.ReactNode;
};

const PresenceTableWrapper = ({
  columns = [],
  itemsPerPage = 5,
  data,
  totalPages,
  loading,
  error,
  currentPage,
  onPageChange,
  onPerPageChange,
}: {
  columns: TableColumn[];
  itemsPerPage?: number;
  data: Major[];
  totalPages: number;
  loading: boolean;
  error: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}) => {
  const renderPageNumbers = () => {
    const pageButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
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
        data={data}
        error={error}
        startIndex={(currentPage - 1) * itemsPerPage}
        loading={loading}
      />

      <div className="flex flex-col items-center gap-2 mt-6">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-black disabled:opacity-50"
          >
            Prev
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-black disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm mt-2">
          <span className="text-gray-500">Per page</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            {[5, 10, 15, 20, 25, 50, 100].map((val) => (
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

export default PresenceTableWrapper