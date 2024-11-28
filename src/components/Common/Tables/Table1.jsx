import React, { useState, useEffect } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { FaChevronLeft, FaChevronRight, FaEllipsisV, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Table1 = ({ data, onEdit, onView, onDelete }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-dropdown')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Sr No",
        accessor: (row, index) => index + 1,
        id: "srNo",
      },
      {
        Header: "Emp ID",
        accessor: "empId",
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="relative action-dropdown">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(activeDropdown === row.id ? null : row.id);
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaEllipsisV />
            </button>
            
            {activeDropdown === row.id && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 transform transition-all duration-200">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onView(row.original);
                      setActiveDropdown(null);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors"
                  >
                    <FaEye className="mr-2 text-blue-500" /> View Details
                  </button>
                  <button
                    onClick={() => {
                      onEdit(row.original);
                      setActiveDropdown(null);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors"
                  >
                    <FaEdit className="mr-2 text-green-500" /> Edit Record
                  </button>
                  <button
                    onClick={() => {
                      onDelete(row.original);
                      setActiveDropdown(null);
                    }}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full transition-colors"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ),
      },
    ],
    [activeDropdown, onEdit, onView, onDelete]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    state: { pageIndex },
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="overflow-hidden flex flex-col gap-2">
      <ScrollArea className="bg-background rounded-t-lg">
        <table {...getTableProps()} className="w-full text-sm text-left text-gray-500 bg-background">
          <thead className="bg-background">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="dark:border bg-secondary dark:bg-gray-800">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-center cursor-pointer text-white text-xs uppercase min-w-32"
                  >
                    <div className="flex items-center justify-center gap-2">
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border hover:bg-gray-200 dark:hover:bg-gray-900">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="px-6 text-center py-2 whitespace-nowrap text-secondary-foreground">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex items-center justify-between p-2 rounded-b-lg shadow-md bg-background dark:bg-gray-800 overflow-hidden">
        <div className="text-secondary-foreground font-semibold">
          Showing {pageIndex * 10 + 1}-{Math.min((pageIndex + 1) * 10, data.length)} of {data.length}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`p-2 rounded ${
              canPreviousPage
                ? "bg-primary hover:bg-secondary text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition-colors duration-200 flex items-center`}
          >
            <FaChevronLeft />
          </button>
          {Array.from({ length: pageOptions.length }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => gotoPage(pageNumber - 1)}
              className={`px-3 py-1 rounded ${
                pageIndex === pageNumber - 1
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`p-2 rounded ${
              canNextPage
                ? "bg-primary hover:bg-secondary text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition-colors duration-200 flex items-center`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table1;
