import { useState } from "react";
// REMOVED: import "../styles/SignIn.css";
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
    // Equivalent of .signin-container & height: calc(100vh - 80px)
    // Assuming your fixed header is 64px (h-16), so 80px is close to pt-20
    <div 
      className="
        flex justify-center items-center 
        bg-[#f9f7fb] 
        pt-20 lg:pt-0 
        min-h-screen 
        lg:min-h-[calc(100vh-64px)] 
      "
    >
      {/* Equivalent of .signin-card */}
      <div 
        className="
          flex bg-white shadow-xl rounded-xl overflow-hidden 
          max-w-4xl w-full mx-4 lg:mx-0 
          my-8 lg:my-0
        "
      >
        {/* Equivalent of .signin-image */}
        {/* Hidden on small screens to save space */}
        <img 
          src={signinImage} 
          alt="Sign In" 
          className="w-1/2 object-cover hidden md:block" 
        />
        
        {/* Equivalent of .signin-form */}
        <form 
          className="p-10 w-full md:w-1/2 bg-[#fdfbff]" 
          onSubmit={handleSubmit}
        >
          {/* Equivalent of .signin-form h2 */}
          <h2 className="text-3xl text-[#6a1b9a] mb-6 text-center font-semibold">
            Welcome Back
          </h2>

          <label className="block mb-1 font-semibold text-gray-700">Email</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#8e24aa] focus:border-transparent"
          />
          {errors.email && <p className="text-red-600 text-sm mt-[-8px] mb-3">{errors.email}</p>}

          <label className="block mb-1 font-semibold text-gray-700">Password</label>
          <input 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-[#8e24aa] focus:border-transparent"
          />
          {errors.password && <p className="text-red-600 text-sm mt-[-8px] mb-3">{errors.password}</p>}

          {/* Equivalent of .signin-form button */}
          <button 
            type="submit"
            className="
              w-full bg-[#8e24aa] hover:bg-[#6a1b9a] text-white 
              py-3 rounded-md font-bold cursor-pointer transition duration-200
            "
          >
            Sign In
          </button>

          {message && (
            <p className={`mt-4 text-center font-bold ${message.startsWith("Error") ? "text-red-600" : "text-green-600"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}