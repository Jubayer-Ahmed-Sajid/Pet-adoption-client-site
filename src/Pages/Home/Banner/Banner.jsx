import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaPaw, FaShieldAlt, FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import AnimatedCounter from "../../../Components/AnimatedCounter";

import goldenPuppy from "../../../assets/photos/golden-puppy.jpg";
import cuteKitten from "../../../assets/photos/cute-kitten.jpg";
import heroDogHug from "../../../assets/photos/hero-dog-hug.jpg";

const spotlightPets = [
  {
    id: 1,
    name: "Callie",
    species: "Golden Retriever Puppy",
    age: "3 months",
    location: "Oakland Foster Shelter",
    tags: ["Vaccinated", "Socialized", "Playful"],
    image: goldenPuppy,
    story: "Gentle, eager to learn, and ready for an active family home.",
    status: "Ready for Adoption",
    badgeColor: "bg-mint/30 text-mint-deep border-mint/40",
  },
  {
    id: 2,
    name: "Luna",
    species: "Domestic Shorthair Kitten",
    age: "4 months",
    location: "Bay Area Rescue Center",
    tags: ["Litter Box Trained", "Microchipped", "Cuddle Bug"],
    image: cuteKitten,
    story: "Sweet, purrs endlessly, and loves sunny window perches.",
    status: "Ready for Adoption",
    badgeColor: "bg-accent/30 text-accent-ink border-accent/40",
  },
  {
    id: 3,
    name: "Barley & Maya",
    species: "Rescue Shepherd Mix",
    age: "1.5 years",
    location: "Pacific Companion Foundation",
    tags: ["Obedience Trained", "Great with Kids", "Gentle"],
    image: heroDogHug,
    story: "Loyal companion with a heart of gold who loves long trail walks.",
    status: "In Foster Care",
    badgeColor: "bg-sugar text-ink border-rule",
  },
];

const Banner = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePet = spotlightPets[activeIdx];

  // Subtle auto-rotation every 7 seconds, pausing if reduced motion preferred
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % spotlightPets.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 pb-14 lg:pt-32 lg:pb-20 overflow-hidden bg-gradient-to-b from-paper via-paper to-paper-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Narrative, Counters & Primary CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-paper-2 border border-rule shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-deep opacity-75 motion-reduce:hidden"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mint-deep"></span>
              </span>
              <span className="text-xs font-semibold text-ink">
                28 companions ready for homes today
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-ink leading-[1.08]">
              Give a loving companion their forever home.
            </h1>

            <p className="text-lg sm:text-xl text-ink-2 max-w-xl leading-relaxed">
              Paws & Hearts connects verified shelters, foster volunteers, and adopters under a transparent platform with direct veterinary crowdfunding.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/pet-listing"
                className="px-7 py-3.5 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-card transition-colors inline-flex items-center gap-2.5"
              >
                <FaPaw className="text-sm" />
                <span>Explore Adoptable Pets</span>
              </Link>
              <Link
                to="/donation-campaign"
                className="px-7 py-3.5 rounded-pill font-semibold text-ink bg-paper hover:bg-paper-3 border border-rule hover-lift press-down transition-colors inline-flex items-center gap-2.5"
              >
                <FaHeart className="text-accent-3 text-sm" />
                <span>Medical Campaigns</span>
              </Link>
            </div>

            {/* Dynamic Animated Counters */}
            <div className="pt-8 border-t border-rule grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="font-display font-semibold text-2xl lg:text-3xl text-ink">
                  <AnimatedCounter target={1480} suffix="+" duration={1400} />
                </p>
                <p className="text-xs sm:text-sm text-muted mt-0.5">
                  Pets rehomed
                </p>
              </div>
              <div>
                <p className="font-display font-semibold text-2xl lg:text-3xl text-accent-3">
                  <AnimatedCounter target={184} prefix="$" suffix="k" duration={1400} />
                </p>
                <p className="text-xs sm:text-sm text-muted mt-0.5">
                  Raised for care
                </p>
              </div>
              <div>
                <p className="font-display font-semibold text-2xl lg:text-3xl text-mint-deep">
                  <AnimatedCounter target={100} suffix="%" duration={1400} />
                </p>
                <p className="text-xs sm:text-sm text-muted mt-0.5">
                  Health checked
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Featured Companion Visual Stage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card with Visual Stage */}
              <div className="relative rounded-card overflow-hidden bg-card border border-rule shadow-card transition-transform">
                
                {/* Companion Photo */}
                <div className="relative h-84 sm:h-96 w-full overflow-hidden bg-paper-2">
                  <img
                    key={activePet.id}
                    src={activePet.image}
                    alt={activePet.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Photo Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>

                  {/* Status Pill on Image */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-pill text-xs font-semibold bg-paper/95 backdrop-blur-md text-ink border border-white/20 shadow-xs flex items-center gap-1.5">
                      <FaCheck className="text-mint-deep text-[10px]" />
                      {activePet.status}
                    </span>
                  </div>

                  {/* Overlay Narrative */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-display font-semibold text-white">
                        {activePet.name}
                      </h3>
                      <span className="text-xs font-medium text-white/80 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-pill">
                        {activePet.age}
                      </span>
                    </div>

                    <p className="text-xs text-white/90 font-medium">
                      {activePet.species}
                    </p>

                    <p className="text-xs text-white/80 line-clamp-1">
                      {activePet.story}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activePet.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2 py-0.5 rounded-pill bg-white/20 backdrop-blur-xs text-white font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer with Quick Shelter Location & Action */}
                <div className="p-4 bg-card border-t border-rule flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-ink-2">
                    <FaMapMarkerAlt className="text-accent-deep" />
                    <span>{activePet.location}</span>
                  </div>
                  <Link
                    to="/pet-listing"
                    className="font-semibold text-accent-deep hover:underline flex items-center gap-1"
                  >
                    <span>Meet {activePet.name}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Interactive Companion Selector Tabs */}
              <div className="mt-3 flex items-center justify-center gap-2">
                {spotlightPets.map((pet, idx) => (
                  <button
                    key={pet.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`px-3 py-1.5 rounded-pill text-xs font-semibold transition-colors flex items-center gap-1.5 border ${
                      activeIdx === idx
                        ? "bg-ink text-paper border-ink"
                        : "bg-paper border-rule text-ink hover:bg-paper-2"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span>{pet.name}</span>
                  </button>
                ))}
              </div>

              {/* Floating Verified Badge (Hallmark Clean Style) */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-paper/95 backdrop-blur-md border border-rule p-3 rounded-card shadow-card animate-float-slow motion-reduce:animate-none hidden sm:flex items-center gap-3">
                <div className="p-2 rounded-full bg-mint/30 text-mint-deep">
                  <FaShieldAlt className="text-base" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink">
                    100% Vetted Health
                  </p>
                  <p className="text-[11px] text-muted">
                    Vaccinated & microchipped
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
