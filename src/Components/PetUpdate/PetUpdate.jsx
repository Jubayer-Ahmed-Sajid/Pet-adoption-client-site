import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const options = [
    { value: 'cat', label: 'Cat' },
    { value: 'dog', label: 'Dog' },
    { value: 'fish', label: 'Fish' },
    { value: 'bird', label: 'Bird' },
    { value: 'fox', label: 'Fox' }
];

const optionsAdopted = [
    { value: false, label: 'Available for Adoption' },
    { value: true, label: 'Adopted' }
];

const selectStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: "var(--color-paper-2)",
        borderColor: "var(--color-rule)",
        borderRadius: "var(--radius-input)",
        color: "var(--color-ink)",
        padding: "2px 4px",
    }),
    singleValue: (base) => ({
        ...base,
        color: "var(--color-ink)",
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-rule)",
        color: "var(--color-ink)",
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "var(--color-paper-2)" : "transparent",
        color: "var(--color-ink)",
    }),
};

const PetUpdate = () => {
    const [petData, setPetData] = useState({});
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    useEffect(() => {
        axiosPublic.get(`/pets/id/${id}`)
            .then(res => {
                setPetData(res.data);
            });
    }, [axiosPublic, id]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            pet_name: petData?.pet_name || petData?.name || '',
            age: petData?.age || '',
            pet_location: petData?.pet_location || '',
            image: '',
            short_description: petData?.short_description || '',
            long_description: petData?.long_description || '',
            category: petData?.category || '',
            adopted: petData?.adopted || false
        },
        validationSchema: Yup.object({
            pet_name: Yup.string().required('Pet name is required'),
            age: Yup.number().required('Age is required'),
            pet_location: Yup.string().required('Location is required'),
        }),

        onSubmit: async (values) => {
            let photo_url = petData?.pet_image;
            const image = values.image;

            if (image) {
                const formData = new FormData();
                formData.append('image', image);
                const res = await axios.post(image_hosting_api, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                if (res.data?.data?.display_url) {
                    photo_url = res.data.data.display_url;
                }
            }

            const updatedInfo = {
                pet_name: values.pet_name,
                age: values.age,
                pet_location: values.pet_location,
                pet_image: photo_url,
                short_description: values.short_description,
                long_description: values.long_description,
                category: values.category || petData?.category,
                adopted: values.adopted,
            };

            const result = await axiosPublic.put(`/pets/${id}`, updatedInfo);
            if (result.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Pet details updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
    });

    return (
        <div className='w-full max-w-4xl mx-auto py-4'>
            <form onSubmit={formik.handleSubmit} className='bg-card rounded-card border border-rule p-6 sm:p-10 shadow-card space-y-6 text-ink'>
                <div className='text-center pb-4 border-b border-rule'>
                    <span className='text-xs uppercase tracking-wider font-semibold text-accent-deep'>
                        Listing Maintenance
                    </span>
                    <h2 className='text-2xl sm:text-3xl font-display font-semibold text-ink mt-1'>
                        Update Companion Profile
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="pet_name" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Pet Name
                        </label>
                        <input
                            id="pet_name"
                            name="pet_name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.pet_name}
                            className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                        />
                        {formik.touched.pet_name && formik.errors.pet_name && (
                            <p className='text-xs text-accent-3 mt-1'>{formik.errors.pet_name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="age" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Age
                        </label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.age}
                            className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                        />
                        {formik.touched.age && formik.errors.age && (
                            <p className='text-xs text-accent-3 mt-1'>{formik.errors.age}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="category" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Species Category
                        </label>
                        <Select
                            id="category"
                            name="category"
                            options={options}
                            value={options.find(o => o.value === formik.values.category)}
                            onChange={(event) => {
                                formik.setFieldValue('category', event.value);
                            }}
                            onBlur={formik.handleBlur}
                            styles={selectStyles}
                        />
                    </div>

                    <div>
                        <label htmlFor="adopted" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Adoption Status
                        </label>
                        <Select
                            id='adopted'
                            name='adopted'
                            options={optionsAdopted}
                            value={optionsAdopted.find(o => o.value === formik.values.adopted)}
                            onChange={(event) => {
                                formik.setFieldValue('adopted', event.value);
                            }}
                            onBlur={formik.handleBlur}
                            styles={selectStyles}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="image" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                        Replace Photo (Optional)
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                            const file = event.target.files[0];
                            formik.setFieldValue('image', file);
                        }}
                        onBlur={formik.handleBlur}
                        className="w-full text-xs text-muted file:mr-3 file:py-2 file:px-3 file:rounded-pill file:border-0 file:text-xs file:font-semibold file:bg-paper-2 file:text-ink hover:file:bg-paper-3"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="pet_location" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Location / Shelter
                        </label>
                        <input
                            id="pet_location"
                            name="pet_location"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.pet_location}
                            className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="short_description" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                            Short Summary
                        </label>
                        <input
                            id="short_description"
                            name="short_description"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.short_description}
                            className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="long_description" className='block text-xs font-semibold text-ink-2 mb-1.5'>
                        Full Care Story & Description
                    </label>
                    <textarea
                        id="long_description"
                        name="long_description"
                        rows="4"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.long_description}
                        className="w-full px-4 py-3 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors resize-none"
                    />
                </div>

                <div className="pt-2 flex justify-end">
                    <button
                        type="submit"
                        className="py-3 px-8 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-sm text-sm transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PetUpdate;
