import React, { useState, useMemo } from "react";
import {
  FaSearch,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
} from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LoaderComponent from "../LoaderComponent";
import { fetchEmailDetails } from "../../../Api/api";

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

const AdminCommentModal = ({ isOpen, onClose, onSubmit, statusChange }) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(comment);
      setComment("");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[400px] animate-in fade-in-0 zoom-in-95">
            <h3 className="text-lg font-semibold mb-4 text-secondary-foreground">
              {statusChange ? "Update Status & Comment" : "Add Admin Comment"}
            </h3>
            <textarea
              value={comment}
              required
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border border-gray-500 rounded-md bg-background dark:bg-gray-800 text-secondary-foreground resize-none"
              placeholder="Enter your comment..."
              rows={4}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-destructive text-white hover:bg-destructive/80"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex gap-2 items-center px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const getStatusColor = (status) => {
  if (!status) return "bg-gray-200";
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-500";
    case "processing":
      return "bg-yellow-500";
    case "failed":
      return "bg-red-500";
    case "safe":
      return "bg-green-500 text-background";
    case "unsafe":
      return "bg-red-500 text-background";
    case "pending":
      return "bg-blue-500 text-background";
    default:
      return "bg-gray-500";
  }
};

const getThreatScoreColor = (score) => {
  if (score >= 80) return "text-red-600 font-bold";
  if (score >= 60) return "text-orange-500 font-semibold";
  if (score >= 40) return "text-yellow-500";
  return "text-green-500";
};

