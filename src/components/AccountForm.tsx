import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function AccountForm() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveUserSession = (data: {
    token: string;
    userId: number;
    fullName: string;
    email: string;
    role: string;
  }) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", String(data.userId));
    localStorage.setItem("fullName", data.fullName);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await axiosClient.post("/account/login", {
          email,
          password,
        });

        saveUserSession(res.data);

        navigate("/user/dashboard");
      } else {
        const res = await axiosClient.post("/account/register", {
          fullName,
          email,
          password,
        });

        saveUserSession(res.data);

        alert("Registration successful!");

        navigate("/user/dashboard");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
      {/* Brand */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-orange-500">
          AdiyogiCabz
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Travel Smarter Across India
        </p>
      </div>

      {/* Heading */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="text-slate-500 mt-2 text-sm">
          {isLogin
            ? "Login to continue your bookings"
            : "Register to manage your rides"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
            isLogin
              ? "bg-white shadow text-orange-600"
              : "text-slate-500"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
            !isLogin
              ? "bg-white shadow text-orange-600"
              : "text-slate-500"
          }`}
        >
          Register
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>
      </div>

      <p className="text-xs text-center text-slate-500 mt-6">
        By continuing, you agree to our Privacy Policy and Terms &
        Conditions.
      </p>
    </div>
  );
}