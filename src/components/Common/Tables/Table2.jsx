import React, { useState, useMemo, useEffect } from "react";
import {
  FaSearch,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
} from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LoaderComponent from "../LoaderComponent";

function DateFormatter({ dateString }) {
  const formatDate = (dateString) => {
    if (!dateString || dateString === "null" || dateString === "undefined") {
      return "-";
    }

    const date = new Date(dateString);

    // Check if date is invalid
    if (isNaN(date.getTime())) {
      return "-";
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  return <span>{formatDate(dateString)}</span>;
}

function Table2({ data, columns, loading, error }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRow, setActiveRow] = useState(null);
  const [filters, setFilters] = useState({});
  const [showColumnToggle, setShowColumnToggle] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    Object.fromEntries(columns.map((col) => [col.accessor, true]))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const itemsPerPage = 10;

  const handleView = (row) => {
    // Implement view logic here
    toast.info("Viewing row:", row.empId);
  };

  const handleEdit = (row) => {
    // Implement edit logic here
    toast.info("Editing row:", row.empId);
  };

  const handleDelete = (row) => {
    // Implement delete logic here
    toast.info("Deleting row:", row.empId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeRow && !event.target.closest(".actions-menu")) {
        setActiveRow(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeRow]);

  const handleSort = (accessor) => {
    setSortConfig((prevConfig) => ({
      key: accessor,
      direction:
        prevConfig.key === accessor && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const filteredData = useMemo(() => {
    // Ensure data is an array before filtering
    const dataArray = Array.isArray(data) ? data : [];

    return dataArray?.filter((row) => {
      return (
        columns?.some((column) =>
          String(row[column.accessor])
            .toLowerCase()
            .includes(searchTerm?.toLowerCase())
        ) &&
        Object.entries(filters)?.every(([key, value]) =>
          String(row[key]).toLowerCase().includes(value.toLowerCase())
        )
      );
    });
  }, [data, columns, searchTerm, filters]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === null) return 1;
      if (bValue === null) return -1;

      if (typeof aValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }

      const comparison = aValue - bValue;
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math?.ceil(sortedData?.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleColumnVisibility = (accessor) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [accessor]: !prev[accessor],
    }));
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        buttons.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === i
                ? "bg-primary text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        buttons.push(<span key={i}>...</span>);
      }
    }
    return buttons;
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <div className="relative max-w-sm">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-12 pr-10 text-secondary-foreground bg-background border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300 ease-in-out"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="relative">
          <button
            className="bg-background text-primary dark:text-white px-4 py-2 rounded-lg shadow shadow-black/10 dark:shadow-white flex items-center gap-2"
            onClick={() => setShowColumnToggle(!showColumnToggle)}
          >
            <IoFilterSharp className="h-5 w-5" />
            Filter
          </button>
          {showColumnToggle && (
            <div className="absolute right-0 bg-background rounded-lg border shadow-lg mt-2 p-2 min-w-52 z-10">
              <h1 className="mb-2 border-b text-secondary-foreground">
                Filter by
              </h1>
              {columns.map((column) => (
                <div key={column.accessor} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={column.accessor}
                    checked={visibleColumns[column.accessor]}
                    onChange={() => toggleColumnVisibility(column.accessor)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={column.accessor}
                    className="text-secondary-foreground"
                  >
                    {column.Header}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ScrollArea className="rounded-t-lg">
        {loading ? (
          <LoaderComponent />
        ) : error ? (
          <div className="w-full py-5 px-3 bg-background dark:bg-gray-800 rounded-md">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className="bg-secondary dark:bg-gray-800">
                {columns
                  .filter((col) => visibleColumns[col.accessor])
                  .map((column) => (
                    <th
                      key={column.accessor}
                      onClick={() => handleSort(column.accessor)}
                      className="px-4 py-3 text-center text-white uppercase text-xs  min-w-28 cursor-pointer"
                    >
                      <div className="flex items-center justify-center gap-2">
                        {column.Header}
                        {sortConfig.key === column.accessor && (
                          <span>
                            {sortConfig.direction === "asc" ? " 🔽" : " 🔼"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody className="bg-background">
              {paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border hover:bg-gray-200 dark:hover:bg-gray-900"
                >
                  {columns
                    .filter((col) => visibleColumns[col.accessor])
                    .map((column) => (
                      <td
                        key={column.accessor}
                        className="px-6 py-2 whitespace-nowrap text-center text-secondary-foreground text-sm"
                      >
                        {column?.accessor?.includes("lastUpdated") ? (
                          <DateFormatter dateString={row[column.accessor]} />
                        ) : column?.accessor?.includes("actions") ? (
                          <div className="relative">
                            <button
                              onClick={() => setActiveRow(row.empId)}
                              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              <BsThreeDotsVertical className="w-5 h-5" />
                            </button>

                            {activeRow === row.empId && (
                              <div className="absolute right-0 mt-2 w-20 bg-white border rounded-md shadow-lg z-50 overflow-hidden">
                                <div className="flex flex-col gap-1">
                                  <button
                                    onClick={() => {
                                      handleView(row);
                                      setActiveRow(null);
                                    }}
                                    className="w-full text-left px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-600 hover:text-blue-800"
                                  >
                                    View
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleEdit(row);
                                      setActiveRow(null);
                                    }}
                                    className="w-full text-left px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 text-green-600 hover:text-green-800"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleDelete(row);
                                      setActiveRow(null);
                                    }}
                                    className="w-full text-left px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 text-red-600 hover:text-red-800"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : column?.accessor?.includes("sr_no") ? (
                          <span className="text-secondary-foreground">
                            {(currentPage - 1) * itemsPerPage + rowIndex + 1}
                          </span>
                        ) : (
                          (() => {
                            const value = row[column.accessor];
                            const cellValue =
                              value === null ? "null" : value || "null";
                            return cellValue;
                          })()
                        )}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <ScrollBar orientation="horizontal" className="" />
      </ScrollArea>
      {!error && !loading && (
        <div className="p-2 flex items-center justify-between bg-background dark:bg-gray-800 rounded-b-lg">
          <div className="text-secondary-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length}
          </div>
          <div className="flex items-center text-secondary-foreground">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 disabled:bg-gray-300 bg-primary hover:bg-secondary text-white disabled:text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <FaChevronLeft className="" />
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 disabled:bg-gray-300 bg-primary hover:bg-secondary text-white disabled:text-gray-600 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <FaChevronRight className="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table2;
