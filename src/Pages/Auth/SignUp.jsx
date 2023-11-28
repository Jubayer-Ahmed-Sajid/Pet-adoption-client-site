import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import useAuth from '../../Components/Hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import {FaGithub, FaGoogle} from 'react-icons/fa'

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const SignUp = () => {
    const navigate = useNavigate()
    const { createUser, updateUser } = useAuth()
    const formik = useFormik({

        initialValues: {
            fullName: '',
            email: '',
            password: '',
            image: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .required('No password provided.')
                .min(6, 'Password is too short - should be 6 chars minimum.')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, 'Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character')
        }),

        onSubmit: async values => {
            const email = values.email
            const name = values.fullName
            const password = values.password
            const image = values.Profile
            console.log(name, image)
            const formData = new FormData();
            formData.append('image', image)
            const res = await axios.post(image_hosting_api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            const photo_url = res.data.data.display_url
            const createdUser = await createUser(email, password)
            console.log(createdUser)
            updateUser(name, photo_url)
                .then(() => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully logged in!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')
                })


        },
    });
    return (
        <div>
            <h2 className='text-center text-4xl text-yellow-600 my-6'>Please Sign Up </h2>
            <form onSubmit={formik.handleSubmit} className='mt-12 bg-gray-600 p-6 space-y-2 mx-auto w-3/4 '>
                <div className='mx-auto w-2/4 space-y-2'>
                    <label htmlFor="fullName">Full Name</label>
                    <br />
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                        className="w-3/4 rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=' Your full Name'
                    />
                    <br />
                    {formik.touched.fullName && formik.errors.fullName ? (
                        <p className='text-red-400 text-md'>{formik.errors.fullName}</p>
                    ) : null}
                </div>
               <div className='w-2/4 mx-auto space-y-2'>
                <label htmlFor="email"> Email Address </label>
                <br />

               <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className=" w-3/4 rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder='Email Address'
                />
                {formik.touched.email && formik.errors.email ? (
                    <p className='text-red-400 text-md'>{formik.errors.email}</p>
                ) : null}
               </div>

               <div className="w-2/4 mx-auto space-y-2">
                <label >Image</label>
                <br />

               <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={(event) => {
                        const file = event.target.files[0];
                        formik.setFieldValue('Profile', file);
                    }}
                    onBlur={formik.handleBlur}
                />
               </div>
                <br />
               <div className="space-y-2 mx-auto w-2/4">
               <label htmlFor="password">Password</label>
                <br />
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className=" w-3/4 rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder='password Address'
                />
                {formik.touched.password && formik.errors.password ? (
                    <p className='text-red-400 text-md'>{formik.errors.password}</p>
                ) : null}
               </div>

                <br />
                <div className='w-1/2 mx-auto'>

                <button className='w-3/4 btn py-3 rounded-lg  px-3 bg-yellow-600 text-white' type="submit">Submit</button>
                </div>
                <div className='flex w-1/2 mx-auto items-center gap-2'>
                <div className=' w-5/12'>
                 <hr/>
                </div>
                <h2 className='text-green-400  font-bold'>or</h2>
                <div className=' w-5/12'>
                 <hr/>
                </div>
                </div>
                <div className='w-1/2 mx-auto'>
                    <button className='btn text-white rounded-lg text-center w-3/4 bg-yellow-600 py-3'>
                      <h2 className='flex  justify-center items-center gap-4'>Login by Google  <FaGoogle></FaGoogle></h2> 
                    </button>
                </div>
                <div className='w-1/2 mx-auto'>
                    <button className='btn text-white rounded-lg text-center w-3/4 bg-yellow-600 py-3'>
                      <h2 className='flex  justify-center items-center gap-4'>Login by Github  <FaGithub></FaGithub></h2> 
                    </button>
                </div>
                <div className='my-6 text-white px-4 w-1/2 mx-auto'>
                    <h2>Already have an account ?<Link className='text-blue-400 ml-2' to='/signin'>Sing In Now</Link></h2>
                </div>
            </form>
        </div>
    );
};
export default SignUp