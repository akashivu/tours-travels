import { useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { X, Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import axiosClient from "../api/axiosClient";

import "./AuthModal.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
}: AuthModalProps) {
  const navigate = useNavigate();

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [error, setError] = useState("");

  // Body scroll lock is handled by Navbar (single owner, since it
  // also locks for the sidebar). Only handle Escape here.
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  /*
   * ================================================
   * GOOGLE SIGN IN
   * ================================================
   */
  const handleGoogleSignIn = async () => {
    if (googleLoading) return;

    try {
      setGoogleLoading(true);
      setError("");

      const provider =
        new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account",
      });

      /*
       * Google → Firebase
       */
      const result =
        await signInWithPopup(
          auth,
          provider
        );

      /*
       * Firebase ID token
       */
      const firebaseIdToken =
        await result.user.getIdToken();

      /*
       * Firebase → Spring Boot
       */
      const response =
        await axiosClient.post(
          "/account/google",
          {
            idToken: firebaseIdToken,
          }
        );

      const data = response.data;

      /*
       * Save YOUR Elixway JWT
       */
      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "userId",
        String(data.userId)
      );

      localStorage.setItem(
        "fullName",
        data.fullName || ""
      );

      localStorage.setItem(
        "email",
        data.email || ""
      );

      localStorage.setItem(
        "role",
        data.role || "USER"
      );

      /*
       * Optional complete user object
       */
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: data.userId,
          fullName: data.fullName,
          email: data.email,
          role: data.role,
        })
      );

      /*
       * Close popup
       */
      onClose();

      /*
       * Go to authenticated dashboard
       */
      navigate("/user/dashboard");

    } catch (err: any) {
      console.error(
        "Google sign in failed:",
        err
      );

      /*
       * If user simply closes Google popup,
       * don't show an ugly error.
       */
      if (
        err?.code ===
        "auth/popup-closed-by-user"
      ) {
        return;
      }

      setError(
        err?.response?.data?.message ||
          "Unable to sign in with Google. Please try again."
      );

    } finally {
      setGoogleLoading(false);
    }
  };

  
  const handleEmailContinue = () => {
    onClose();
    navigate("/account");
  };

  return (
    <div
      className="auth-modal-backdrop"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        {/* CLOSE */}
        <button
          type="button"
          className="auth-modal-close"
          onClick={onClose}
          aria-label="Close authentication"
        >
          <X size={25} strokeWidth={2.5} />
        </button>

        {/* HEADER */}
<div className="auth-modal-header">
  <h1 id="auth-title">
    Welcome to Elixway.
    <br />
    <span>
      Let's make your next trip
      <b>.</b>
    </span>
  </h1>

  <p>
    Sign in or create your account to
    make travel planning easier:
  </p>
</div>

{/* BENEFITS */}
<ul className="auth-benefits">
  <li>
    Member-only travel deals and savings
  </li>

  <li>
    Faster bookings with your details saved
  </li>

  <li>
    Save and manage your trips across devices
  </li>
</ul>

        {/* ERROR */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* GOOGLE */}
        <button
          type="button"
          className="auth-google-button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <>
              <Loader2
                size={20}
                className="auth-spinner"
              />

              <span>
                Signing in...
              </span>
            </>
          ) : (
            <>
              <span className="google-logo">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.22Z"
                  />

                  <path
                    fill="#34A853"
                    d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.75Z"
                  />

                  <path
                    fill="#FBBC05"
                    d="M6.54 13.84a5.86 5.86 0 0 1 0-3.68V7.63H3.3a9.75 9.75 0 0 0 0 8.74l3.24-2.53Z"
                  />

                  <path
                    fill="#EA4335"
                    d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.2 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.38l3.24 2.53C7.31 7.85 9.46 6.13 12 6.13Z"
                  />
                </svg>
              </span>

              <span>
                Google
              </span>
            </>
          )}
        </button>

        {/* DIVIDER */}
        <div className="auth-divider">
          <span />
          <p>or</p>
          <span />
        </div>

        {/* EMAIL */}
        <button
          type="button"
          className="auth-email-button"
          onClick={handleEmailContinue}
        >
          <Mail
            size={20}
            strokeWidth={1.8}
          />

          <span>
            Continue with email
          </span>
        </button>

        {/* LEGAL */}
        <p className="auth-legal">
          By adding your email you accept
          our{" "}
          <button
            type="button"
            onClick={() =>
              navigate("/terms-and-conditions")
            }
          >
            Terms of Use
          </button>{" "}
          and{" "}
          <button
            type="button"
            onClick={() =>
              navigate("/privacy-policy")
            }
          >
            Privacy Policy
          </button>
          .
        </p>
      </div>
    </div>
  );
}