function Table2({
  data,
  columns,
  onStatusChange,
  onCommentAdd,
  loading,
  error,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [showColumnToggle, setShowColumnToggle] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    Object.fromEntries(columns.map((col) => [col.accessor, true]))
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedComments, setSelectedComments] = useState({
    user: "",
    admin: "",
  });
  const [pendingStatusChange, setPendingStatusChange] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [emailDetailsModal, setEmailDetailsModal] = useState(false);
  const [emailDetails, setEmailDetails] = useState(null);

  const itemsPerPage = 10;

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

  const handleViewComments = (row) => {
    setSelectedComments({
      user: row.user_comment,
      admin: row.admin_comment,
    });
    setIsCommentModalOpen(true);
  };

  const handleViewEmailDetails = async (row) => {
    try {
      const response = await fetchEmailDetails(row.msg_id);
      const data = await response.json();
      if (response.ok) {
        setEmailDetails(data);
        setEmailDetailsModal(true);
      } else {
        toast.error("Failed to fetch email details");
      }
    } catch (error) {
      toast.error("Error fetching email details");
    }
  };

  const handleStatusChange = (row, newStatus) => {
    // setPendingStatusChange({ row, newStatus, type: "status" });
    // setIsModalOpen(true);
    // Directly call onStatusChange without opening modal
    onStatusChange(row.id, newStatus);
  };

  const handleCommentSubmit = async (comment) => {
    if (!pendingStatusChange) return;

    const { row, newStatus, type } = pendingStatusChange;

    if (type === "status") {
      await onStatusChange(row.id, newStatus, comment);
    } else {
      await onCommentAdd(row.id, comment);
    }

    setIsModalOpen(false);
    setPendingStatusChange(null);
  };

  const handleCommentOnly = (row) => {
    setPendingStatusChange({ row, type: "comment" });
    setIsModalOpen(true);
  };

  const toggleColumnVisibility = (accessor) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [accessor]: !prev[accessor],
    }));
  };

  const handleDownload = (row) => {
    toast.success(`Downloading data for message ID: ${row.message_id}`);
  };
  const handleEmlFileDownload = (row) => {
    toast.success(`Downloading data for message ID: ${row.id}`);
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
              <tr className="bg-primary dark:bg-gray-800">
                {columns
                  .filter((col) => visibleColumns[col.accessor])
                  .map((column) => (
                    <th
                      key={column.accessor}
                      onClick={() => handleSort(column.accessor)}
                      className="px-4 py-3 text-center text-white uppercase text-xs border min-w-28 cursor-pointer"
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
                        {column.accessor === "status" ? (
                          <div className="flex items-center justify-center gap-2">
                            {row[column.accessor] === "safe" ||
                            row[column.accessor] === "unsafe" ||
                            row[column.accessor] === "pending" ? (
                              <>
                                <select
                                  value={row[column.accessor]}
                                  onChange={(e) =>
                                    handleStatusChange(row, e.target.value)
                                  }
                                  className={`px-2 py-1 leading-5 font-semibold rounded-md outline-none cursor-pointer ${getStatusColor(
                                    row[column.accessor]
                                  )} text-white`}
                                >
                                  <option value="safe">Safe</option>
                                  <option value="unsafe">Unsafe</option>
                                  <option value="pending">Pending</option>
                                </select>
                                <button
                                  onClick={() => handleCommentOnly(row)}
                                  className="bg-primary hover:bg-primary/90 text-white p-1 rounded-md"
                                  title="Add Comment"
                                >
                                  💬
                                </button>
                              </>
                            ) : (
                              <span
                                className={`px-2 py-1 leading-5 font-semibold rounded-md dark:text-black ${getStatusColor(
                                  row[column.accessor]
                                )}`}
                              >
                                {row[column.accessor]}
                              </span>
                            )}
                          </div>
                        ) : column.accessor === "export" ? (
                          <button
                            onClick={() => handleDownload(row)}
                            className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-md inline-flex items-center"
                          >
                            <FaDownload className="mr-2" />
                            <span>Download</span>
                          </button>
                        ) : column.accessor === "eml_file_name" ? (
                          <button
                            onClick={() => handleViewEmailDetails(row)}
                            className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-md inline-flex items-center"
                          >
                            <FaEye className="mr-2" />
                            <span>View</span>
                          </button>
                        ) : column.accessor === "user_comment" ? (
                          <div className="flex items-center justify-center gap-2">
                            <span className="">
                              {row[column.accessor]
                                ?.split(" ")
                                .slice(0, 4)
                                .join(" ")}
                              {row[column.accessor]?.split(" ").length > 4 &&
                                "..."}
                            </span>
                            <button
                              onClick={() => handleViewComments(row)}
                              className="text-primary text-xs cursor-pointer underline"
                            >
                              View
                            </button>
                          </div>
                        ) : column.accessor === "urls" ? (
                          <button
                            onClick={() => handleEmlFileDownload(row)}
                            className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-md inline-flex items-center"
                          >
                            <FaEye className="mr-2" />
                            <span>View</span>
                          </button>
                        ) : column.accessor === "attachments" ? (
                          <button
                            onClick={() => handleEmlFileDownload(row)}
                            className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-md inline-flex items-center"
                          >
                            <FaEye className="mr-2" />
                            <span>View</span>
                          </button>
                        ) : column.accessor === "cdr_file" ? (
                          <button
                            onClick={() => handleEmlFileDownload(row)}
                            className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-md inline-flex items-center"
                          >
                            <FaEye className="mr-2" />
                            <span>View</span>
                          </button>
                        ) : column.accessor === "threat_score" ? (
                          <span
                            className={getThreatScoreColor(
                              row[column.accessor]
                            )}
                          >
                            {row[column.accessor]}
                          </span>
                        ) : column.accessor.includes("started_on") ||
                          column.accessor.includes("create_time") ||
                          column.accessor.includes("created_at") ||
                          column.accessor.includes("updated_at") ||
                          column.accessor.includes("completed_on") ? (
                          <DateFormatter dateString={row[column.accessor]} />
                        ) : column.accessor.includes("sr_no") ? (
                          <span className="text-secondary-foreground">
                            {(currentPage - 1) * itemsPerPage + rowIndex + 1}
                          </span>
                        ) : (
                          // Add the null checking logic here
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
