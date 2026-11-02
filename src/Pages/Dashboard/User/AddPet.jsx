import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import axios from "axios";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import useAuth from "../../../Components/Hooks/useAuth";
import Compressor from "compressorjs";
import { toast } from "sonner";
import ImageDropzone from "../../../Components/ImageDropzone";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const options = [
  { value: "cat", label: "Cat" },
  { value: "dog", label: "Dog" },
  { value: "fish", label: "Fish" },
  { value: "bird", label: "Bird" },
  { value: "fox", label: "Fox" },
];

const AddPet = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const formik = useFormik({
    initialValues: {
      pet_name: "",
      age: "",
      pet_location: "",
      image: "",
      short_description: "",
      long_description: "",
      category: "",
    },
    validationSchema: Yup.object({
      pet_name: Yup.string().required("Pet name is required"),
      age: Yup.number().required("Age is required"),
      pet_location: Yup.string().required("Location is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      let petLoading = null;
      try {
        petLoading = toast.loading("Adding pet profile…");
        const image = values.image;

        let photo_url = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80";

        if (image) {
          try {
            const compressedImage = await new Promise((resolve, reject) => {
              new Compressor(image, {
                quality: 0.7,
                maxWidth: 1000,
                maxHeight: 1000,
                success: resolve,
                error: reject,
              });
            });

            if (image_hosting_key) {
              const formData = new FormData();
              formData.append("image", compressedImage);
              const res = await axios.post(image_hosting_api, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
              if (res.data?.data?.display_url) {
                photo_url = res.data.data.display_url;
              }
            } else {
              const reader = new FileReader();
              photo_url = await new Promise((resolve) => {
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(compressedImage);
              });
            }
          } catch (imgErr) {
            console.warn("Direct image upload notice:", imgErr.message);
          }
        }

        const petInfo = {
          name: values.pet_name,
          pet_name: values.pet_name,
          age: Number(values.age) || 1,
          pet_location: values.pet_location,
          image: photo_url,
          pet_image: photo_url,
          short_description: values.short_description,
          long_description: values.long_description,
          category: values.category || "dog",
          AddedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          date_time: new Date(),
          adopted: false,
          email: user?.email,
          user_email: user?.email,
          user_name: user?.displayName,
          health_status: "100% Vetted Health",
          traits: ["Vaccinated", "Socialized"],
        };

        const result = await axiosPublic.post("/pets", petInfo);

        if (result.data.insertedId) {
          toast.success("Pet profile listed successfully!");
          resetForm();
        } else {
          toast.error("Could not list pet profile.");
        }
      } catch (error) {
        toast.error("Could not list pet: " + (error.response?.data?.message || error.message));
      } finally {
        if (petLoading) toast.dismiss(petLoading);
      }
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-card rounded-card border border-rule p-6 sm:p-10 shadow-card space-y-6 text-ink"
      >
        <div className="text-center pb-4 border-b border-rule">
          <span className="text-xs uppercase tracking-wider font-semibold text-accent-deep">
            Shelter & Rescue Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold text-ink mt-1">
            List an Adoptable Companion
          </h2>
          <p className="text-xs sm:text-sm text-ink-2 mt-1">
            Add a rescued pet to connect them with certified loving families
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pet_name" className="block text-xs font-semibold text-ink-2 mb-1.5">
              Pet Name
            </label>
            <input
              id="pet_name"
              name="pet_name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pet_name}
              placeholder="e.g. Charlie"
              className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
            />
            {formik.touched.pet_name && formik.errors.pet_name && (
              <p className="text-xs text-accent-3 mt-1">{formik.errors.pet_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="age" className="block text-xs font-semibold text-ink-2 mb-1.5">
              Age (Years or Months)
            </label>
            <input
              id="age"
              name="age"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
              placeholder="e.g. 2"
              className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-xs text-accent-3 mt-1">{formik.errors.age}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-xs font-semibold text-ink-2 mb-1.5">
              Species Category
            </label>
            <Select
              id="category"
              name="category"
              options={options}
              placeholder="Select species…"
              onChange={(event) => {
                formik.setFieldValue("category", event.value);
              }}
              onBlur={formik.handleBlur}
              styles={{
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
              }}
            />
          </div>

          <div>
            <label htmlFor="pet_location" className="block text-xs font-semibold text-ink-2 mb-1.5">
              Location / Shelter
            </label>
            <input
              id="pet_location"
              name="pet_location"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pet_location}
              placeholder="e.g. Oakland Foster Center"
              className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
            />
            {formik.touched.pet_location && formik.errors.pet_location && (
              <p className="text-xs text-accent-3 mt-1">{formik.errors.pet_location}</p>
            )}
          </div>
        </div>

        <ImageDropzone
          label="Companion Photo"
          placeholder="Drag & drop companion photo here, or click to browse"
          value={formik.values.image}
          onChange={(file) => formik.setFieldValue("image", file)}
        />

        <div>
          <label htmlFor="short_description" className="block text-xs font-semibold text-ink-2 mb-1.5">
            Short Highlight Summary
          </label>
          <input
            id="short_description"
            name="short_description"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.short_description}
            placeholder="e.g. Gentle, affectionate, fully vaccinated, loves walks"
            className="w-full px-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="long_description" className="block text-xs font-semibold text-ink-2 mb-1.5">
            Full Adoption Story & Care Needs
          </label>
          <textarea
            id="long_description"
            name="long_description"
            rows="4"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.long_description}
            placeholder="Describe the companion's personality, medical history, house training, and ideal home environment…"
            className="w-full px-4 py-3 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors resize-none"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="py-3 px-8 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-sm text-sm transition-colors"
          >
            Submit Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPet;
