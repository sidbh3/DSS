import React, { useState } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { FaChevronLeft, FaChevronRight, FaEllipsisV } from 'react-icons/fa';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Table1 = ({ data, onEdit, onView, onDelete }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sr No',
        accessor: (row, index) => index + 1,
        id: 'srNo'
      },
      {
        Header: 'Emp ID',
        accessor: 'empId'
      },
      {
        Header: 'Name',
        accessor: row => `${row.firstName} ${row.lastName}`
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === row.id ? null : row.id)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaEllipsisV className="text-gray-600" />
            </button>
            
            {activeDropdown === row.id && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onView(row.original);
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      onEdit(row.original);
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete(row.original);
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      }
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
    state: { pageIndex },
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="overflow-hidden flex flex-col gap-2">
      <ScrollArea className="bg-background rounded-t-lg">
        <table {...getTableProps()} className="w-full text-sm text-left text-gray-500 bg-background">
          <thead className="bg-background">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="bg-primary dark:bg-gray-800">
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-center cursor-pointer text-white text-xs uppercase min-w-32"
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border hover:bg-gray-200 dark:hover:bg-gray-900">
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="px-6 text-center py-2 whitespace-nowrap text-secondary-foreground">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex items-center justify-between p-2 rounded-b-lg shadow-md bg-background dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`p-2 rounded ${
              canPreviousPage
                ? 'bg-primary hover:bg-secondary text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FaChevronLeft />
          </button>
          <span className="text-secondary-foreground">
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`p-2 rounded ${
              canNextPage
                ? 'bg-primary hover:bg-secondary text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table1;
