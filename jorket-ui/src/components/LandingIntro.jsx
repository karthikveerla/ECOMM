import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const LandingIntro = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6">
      {/* Animated intro text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Manage Your Expenses Smarter
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Track your daily income and expenses with ease. <br />
          Get insights, maintain budgets, and stay financially organized — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-lg"
            onClick={() => (window.location.href = "/signup")}
          >
            Get Started
          </button>

          <button
            className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl text-lg flex items-center justify-center"
            onClick={() => (window.location.href = "/signin")}
          >
            Sign In <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Optional: Decorative image or illustration */}
      <motion.img
        src="/assets/expense-dashboard-preview.png"
        alt="Expense Tracker Dashboard Preview"
        className="w-full max-w-3xl mt-12 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
    </section>
  );
};

export default LandingIntro;
