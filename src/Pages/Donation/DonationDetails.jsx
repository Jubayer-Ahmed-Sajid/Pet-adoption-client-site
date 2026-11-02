import { MdCalendarMonth, MdCheckCircle, MdOutlineLocalHospital, MdClose } from "react-icons/md";
import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import useDonationDetails from "../../Components/Hooks/useDonationDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";
import {
  FaHandHoldingHeart,
  FaTimes,
  FaShieldAlt,
  FaHeart,
  FaHospital,
  FaStethoscope,
  FaNotesMedical
} from "react-icons/fa";
import useAuth from "../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import MotionReveal from "../../Components/MotionReveal";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY || "pk_test_sample");

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [donationDetails = {}, refetch, isLoading] = useDonationDetails(id);
  const [open, setOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(25);
  const handleOpen = () => setOpen(!open);

  const handleDonateClick = () => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Sign in required",
        text: "Please sign in to sponsor this medical rescue fund.",
        showCancelButton: true,
        confirmButtonText: "Sign In",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin", { state: `/donation-campaign/${id}` });
        }
      });
      return;
    }
    handleOpen();
  };

  const maxAmount = Number(donationDetails.max_donation_amount) || 1;
  const currentAmount = Number(donationDetails.donated_amount) || 0;
  const percentage = Math.min(100, Math.round((currentAmount / maxAmount) * 100));
  const remaining = Math.max(0, maxAmount - currentAmount);
  const isClosed = currentAmount >= maxAmount;

  if (isLoading || !donationDetails.image) {
    return (
      <div className="pt-36 pb-20 max-w-4xl mx-auto px-4 text-center">
        <div className="p-16 rounded-card bg-card border border-rule animate-pulse">
          <FaHospital className="text-3xl text-accent-3 mx-auto mb-3 animate-bounce" />
          <p className="text-muted text-sm">Retrieving veterinary emergency record…</p>
        </div>
      </div>
    );
  }

  const clinicalItems = [
    { title: "Diagnostic Blood Chemistry & Digital Radiographs", cost: 180, status: "Completed" },
    { title: "Trauma Wound Debridement & Surgical Intervention", cost: 450, status: "Underway" },
    { title: "Post-Operative Antibiotics, Pain Relief & IV Fluids", cost: 140, status: "Pending Funding" },
    { title: "Specialized Nutritional Therapy & Foster Physical Rehab", cost: 230, status: "Pending Funding" },
  ];

  return (
    <div className="pt-28 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <MotionReveal direction="up" distance={12}>
        <div className="mb-6 flex items-center gap-2 text-xs text-muted">
          <Link to="/donation-campaign" className="hover:text-ink transition-colors flex items-center gap-1">
            <FaHospital className="text-[10px]" />
            <span>Emergency Campaigns</span>
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">{donationDetails.pet_name || "Emergency Fund"}</span>
        </div>
      </MotionReveal>

      {/* Main Campaign Stage Card */}
      <MotionReveal direction="up" delay={60} distance={16}>
        <div className="bg-card rounded-card border border-rule overflow-hidden shadow-card mb-8">
          <div className="grid lg:grid-cols-12 gap-0">
            {/* Visual Media Column */}
            <div className="lg:col-span-6 relative bg-paper-2 min-h-[400px] lg:min-h-full overflow-hidden group">
              <img
                src={donationDetails.image}
                alt={donationDetails.pet_name || "Campaign image"}
                className="w-full h-full object-cover min-h-[400px] max-h-[560px] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none"></div>

              {/* Top Status Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="bg-paper/95 backdrop-blur-md px-3.5 py-1 rounded-pill border border-rule text-xs font-semibold text-ink inline-flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-accent-3 animate-radar"></span>
                  <span>Active Veterinary Triage</span>
                </span>
                <span className="bg-paper/95 backdrop-blur-md px-3 py-1 rounded-pill border border-rule text-xs font-semibold text-mint-deep inline-flex items-center gap-1 shadow-xs">
                  <FaShieldAlt className="text-mint-deep text-[11px]" />
                  <span>Accredited Clinic Partner</span>
                </span>
              </div>

              {/* Bottom Image Stage Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-black/40 backdrop-blur-md border border-white/20 text-xs mb-2">
                  <FaNotesMedical className="text-accent text-[11px]" />
                  <span>Itemized Clinic Invoices Maintained</span>
                </div>
                <p className="text-xs text-white/80">
                  Direct clinic disbursement · Hospital receipts verified prior to release
                </p>
              </div>
            </div>

            {/* Content & Sponsorship Column */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-ink tracking-tight">
                    {donationDetails.pet_name || "Emergency Rescue Care"}
                  </h1>
                  <p className="text-xs sm:text-sm text-ink-2 mt-2 flex items-center gap-1.5">
                    <MdCalendarMonth className="text-accent-3 text-base shrink-0" />
                    <span>
                      Campaign open until: {donationDetails.last_date || "Care completed"}
                    </span>
                  </p>
                </div>

                {/* Progress Thermometer with Liquid Shimmer */}
                <div className="p-5 rounded-card bg-paper-2 border border-rule space-y-3">
                  <div className="flex justify-between items-baseline text-xs">
                    <div>
                      <p className="text-[11px] font-semibold text-muted uppercase">Total Raised</p>
                      <p className="text-2xl font-display font-semibold text-ink mt-0.5">
                        ${currentAmount.toLocaleString()}
                        <span className="text-xs font-normal text-muted ml-1.5">
                          of ${maxAmount.toLocaleString()} goal
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-semibold text-accent-3 font-display">
                        {percentage}%
                      </p>
                      <p className="text-[11px] text-muted">
                        ${remaining.toLocaleString()} needed
                      </p>
                    </div>
                  </div>

                  {/* Flowing Shimmer Progress Bar */}
                  <div className="relative w-full h-3 rounded-pill bg-paper overflow-hidden border border-rule">
                    <div
                      className="h-full bg-accent-3 transition-all duration-700 rounded-pill relative overflow-hidden"
                      style={{ width: `${percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer"></div>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted flex items-center justify-between pt-1">
                    <span>Direct escrow account</span>
                    <span>100% of gift goes to care</span>
                  </p>
                </div>

                {/* Medical Story */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">
                    Medical condition & prognosis
                  </h4>
                  <p className="text-sm font-medium text-ink leading-relaxed">
                    {donationDetails.short_description}
                  </p>
                  {donationDetails.long_description && (
                    <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                      {donationDetails.long_description}
                    </p>
                  )}
                </div>
              </div>

              {/* Primary Donation Action Button */}
              <div className="pt-6 border-t border-rule mt-6">
                {isClosed ? (
                  <div className="p-4 rounded-pill bg-paper-2 text-mint-deep text-center text-sm font-semibold border border-rule flex items-center justify-center gap-2">
                    <MdCheckCircle className="text-mint-deep text-base" />
                    <span>Goal fully funded! Thank you to all community sponsors.</span>
                  </div>
                ) : (
                  <button
                    onClick={handleDonateClick}
                    className="w-full py-4 rounded-pill font-semibold text-white bg-accent-3 hover:bg-accent-3/90 hover-lift press-down shadow-sm inline-flex items-center justify-center gap-2.5 text-sm transition-colors group/btn"
                  >
                    <FaHandHoldingHeart className="transition-transform group-hover/btn:scale-110" />
                    <span>Sponsor {donationDetails.pet_name || "Companion"}’s Medical Care</span>
                  </button>
                )}
                <p className="text-center text-[11px] text-muted mt-2.5">
                  Tax-deductible gift · Instant electronic receipt and clinic verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* Itemized Clinical Treatment Plan */}
      <MotionReveal direction="up" delay={120} distance={18}>
        <div className="bg-card rounded-card border border-rule p-6 sm:p-8 lg:p-10 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-rule">
            <div>
              <p className="text-xs font-semibold text-accent-3 uppercase tracking-wide flex items-center gap-1.5">
                <FaStethoscope />
                <span>Veterinary Hospital Treatment Schedule</span>
              </p>
              <h3 className="text-xl font-display font-semibold text-ink mt-1">
                Clinical Care & Recovery Breakdown
              </h3>
            </div>
            <div className="px-3.5 py-1.5 rounded-pill bg-paper-2 border border-rule text-xs text-ink font-semibold flex items-center gap-2 self-start sm:self-auto">
              <FaHospital className="text-accent-3 text-xs" />
              <span>Partner Clinic: Regional Animal Medical Center</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-rule rounded-stock overflow-hidden">
              <thead className="bg-paper-2 text-ink font-semibold border-b border-rule">
                <tr>
                  <th className="py-3 px-4">Procedure & Clinical Service</th>
                  <th className="py-3 px-4">Estimated Cost</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Funding Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule/70">
                {clinicalItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-paper-2/50 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-ink flex items-center gap-2">
                      <MdOutlineLocalHospital className="text-accent-3 shrink-0" />
                      <span>{item.title}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-ink">${item.cost}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-pill font-semibold text-[11px] ${
                        item.status === "Completed"
                          ? "bg-mint/20 text-mint-deep"
                          : item.status === "Underway"
                          ? "bg-accent/30 text-accent-ink"
                          : "bg-paper-2 text-muted"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted">Community Sponsor Gifts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MotionReveal>

      {/* Stripe Payment Modal */}
      <Dialog
        open={open}
        handler={handleOpen}
        size="md"
        className="bg-card border border-rule rounded-card p-6 sm:p-8 shadow-card max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 border-b border-rule">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill bg-accent-3/15 text-accent-3 text-[11px] font-semibold mb-1">
              <FaHeart className="text-[10px]" />
              <span>Medical Sponsorship</span>
            </div>
            <h3 className="text-xl font-display font-semibold text-ink">
              Sponsor {donationDetails.pet_name || "Companion"}
            </h3>
            <p className="text-xs text-muted">
              Choose your contribution amount and confirm via secure 256-bit Stripe
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
          <Elements stripe={stripePromise}>
            <CheckOut
              id={donationDetails._id}
              onSuccess={() => {
                handleOpen();
                refetch();
              }}
            />
          </Elements>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default DonationDetails;
