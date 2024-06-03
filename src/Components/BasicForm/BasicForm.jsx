import React from 'react'
import PropTypes from 'prop-types'

const BasicForm = props => {
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className=' bg-gray-600 p-4 space-y-2 mx-auto '>
                <h2 className='text-center text-4xl text-secondary my-6'>Add a Pet </h2>

                <div className="w-full lg:flex gap-4">


                    <div className='mx-auto w-full space-y-2'>
                        <label htmlFor="pet_name" className='text-white font-semibold text-md'>Pet Name</label>
                        <br />
                        <input
                            id="pet_name"
                            name="pet_name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.pet_name}
                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=' Pet Name'
                        />
                        <br />
                        {formik.touched.pet_name && formik.errors.pet_name ? (
                            <p className='text-red-400 text-md'>{formik.errors.pet_name}</p>
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
                            value={formik.values.age}
                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder='age Address'
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
                    placeholder='Chose category'
                    onChange={(event) => {
                        const category = event.value
                        formik.setFieldValue('category', category)
                    }
                    }
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
                            value={formik.values.pet_location}
                            className="text-green-400 w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 text-sm  text-blue-gray-700 outline outline-0 transition-all  focus:border-pink-base-300  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=' Address'
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

                    <button className='w-3/4 btn py-3 rounded-lg  px-3 bg-secondary text-white' type="submit">Add Pet</button>
                 

                </div>
            </form>
    </div>
  )
}

BasicForm.propTypes = {

}

export default BasicForm
