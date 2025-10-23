import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import Addrecord from "../pages/Addrecord";
import LandingIntro from "../components/LandingIntro";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingIntro />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addrecord" element={<Addrecord />} />
    </Routes>
  );
}
