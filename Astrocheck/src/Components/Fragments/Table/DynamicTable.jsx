import React from "react";

const DynamicTable = ({ columns, data, loading = false, error = false, startIndex = 0 }) => {
  return (
    <table className="w-full border-collapse mt-3">
      <thead>
        <tr className="text-black border-[#e5e5e5] border-1 bg-[#fafafa]">
          {columns.map((col, index) => (
            <th key={index} className="text-left font-bold py-3 px-5">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr
              key={item._id || `row-${index}`}
              className="border-b font-normal text-lg border-y-2 border-[#e5e5e5]"
            >
              {columns.map((col, idx) => (
                <td key={idx} className="py-3 px-5">
                  {col.field === "__index"
                    ? startIndex + index + 1
                    : item[col.field] ?? "-"}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">
              {error ? "Data tidak ditemukan" : "Loading..."}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DynamicTable;
