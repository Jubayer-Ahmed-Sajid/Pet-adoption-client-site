import { useParams, Link, useNavigate } from "react-router-dom";
import usePetDetails from "../Hooks/usePetDetails";
import * as Yup from "yup";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import useAuth from "../Hooks/useAuth";
import {
  MdFavorite,
  MdLocationPin,
  MdCheckCircle,
  MdClose,
  MdOutlineMedicalServices,
  MdOutlineVerifiedUser,
  MdOutlinePets,
  MdOutlineShare
} from "react-icons/md";
import {
  FaPaw,
  FaShieldAlt,
  FaHeart,
  FaCalendarAlt,
  FaRegCheckCircle,
  FaUserCheck,
  FaHome
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useFavorites from "../Hooks/useFavorites";
import MotionReveal from "../MotionReveal";

const PetDetails = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, refetchFavorites] = useFavorites();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const { PetDetails: pet = {}, isLoading } = usePetDetails(id);

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("story");
  const [showStickyDock, setShowStickyDock] = useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyDock(true);
      } else {
        setShowStickyDock(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleApplyClick = () => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Sign in required",
        text: "Please sign in to submit an adoption application for this companion.",
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

  const isFavorited = (favorites || []).some(
    (fav) => fav._id === pet._id || fav.name === pet.name
  );

  const formik = useFormik({
    initialValues: {
      phone: "",
      address: "",
      livingSpace: "apartment",
      experience: "experienced",
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
        livingSpace: values.livingSpace,
        experience: values.experience,
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
            title: "Application submitted!",
            text: `Our coordinator will contact you to arrange a meet-and-greet with ${pet.name}.`,
            showConfirmButton: false,
            timer: 2500,
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
        title: "Already saved",
        text: `${pet.name} is already in your saved companion bookmarks.`,
      });
      return;
    }

    try {
      const favInfo = await axiosPublic.post("/pets/favorites", favPet);
      if (favInfo.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${pet.name} saved!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetchFavorites();
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Meet ${pet.name} on Paws & Hearts`,
        text: `Looking for a forever home for ${pet.name}. Check out the profile:`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Link copied to clipboard",
        showConfirmButton: false,
        timer: 1800,
      });
    }
  };

  if (isLoading || !pet.name) {
    return (
      <div className="pt-36 pb-20 max-w-4xl mx-auto px-4 text-center">
        <div className="p-16 rounded-card bg-card border border-rule animate-pulse">
          <FaPaw className="text-3xl text-muted mx-auto mb-3 animate-bounce" />
          <p className="text-muted text-sm">Retrieving verified companion record…</p>
        </div>
      </div>
    );
  }

  const rescueId = `#RES-${(pet._id || "9182").slice(-4).toUpperCase()}`;

  return (
    <div className="pt-28 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Metadata Navigation */}
      <MotionReveal direction="up" distance={12}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <div className="flex items-center gap-2">
            <Link to="/pet-listing" className="hover:text-ink transition-colors flex items-center gap-1">
              <FaPaw className="text-[10px] text-muted" />
              <span>Companion Directory</span>
            </Link>
            <span>/</span>
            <span className="capitalize">{pet.category || "Companion"}</span>
            <span>/</span>
            <span className="text-ink font-semibold">{pet.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] px-2 py-0.5 rounded-pill bg-paper-2 border border-rule text-ink-2">
              ID: {rescueId}
            </span>
            <button
              onClick={handleShare}
              className="px-3 py-1 rounded-pill bg-paper-2 border border-rule hover:bg-paper-3 text-ink transition-colors flex items-center gap-1.5 press-down"
              aria-label="Share companion profile"
            >
              <MdOutlineShare className="text-xs" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </MotionReveal>

      {/* Main Companion Showcase Card */}
      <MotionReveal direction="up" delay={60} distance={16}>
        <div className="bg-card rounded-card border border-rule overflow-hidden shadow-card mb-8">
          <div className="grid lg:grid-cols-12 gap-0">
            {/* Visual Media Stage */}
            <div className="lg:col-span-6 relative bg-paper-2 min-h-[420px] lg:min-h-full overflow-hidden group">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover min-h-[420px] max-h-[560px] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none"></div>

              {/* Top Floating Badge Cluster */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-paper/95 backdrop-blur-md px-3.5 py-1 rounded-pill border border-rule text-xs font-semibold text-ink capitalize shadow-xs">
                    {pet.category || "Companion"}
                  </span>
                  <span className="bg-paper/95 backdrop-blur-md px-2.5 py-1 rounded-pill border border-rule text-xs font-semibold text-mint-deep shadow-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-mint-deep animate-radar"></span>
                    <span>Ready for Placement</span>
                  </span>
                </div>
                
                {/* Favorite Bookmark Button */}
                <button
                  onClick={handleFavorites}
                  aria-label="Add to favorites"
                  className={`p-2.5 rounded-full backdrop-blur-md border transition-transform duration-200 press-down shadow-xs ${
                    isFavorited
                      ? "bg-accent-3 text-white border-accent-3 scale-110"
                      : "bg-paper/90 text-ink hover:text-accent-3 border-rule hover:scale-105"
                  }`}
                >
                  <MdFavorite className="text-lg" />
                </button>
              </div>

              {/* Bottom Image Stage Information */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-black/40 backdrop-blur-md border border-white/20 text-xs mb-2">
                  <FaShieldAlt className="text-mint text-[11px]" />
                  <span>501(c)(3) Verified Sanctuary Intake</span>
                </div>
                <p className="text-xs text-white/80">
                  Rescued in healthy foster care · Complete medical clearance
                </p>
              </div>
            </div>

            {/* Editorial Narrative & Quick Metrics */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Header & Location */}
                <div className="mb-5">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-ink tracking-tight">
                    {pet.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-ink-2 mt-2 flex items-center gap-1.5">
                    <MdLocationPin className="text-accent-3 text-base shrink-0" />
                    <span>{pet.pet_location} · Currently hosted with vetted foster family</span>
                  </p>
                </div>

                {/* Key Biological & Care Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-3.5 rounded-card bg-paper-2 border border-rule text-center">
                  <div className="p-2">
                    <p className="text-[11px] font-semibold text-muted">Estimated Age</p>
                    <p className="text-base font-semibold text-ink font-display mt-0.5">
                      {pet.age} {pet.age === 1 ? "Year" : "Years"}
                    </p>
                  </div>
                  <div className="p-2 border-x border-rule">
                    <p className="text-[11px] font-semibold text-muted">Health Status</p>
                    <p className="text-base font-semibold text-mint-deep font-display mt-0.5 flex items-center justify-center gap-1">
                      <FaRegCheckCircle className="text-xs" />
                      <span>Cleared</span>
                    </p>
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] font-semibold text-muted">Intake Date</p>
                    <p className="text-base font-semibold text-ink font-display mt-0.5">
                      {pet.AddedDate || "Recent"}
                    </p>
                  </div>
                </div>

                {/* Short Lead Summary */}
                <p className="text-sm sm:text-base text-ink font-medium leading-relaxed mb-6">
                  {pet.short_description ||
                    `${pet.name} is a gentle, affectionate companion who has thrived in foster care and is ready to join a loving home.`}
                </p>

                {/* Quick Trait Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 rounded-pill bg-mint/20 text-ink border border-rule text-xs font-medium inline-flex items-center gap-1.5">
                    <MdCheckCircle className="text-mint-deep text-xs" />
                    <span>Fully Vaccinated</span>
                  </span>
                  <span className="px-3 py-1 rounded-pill bg-paper-2 text-ink border border-rule text-xs font-medium inline-flex items-center gap-1.5">
                    <MdOutlineVerifiedUser className="text-accent-2 text-xs" />
                    <span>Microchip Registered</span>
                  </span>
                  <span className="px-3 py-1 rounded-pill bg-paper-2 text-ink border border-rule text-xs font-medium inline-flex items-center gap-1.5">
                    <FaHome className="text-muted text-xs" />
                    <span>House Trained</span>
                  </span>
                  <span className="px-3 py-1 rounded-pill bg-paper-2 text-ink border border-rule text-xs font-medium inline-flex items-center gap-1.5">
                    <FaUserCheck className="text-accent-3 text-xs" />
                    <span>Socialized</span>
                  </span>
                </div>
              </div>

              {/* Main Primary Action Button */}
              <div className="pt-6 border-t border-rule">
                {pet.adopted ? (
                  <div className="p-4 rounded-pill bg-paper-2 text-muted text-center text-sm font-semibold border border-rule flex items-center justify-center gap-2">
                    <MdCheckCircle className="text-mint-deep text-base" />
                    <span>Successfully adopted into a forever home</span>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleApplyClick}
                      className="w-full sm:flex-1 py-4 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-sm inline-flex items-center justify-center gap-2.5 text-sm transition-colors group/btn"
                    >
                      <FaPaw className="transition-transform group-hover/btn:scale-110" />
                      <span>Apply to adopt {pet.name}</span>
                    </button>
                    <button
                      onClick={handleFavorites}
                      className={`w-full sm:w-auto px-5 py-4 rounded-pill font-semibold text-xs border transition-colors flex items-center justify-center gap-2 press-down ${
                        isFavorited
                          ? "bg-accent-3/15 text-accent-3 border-accent-3/30"
                          : "bg-paper-2 text-ink border-rule hover:bg-paper-3"
                      }`}
                    >
                      <MdFavorite className={`text-base ${isFavorited ? "text-accent-3" : "text-muted"}`} />
                      <span>{isFavorited ? "Saved in favorites" : "Save companion"}</span>
                    </button>
                  </div>
                )}
                <p className="text-center text-[11px] text-muted mt-2.5">
                  Free 30-day health guarantee & post-placement support included
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* Interactive Dossier Tabs Section */}
      <MotionReveal direction="up" delay={120} distance={18}>
        <div className="bg-card rounded-card border border-rule p-6 sm:p-8 lg:p-10 shadow-sm mb-12">
          {/* Tab Navigation Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-rule pb-4 mb-8">
            <button
              onClick={() => setActiveTab("story")}
              className={`px-5 py-2.5 rounded-pill text-xs font-semibold transition-all border flex items-center gap-2 ${
                activeTab === "story"
                  ? "bg-ink text-paper border-ink shadow-xs"
                  : "bg-paper-2 border-rule text-ink hover:bg-paper-3"
              }`}
            >
              <MdOutlinePets className="text-sm" />
              <span>Story & Personality</span>
            </button>
            <button
              onClick={() => setActiveTab("health")}
              className={`px-5 py-2.5 rounded-pill text-xs font-semibold transition-all border flex items-center gap-2 ${
                activeTab === "health"
                  ? "bg-ink text-paper border-ink shadow-xs"
                  : "bg-paper-2 border-rule text-ink hover:bg-paper-3"
              }`}
            >
              <MdOutlineMedicalServices className="text-sm" />
              <span>Veterinary & Health Dossier</span>
            </button>
            <button
              onClick={() => setActiveTab("care")}
              className={`px-5 py-2.5 rounded-pill text-xs font-semibold transition-all border flex items-center gap-2 ${
                activeTab === "care"
                  ? "bg-ink text-paper border-ink shadow-xs"
                  : "bg-paper-2 border-rule text-ink hover:bg-paper-3"
              }`}
            >
              <FaShieldAlt className="text-xs" />
              <span>Adoption Guarantee & Package</span>
            </button>
          </div>

          {/* Tab 1: Story & Personality */}
          {activeTab === "story" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-display font-semibold text-ink mb-3">
                  Life with {pet.name}
                </h3>
                <p className="text-sm text-ink-2 leading-relaxed">
                  {pet.long_description || pet.short_description ||
                    `${pet.name} was rescued through our partner shelter network and placed with an experienced foster family to help them regain confidence and trust. They enjoy daily walks, relaxed lounging, and gentle bonding with human caregivers.`}
                </p>
              </div>

              {/* Compatibility & Temperament Matrix */}
              <div className="pt-4 border-t border-rule/70">
                <h4 className="text-xs font-semibold text-muted mb-4">
                  Temperament & Household Compatibility
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-card bg-paper-2 border border-rule">
                    <p className="text-xs font-semibold text-ink">Family & Children</p>
                    <p className="text-xs text-mint-deep font-medium mt-1 flex items-center gap-1">
                      <MdCheckCircle className="text-sm" />
                      <span>Recommended for all ages</span>
                    </p>
                    <p className="text-[11px] text-muted mt-1 leading-snug">
                      Patient and calm temperament observed during foster play sessions.
                    </p>
                  </div>
                  <div className="p-4 rounded-card bg-paper-2 border border-rule">
                    <p className="text-xs font-semibold text-ink">Other Animals</p>
                    <p className="text-xs text-mint-deep font-medium mt-1 flex items-center gap-1">
                      <MdCheckCircle className="text-sm" />
                      <span>Friendly with pets</span>
                    </p>
                    <p className="text-[11px] text-muted mt-1 leading-snug">
                      Successfully cohabitates with other domestic companions without tension.
                    </p>
                  </div>
                  <div className="p-4 rounded-card bg-paper-2 border border-rule">
                    <p className="text-xs font-semibold text-ink">Energy & Activity</p>
                    <p className="text-xs text-ink-2 font-medium mt-1">
                      Moderate · 30-45 mins daily
                    </p>
                    <p className="text-[11px] text-muted mt-1 leading-snug">
                      Enjoys moderate play, leash strolls, and peaceful nap sessions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Veterinary & Health Dossier */}
          {activeTab === "health" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-display font-semibold text-ink mb-2">
                  Clinical Examination & Medical Records
                </h3>
                <p className="text-xs sm:text-sm text-ink-2">
                  All clinical milestones have been supervised by accredited veterinarians. A physical copy of the health passport is transferred on adoption day.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-rule rounded-stock overflow-hidden">
                  <thead className="bg-paper-2 text-ink font-semibold border-b border-rule">
                    <tr>
                      <th className="py-3 px-4">Clinical Milestone</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Verification</th>
                      <th className="py-3 px-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule/70">
                    <tr>
                      <td className="py-3 px-4 font-medium text-ink">Core Vaccinations (Rabies, DHPP / FVRCP)</td>
                      <td className="py-3 px-4 text-mint-deep font-semibold">Completed</td>
                      <td className="py-3 px-4 text-muted">Certified</td>
                      <td className="py-3 px-4 text-muted">Next booster due in 11 months</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-ink">Microchip Implantation & Registration</td>
                      <td className="py-3 px-4 text-mint-deep font-semibold">Registered</td>
                      <td className="py-3 px-4 text-muted">Global 24PetWatch</td>
                      <td className="py-3 px-4 text-muted">Ownership transferred automatically</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-ink">Spay / Neuter Surgery</td>
                      <td className="py-3 px-4 text-mint-deep font-semibold">Completed</td>
                      <td className="py-3 px-4 text-muted">Certified Surgeon</td>
                      <td className="py-3 px-4 text-muted">Full recovery, no surgical restrictions</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-ink">Parasite & Heartworm Screening</td>
                      <td className="py-3 px-4 text-mint-deep font-semibold">Negative / Clear</td>
                      <td className="py-3 px-4 text-muted">Lab Panel Passed</td>
                      <td className="py-3 px-4 text-muted">Preventative oral dose administered monthly</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Adoption Guarantee & Care Package */}
          {activeTab === "care" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-display font-semibold text-ink mb-2">
                  What’s Included with Your Adoption
                </h3>
                <p className="text-xs sm:text-sm text-ink-2">
                  Our adoption commitment extends beyond the handoff. Every companion animal transitions with a complete care package to ensure lifelong success.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-card bg-paper-2 border border-rule">
                  <div className="w-9 h-9 rounded-full bg-accent text-accent-ink flex items-center justify-center text-sm font-semibold mb-3">
                    1
                  </div>
                  <h4 className="text-xs font-semibold text-ink">30-Day Vet Guarantee</h4>
                  <p className="text-[11px] text-muted mt-1 leading-relaxed">
                    Full reimbursement for unanticipated clinical visits during the initial transition period.
                  </p>
                </div>

                <div className="p-4 rounded-card bg-paper-2 border border-rule">
                  <div className="w-9 h-9 rounded-full bg-mint text-mint-deep flex items-center justify-center text-sm font-semibold mb-3">
                    2
                  </div>
                  <h4 className="text-xs font-semibold text-ink">Microchip Lifetime Registry</h4>
                  <p className="text-[11px] text-muted mt-1 leading-relaxed">
                    Nationwide microchip database subscription covered for life with emergency contact alerts.
                  </p>
                </div>

                <div className="p-4 rounded-card bg-paper-2 border border-rule">
                  <div className="w-9 h-9 rounded-full bg-accent-2 text-white flex items-center justify-center text-sm font-semibold mb-3">
                    3
                  </div>
                  <h4 className="text-xs font-semibold text-ink">Nutrition Starter Kit</h4>
                  <p className="text-[11px] text-muted mt-1 leading-relaxed">
                    Two weeks of specialized dry/wet food formula matching the foster diet to avoid stomach upsets.
                  </p>
                </div>

                <div className="p-4 rounded-card bg-paper-2 border border-rule">
                  <div className="w-9 h-9 rounded-full bg-accent-3 text-white flex items-center justify-center text-sm font-semibold mb-3">
                    4
                  </div>
                  <h4 className="text-xs font-semibold text-ink">Behavior Hotline Access</h4>
                  <p className="text-[11px] text-muted mt-1 leading-relaxed">
                    Direct access to certified canine and feline behavioral specialists for transition guidance.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </MotionReveal>

      {/* Floating Bottom Sticky Action Dock (Appears when scrolled) */}
      {showStickyDock && !pet.adopted && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-2xl mx-auto animate-float-slow">
          <div className="bg-paper/95 backdrop-blur-md rounded-pill border border-rule p-2 pl-4 pr-3 shadow-card flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-10 h-10 rounded-full object-cover border border-rule shrink-0"
              />
              <div className="truncate">
                <p className="text-xs font-semibold text-ink truncate flex items-center gap-1.5">
                  <span>{pet.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-mint-deep"></span>
                  <span className="text-mint-deep font-normal text-[11px]">Ready</span>
                </p>
                <p className="text-[11px] text-muted truncate">{pet.pet_location}</p>
              </div>
            </div>
            <button
              onClick={handleApplyClick}
              className="px-5 py-2.5 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep text-xs transition-colors shrink-0 press-down shadow-xs"
            >
              Apply to Adopt
            </button>
          </div>
        </div>
      )}

      {/* Adoption Request Dialog Modal */}
      <Dialog
        open={open}
        handler={handleOpen}
        size="md"
        className="bg-card border border-rule rounded-card p-6 sm:p-8 shadow-card max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 border-b border-rule">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill bg-paper-2 border border-rule text-[11px] font-semibold text-ink mb-1">
              <FaShieldAlt className="text-mint-deep text-[10px]" />
              <span>Adoption Application</span>
            </div>
            <h3 className="text-xl font-display font-semibold text-ink">
              Welcome {pet.name} home
            </h3>
            <p className="text-xs text-muted">
              Submit your household verification for the shelter review coordinator
            </p>
          </div>
          <button
            onClick={handleOpen}
            className="p-1.5 rounded-full text-muted hover:text-ink hover:bg-paper-2 transition-colors"
            aria-label="Close dialog"
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
                  className="w-full px-3.5 py-2.5 rounded-input bg-paper-2 border border-rule text-xs text-muted cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-2 mb-1">
                  Verified Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-input bg-paper-2 border border-rule text-xs text-muted cursor-not-allowed"
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
                className="w-full px-3.5 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-xs text-accent-3 mt-1">{formik.errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-xs font-semibold text-ink-2 mb-1">
                Home Address & City
              </label>
              <input
                id="address"
                name="address"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                placeholder="Street address, City, State, Zip"
                className="w-full px-3.5 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors"
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-xs text-accent-3 mt-1">{formik.errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="livingSpace" className="block text-xs font-semibold text-ink-2 mb-1">
                  Living Environment
                </label>
                <select
                  id="livingSpace"
                  name="livingSpace"
                  onChange={formik.handleChange}
                  value={formik.values.livingSpace}
                  className="w-full px-3.5 py-2.5 rounded-input bg-paper-2 border border-rule text-xs text-ink focus:outline-none focus:border-ink transition-colors"
                >
                  <option value="house-fenced">Single-family home (fenced yard)</option>
                  <option value="house-unfenced">Single-family home (unfenced)</option>
                  <option value="apartment">Apartment / Condominium</option>
                  <option value="rural">Rural / Farm property</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-xs font-semibold text-ink-2 mb-1">
                  Companion Experience
                </label>
                <select
                  id="experience"
                  name="experience"
                  onChange={formik.handleChange}
                  value={formik.values.experience}
                  className="w-full px-3.5 py-2.5 rounded-input bg-paper-2 border border-rule text-xs text-ink focus:outline-none focus:border-ink transition-colors"
                >
                  <option value="experienced">Experienced pet guardian</option>
                  <option value="first-time">First-time companion guardian</option>
                  <option value="current-pets">Currently caring for pets</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 rounded-input bg-paper-2 border border-rule text-xs text-ink-2">
              <p className="font-semibold text-ink mb-0.5">Shelter Coordinator Notice</p>
              <p className="text-[11px] text-muted">
                Submitting this application does not obligate adoption. It reserves {pet.name} for an introductory meet-and-greet with you.
              </p>
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
