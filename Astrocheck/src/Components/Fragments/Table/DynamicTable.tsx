import React from "react";
import { PresenceLog } from "@/types/presence";

type TableColumn = {
  header: string;
  field: keyof PresenceLog | "__index";
  render?: (row: PresenceLog) => React.ReactNode;
};

type DynamicTableProps = {
  columns: TableColumn[];
  data: PresenceLog[];
  error?: boolean;
  startIndex?: number;
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  data,
  error = false,
  startIndex = 0,
}) => {
  return (
    <div className="w-full mt-3">
      <table className="w-full border-collapse min-w-max">
        <thead>
          <tr className="text-black border-[#e5e5e5] border-1 bg-[#fafafa]">
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-left font-bold py-3 px-5 whitespace-nowrap"
              >
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
                {columns.map((col, idx) => {
                  let cellContent;

                  if (typeof col.render === "function") {
                    cellContent = col.render(item);
                  } else if (col.field === "__index") {
                    cellContent = startIndex + index + 1;
                  } else {
                    cellContent = item[col.field] ?? "-";
                  }

                  return (
                    <td
                      key={idx}
                      className="max-w-[100px] py-3 px-5 overflow-x-auto whitespace-nowrap"
                    >
                      {cellContent}
                    </td>
                  );
                })}
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
    </div>
  );
};

export default DynamicTable;
