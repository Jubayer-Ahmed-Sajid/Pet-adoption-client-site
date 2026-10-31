import { MdCalendarMonth } from "react-icons/md";
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
import { FaHandHoldingHeart, FaTimes } from "react-icons/fa";
import useAuth from "../../Components/Hooks/useAuth";
import Swal from "sweetalert2";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY || "pk_test_sample");

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [donationDetails = {}, refetch, isLoading] = useDonationDetails(id);
  const [open, setOpen] = useState(false);
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

  if (isLoading || !donationDetails.image) {
    return (
      <div className="pt-36 pb-20 max-w-4xl mx-auto px-4 text-center">
        <div className="p-12 rounded-card bg-card border border-rule animate-pulse motion-reduce:animate-none">
          <p className="text-muted">Loading campaign details…</p>
        </div>
      </div>
    );
  }

  const isClosed = currentAmount >= maxAmount;

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-muted">
        <Link to="/donation-campaign" className="hover:text-ink transition-colors">
          Campaigns
        </Link>
        <span>/</span>
        <span className="text-ink font-medium">{donationDetails.pet_name || "Details"}</span>
      </div>

      <div className="bg-card rounded-card border border-rule overflow-hidden shadow-card">
        <div className="grid lg:grid-cols-12 gap-0">
          {/* Campaign Image */}
          <div className="lg:col-span-6 relative bg-paper-2 min-h-[360px] lg:min-h-full">
            <img
              src={donationDetails.image}
              alt={donationDetails.pet_name || "Campaign image"}
              className="w-full h-full object-cover min-h-[360px]"
            />
            <div className="absolute top-4 left-4 bg-paper/95 backdrop-blur-md px-3.5 py-1 rounded-pill border border-rule text-xs font-semibold text-ink">
              Medical & recovery fund
            </div>
          </div>

          {/* Details & Donation Card */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <h1 className="text-3xl sm:text-4xl font-display font-semibold text-ink">
                  {donationDetails.pet_name || "Emergency Rescue Care"}
                </h1>
                <p className="text-xs sm:text-sm text-muted mt-1.5 flex items-center gap-1.5">
                  <MdCalendarMonth className="text-accent-3 text-base" />
                  <span>Campaign active until: {donationDetails.last_date || "Ongoing"}</span>
                </p>
              </div>

              {/* Progress Summary */}
              <div className="p-4 rounded-stock bg-paper-2 border border-rule space-y-2.5">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-semibold text-ink text-sm">
                    ${currentAmount.toLocaleString()}{" "}
                    <span className="font-normal text-muted text-xs">funded</span>
                  </span>
                  <span className="text-muted text-xs">
                    Goal: ${maxAmount.toLocaleString()}
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-paper overflow-hidden border border-rule">
                  <div
                    className="h-full bg-accent-3 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[11px] text-muted">
                  <span>{percentage}% of goal reached</span>
                  <span>${Math.max(0, maxAmount - currentAmount).toLocaleString()} remaining</span>
                </div>
              </div>

              {/* Story */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold text-muted">
                  Campaign story
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

            {/* Donation Action */}
            <div className="pt-8 mt-6 border-t border-rule">
              {isClosed ? (
                <div className="p-3.5 rounded-pill bg-paper-2 text-mint-deep text-center text-sm font-semibold border border-rule">
                  ✓ Goal reached! Thank you for your generosity.
                </div>
              ) : (
                <button
                  onClick={handleDonateClick}
                  className="w-full py-3.5 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-sm inline-flex items-center justify-center gap-2 text-sm transition-colors"
                >
                  <FaHandHoldingHeart />
                  <span>Donate to this campaign</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Payment Modal */}
      <Dialog
        open={open}
        handler={handleOpen}
        size="md"
        className="bg-card border border-rule rounded-card p-6 shadow-card"
      >
        <div className="flex items-center justify-between pb-4 border-b border-rule">
          <div>
            <h3 className="text-xl font-display font-semibold text-ink">
              Secure donation
            </h3>
            <p className="text-xs text-muted">
              Supporting {donationDetails.pet_name || "Rescue Campaign"}
            </p>
          </div>
          <button
            onClick={handleOpen}
            className="p-1 rounded-full text-muted hover:text-ink"
          >
            <FaTimes size={18} />
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
