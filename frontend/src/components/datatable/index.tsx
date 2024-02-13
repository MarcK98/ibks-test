import React, { ReactElement, useState } from "react";

import Button from "../button";
import { accessNestedValue } from "../../utils/object";

export type TableDefinition = {
  name: string;
  data: string;
  sortable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (data: any) => ReactElement;
};

interface DataTableProps {
  columns: TableDefinition[];
  data: any;
  totalCount: number;
  onRowsPerPageChange?: (page: number, rows: number) => void;
  onPageChange?: (page: number, rows: number) => void;
}

const DataTable = ({
  columns,
  data,
  totalCount,
  onRowsPerPageChange,
  onPageChange,
}: DataTableProps) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value));
    if (onRowsPerPageChange) {
      onRowsPerPageChange(page, parseInt(e.target.value));
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    if (onPageChange) {
      onPageChange(page, rowsPerPage);
    }
  };

  const pagesButtons = [];
  for (
    let index = 1;
    index <= Math.ceil((totalCount ?? rowsPerPage) / rowsPerPage);
    index++
  ) {
    pagesButtons.push(
      <div key={`page-button-${index}`}>
        <Button
          color={index === page ? "primary" : "transparent"}
          onClick={() => {
            handlePageChange(index);
          }}
        >
          {index}
        </Button>
      </div>,
    );
  }

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="h-full overflow-x-auto">
        <div className="inline-block h-full w-full align-middle">
          <table className="mx-auto flex h-full w-[calc(100%-30px)] flex-col pb-4">
            {/* THEAD */}
            <thead className="mx-auto w-[calc(100%-30px)] bg-white">
              <tr className="flex flex-row justify-around">
                {columns.map((column, index) => (
                  <th
                    key={`${column.name}-${index}`}
                    className="flex-1 py-4 text-center text-sm font-normal text-subtitles"
                  >
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>

            {/* TBODY */}
            <tbody className="flex flex-1 flex-col justify-start gap-y-[10px] overflow-y-scroll bg-white py-1.5">
              {!data?.length && (
                <div className="flex h-full w-full flex-1 items-center text-center text-sm text-subtitles">
                  <div className="m-auto">No Data Yet</div>
                </div>
              )}
              {data?.length !== 0 &&
                data?.map((row: any, index: number) => (
                  <tr
                    key={`row-${index}`}
                    className="mx-auto my-1 flex h-16 w-[calc(100%-30px)] flex-row items-center justify-around rounded-lg bg-white py-4"
                  >
                    {columns.map((column) => {
                      return (
                        <td
                          key={`${index}-${column.name}`}
                          className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-1 text-center text-base font-normal text-subtitles"
                        >
                          {column.render
                            ? column.render(accessNestedValue(row, column.data))
                            : accessNestedValue(row, column.data)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>

            {/* TFOOTER */}
            <tfoot className="mx-auto w-[calc(100%-30px)] bg-white py-4">
              <div className="flex flex-row items-center justify-around">
                <div className="flex-1"></div>
                <div className="flex flex-1 flex-row justify-center">
                  {[pagesButtons]}
                </div>
                <div className="flex flex-1 flex-row items-center justify-end text-sm font-normal text-subtitles">
                  Rows Per Page:
                  <select
                    className="ml-2.5 text-subtitles"
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={40}>40</option>
                    <option value={60}>60</option>
                    <option value={80}>80</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
