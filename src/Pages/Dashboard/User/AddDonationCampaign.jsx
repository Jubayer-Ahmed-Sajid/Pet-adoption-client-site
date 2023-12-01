import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Textarea } from "@material-tailwind/react";
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosPublic from '../../../Components/Hooks/useAxiosPublic';
import useAuth from '../../../Components/Hooks/useAuth';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const options = [
    { value: 'cat', label: 'Cat' },
    { value: 'dog', label: 'Dog' },
    { value: 'fish', label: 'Fish' },
    { value: 'bird', label: 'Bird' },
    { value: 'fox', label: 'Fox' }
]


const AddDonationCampaign = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const formik = useFormik({

        initialValues: {
            max_donation_amount: '',
            last_date: '',
            image: '',
            short_description: '',
            long_description: '',
        },
        validationSchema: Yup.object({
            pet_name: Yup.string()
                .required('Required'),
            max_donation_amount: Yup.number()
                .required('Required'),
            last_date: Yup.date()
                .required('No date is provided.')

        }),

        onSubmit: async values => {
            console.log(values)
            const date = new Date(values.last_date).toDateString()
            const addedDate = new Date().toDateString()
            console.log(date,addedDate)
            const image = values.image
            const formData = new FormData();
            formData.append('image', image)
            const res = await axios.post(image_hosting_api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            const img_url = res.data.data.display_url
            const campaignInfo = {
                max_donation_amount: values.max_donation_amount,
                last_date: values.last_date,
                image: img_url,
                short_description: values.short_description,
                long_description: values.long_description,
                email: user?.email,
                last_date:date,
                start_date: addedDate

            }
            const campaignRes = await axiosPublic.post('/donations', campaignInfo)
            if (campaignRes.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully added the campaign!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            console.log(campaignRes.data)

        },
    });
    return (
        <div className='w-screen'>
            <form onSubmit={formik.handleSubmit} className=' bg-gray-600 p-4 space-y-2 mx-auto '>
                <h2 className='text-center text-4xl text-yellow-600 my-6'>Add a Pet </h2>

                <div className="w-full lg:flex gap-4">


                   


                    <div className=' mx-auto w-full space-y-2'>
                        <label htmlFor="max_donation_amount" className='text-white font-semibold text-md'>Maximum Donation </label>
                        <br />

                        <input
                            id="max_donation_amount"
                            name="max_donation_amount"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.max_donation_amount}
                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder='max_donation_amount Address'
                        />
                        {formik.touched.max_donation_amount && formik.errors.max_donation_amount ? (
                            <p className='text-red-400 text-md'>{formik.errors.max_donation_amount}</p>
                        ) : null}
                    </div>
                </div>
                <label htmlFor="category" className='text-white font-semibold text-md'>Categories</label>
                

                <div className="w-full mx-auto space-y-2">
                    <label className='text-white font-semibold text-md'>Image</label>
                    <br />

                    <input
                        id="image"
                        name="image"
                        type="file"
                        onChange={(event) => {
                            const file = event.target.files[0];
                            formik.setFieldValue('image', file);
                        }}
                        onBlur={formik.handleBlur}
                    />
                </div>

                <div className='w-full lg:flex gap-4'>
                    <div className="space-y-2 mx-auto w-2/4">
                        <label htmlFor="locations" className='text-white font-semibold text-md'>Last Date</label>
                        <br />
                        <input
                            id="last_date"
                            name="last_date"
                            type="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.last_date}
                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=' Address'
                        />
                        {formik.touched.last_date && formik.errors.last_date ? (
                            <p className='text-red-400 text-md'>{formik.errors.last_date}</p>
                        ) : null}
                    </div>

                    <div className="space-y-2 mx-auto w-2/4">
                        <label htmlFor="short_description" className='text-white font-semibold text-md'>Short Description</label>
                        <br />
                        <input
                            id="short_description"
                            name="short_description"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.short_description}
                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=' Address'
                        />
                        {formik.touched.short_description && formik.errors.short_description ? (
                            <p className='text-red-400 text-md'>{formik.errors.short_description}</p>
                        ) : null}
                    </div>
                </div>
                <label htmlFor="long_description" className='text-white font-semibold text-md'>Long Description</label>
                <div className="w-full">
                    <Textarea
                        className='h-40 text-green-400'
                        name='long_description'
                        id='long_description'
                        type='text'
                        placeholder='Long Description'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.long_description}
                    />
                </div>

                <br />
                <div className='w-1/2 mx-auto'>

                    <button className='w-3/4 btn py-3 rounded-lg  px-3 bg-yellow-600 text-white' type="submit">Add Donation Campaign</button>
                </div>

            </form>
        </div>
    );
};
export default AddDonationCampaign