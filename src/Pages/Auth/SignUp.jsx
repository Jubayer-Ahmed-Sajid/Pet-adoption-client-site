import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import axios from "axios";
import google from "../../assets/google-logo-history-png-2603.png";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const { createUser, updateUser, googleSignin, gitHubSignin } = useAuth();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      image: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(25, "Must be 25 characters or less")
        .required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .required("No password provided.")
        .min(6, "Password must be at least 6 characters.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
          "Must contain uppercase, lowercase, number, and special character"
        ),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const email = values.email;
        const name = values.fullName;
        const password = values.password;
        const image = values.Profile;

        let photo_url = "https://i.ibb.co/RgXFFJW/2c791441-ac9f-411f-85a8-9fb6e8b834f0.jpg";

        if (image) {
          const formData = new FormData();
          formData.append("image", image);
          const res = await axios.post(image_hosting_api, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (res.data?.data?.display_url) {
            photo_url = res.data.data.display_url;
          }
        }

        await createUser(email, password);
        await updateUser(name, photo_url);

        const userInfo = {
          name,
          email,
          photo_url,
          isAdmin: false,
        };

        await axiosPublic.post("/users", userInfo);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Account created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(location?.state ? location.state : "/");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Sign up failed",
          text: err.message,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleGoogleSignin = () => {
    googleSignin()
      .then(async (result) => {
        const photo_url = result?.user?.photoURL || "";
        const userInfo = {
          name: result?.user?.displayName || "Community Member",
          photo_url,
          email: result?.user?.email,
          isAdmin: false,
        };
        await axiosPublic.post("/users", userInfo);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signed in with Google!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire({ icon: "error", title: "OAuth failed", text: error.message });
      });
  };

  const handleGitHubSignin = () => {
    gitHubSignin()
      .then(async (result) => {
        const photo_url = result?.user?.photoURL || "";
        const userInfo = {
          name: result?.user?.displayName || "Community Member",
          photo_url,
          email: result?.user?.email,
          isAdmin: false,
        };
        await axiosPublic.post("/users", userInfo);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signed in with GitHub!",
          showConfirmButton: false,
          timer: 1500,
        });
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
            Join Our Community
          </span>
          <h1 className="text-3xl font-display font-semibold text-ink mt-1">
            Create Account
          </h1>
          <p className="text-xs sm:text-sm text-ink-2 mt-1.5">
            Connect with rescue sanctuaries, save favorites, and adopt companions
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold text-ink-2 mb-1.5">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              placeholder="Jane Doe"
              className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-xs text-accent-3 mt-1">{formik.errors.fullName}</p>
            )}
          </div>

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

          <div>
            <label htmlFor="image" className="block text-xs font-semibold text-ink-2 mb-1.5">
              Profile Photo (Optional)
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                formik.setFieldValue("Profile", file);
              }}
              onBlur={formik.handleBlur}
              className="w-full text-xs text-muted file:mr-3 file:py-2 file:px-3 file:rounded-pill file:border-0 file:text-xs file:font-semibold file:bg-paper file:text-ink hover:file:bg-paper-3"
            />
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-3 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-sm text-sm transition-colors mt-2 disabled:opacity-60"
          >
            {formik.isSubmitting ? "Creating Account…" : "Register as Adopter"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-rule" />
          </div>
          <span className="relative bg-card px-3 text-xs uppercase tracking-wider text-muted font-medium">
            or continue with
          </span>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleGoogleSignin}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-pill border border-rule bg-paper hover:bg-paper-2 text-ink text-xs font-semibold transition-colors shadow-xs"
          >
            <img src={google} alt="Google logo" className="h-4 w-4 object-contain" />
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={handleGitHubSignin}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-pill border border-rule bg-paper hover:bg-paper-2 text-ink text-xs font-semibold transition-colors shadow-xs"
          >
            <FaGithub className="text-base text-ink" />
            <span>GitHub</span>
          </button>
        </div>

        {/* Sign In Link */}
        <div className="mt-8 text-center text-xs text-muted">
          <span>Already have an account? </span>
          <Link
            to="/signin"
            className="font-semibold text-accent-2 hover:underline ml-1"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
