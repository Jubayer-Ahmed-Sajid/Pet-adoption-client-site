import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'

const SignUp = () => {
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            image: ''
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        }),

        onSubmit: values => {
            console.log(values)
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
       <div>
        <h2 className='text-center text-4xl text-yellow-600 my-6'>Please Sign Up </h2>
         <form onSubmit={formik.handleSubmit} className='mt-12 bg-gray-600 p-6 space-y-2 mx-auto w-3/4 '>
            <label htmlFor="fullName">Full Name</label>
            <br />
            <input
                id="fullName"
                name="fullName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                className=" w-2/4 rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=' Your full Name'
            />
            <br />
            {formik.touched.fullName && formik.errors.fullName ? (
                <p className='text-red-400 text-md'>{formik.errors.fullName}</p>
            ) : null}

            <br />
            <label htmlFor="email"> Email Address </label>
            <br />
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className=" w-2/4 rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder='Email Address'
            />
             {formik.touched.email && formik.errors.email ? (
                <p className='text-red-400 text-md'>{formik.errors.fullName}</p>
            ) : null}

            <br />
            <input
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                    const file = event.target.files[0];
                    formik.setFieldValue(file);
                }}
                onBlur={formik.handleBlur}
            // value={formik.values.image}
            />
            <br />
            <button className='w-full btn py-4 rounded-lg  px-3 bg-yellow-600 text-white' type="submit">Submit</button>
        </form>
       </div>
    );
};
export default SignUp