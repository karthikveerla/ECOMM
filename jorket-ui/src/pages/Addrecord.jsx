import React, { useState } from "react";
import "../styles/Addrecord.css";

export default function Addrecord() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    document: null,
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("document", formData.document);
    data.append("image", formData.image);

    await fetch("http://localhost:8080/api/records/upload", {
      method: "POST",
      body: data,
    });

    alert("Record uploaded successfully!");
  };

 return (
    <div className="upload-container">
      <div className="upload-card">
        <form className="upload-form" onSubmit={handleSubmit}>
          <h2>Upload New Record</h2>

          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Document</label>
          <input
            type="file"
            name="document"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            required
          />

          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <button type="submit">Upload</button>

          {/* {message && <p className="upload-message">{message}</p>} */}
        </form>
      </div>
    </div>
  );
}
