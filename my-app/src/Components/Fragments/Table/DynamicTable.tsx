import React from "react";

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

type DynamicTableProps = {
  columns: TableColumn[];
  data: Major[];
  error?: boolean;
  startIndex?: number;
  loading?: boolean;
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  columns,
  data = [],
  error = false,
  startIndex = 0,
  loading = false,
}) => {
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">Error loading data</div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-4">No data available</div>;
  }

  return (
    <div className="w-full overflow-x-scroll mt-3">
      <table className="w-full border-collapse min-w-max">
        <thead>
          <tr className="text-black border-[#e5e5e5] border-1 bg-[#fafafa]">
            {columns.map((column, index) => (
              <th
                key={index}
                className="text-left font-bold py-3 px-5 whitespace-nowrap"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id_major || `row-${idx}`}
              className="border-b font-normal text-lg border-y-2 border-[#e5e5e5]"
            >
              {columns.map((column, colIdx) => (
                <td
                  key={colIdx}
                  className="max-w-[100px] py-3 px-5 overflow-x-auto whitespace-nowrap"
                >
                  {column.field === "__index"
                    ? (idx + 1).toString()
                    : column.render
                    ? column.render(row)
                    : row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
