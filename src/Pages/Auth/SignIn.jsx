import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import useAuth from '../../Components/Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import {FaGithub, FaGoogle} from 'react-icons/fa'


const SignIn = () => {
    const navigate = useNavigate()
    const { Signin } = useAuth()
    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
           
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .required('No password provided.')
                .min(6, 'Password is too short - should be 6 chars minimum.')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, 'Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character')
        }),

        onSubmit: async values => {
            const email = values.email
            const password = values.password
           
              Signin(email, password)
           
                .then((result) => {
                    console.log(result.user)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully logged in!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/')
                })
                .catch((error)=>{
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: `${error.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                })


        },
    });
    return (
        <div>
            <h2 className='text-center text-4xl text-yellow-600 my-6'>Please Sign In</h2>
            <form onSubmit={formik.handleSubmit} className='mt-12 bg-gray-600 p-6 space-y-2 mx-auto w-3/4 '>
               
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
                    <h2>New to the site?<Link className='text-blue-400 ml-2' to='/signup'>Sing Up Now</Link></h2>
                </div>
            </form>
        </div>
    );
};
export default SignIn