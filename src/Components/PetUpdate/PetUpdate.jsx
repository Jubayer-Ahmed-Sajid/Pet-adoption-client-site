import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Select from 'react-select'
import { Textarea } from "@material-tailwind/react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { toast } from 'sonner';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const options = [
    { value: 'cat', label: 'Cat' },
    { value: 'dog', label: 'Dog' },
    { value: 'fish', label: 'Fish' },
    { value: 'bird', label: 'Bird' },
    { value: 'fox', label: 'Fox' }
]
const optionsAdopted = [
    { value: false, label: 'False' },
    { value: true, label: 'True' }
]


const PetUpdate = () => {
    const [donationCampaign,setDonationCampaign] = useState({})
    const { id } = useParams()
    console.log(id)
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    useEffect(()=>{
        axiosPublic.get(`/pets/id/${id}`)
        .then(res =>{
            setDonationCampaign(res.data)

        })
    },[axiosPublic,id])
    const formik = useFormik({

        initialValues: {
            name: donationCampaign.name,
            age: donationCampaign.age,
            pet_location: donationCampaign.pet_location,
            image: '',
            short_description: donationCampaign.short_description,
            long_description: donationCampaign.long_description,
            category: donationCampaign.category,
            adopted: donationCampaign.adopted
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
            age: Yup.number()
                .required('Required'),
            pet_location: Yup.string()
                .required('No pet_location provided.')

        }),

        onSubmit: async values => {
            const image = values.image
            const formData = new FormData();
            formData.append('image', image)
            const res = await axios.post(image_hosting_api, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            const img_url = res.data.data.display_url
            const UpdatedPetsInfo = {
                name: values.name,
                age: values.age,
                pet_location: values.pet_location,
                image: img_url,
                short_description: values.short_description,
                long_description: values.long_description,
                category: values.category,
                adopted: values.adopted,
                email: user?.email,
                AddedDate: new Date().toDateString()

            }
            console.log('info',UpdatedPetsInfo)
            const petRes = await axiosPublic.patch(`/pets/${id}`, UpdatedPetsInfo)
            console.log(petRes)
            if (petRes.data.modifiedCount) {
                toast.success('Pet Successfully Updated')
            }
            console.log(petRes.data)

        },
    });
    return (
        <div className='w-screen'>
            <form onSubmit={formik.handleSubmit} className=' bg-gray-600 p-4 space-y-2 mx-auto '>
                <h2 className='text-center text-4xl text-secondary my-6'>Update a Pet </h2>

                <div className="w-full lg:flex gap-4">


                    <div className='mx-auto w-full space-y-2'>
                        <label htmlFor="name" className='text-white font-semibold text-md'>Pet Name</label>
                        <br />
                        <input
                            id="pet_name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.name}

                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <br />
                        {formik.touched.name && formik.errors.name ? (
                            <p className='text-red-400 text-md'>{formik.errors.name}</p>
                        ) : null}
                    </div>


                    <div className=' mx-auto w-full space-y-2'>
                        <label htmlFor="age" className='text-white font-semibold text-md'>Age </label>
                        <br />

                        <input
                            id="age"
                            name="age"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.age}
                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        {formik.touched.age && formik.errors.age ? (
                            <p className='text-red-400 text-md'>{formik.errors.age}</p>
                        ) : null}
                    </div>
                </div>
                <label htmlFor="category" className='text-white font-semibold text-md'>Categories</label>
                <Select
                    id="category"
                    name="category"
                    options={options}
                    defaultValue={donationCampaign.category}
                    onChange={(event) => {
                        const category = event.defaultValue
                        formik.setFieldValue('category', category)
                    }
                    }
                    onBlur={formik.handleBlur} />
                <label htmlFor="adopted" className=' text-white font-semibold text-md'>Adoption Status</label>
                <Select id='adopted'
                    name='adopted'
                    defaultValue={donationCampaign.adopted ? 'True' : 'False'}
                    options={optionsAdopted}
                    onChange={(event) => {
                        const adopted = event.value
                        formik.setFieldValue('adopted', adopted)
                    }}
                    onBlur={formik.handleBlur} />

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
                        <label htmlFor="locations" className='text-white font-semibold text-md'>Location</label>
                        <br />
                        <input
                            id="pet_location"
                            name="pet_location"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            defaultValue={formik.values.pet_location}
                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            
                        />
                        {formik.touched.pet_location && formik.errors.pet_location ? (
                            <p className='text-red-400 text-md'>{formik.errors.pet_location}</p>
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
                            defaultValue={formik.values.short_description}
                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        defaultValue={formik.values.long_description}
                    />
                </div>


                <br />
                <div className='w-1/2 mx-auto'>

                    <button className='w-3/4 btn py-3 rounded-lg  px-3 bg-secondary text-white' type="submit">Update Pet</button>
                </div>

            </form>
        </div>
    );
};
export default PetUpdate