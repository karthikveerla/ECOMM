import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

const TransactionOverlay = ({ book, onClose, fetchData }) => {
  const [transactions, setTransactions] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // CASH_IN or CASH_OUT
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    paymentMode: "CASH",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const menuRefs = useRef({});

  const fetchTransactions = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8080/api/v1/record/list", {
        headers: { Authorization: `Bearer ${token}` },
        params: { cashBookId: book.id },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [book.id]);

  useEffect(() => {
    if (book) fetchTransactions();
  }, [book, fetchTransactions]);

  // 🧩 Outside click handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuOpenId) return;
      const current = menuRefs.current[menuOpenId];
      if (current && !current.contains(event.target)) {
        setMenuOpenId(null);
      }
    };
    if (menuOpenId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpenId]);

  // ✅ Delete Transaction
  const handleDelete = async (txnId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8080/api/v1/record/delete/${txnId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Transaction deleted successfully!");
      setDeleteConfirm(null);
      fetchTransactions();
      fetchData();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("❌ Failed to delete transaction.");
    }
  };

  // ✅ Form input handling
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Add transaction submit
  const handleSubmit = async () => {
    if (!formData.amount || !formData.category) {
      setSubmitError("Please fill in both Amount and Category.");
      return;
    }
    setSubmitError("");
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      await axios.post(
        "http://localhost:8080/api/v1/record/create",
        {
          cashBookId: book.id,
          date: new Date().toISOString().split("T")[0],
          amount: parseFloat(formData.amount),
          category: formData.category,
          paymentMode: formData.paymentMode,
          entryType: transactionType,
          description: formData.description,
          receiptUrl: "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFormData({ amount: "", category: "", paymentMode: "CASH", description: "" });
      setShowDialog(false);
      fetchTransactions();
      fetchData();
      onClose();
    } catch (error) {
      console.error("Error adding record:", error);
      let message = "Failed to add record. Check your connection or form data.";
      if (error.response?.data?.message) message = error.response.data.message;
      setSubmitError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[600px] max-h-[80vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {book.title} - Transactions
        </h2>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* ✅ Transactions List */}
        {transactions.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {transactions.map((txn) => (
              <li key={txn.id} className="py-3 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{txn.description}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(txn.date).toLocaleDateString()} • {txn.category} •{" "}
                    {txn.paymentMode}
                  </p>
                </div>

                <div className="flex items-center gap-3 relative">
                  <span
                    className={`font-medium ${
                      txn.type === "CASH_IN" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {txn.type === "CASH_IN" ? `+${txn.amount}` : `-${txn.amount}`}
                  </span>

                  {/* 3-dot menu */}
                  <div ref={(el) => (menuRefs.current[txn.id] = el)} className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(menuOpenId === txn.id ? null : txn.id);
                      }}
                      className="text-gray-500 hover:text-gray-700 px-2 text-xl"
                    >
                      ⋮
                    </button>

                    {menuOpenId === txn.id && (
                      <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md border border-gray-200 z-50 w-32">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm(txn);
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
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-10">No transactions found.</p>
        )}

        {/* ✅ Floating Buttons */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={() => {
              setTransactionType("CASH_IN");
              setShowDialog(true);
              setSubmitError("");
            }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600"
          >
            + CASH IN
          </button>
          <button
            onClick={() => {
              setTransactionType("CASH_OUT");
              setShowDialog(true);
              setSubmitError("");
            }}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600"
          >
            - CASH OUT
          </button>
        </div>

        {/* ✅ Add Transaction Dialog */}
        {showDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
              <h3 className="text-lg font-semibold mb-3">
                {transactionType === "CASH_IN" ? "Add Cash In" : "Add Cash Out"}
              </h3>

              {submitError && (
                <p className="text-red-600 text-sm mb-3 p-2 bg-red-50 border border-red-300 rounded">
                  {submitError}
                </p>
              )}

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-2"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-2"
              />
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-2"
              >
                <option value="CASH">Cash</option>
                <option value="CARD">Card</option>
                <option value="UPI">UPI</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
              </select>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 rounded w-full mb-4"
              />

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setShowDialog(false);
                    setSubmitError("");
                  }}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-4 py-2 rounded text-white ${
                    transactionType === "CASH_IN"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Delete Confirmation Popup */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[360px] text-center">
              <h3 className="text-lg font-semibold mb-3">
                Are you sure you want to delete this transaction?
              </h3>
              <p className="text-gray-600 mb-4">{deleteConfirm.description}</p>
              <div className="flex justify-center gap-4">
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
    </div>
  );
};

export default TransactionOverlay;
