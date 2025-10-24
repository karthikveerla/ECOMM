import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CashBookDialog.css";

export default function CashBookDialog({ isOpen, onClose, fetchData }) {
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          userId, // backend expects userId in headers
        },
      });

      onClose();
      setFormData({ title: "", year: "", month: "" });
      fetchData(); // refresh the dashboard list
    } catch (error) {
      console.error("Error creating CashBook:", error);
    }
  };

  return (
    <div className="overlay">
      <div className="dialog">
        <h2>Create New CashBook</h2>

        <form onSubmit={handleSubmit} className="dialog-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter CashBook title"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Month</label>
              <input
                type="number"
                name="month"
                min="1"
                max="12"
                value={formData.month}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="dialog-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
