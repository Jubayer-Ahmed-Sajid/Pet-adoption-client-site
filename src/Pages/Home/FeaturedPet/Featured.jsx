import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaHandHoldingHeart, FaCheckCircle, FaUsers, FaArrowRight } from "react-icons/fa";
import dogSwimming from "../../../assets/photos/dog-swimming.jpg";

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

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-card rounded-card border border-rule overflow-hidden shadow-card p-8 lg:p-12 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Narrative, Interactive Tiers & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-accent-3/15 text-accent-3 text-xs font-semibold">
              <FaHeart className="text-xs" />
              <span>Urgent Medical Rescue Fund</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-ink leading-tight">
              Every small gift sponsors emergency veterinary surgeries and care
            </h2>

            <p className="text-base text-ink-2 leading-relaxed max-w-xl">
              Rescue companions frequently arrive requiring immediate treatment, orthopedic repair, or medical therapy before they can meet an adoptive family. 100% of campaign donations go directly to veterinary clinics.
            </p>

            {/* Interactive Donation Preset Selector */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-semibold text-ink uppercase tracking-wide">
                Choose a contribution to see its direct impact:
              </p>
              
              <div className="flex flex-wrap gap-2.5">
                {donationTiers.map((tier) => (
                  <button
                    key={tier.amount}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`px-4 py-2 rounded-pill text-xs font-semibold transition-all border ${
                      selectedTier.amount === tier.amount
                        ? "bg-accent-3 text-white border-accent-3 shadow-xs scale-105"
                        : "bg-paper border-rule text-ink hover:bg-paper-2"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Impact Statement Box */}
              <div className="p-3.5 rounded-input bg-paper-2 border border-rule/80 flex items-start gap-2.5 text-xs text-ink-2 max-w-lg">
                <FaCheckCircle className="text-mint-deep mt-0.5 shrink-0" />
                <p>
                  <strong className="text-ink font-semibold">{selectedTier.label}:</strong> {selectedTier.impact}
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
                className="px-6 py-3.5 rounded-pill font-semibold text-ink bg-paper hover:bg-paper-3 border border-rule hover-lift press-down transition-colors text-sm inline-flex items-center gap-1.5"
              >
                <span>Meet animals in care</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Thermometer Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md rounded-card overflow-hidden border border-rule bg-paper shadow-card">
              
              {/* Photo with Overlay */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={dogSwimming}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  alt="Archie the rescue companion dog recovered and swimming"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
                
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-pill bg-paper/90 backdrop-blur-md text-ink text-[11px] font-semibold border border-white/20">
                    Active Spotlight: Archie
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="text-sm font-semibold text-white">Archie's Hip Replacement Campaign</p>
                  <p className="text-xs text-white/80">Full recovery achieved · Ready for adoption</p>
                </div>
              </div>

              {/* Real-time Progress Bar & Stats */}
              <div className="p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-ink">$3,850 funded</span>
                    <span className="text-accent-3">77% of $5,000</span>
                  </div>

                  {/* Thermometer Bar */}
                  <div className="w-full h-3 bg-paper-2 rounded-pill overflow-hidden p-0.5 border border-rule">
                    <div
                      className="h-full bg-accent-3 rounded-pill transition-all duration-1000 ease-out"
                      style={{ width: "77%" }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-rule flex items-center justify-between text-xs text-muted">
                  <div className="flex items-center gap-1.5 text-ink-2">
                    <FaUsers className="text-accent-3" />
                    <span>64 donors supported</span>
                  </div>
                  <span className="font-medium text-mint-deep">Verified Clinic Transfer</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Featured;
