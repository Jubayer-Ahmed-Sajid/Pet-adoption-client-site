import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SignIn = () => {
  const navigate = useNavigate();
  const { user, Signin, googleSignin, gitHubSignin, resetPassword } = useAuth();
  const location = useLocation();

  if (user) {
    return <Navigate to={location?.state ? location.state : "/"} replace />;
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(6, "Password must be at least 6 characters."),
    }),
    onSubmit: async (values) => {
      Signin(values.email, values.password)
        .then(() => {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Signed in successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location?.state ? location.state : "/");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Sign in failed",
            text: error.message || "Invalid email or password",
          });
        });
    },
  });

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Reset Password",
      input: "email",
      inputLabel: "Enter your account email address",
      inputPlaceholder: "you@example.com",
      inputValue: formik.values.email,
      showCancelButton: true,
      confirmButtonText: "Send Reset Link",
    });

    if (email) {
      try {
        await resetPassword(email);
        Swal.fire({
          icon: "success",
          title: "Reset email sent",
          text: `Check your inbox at ${email} for instructions to reset your password.`,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Could not send reset email",
          text: err.message,
        });
      }
    }
  };

  const handleGoogleSignin = () => {
    googleSignin()
      .then(() => {
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire({ icon: "error", title: "OAuth failed", text: error.message });
      });
  };

  const handleGitHubSignin = () => {
    gitHubSignin()
      .then(() => {
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire({ icon: "error", title: "OAuth failed", text: error.message });
      });
  };

  return (
    <div className="pt-28 pb-20 max-w-md mx-auto px-4 sm:px-6">
      <div className="bg-card rounded-card border border-rule p-8 sm:p-10 shadow-card">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-muted">
            Welcome Back
          </span>
          <h1 className="text-3xl font-display font-semibold text-ink mt-1">
            Sign In
          </h1>
          <p className="text-xs sm:text-sm text-ink-2 mt-1.5">
            Access your applications, favorites, and dashboard
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-ink-2 mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-accent-3 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-xs font-semibold text-ink-2">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-accent-3 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-accent-3 mt-1">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-pill bg-accent hover:bg-accent-deep text-accent-ink font-semibold text-sm transition-colors hover-lift press-down shadow-xs mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Social Logins */}
        <div className="mt-6 pt-6 border-t border-rule">
          <p className="text-center text-xs text-muted mb-4">Or continue with</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleSignin}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-pill bg-paper-2 hover:bg-paper-3 border border-rule text-xs font-semibold text-ink transition-colors press-down"
            >
              <FaGoogle className="text-red-500" />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={handleGitHubSignin}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-pill bg-paper-2 hover:bg-paper-3 border border-rule text-xs font-semibold text-ink transition-colors press-down"
            >
              <FaGithub />
              <span>GitHub</span>
            </button>
          </div>
        </div>

        {/* Link to Sign Up */}
        <p className="text-center text-xs text-muted mt-6">
          Don't have an account?{" "}
          <Link to="/signUp" className="font-semibold text-ink hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
