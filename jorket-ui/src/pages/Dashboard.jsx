import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [cashBooks, setCashBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    month: "",
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");

      const response = await axios.get("http://localhost:8080/api/v1/cashbook/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    const payload = {
      title: formData.title,
      year: parseInt(formData.year),
      month: parseInt(formData.month),
      userId: parseInt(userId),
    };

    try {
      await axios.post("http://localhost:8080/api/v1/cashbook/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          userId, // 👈 backend expects userId in header
        },
      });

      setShowModal(false);
      setFormData({ title: "", year: "", month: "" });
      fetchData(); // refresh the list
    } catch (error) {
      console.error("Error creating CashBook:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* ✅ Create CashBook Button */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        Create CashBook
      </button>

      {/* ✅ Existing CashBooks */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Your CashBooks</h3>
        {cashBooks.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {cashBooks.map((book) => (
              <div
                key={book.id}
                className="p-4 bg-white shadow rounded-lg border"
              >
                <h4 className="font-semibold text-lg">{book.title}</h4>
                <p className="text-gray-600">Year: {book.year}</p>
                <p className="text-gray-600">Month: {book.month}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-2">No cashbooks available.</p>
        )}
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h3 className="text-xl font-semibold mb-4 text-center">Create CashBook</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-3">
                <label className="block font-medium mb-1">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-3">
                <label className="block font-medium mb-1">Month</label>
                <input
                  type="number"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                  min="1"
                  max="12"
                  className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
