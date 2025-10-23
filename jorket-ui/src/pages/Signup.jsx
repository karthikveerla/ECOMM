import { useState } from "react";
import "../styles/SignUp.css";
import signupImage from "../assets/signup-image.gif"; // path to uploaded image
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    password: "",
    role: "CUSTOMER",
  });

  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!form.fullName.trim()) errors.fullName = "Name is required";
    if (!form.email.includes("@")) errors.email = "Valid email required";
    if (form.password.length < 6) errors.password = "Minimum 6 characters";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const res = await fetch("http://localhost:8080/api/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          fullName: form.fullName
        }),
      });

      const data = await res.json().catch(() => ({})); // 👈 prevent crash if no JSON

      if (res.ok) {
        setMessage("Signup successful!");
        navigate("/signin");
      } else {
        // Safely get message from backend response
        setMessage(data.message ? data.message : "Signup failed. Please try again.");
        console.error("Signup error data:", data);
      }
    } catch (err) {
      setMessage("❌ Error: Could not connect to server.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <img src={signupImage} alt="Sign Up" className="signup-image" />
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>

          <label>Full Name</label>
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} />
          {formErrors.fullName && <p className="error">{formErrors.fullName}</p>}

          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          {formErrors.email && <p className="error">{formErrors.email}</p>}

          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
          {formErrors.password && <p className="error">{formErrors.password}</p>}

          <button type="submit">Sign Up</button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
