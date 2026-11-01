import { Link } from "react-router-dom";
import React, { useState } from "react";
import useDonations from "../../Components/Hooks/useDonations";
import {
  FaHeart,
  FaCalendarAlt,
  FaHospital,
  FaShieldAlt,
  FaArrowRight,
  FaNotesMedical,
  FaStethoscope,
  FaHandHoldingHeart
} from "react-icons/fa";
import { MdOutlineLocalHospital, MdCheckCircle, MdTimeline } from "react-icons/md";
import MotionReveal from "../../Components/MotionReveal";

const DonationCampaign = () => {
  const [donations] = useDonations();
  const [previewTier, setPreviewTier] = useState(25);

  const impactTiers = [
    { amount: 15, label: "Pain Relief & Antibiotics", desc: "Covers 7 days of post-trauma oral pain relief and anti-inflammatory treatment." },
    { amount: 25, label: "Blood Chemistry & Labs", desc: "Diagnostic blood tests, pre-anesthetic screening, and viral panels." },
    { amount: 50, label: "Sterile Surgical Bandaging", desc: "Wound debridement, antibiotic sutures, and high-grade sterile dressing." },
    { amount: 100, label: "Orthopedic Surgery Procedure", desc: "Surgical intervention for bone fractures, joint reduction, and anesthesia." },
  ];

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Editorial Header with Living Medical Beacon */}
      <MotionReveal direction="up" distance={16}>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-accent-3/15 text-accent-3 text-xs font-semibold mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-accent-3 animate-radar"></span>
            <FaHospital className="text-xs" />
            <span>Emergency Veterinary Care & Critical Relief</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-ink tracking-tight">
            Urgent medical rescue funds
          </h1>

          <p className="text-base text-ink-2 mt-3 leading-relaxed">
            100% of community contributions directly sponsor surgical procedures, trauma recovery, and specialized medications for rescue animals in emergency care.
          </p>

          {/* Clinical Transparency Strip */}
          <div className="mt-8 pt-6 border-t border-rule grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-2xl mx-auto text-xs">
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-card bg-paper-2 border border-rule">
              <FaShieldAlt className="text-mint-deep text-sm" />
              <span className="text-ink font-medium">Direct Veterinary Escrow</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-card bg-paper-2 border border-rule">
              <FaHeart className="text-accent-3 text-sm animate-heart-pulse" />
              <span className="text-ink font-medium">Zero Administrative Fee</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-card bg-paper-2 border border-rule">
              <FaNotesMedical className="text-accent-deep text-sm" />
              <span className="text-ink font-medium">Itemized Hospital Receipts</span>
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* Interactive Medical Impact Matrix Banner */}
      <MotionReveal direction="up" delay={80} distance={16}>
        <div className="bg-card rounded-card border border-rule p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-accent-3 uppercase tracking-wide flex items-center gap-1.5">
                <FaStethoscope />
                <span>Transparent Medical Impact Simulator</span>
              </p>
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-ink mt-1">
                See exactly what your sponsorship funds
              </h3>
              <p className="text-xs sm:text-sm text-ink-2 mt-1">
                Choose an emergency tier below to see the exact clinical resources delivered to partner animal hospitals:
              </p>
            </div>

            {/* Quick Impact Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {impactTiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => setPreviewTier(tier.amount)}
                  className={`px-3.5 py-1.5 rounded-pill text-xs font-semibold border transition-all duration-150 ${
                    previewTier === tier.amount
                      ? "bg-accent-3 text-white border-accent-3 shadow-xs scale-105"
                      : "bg-paper-2 border-rule text-ink hover:bg-paper-3"
                  }`}
                >
                  ${tier.amount}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tier Explanation */}
          <div className="mt-5 p-4 rounded-card bg-paper-2 border border-rule/70 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-3/15 text-accent-3 flex items-center justify-center shrink-0 text-sm mt-0.5">
              <MdCheckCircle />
            </div>
            <div>
              <p className="text-xs font-semibold text-ink">
                ${previewTier} Tier: {impactTiers.find((t) => t.amount === previewTier)?.label}
              </p>
              <p className="text-xs text-ink-2 mt-0.5">
                {impactTiers.find((t) => t.amount === previewTier)?.desc}
              </p>
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* Campaigns Grid */}
      {(!donations || donations.length === 0) ? (
        <div className="bg-card rounded-card border border-rule p-12 text-center max-w-md mx-auto shadow-sm">
          <FaHeart className="text-accent-3 text-3xl mx-auto mb-3 animate-heart-pulse" />
          <h3 className="text-xl font-display font-semibold text-ink">
            No active medical campaigns
          </h3>
          <p className="text-xs sm:text-sm text-ink-2 mt-2 leading-relaxed">
            All current medical emergencies have been fully funded. Check back soon or register a new emergency care fund from your coordinator dashboard.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donations.map((campaign, idx) => {
            const maxAmount = Number(campaign.max_donation_amount) || 1;
            const currentAmount = Number(campaign.donated_amount) || 0;
            const percentage = Math.min(
              100,
              Math.round((currentAmount / maxAmount) * 100)
            );
            const remaining = Math.max(0, maxAmount - currentAmount);
            const isFunded = currentAmount >= maxAmount;

            return (
              <MotionReveal
                key={campaign._id}
                delay={(idx % 6) * 60}
                distance={20}
                direction="up"
              >
                <div
                  className="bg-card rounded-card border border-rule overflow-hidden shadow-sm hover-lift flex flex-col justify-between group transition-all hover:border-accent-3/40 hover:shadow-card h-full"
                >
                  <div>
                    {/* Campaign Image Stage */}
                    <div className="relative h-64 w-full overflow-hidden bg-paper-2">
                      <img
                        src={campaign.image}
                        alt={campaign.name || "Campaign image"}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="bg-paper/95 backdrop-blur-md px-2.5 py-1 rounded-pill border border-rule text-[11px] font-semibold text-ink inline-flex items-center gap-1.5 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-3 animate-radar"></span>
                          <span>Veterinary Priority</span>
                        </span>

                        <div className="bg-paper/95 backdrop-blur-md px-2.5 py-1 rounded-pill border border-rule text-[11px] font-semibold text-ink inline-flex items-center gap-1 shadow-xs">
                          <FaCalendarAlt className="text-muted text-[10px]" />
                          <span>{campaign.last_date ? `Ends ${campaign.last_date}` : "Active"}</span>
                        </div>
                      </div>

                      {/* Bottom Image Overlay with Medical ECG Line */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-pill bg-accent-3/90 backdrop-blur-sm text-white shadow-xs inline-flex items-center gap-1">
                            <FaHeart className="text-[10px] animate-heart-pulse" />
                            <span>{isFunded ? "Fully Funded" : "Critical Care Stage"}</span>
                          </span>
                          <span className="text-xs font-mono font-semibold text-white/90">
                            {percentage}% Funded
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Campaign Content Body */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-2xl font-display font-semibold text-ink group-hover:text-accent-3 transition-colors">
                          {campaign.pet_name || campaign.name || "Medical Recovery Fund"}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-ink-2 line-clamp-2 leading-relaxed mb-6">
                        {campaign.short_description ||
                          "Help provide the necessary medication, surgical treatment, and clinical rehabilitation required for recovery."}
                      </p>

                      {/* Thermometer Progress Bar with Flowing ECG & Shimmer */}
                      <div className="space-y-2.5 p-4 rounded-card bg-paper-2 border border-rule/70">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="font-semibold text-ink">
                            ${currentAmount.toLocaleString()}{" "}
                            <span className="font-normal text-muted">raised</span>
                          </span>
                          <span className="font-semibold text-accent-3 text-xs">
                            Goal: ${maxAmount.toLocaleString()}
                          </span>
                        </div>

                        {/* Liquid Progress Bar with Animated Shimmer */}
                        <div className="relative w-full h-3 rounded-pill bg-paper overflow-hidden border border-rule">
                          <div
                            className="h-full bg-accent-3 transition-all duration-700 rounded-pill relative overflow-hidden"
                            style={{ width: `${percentage}%` }}
                          >
                            {/* Animated Liquid Shimmer Light */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-muted pt-1">
                          <span className="inline-flex items-center gap-1">
                            <MdTimeline className="text-accent-3 text-xs" />
                            <span>{percentage}% reached</span>
                          </span>
                          <span className="font-medium text-ink-2">
                            {isFunded ? "Goal achieved!" : `$${remaining.toLocaleString()} deficit`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Link */}
                  <div className="p-6 pt-0">
                    <Link
                      to={`/donation-campaign/${campaign._id}`}
                      className={`w-full py-3.5 rounded-pill font-semibold text-xs transition-colors flex items-center justify-center gap-2 group/btn press-down shadow-xs ${
                        isFunded
                          ? "bg-paper-2 border border-rule text-ink hover:bg-paper-3"
                          : "text-white bg-accent-3 hover:bg-accent-3/90 hover-lift"
                      }`}
                    >
                      <FaHandHoldingHeart className="text-xs" />
                      <span>{isFunded ? "View Medical Story" : `Sponsor ${campaign.pet_name || "Companion"}`}</span>
                      <FaArrowRight className="text-[10px] transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default DonationCampaign;
