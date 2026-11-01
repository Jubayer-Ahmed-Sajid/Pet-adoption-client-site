import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaHandHoldingHeart, FaCheckCircle, FaUsers, FaArrowRight } from "react-icons/fa";
import dogSwimming from "../../../assets/photos/dog-swimming.jpg";
import MotionReveal from "../../../Components/MotionReveal";

const donationTiers = [
  {
    amount: 10,
    label: "$10",
    impact: "Supplies 5 days of wholesome nutritious meals and sterile foster bedding.",
  },
  {
    amount: 25,
    label: "$25",
    impact: "Covers complete core vaccines, rabies immunization, and preventive flea care.",
  },
  {
    amount: 50,
    label: "$50",
    impact: "Provides full veterinary diagnostics, bloodwork, and vital health clearances.",
  },
  {
    amount: 100,
    label: "$100",
    impact: "Directly funds post-operative pain relief, wound therapy, and rehabilitation.",
  },
  {
    amount: 250,
    label: "$250",
    impact: "Sponsors an emergency surgical procedure or dedicated shelter recovery stay.",
  },
];

const Featured = () => {
  const [selectedTier, setSelectedTier] = useState(donationTiers[1]); // Default $25

  const baseFunded = 3850;
  const targetGoal = 5000;
  const projectedFunded = baseFunded + selectedTier.amount;
  const projectedPercent = Math.min(100, Math.round((projectedFunded / targetGoal) * 100));

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Contrasting Full-Width Warm Dark Band Breaking Card Monotony */}
      <div className="bg-ink text-paper rounded-card border border-rule overflow-hidden shadow-card p-8 sm:p-10 lg:p-14 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Narrative, Interactive Tiers & CTAs */}
          <div className="lg:col-span-7">
            <MotionReveal direction="up" distance={20} className="space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-accent-3 text-white text-xs font-semibold shadow-xs">
                <FaHeart className="text-xs animate-heart-pulse motion-reduce:animate-none" />
                <span>Urgent Medical Rescue Fund</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-paper leading-[1.12]">
                Every small gift sponsors emergency veterinary surgeries and care
              </h2>

              <p className="text-base sm:text-lg text-paper-2 leading-relaxed max-w-xl">
                Rescue companions frequently arrive requiring immediate treatment, orthopedic repair, or medical therapy before they can meet an adoptive family. 100% of campaign donations go directly to veterinary clinics.
              </p>

              {/* Interactive Donation Preset Selector */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between max-w-lg">
                  <p className="text-xs font-semibold text-paper-2 uppercase tracking-wide">
                    Choose a contribution to see its direct impact:
                  </p>
                  <span className="text-xs font-semibold text-accent-3 bg-paper/10 px-2.5 py-0.5 rounded-pill">
                    +{selectedTier.label} sponsorship
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2.5">
                  {donationTiers.map((tier) => (
                    <button
                      key={tier.amount}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`px-4 py-2 rounded-pill text-xs font-semibold transition-all border hover-lift press-down ${
                        selectedTier.amount === tier.amount
                          ? "bg-accent-3 text-white border-accent-3 shadow-xs scale-105"
                          : "bg-paper/10 border-paper/20 text-paper hover:bg-paper/20"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>

                {/* Dynamic Impact Statement Box */}
                <div className="p-4 rounded-card bg-paper/10 border border-paper/15 flex items-start gap-3 text-xs sm:text-sm text-paper-2 max-w-lg relative overflow-hidden">
                  <FaCheckCircle className="text-mint mt-0.5 shrink-0 text-sm" />
                  <p className="relative z-10">
                    <strong className="text-paper font-semibold">{selectedTier.label}:</strong> {selectedTier.impact}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/donation-campaign"
                  className="px-7 py-3.5 rounded-pill font-semibold text-white bg-accent-3 hover:bg-accent-3/90 hover-lift press-down shadow-card transition-colors inline-flex items-center gap-2 text-sm"
                >
                  <FaHandHoldingHeart className="text-base" />
                  <span>Sponsor Care with {selectedTier.label}</span>
                </Link>
                <Link
                  to="/pet-listing"
                  className="px-6 py-3.5 rounded-pill font-semibold text-paper bg-paper/10 hover:bg-paper/20 border border-paper/20 hover-lift press-down transition-colors text-sm inline-flex items-center gap-1.5 group"
                >
                  <span>Meet animals in care</span>
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Visual Thermometer Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <MotionReveal direction="up" delay={150} distance={24} className="w-full max-w-md">
              <div className="w-full rounded-card overflow-hidden border border-rule bg-paper text-ink shadow-card hover-lift transition-transform">
                
                {/* Photo with Overlay */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-paper-2">
                  <img
                    src={dogSwimming}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                    alt="Archie the rescue companion dog recovered and swimming"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-pill bg-paper/95 backdrop-blur-md text-ink text-xs font-semibold border border-rule shadow-xs">
                      Active Spotlight: Archie
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-sm font-semibold text-white">Archie's Hip Replacement Campaign</p>
                    <p className="text-xs text-white/80">Full recovery achieved · Ready for adoption</p>
                  </div>
                </div>

                {/* Real-time Progress Bar & Stats (Thickened Track & High-Contrast Coral Fill) */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between mb-2.5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg sm:text-xl font-bold text-ink">${projectedFunded.toLocaleString()}</span>
                        <span className="text-xs font-semibold text-muted">raised of $5,000</span>
                      </div>
                      <span className="text-xs font-bold text-accent-3 bg-accent-3/15 border border-accent-3/30 px-3 py-1 rounded-pill">
                        {projectedPercent}% funded
                      </span>
                    </div>

                    {/* Thickened Coral Thermometer Bar with High-Contrast Track */}
                    <div className="w-full h-6 sm:h-7 bg-paper-3 dark:bg-paper-2 rounded-pill p-1 border border-rule/90 shadow-inner relative overflow-hidden">
                      <div
                        className="h-full bg-accent-3 rounded-pill relative overflow-hidden transition-all duration-700 ease-out flex items-center justify-end pr-2.5 min-w-[3rem]"
                        style={{ width: `${projectedPercent}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer motion-reduce:hidden"></div>
                        <span className="text-[11px] font-extrabold text-white tracking-wide select-none drop-shadow-xs">
                          {projectedPercent}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-rule flex items-center justify-between text-xs text-muted">
                    <div className="flex items-center gap-1.5 text-ink-2 font-medium">
                      <FaUsers className="text-accent-3" />
                      <span>64 donors supported</span>
                    </div>
                    <span className="font-semibold text-mint-deep flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-mint-deep"></span>
                      Verified Clinic Transfer
                    </span>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Featured;
