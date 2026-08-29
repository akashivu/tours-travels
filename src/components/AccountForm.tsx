import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
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

  const [showForgotPassword, setShowForgotPassword] =
    useState(false);

  const [showResetPassword, setShowResetPassword] =
    useState(false);

  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  /* =====================================================
     RESEND OTP TIMER
  ====================================================== */

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

  /* =====================================================
     SAVE SESSION
  ====================================================== */

  const saveUserSession = (data: {
    token: string;
    userId: number;
    fullName: string;
    email: string;
    role: string;
  }) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "userId",
      String(data.userId)
    );
    localStorage.setItem(
      "fullName",
      data.fullName
    );
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);
  };

  /* =====================================================
     LOGIN / REGISTER
  ====================================================== */

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) return;

    try {
      setLoading(true);

      if (isLogin) {
        const res = await axiosClient.post(
          "/api/account/login",
          {
            email,
            password,
          }
        );

        saveUserSession(res.data);

        navigate("/user/dashboard");
      } else {
        if (!fullName.trim()) return;

        await axiosClient.post(
          "/api/account/register",
          {
            fullName,
            email,
            password,
          }
        );

        alert("OTP sent to your email.");

        setShowOtpScreen(true);
      }
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     VERIFY REGISTRATION OTP
  ====================================================== */

  const verifyOtp = async () => {
    try {
      setLoading(true);

      const res = await axiosClient.post(
        "/api/account/verify-otp",
        {
          email,
          otp,
        }
      );

      saveUserSession(res.data);

      alert("Email verified successfully!");

      navigate("/user/dashboard");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     FORGOT PASSWORD
  ====================================================== */

  const forgotPassword = async () => {
    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      await axiosClient.post(
        "/api/account/forgot-password",
        {
          email,
        }
      );

      alert(
        "Password reset OTP sent successfully."
      );

      setShowForgotPassword(true);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Unable to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     VERIFY FORGOT OTP
  ====================================================== */

  const verifyForgotOtp = async () => {
    try {
      setLoading(true);

      await axiosClient.post(
        "/api/account/verify-forgot-password-otp",
        {
          email,
          otp: forgotOtp,
        }
      );

      alert("OTP verified successfully.");

      setShowResetPassword(true);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     RESET PASSWORD
  ====================================================== */

  const resetPassword = async () => {
    if (newPassword.length < 8) {
      alert(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await axiosClient.post(
        "/api/account/reset-password",
        {
          email,
          newPassword,
        }
      );

      alert(
        "Password updated successfully! Please login."
      );

      setShowForgotPassword(false);
      setShowResetPassword(false);

      setForgotOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setPassword("");

      setIsLogin(true);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     RESEND OTP
  ====================================================== */

  const resendOtp = async () => {
    try {
      setResending(true);

      await axiosClient.post(
        `/api/account/resend-otp?email=${encodeURIComponent(
          email
        )}`
      );

      alert(
        "A new OTP has been sent to your email."
      );

      setResendCooldown(30);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Failed to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  /* =====================================================
     RESET TO LOGIN
  ====================================================== */

  const backToLogin = () => {
    setShowOtpScreen(false);
    setShowForgotPassword(false);
    setShowResetPassword(false);

    setOtp("");
    setForgotOtp("");
    setNewPassword("");
    setConfirmPassword("");

    setIsLogin(true);
  };

  /* =====================================================
     RENDER
  ====================================================== */

  return (
    <main
      className="
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        bg-white
        px-5
        py-10
      "
    >
      <div
        className="
          w-full
          max-w-[400px]
        "
      >
        {/* =================================================
            LOGO
        ================================================== */}

        <div className="mb-9 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Elixway home"
            className="
              flex
              items-center
              gap-3
              transition-opacity
              hover:opacity-80
            "
          >
            <img
              src="/image/elix.png"
              alt="Elixway"
              className="
                h-11
                w-auto
                object-contain
              "
            />

            <span
              className="
                text-[22px]
                font-semibold
                tracking-[-0.045em]
                text-neutral-950
              "
            >
              Elixway
            </span>
          </button>
        </div>

        {/* =================================================
            AUTH CONTENT
        ================================================== */}

        <div
          className="
            rounded-[24px]
            border
            border-neutral-200
            bg-white
            px-7
            py-8

            sm:px-9
            sm:py-9
          "
        >
          {/* Back */}
          {(showOtpScreen ||
            showForgotPassword ||
            showResetPassword) && (
            <button
              type="button"
              onClick={backToLogin}
              className="
                mb-6
                flex
                items-center
                gap-2
                text-sm
                text-neutral-500
                transition-colors
                hover:text-neutral-950
              "
            >
              <ArrowLeft size={16} />
              Back
            </button>
          )}

          {/* =================================================
              HEADING
          ================================================== */}

          <div className="text-center">
            <h1
              className="
                text-[28px]
                font-semibold
                tracking-[-0.04em]
                text-neutral-950
              "
            >
              {showOtpScreen
                ? "Verify your email"
                : showForgotPassword &&
                  !showResetPassword
                ? "Check your email"
                : showResetPassword
                ? "Create a new password"
                : isLogin
                ? "Sign in"
                : "Create your account"}
            </h1>

            <p
              className="
                mt-2
                text-[13px]
                leading-6
                text-neutral-500
              "
            >
              {showOtpScreen ? (
                <>
                  Enter the verification code sent to
                  <br />
                  <span className="font-medium text-neutral-800">
                    {email}
                  </span>
                </>
              ) : showForgotPassword &&
                !showResetPassword ? (
                <>
                  Enter the verification code sent to
                  <br />
                  <span className="font-medium text-neutral-800">
                    {email}
                  </span>
                </>
              ) : showResetPassword ? (
                "Choose a new password for your account."
              ) : isLogin ? (
                "Sign in to continue to Elixway."
              ) : (
                "Create an account to save your trips."
              )}
            </p>
          </div>

          {/* =================================================
              LOGIN / REGISTER SWITCH
          ================================================== */}

          {!showOtpScreen &&
            !showForgotPassword && (
              <div
                className="
                  mt-7
                  flex
                  border-b
                  border-neutral-200
                "
              >
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`
                    flex-1
                    border-b-2
                    pb-3
                    text-sm
                    font-medium
                    transition-colors
                    ${
                      isLogin
                        ? "border-neutral-950 text-neutral-950"
                        : "border-transparent text-neutral-400 hover:text-neutral-700"
                    }
                  `}
                >
                  Sign in
                </button>

                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`
                    flex-1
                    border-b-2
                    pb-3
                    text-sm
                    font-medium
                    transition-colors
                    ${
                      !isLogin
                        ? "border-neutral-950 text-neutral-950"
                        : "border-transparent text-neutral-400 hover:text-neutral-700"
                    }
                  `}
                >
                  Create account
                </button>
              </div>
            )}

          {/* =================================================
              OTP
          ================================================== */}

          {showOtpScreen ? (
            <div className="mt-7 space-y-4">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter 6-digit code"
                maxLength={6}
                autoFocus
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-white
                  px-4
                  text-center
                  text-lg
                  tracking-[0.4em]
                  text-neutral-950
                  outline-none
                  transition
                  placeholder:text-neutral-400
                  focus:border-neutral-950
                  focus:ring-1
                  focus:ring-neutral-950
                "
              />

              <button
                type="button"
                onClick={verifyOtp}
                disabled={loading || otp.length !== 6}
                className="
                  h-12
                  w-full
                  rounded-xl
                  bg-neutral-950
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-neutral-800
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Verifying..."
                  : "Verify email"}
              </button>

              <div className="pt-1 text-center">
                {resendCooldown > 0 ? (
                  <span className="text-xs text-neutral-400">
                    Resend code in{" "}
                    {resendCooldown}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={resending}
                    className="
                      text-xs
                      font-medium
                      text-neutral-700
                      hover:text-neutral-950
                      hover:underline
                    "
                  >
                    {resending
                      ? "Sending..."
                      : "Resend code"}
                  </button>
                )}
              </div>
            </div>
          ) : showForgotPassword &&
            !showResetPassword ? (
            /* =============================================
               FORGOT OTP
            ============================================== */
            <div className="mt-7 space-y-4">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Enter verification code"
                maxLength={6}
                autoFocus
                value={forgotOtp}
                onChange={(e) =>
                  setForgotOtp(
                    e.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  px-4
                  text-center
                  text-lg
                  tracking-[0.3em]
                  outline-none
                  focus:border-neutral-950
                  focus:ring-1
                  focus:ring-neutral-950
                "
              />

              <button
                type="button"
                onClick={verifyForgotOtp}
                disabled={loading}
                className="
                  h-12
                  w-full
                  rounded-xl
                  bg-neutral-950
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-neutral-800
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Verifying..."
                  : "Continue"}
              </button>
            </div>
          ) : showResetPassword ? (
            /* =============================================
               RESET PASSWORD
            ============================================== */
            <div className="mt-7 space-y-4">
              <PasswordInput
                placeholder="New password"
                value={newPassword}
                onChange={setNewPassword}
                show={showNewPassword}
                setShow={setShowNewPassword}
              />

              <PasswordInput
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                show={showConfirmPassword}
                setShow={setShowConfirmPassword}
              />

              <button
                type="button"
                onClick={resetPassword}
                disabled={loading}
                className="
                  h-12
                  w-full
                  rounded-xl
                  bg-neutral-950
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-neutral-800
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Updating..."
                  : "Update password"}
              </button>
            </div>
          ) : (
            /* =============================================
               LOGIN / REGISTER FORM
            ============================================== */
            <div className="mt-7 space-y-4">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-neutral-200
                    bg-white
                    px-4
                    text-sm
                    text-neutral-950
                    outline-none
                    transition
                    placeholder:text-neutral-400
                    focus:border-neutral-950
                    focus:ring-1
                    focus:ring-neutral-950
                  "
                />
              )}

              <input
                type="email"
                placeholder="Email address"
                autoComplete="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-white
                  px-4
                  text-sm
                  text-neutral-950
                  outline-none
                  transition
                  placeholder:text-neutral-400
                  focus:border-neutral-950
                  focus:ring-1
                  focus:ring-neutral-950
                "
              />

              <PasswordInput
                placeholder="Password"
                value={password}
                onChange={setPassword}
                show={showPassword}
                setShow={setShowPassword}
              />

              {/* Forgot Password */}
              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={forgotPassword}
                    className="
                      text-xs
                      font-medium
                      text-neutral-600
                      transition-colors
                      hover:text-neutral-950
                      hover:underline
                    "
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="
                  mt-2
                  h-12
                  w-full
                  rounded-xl
                  bg-neutral-950
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-200
                  hover:bg-neutral-800
                  active:scale-[0.99]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Please wait..."
                  : isLogin
                  ? "Sign in"
                  : "Create account"}
              </button>
            </div>
          )}

          {/* =================================================
              FOOTER
          ================================================== */}

          {!showOtpScreen &&
            !showForgotPassword &&
            !showResetPassword && (
              <p
                className="
                  mt-7
                  text-center
                  text-[11px]
                  leading-5
                  text-neutral-400
                "
              >
                By continuing, you agree to Elixway's{" "}
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      "/terms-and-conditions"
                    )
                  }
                  className="text-neutral-600 hover:underline"
                >
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() =>
                    navigate("/privacy-policy")
                  }
                  className="text-neutral-600 hover:underline"
                >
                  Privacy Policy
                </button>
                .
              </p>
            )}
        </div>

        {/* Small bottom brand */}
        <p
          className="
            mt-7
            text-center
            text-[11px]
            text-neutral-400
          "
        >
          © 2026 Elixway
        </p>
      </div>
    </main>
  );
}

/* =========================================================
   PASSWORD INPUT
========================================================= */

interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  setShow: (value: boolean) => void;
}

function PasswordInput({
  placeholder,
  value,
  onChange,
  show,
  setShow,
}: PasswordInputProps) {
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        autoComplete="current-password"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          h-12
          w-full
          rounded-xl
          border
          border-neutral-200
          bg-white
          px-4
          pr-12
          text-sm
          text-neutral-950
          outline-none
          transition
          placeholder:text-neutral-400
          focus:border-neutral-950
          focus:ring-1
          focus:ring-neutral-950
        "
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={
          show
            ? "Hide password"
            : "Show password"
        }
        className="
          absolute
          right-3
          top-1/2
          flex
          h-8
          w-8
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          text-neutral-400
          transition-colors
          hover:bg-neutral-100
          hover:text-neutral-700
        "
      >
        {show ? (
          <EyeOff size={17} strokeWidth={1.7} />
        ) : (
          <Eye size={17} strokeWidth={1.7} />
        )}
      </button>
    </div>
  );
}