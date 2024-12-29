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
import { MdOutlinePhoto } from "react-icons/md";

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
        .max(15, "Must be 15 characters or less")
        .required("Required"),
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
      const name = values.fullName;
      const password = values.password;
      const image = values.Profile;
      console.log(name, image);
      const formData = new FormData();
      formData.append("image", image);
      const res = await axios.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const photo_url = res.data.data.display_url;
      const createdUser = await createUser(email, password);
      console.log(createdUser);
      updateUser(name, photo_url)
        .then(async () => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully logged in!",
            showConfirmButton: false,
            timer: 1500,
          });

          const isAdmin = false;
          const userInfo = {
            name,
            email,
            photo_url,
            isAdmin,
          };
          await axiosPublic.post("/users", userInfo).then((res) => {
            console.log(res.data);
          });
          navigate(location?.state ? location?.state : "/");
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  const handleGoogleSignin = () => {
    googleSignin().then(async (result) => {
      const image = result?.user?.photoURL;
      const formData = new FormData();
      formData.append("image", image);
      const res = await axios.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const photo_url = res.data.data.display_url;
      const userInfo = {
        name: result?.user?.displayName,
        photo_url: photo_url,
        email: result?.user?.email,
        isAdmin: false,
      };
      axiosPublic
        .post("/users", userInfo)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully logged in!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location?.state ? location?.state : "/");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };

  const handleGitHubSignin = () => {
    gitHubSignin().then(async (result) => {
      const image = result?.user?.photoURL;
      const formData = new FormData();
      formData.append("image", image);
      const res = await axios.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const photo_url = res.data.data.display_url;
      const userInfo = {
        name: result?.user?.displayName,
        photo_url: photo_url,
        email: result?.user?.email,
        isAdmin: false,
      };
      axiosPublic
        .post("/users", userInfo)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully logged in!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(location?.state ? location?.state : "/");
          }
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
    });
  };

  return (
    <div className="my-8 min-h-screen lg:mx-auto bg-white rounded-lg  shadow-lg py-3 lg:py-6 space-y-2 mx-auto w-full lg:w-2/4">
      <form onSubmit={formik.handleSubmit} className=" mt-6 lg:mt-12 ">
        <h2 className="text-center text-blue-500 text-2xl lg:text-4xl  my-6">
          Please Sign Up{" "}
        </h2>
        <hr className="bg-black h-[2px] w-2/3 mx-auto" />
        <div className="mx-auto w-3/4 lg:w-2/4 space-y-2">
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            id="fullName"
            name="fullName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            className=" w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" Your full Name"
          />
          <br />
          {formik.touched.fullName && formik.errors.fullName ? (
            <p className="text-red-400 text-md">{formik.errors.fullName}</p>
          ) : null}
        </div>
        <div className="w-3/4 lg:w-2/4 mx-auto space-y-2">
          <label htmlFor="email"> Email Address </label>
          <br />

          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full  rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder="Email Address"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-400 text-md">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="w-3/4 lg:w-2/4 mx-auto space-y-2">
          <label>Image</label>
          <br />

          <input
            id="image"
            name="image"
            type="file"
            onChange={(event) => {
              const file = event.target.files[0];
              formik.setFieldValue("Profile", file);
            }}
            onBlur={formik.handleBlur}
          />
        </div>

        <br />
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
            className="w-full  rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
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
            Sign up
          </button>
        </div>
      </form>

      <div className="flex w-3/4 lg:w-1/2 mx-auto items-center gap-2">
        <div className=" w-5/12">
          <hr />
        </div>
        <h2 className="text-blue-400  font-semibold">or</h2>
        <div className=" w-5/12">
          <hr />
        </div>
      </div>

      <div className="lg:w-1/2 flex justify-center lg:block mx-auto">
        <button
          onClick={handleGoogleSignin}
          className="btn mb-4 text-white rounded-lg text-center w-full bg-blue-500 py-3"
        >
          <h2 className="flex justify-center items-center gap-4">
            Login by Google <img src={google} className="h-6" alt="" />
          </h2>
        </button>
      </div>

      <div className="lg:w-1/2 lg:block flex justify-center mx-auto">
        <button
          onClick={handleGitHubSignin}
          className="btn text-white rounded-md text-center w-full bg-blue-500 py-3"
        >
          <h2 className="flex  justify-center items-center gap-4">
            Login by Github <FaGithub></FaGithub>
          </h2>
        </button>
      </div>

      <div className="my-6 lg:w-1/2 lg:mx-auto px-4">
        <h2>
          Already have an account ?
          <Link className="text-blue-400 ml-2" to="/signin">
            Sing In Now
          </Link>
        </h2>
      </div>
      
    </div>
  );
};

export default SignUp;
