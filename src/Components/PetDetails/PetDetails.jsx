import { useParams, Link, useNavigate } from "react-router-dom";
import usePetDetails from "../Hooks/usePetDetails";
import * as Yup from "yup";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useFormik } from "formik";
import useAuth from "../Hooks/useAuth";
import { MdFavorite, MdLocationPin, MdCheckCircle, MdClose } from "react-icons/md";
import { FaPaw, FaShieldAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useFavorites from "../Hooks/useFavorites";

const PetDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, refetchFavorites] = useFavorites();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { PetDetails: pet = {}, isLoading } = usePetDetails(id);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleApplyClick = () => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Sign in required",
        text: "Please sign in to submit an adoption application.",
        showCancelButton: true,
        confirmButtonText: "Sign In",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin", { state: `/pet-listing/${id}` });
        }
      });
      return;
    }
    handleOpen();
  };

  const isFavorited = (favorites || []).some((fav) => fav._id === pet._id || fav.name === pet.name);

  const formik = useFormik({
    initialValues: {
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Phone number is required"),
      address: Yup.string().required("Home address is required"),
    }),
    onSubmit: async (values) => {
      const adopterInfo = {
        requester_name: user?.displayName || "Prospective Adopter",
        requester_email: user?.email,
        email: pet.email,
        pet_name: pet.name,
        phone: values.phone,
        address: values.address,
        image: pet.image,
        id: pet._id,
        status: "pending",
      };

      try {
        const reqInfo = await axiosPublic.post("/adoption/request", adopterInfo);
        if (reqInfo.data.insertedId) {
          handleOpen();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Adoption request submitted!",
            text: "The pet coordinator will review your application.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Request failed",
          text: err.message,
        });
      }
    },
  });

  const handleFavorites = async () => {
    if (!pet._id) return;
    const { _id, ...restOfPetDetails } = pet;
    const favPet = { ...restOfPetDetails, email: user?.email };

    if (isFavorited) {
      Swal.fire({
        icon: "info",
        title: "Already in favorites",
        text: `${pet.name} is already saved in your favorites list.`,
      });
      return;
    }

    try {
      const favInfo = await axiosPublic.post("/pets/favorites", favPet);
      if (favInfo.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${pet.name} added to favorites!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetchFavorites();
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  if (isLoading || !pet.name) {
    return (
      <div className="pt-36 pb-20 max-w-4xl mx-auto px-4 text-center">
        <div className="p-12 rounded-card bg-card border border-rule animate-pulse">
          <p className="text-muted">Loading pet profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 flex items-center gap-2 text-xs text-muted">
        <Link to="/pet-listing" className="hover:text-ink transition-colors">
          Adoptable Pets
        </Link>
        <span>/</span>
        <span className="text-ink font-medium">{pet.name}</span>
      </div>

      <div className="bg-card rounded-card border border-rule overflow-hidden shadow-card">
        <div className="grid lg:grid-cols-12 gap-0">
          {/* Pet Photo Column */}
          <div className="lg:col-span-6 relative bg-paper-2 min-h-[380px] lg:min-h-full">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-full object-cover min-h-[380px]"
            />
            <div className="absolute top-4 left-4 bg-paper/95 backdrop-blur-md px-3.5 py-1 rounded-pill border border-rule text-xs font-semibold text-ink capitalize">
              {pet.category || "Companion"}
            </div>
          </div>

          {/* Details & Actions Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-display font-semibold text-ink">
                    {pet.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-ink-2 mt-1 flex items-center gap-1.5">
                    <MdLocationPin className="text-accent-3 text-base" />
                    <span>{pet.pet_location}</span>
                  </p>
                </div>
                <button
                  onClick={handleFavorites}
                  aria-label="Add to favorites"
                  className={`p-3 rounded-full border transition-colors ${
                    isFavorited
                      ? "bg-accent-3/15 text-accent-3 border-accent-3/30"
                      : "bg-paper-2 text-muted hover:text-accent-3 border-rule"
                  }`}
                >
                  <MdFavorite className="text-xl" />
                </button>
              </div>

              {/* Quick Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-pill bg-paper-2 border border-rule text-xs font-medium text-ink">
                  Age: {pet.age} {typeof pet.age === "number" || !isNaN(pet.age) ? (pet.age === 1 ? "year" : "years") : ""}
                </span>
                <span className="px-3 py-1 rounded-pill bg-mint/25 text-ink border border-rule text-xs font-medium inline-flex items-center gap-1">
                  <FaShieldAlt className="text-mint-deep text-[11px]" />
                  <span>Vaccinated</span>
                </span>
                <span className="px-3 py-1 rounded-pill bg-paper-2 border border-rule text-xs font-medium text-ink">
                  Listed {pet.AddedDate || "recently"}
                </span>
              </div>

              {/* Story & Description */}
              <div className="pt-3 border-t border-rule space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-muted">
                  About {pet.name}
                </h4>
                <p className="text-sm font-medium text-ink leading-relaxed">
                  {pet.short_description}
                </p>
                {pet.long_description && (
                  <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                    {pet.long_description}
                  </p>
                )}
              </div>
            </div>

            {/* Adoption Call to Action */}
            <div className="pt-8 mt-6 border-t border-rule">
              {pet.adopted ? (
                <div className="p-3.5 rounded-pill bg-paper-2 text-muted text-center text-sm font-semibold border border-rule">
                  Already Adopted into a Loving Home
                </div>
              ) : (
                <button
                  onClick={handleApplyClick}
                  className="w-full py-3.5 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-sm inline-flex items-center justify-center gap-2 text-sm transition-colors"
                >
                  <FaPaw />
                  <span>Apply to Adopt {pet.name}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Adoption Request Dialog Modal */}
      <Dialog
        open={open}
        handler={handleOpen}
        size="md"
        className="bg-card border border-rule rounded-card p-6 shadow-card"
      >
        <div className="flex items-center justify-between pb-4 border-b border-rule">
          <div>
            <h3 className="text-xl font-display font-semibold text-ink">
              Adoption Application
            </h3>
            <p className="text-xs text-muted">
              Applying to welcome <strong className="text-ink">{pet.name}</strong> into your home
            </p>
          </div>
          <button
            onClick={handleOpen}
            className="p-1 rounded-full text-muted hover:text-ink"
          >
            <MdClose size={20} />
          </button>
        </div>

        <DialogBody className="p-0 pt-5">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-2 mb-1">
                  Applicant Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || "Registered User"}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-input bg-paper-2 border border-rule text-xs text-muted"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-2 mb-1">
                  Applicant Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-input bg-paper-2 border border-rule text-xs text-muted"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-ink-2 mb-1">
                Contact Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-xs text-accent-3 mt-1">{formik.errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-xs font-semibold text-ink-2 mb-1">
                Home Address & Living Space
              </label>
              <input
                id="address"
                name="address"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                placeholder="Street address, City, State, Zip"
                className="w-full px-3.5 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent-2 transition-colors"
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-xs text-accent-3 mt-1">{formik.errors.address}</p>
              )}
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-rule">
              <button
                type="button"
                onClick={handleOpen}
                className="px-5 py-2.5 rounded-pill text-xs font-semibold text-ink-2 hover:bg-paper-2 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-pill text-xs font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-sm transition-colors"
              >
                Submit Application
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default PetDetails;
