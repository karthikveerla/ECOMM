import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import CashBookDialog from "../components/CashBookDialog";
import TransactionOverlay from "../components/TransactionOverlay";

const Dashboard = () => {
  const [cashBooks, setCashBooks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  // map of refs keyed by book id
  const menuRefs = useRef({});

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");

      const response = await axios.get("http://localhost:8080/api/v1/cashbook/list", {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      });

      setCashBooks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Close dropdown if click outside the currently open menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuOpenId) return; // nothing open
      const current = menuRefs.current[menuOpenId];
      // if current exists and click is outside it, close menu
      if (current && !current.contains(event.target)) {
        setMenuOpenId(null);
      }
    };

    if (menuOpenId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpenId]);

  const handleDelete = async (bookId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8080/api/v1/cashbook/delete/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Cashbook deleted successfully!");
      setDeleteConfirm(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting cashbook:", error);
      alert("❌ Failed to delete cashbook.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6">
      <div className="w-full max-w-5xl pt-24 pb-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Your Books</h2>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition"
          >
            + Add New Book
          </button>
        </div>

        {/* CashBooks */}
        {cashBooks.length > 0 ? (
          <div className="flex flex-col gap-4">
            {cashBooks.map((book) => (
              <div
                key={book.id}
                className="relative flex justify-between items-center bg-white shadow-sm hover:shadow-md transition cursor-pointer rounded-lg px-6 py-4 border border-gray-200"
                onClick={(e) => {
                  if (menuOpenId === book.id) return; // don't open transactions when menu is open
                  setSelectedBook(book);
                }}
              >
                {/* Left Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {book.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Updated on {new Date().toLocaleDateString()}
                  </p>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                  <p
                    className={`font-bold text-lg ${
                      book.netTotal > 0
                        ? "text-green-600"
                        : book.netTotal < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {book.netTotal?.toFixed(2) || "0.00"}
                  </p>

                  {/* ⋮ Menu */}
                  <div
                    // store per-card ref here
                    ref={(el) => {
                      menuRefs.current[book.id] = el;
                    }}
                    className="relative"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(menuOpenId === book.id ? null : book.id);
                      }}
                      className="text-gray-500 hover:text-gray-700 px-2 text-xl"
                    >
                      ⋮
                    </button>

                    {menuOpenId === book.id && (
                      <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md border border-gray-200 z-50 w-32">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm(book);
                            setMenuOpenId(null);
                          }}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-10 text-center">
            No CashBooks available.
          </p>
        )}
      </div>

      {/* Dialog to create cashbook */}
      <CashBookDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fetchData={fetchData}
      />

      {/* Overlay for transactions */}
      {selectedBook && (
        <TransactionOverlay
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          fetchData={fetchData}
        />
      )}

      {/* Delete Confirmation Popup */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[360px] text-center">
            <h3 className="text-lg font-semibold mb-3">
              Are you sure you want to delete
              <br />
              <span className="font-bold text-red-600">
                “{deleteConfirm.title}”
              </span>
              ?
            </h3>
            <div className="flex justify-center gap-4 mt-5">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;