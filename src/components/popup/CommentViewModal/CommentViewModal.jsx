import { FaTimes } from "react-icons/fa";

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

const CommentViewModal = ({
  isOpen,
  onClose,
  userComment,
  adminComment,
  userCommentTime,
  adminCommentTime,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[500px] animate-in fade-in-0 zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-secondary-foreground">
                Comments
              </h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {userComment && (
                <div className="flex justify-start">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg max-w-[80%]">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>User Comment</span>
                      <span>
                        <DateFormatter dateString={userCommentTime} />
                      </span>
                    </div>
                    <p className="text-secondary-foreground">{userComment}</p>
                  </div>
                </div>
              )}

              {adminComment && (
                <div className="flex justify-end">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg max-w-[80%]">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Admin Comment</span>
                      <span>
                        <DateFormatter dateString={adminCommentTime} />
                      </span>
                    </div>
                    <p className="text-secondary-foreground">{adminComment}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentViewModal;
