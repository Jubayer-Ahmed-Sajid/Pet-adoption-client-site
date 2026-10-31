import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle, FaUserShield } from "react-icons/fa";

const SignIn = () => {
  const navigate = useNavigate();
  const { Signin, googleSignin, gitHubSignin } = useAuth();
  const location = useLocation();

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
            text: error.message,
          });
        });
    },
  });

  const handleFillDemoAdmin = () => {
    formik.setValues({
      email: "sajid661azxcca@gmail.com",
      password: "1234aA!",
    });
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

        {/* Demo Account Callout for Evaluators */}
        <div className="mb-6 p-3.5 rounded-stock bg-paper-2 border border-rule flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-ink-2">
            <FaUserShield className="text-accent-3 text-base shrink-0" />
            <span>Evaluating as recruiter?</span>
          </div>
          <button
            type="button"
            onClick={handleFillDemoAdmin}
            className="px-3 py-1.5 rounded-pill bg-accent text-accent-ink font-semibold text-xs hover:bg-accent-deep transition-colors shrink-0"
          >
            Fill Demo Admin
          </button>
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
            <label htmlFor="password" className="block text-xs font-semibold text-ink-2 mb-1.5">
              Password
            </label>
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
            className="w-full py-3 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-sm text-sm transition-colors mt-2"
          >
            Sign In to Account
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-rule"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted">Or continue with</span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="py-2.5 px-3 rounded-input bg-paper-2 hover:bg-paper-3 border border-rule text-xs font-semibold text-ink inline-flex items-center justify-center gap-2 transition-colors"
          >
            <FaGoogle />
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={handleGitHubSignin}
            className="py-2.5 px-3 rounded-input bg-paper-2 hover:bg-paper-3 border border-rule text-xs font-semibold text-ink inline-flex items-center justify-center gap-2 transition-colors"
          >
            <FaGithub />
            <span>GitHub</span>
          </button>
        </div>

        {/* Sign Up Redirect */}
        <p className="text-xs text-center text-muted mt-6">
          Don't have an account yet?{" "}
          <Link to="/signUp" className="text-ink font-semibold hover:text-accent-3 underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
