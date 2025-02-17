import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import google from "../../assets/google-logo-history-png-2603.png";

const SignIn = () => {
  const navigate = useNavigate();
  const { Signin, googleSignin, gitHubSignin } = useAuth();
  const location = useLocation();
  console.log(location);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
          "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),

    onSubmit: async (values) => {
      const email = values.email;
      const password = values.password;

      Signin(email, password)
        .then((result) => {
          console.log(result.user);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully logged in!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location?.state ? location?.state : "/");
        })
        .catch((error) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },
  });
  const handleGoogleSigin = () => {
    googleSignin()
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully logged in!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleGitHubSignin = () => {
    gitHubSignin()
      .then((res) => {
        console.log(res.user);
        navigate(location?.state ? location?.state : "/");
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="lg:mx-6 my-8">
      <form
        onSubmit={formik.handleSubmit}
        className="rounded-lg mt-12 bg-white shadow-lg py-6 w-full space-y-2 mx-auto lg:w-2/4 "
      >
        <h2 className="text-center text-2xl lg:text-4xl text-blue-500 my-6">
          Please Sign In
        </h2>
        <hr className="w-2/3 bg-black mx-auto h-[2px]" />

        <div className="mx-auto w-3/4 lg:w-2/4 space-y-2">
          <label htmlFor="email"> Email Address </label>
          <br />

          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder="Email Address"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-400 text-md">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="space-y-2 mx-auto w-3/4 lg:w-2/4">
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder="password Address"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-400 text-md">{formik.errors.password}</p>
          ) : null}
        </div>
          <br />
        <div className="lg:w-1/2 mx-auto">
          <button
            className="w-full btn py-3 rounded-lg  px-3 bg-blue-500 text-white"
            type="submit"
          >
            Signin
          </button>
        </div>
        <div className="flex w-3/4 lg:w-1/2 mx-auto items-center gap-2">
          <div className=" w-5/12">
            <hr className="bg-blue-400" />
          </div>
          <h2 className="text-blue-400  font-semibold">or</h2>
          <div className=" w-5/12">
            <hr />
          </div>
        </div>
        <div className="lg:w-1/2 mx-auto">
          <button
            onClick={handleGoogleSigin}
            className="btn mb-4 text-white rounded-lg text-center w-full bg-blue-500 py-3"
          >
            <h2 className="flex  justify-center items-center gap-4">
              Login by Google <img src={google} className="w-6" alt="" />{" "}
            </h2>
          </button>
        </div>
        <div className="lg:w-1/2 mx-auto">
          <button
            onClick={handleGitHubSignin}
            className="btn mb-4 text-white rounded-lg text-center w-full bg-blue-500 py-3"
          >
            <h2 className="flex  justify-center items-center gap-4">
              Login by Github <FaGithub></FaGithub>
            </h2>
          </button>
        </div>
        <div className="my-6 px-4 lg:w-1/2 mx-auto">
          <h2>
            New to the site?
            <Link className="text-blue-400 ml-2" to="/signup">
              Sing Up Now
            </Link>
          </h2>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
