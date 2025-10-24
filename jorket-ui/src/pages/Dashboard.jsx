import React, { useEffect, useState } from "react";
import axios from "axios";
import CashBookDialog from "../components/CashBookDialog";
import TransactionOverlay from "../components/TransactionOverlay";

const Dashboard = () => {
  const [cashBooks, setCashBooks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6">
      <div className="w-full max-w-5xl **pt-24 pb-10**">
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
                onClick={() => setSelectedBook(book)}
                className="flex justify-between items-center bg-white shadow-sm hover:shadow-md transition cursor-pointer rounded-lg px-6 py-4 border border-gray-200"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{book.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Updated on {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-10 text-center">No CashBooks available.</p>
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
    </div>
  );
};

export default Dashboard;
