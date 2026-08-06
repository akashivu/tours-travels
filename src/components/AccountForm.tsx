import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function AccountForm() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (showOtpScreen) {
      setResendCooldown(30);
    }
  }, [showOtpScreen]);

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
      setLoading(true);

      if (isLogin) {
        const res = await axiosClient.post("/account/login", {
          email,
          password,
        });

        saveUserSession(res.data);

        navigate("/user/dashboard");
      } else {
        await axiosClient.post("/account/register", {
          fullName,
          email,
          password,
        });

        alert("OTP sent to your email.");

        setShowOtpScreen(true);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);

      const res = await axiosClient.post("/account/verify-otp", {
        email,
        otp,
      });

      saveUserSession(res.data);

      alert("Email verified successfully!");

      navigate("/user/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    try {
      setLoading(true);

      await axiosClient.post("/account/forgot-password", {
        email,
      });

      alert("Password reset OTP sent successfully.");

      setShowForgotPassword(true);
    } catch (error: any) {
      alert(error.response?.data?.message || "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyForgotOtp = async () => {
    try {
      setLoading(true);

      await axiosClient.post("/account/verify-forgot-password-otp", {
        email,
        otp: forgotOtp,
      });

      alert("OTP verified successfully.");

      setShowResetPassword(true);
    } catch (error: any) {
      alert(error.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await axiosClient.post("/account/reset-password", {
        email,
        newPassword,
      });

      alert("Password updated successfully! Please login.");

      setShowForgotPassword(false);
      setShowResetPassword(false);

      setForgotOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setPassword("");

      setIsLogin(true);
    } catch (error: any) {
      alert(error.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setResending(true);

      await axiosClient.post(
        `/account/resend-otp?email=${encodeURIComponent(email)}`
      );

      alert("A new OTP has been sent to your email.");

      setResendCooldown(30);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
      {/* Brand */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-orange-500">
          ElixWay
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Travel Smarter Across India
        </p>
      </div>

      {/* Heading */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          {showOtpScreen
            ? "Verify Email"
            : showForgotPassword && !showResetPassword
            ? "Verify Password Reset OTP"
            : showResetPassword
            ? "Create New Password"
            : isLogin
            ? "Welcome Back"
            : "Create Account"}
        </h2>

        {showOtpScreen ? (
          <p className="text-slate-500 mt-2 text-sm">
            Enter the verification code sent to
            <br />
            <strong className="text-slate-700">{email}</strong>
          </p>
        ) : showForgotPassword && !showResetPassword ? (
          <p className="text-slate-500 mt-2 text-sm">
            Enter the password reset OTP sent to
            <br />
            <strong className="text-slate-700">{email}</strong>
          </p>
        ) : showResetPassword ? (
          <p className="text-slate-500 mt-2 text-sm">
            Choose a strong password for your account.
          </p>
        ) : (
          <p className="text-slate-500 mt-2 text-sm">
            {isLogin
              ? "Login to continue your bookings"
              : "Register to manage your rides"}
          </p>
        )}
      </div>

      {/* Tabs */}
      {!showOtpScreen && !showForgotPassword && (
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
      )}

      {/* Form */}
      {showOtpScreen ? (
        <div className="space-y-4">
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            autoFocus
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-center tracking-[0.4em] text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            onClick={() => {
              setShowOtpScreen(false);
              setOtp("");
              setResendCooldown(0);
            }}
            className="w-full border border-slate-300 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-50 transition"
          >
            Back
          </button>

          <div className="text-center text-sm">
            <span className="text-slate-500">Didn't receive the code? </span>
            {resendCooldown > 0 ? (
              <span className="text-slate-400">
                Resend OTP in {resendCooldown}s
              </span>
            ) : (
              <button
                onClick={resendOtp}
                disabled={resending}
                className="text-orange-600 hover:underline disabled:text-gray-400 disabled:no-underline"
              >
                {resending ? "Resending..." : "Resend OTP"}
              </button>
            )}
          </div>
        </div>
      ) : showForgotPassword && !showResetPassword ? (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            maxLength={6}
            value={forgotOtp}
            onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full border border-slate-200 rounded-xl px-4 py-3"
          />

          <button
            onClick={verifyForgotOtp}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      ) : showResetPassword ? (
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={resetPassword}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          <button
            onClick={() => {
              setShowForgotPassword(false);
              setShowResetPassword(false);
              setForgotOtp("");
              setNewPassword("");
              setConfirmPassword("");
            }}
            className="w-full border border-slate-300 py-3 rounded-xl"
          >
            Back to Login
          </button>
        </div>
      ) : (
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
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Create Account"}
          </button>

          {isLogin && (
            <button
              type="button"
              onClick={forgotPassword}
              className="w-full text-right text-sm text-orange-500 hover:underline mt-2"
            >
              Forgot Password?
            </button>
          )}
        </div>
      )}

      <p className="text-xs text-center text-slate-500 mt-6">
        By continuing, you agree to our Privacy Policy and Terms &
        Conditions.
      </p>
    </div>
  );
}