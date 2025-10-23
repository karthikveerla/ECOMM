import { useState } from "react";
import "../styles/SignIn.css";
import signinImage from "../assets/signup-image.gif"; // use same or replace
import { useNavigate } from 'react-router-dom';


export default function Signin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.email.includes("@")) errs.email = "Valid email required";
    if (form.password.length < 6) errs.password = "Minimum 6 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      const res = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful!");
        console.log("Login response data:", data);
        const { accessToken, id, fullName, email: userEmail } = data;

        // ✅ Save data in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", id);
        localStorage.setItem("userName", fullName);
        localStorage.setItem("userEmail", userEmail);
        console.log("User data saved to localStorage");
        console.log("Access Token:", accessToken);
        console.log("User ID:", id);
        setTimeout(() => {
          navigate("/dashboard"); // or any application-inside route
        }, 1000);
      } else {
        setMessage("Error: " + (data.message || "Login failed."));
      }
    } catch (err) {
      setMessage("Error: Could not connect to server.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <img src={signinImage} alt="Sign In" className="signin-image" />
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>

          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Sign In</button>

          {message && (
            <p className={`message ${message.startsWith("Error") ? "text-red-600" : "text-green-600"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
