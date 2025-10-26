import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

const TransactionOverlay = ({ book, onClose, fetchData }) => {
  const [transactions, setTransactions] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [editingTxn, setEditingTxn] = useState(null); // 🆕
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuOpenId) return;
      const current = menuRefs.current[menuOpenId];
      if (current && !current.contains(event.target)) setMenuOpenId(null);
    };
    if (menuOpenId !== null) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpenId]);

  const handleDelete = async (txnId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:8080/api/v1/record/delete/${txnId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteConfirm(null);
      fetchTransactions();
      fetchData();
    } catch (error) {
      alert("❌ Failed to delete transaction.");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // 🆕 Handle add or update submit
  const handleSubmit = async () => {
    if (!formData.amount || !formData.category) {
      setSubmitError("Please fill in both Amount and Category.");
      return;
    }
    setSubmitError("");
    setLoading(true);
    const token = localStorage.getItem("accessToken");

    try {
      if (editingTxn) {
        // 🆕 PUT update
        await axios.put(
          `http://localhost:8080/api/v1/record/update/${editingTxn.id}`,
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
      } else {
        // Create new
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
      }

      setFormData({ amount: "", category: "", paymentMode: "CASH", description: "" });
      setEditingTxn(null);
      setShowDialog(false);
      fetchTransactions();
      fetchData();
    } catch (error) {
      setSubmitError("Failed to save record. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🧮 Calculate totals
  const totalCashIn = transactions
    .filter((t) => t.type === "CASH_IN")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalCashOut = transactions
    .filter((t) => t.type === "CASH_OUT")
    .reduce((sum, t) => sum + t.amount, 0);
  const net = totalCashIn - totalCashOut;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[650px] h-[80vh] rounded-xl shadow-lg flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✖
        </button>

        {/* 🧾 Top Section */}
        <div className="p-5 border-b flex flex-col items-start gap-1">
          <h2 className="text-2xl font-semibold text-gray-800">{book.title}</h2>
          <div className="flex gap-6 mt-2 text-sm">
            <p className="text-green-600 font-medium">Cash In: ₹{totalCashIn.toFixed(2)}</p>
            <p className="text-red-600 font-medium">Cash Out: ₹{totalCashOut.toFixed(2)}</p>
            <p className={`font-bold ${net >= 0 ? "text-green-700" : "text-red-700"}`}>
              Net: ₹{net.toFixed(2)}
            </p>
          </div>
        </div>

        {/* 💰 Transactions */}
        <div className="flex-1 overflow-y-auto p-5">
          {transactions.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {transactions.map((txn) => (
                <li
                  key={txn.id}
                  className="py-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setEditingTxn(txn);
                    setFormData({
                      amount: txn.amount,
                      category: txn.category,
                      paymentMode: txn.paymentMode,
                      description: txn.description,
                    });
                    setTransactionType(txn.type);
                    setShowDialog(true);
                  }} // 🆕 Edit on click
                >
                  <div>
                    <div className="font-medium text-gray-800">{txn.description}</div>
                    <p className="text-xs text-gray-500">
                      {new Date(txn.date).toLocaleDateString()} • {txn.category} •{" "}
                      {txn.paymentMode}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 relative">
                    <span
                      className={`font-semibold ${
                        txn.type === "CASH_IN" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {txn.type === "CASH_IN" ? `+₹${txn.amount}` : `-₹${txn.amount}`}
                    </span>
                    <div ref={(el) => (menuRefs.current[txn.id] = el)} className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId(menuOpenId === txn.id ? null : txn.id);
                        }}
                        className="text-gray-400 hover:text-gray-700 text-lg"
                      >
                        ⋮
                      </button>
                      {menuOpenId === txn.id && (
                        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-50 w-28">
                          <button
                            onClick={() => {
                              setDeleteConfirm(txn);
                              setMenuOpenId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                          >
                            Delete
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
        </div>

        {/* 🪙 Bottom Section */}
        <div className="border-t p-4 flex justify-center gap-6 bg-gray-50">
          <button
            onClick={() => {
              setTransactionType("CASH_IN");
              setEditingTxn(null);
              setShowDialog(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            + Cash In
          </button>
          <button
            onClick={() => {
              setTransactionType("CASH_OUT");
              setEditingTxn(null);
              setShowDialog(true);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            - Cash Out
          </button>
        </div>
      </div>

      {/* 💬 Add/Edit Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[60]">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-xl relative">
            <h3 className="text-lg font-semibold mb-3">
              {editingTxn
                ? `Edit ${transactionType === "CASH_IN" ? "Cash In" : "Cash Out"}`
                : transactionType === "CASH_IN"
                ? "Add Cash In"
                : "Add Cash Out"}
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

            <div className="flex justify-between">
              <button
                onClick={() => {
                  setShowDialog(false);
                  setEditingTxn(null);
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
                {loading
                  ? "Saving..."
                  : editingTxn
                  ? "Update"
                  : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🗑 Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[70]">
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
  );
};

export default TransactionOverlay;
