import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaPaw,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaPause,
  FaPlay,
} from "react-icons/fa";

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
  },
];

const Banner = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const activePet = spotlightPets[activeIdx];

  // Fluid countdown rotation respecting user interaction and reduced-motion preferences
  useEffect(() => {
    if (isPaused) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const intervalMs = 80;
    const totalDurationMs = 6000;
    const step = (intervalMs / totalDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((curr) => (curr + 1) % spotlightPets.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, activeIdx]);

  const selectPet = (idx) => {
    setActiveIdx(idx);
    setProgress(0);
  };

  return (
    <section className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden bg-paper">
      
      {/* Right-Bleed Cinematic Photography Stage with Warm Cream Mask */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-7/12 pointer-events-none overflow-hidden z-0">
        <div className="relative w-full h-full">
          <img
            key={activePet.id}
            src={activePet.image}
            alt={activePet.name}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="w-full h-full object-cover object-center lg:object-[60%_center] transition-transform duration-1000 ease-out"
          />
          {/* Triple-directional organic blend into canvas */}
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 lg:via-paper/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-paper/30 lg:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-paper/70 via-transparent to-paper"></div>
        </div>
      </div>

      {/* Ambient Animated Dash Trajectory Vector */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-15 overflow-hidden z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -100,200 C 300,50 600,450 1100,220 S 1540,100 1600,300"
            stroke="var(--color-rule)"
            strokeWidth="1.5"
            strokeDasharray="8 10"
            className="animate-dash-flow motion-reduce:hidden"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Narrative, Ground-Truth Metrics & Primary CTAs */}
          <div className="lg:col-span-7 space-y-6 max-w-2xl">
            {/* Live Status Pill with Radar Beacon Animation */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-paper/95 backdrop-blur-md border border-rule shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-mint-deep opacity-75 motion-reduce:hidden"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mint-deep"></span>
              </span>
              <span className="text-xs font-semibold text-ink">
                28 companions ready for homes today
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-ink leading-[1.06]">
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
                className="px-7 py-3.5 rounded-pill font-semibold text-ink bg-paper/90 hover:bg-paper border border-rule hover-lift press-down transition-colors inline-flex items-center gap-2.5 shadow-xs"
              >
                <FaHeart className="text-accent-3 text-sm animate-heart-pulse motion-reduce:animate-none" />
                <span>Medical Campaigns</span>
              </Link>
            </div>

            {/* Credible Static Ground-Truth Metrics */}
            <div className="pt-8 border-t border-rule/80 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <p className="font-display font-semibold text-2xl lg:text-3xl text-ink">
                  1,480+
                </p>
                <p className="text-xs sm:text-sm text-muted mt-0.5">
                  Pets rehomed
                </p>
              </div>
              <div>
                <p className="font-display font-semibold text-2xl lg:text-3xl text-accent-3">
                  $184k
                </p>
                <p className="text-xs sm:text-sm text-muted mt-0.5">
                  Raised for care
                </p>
              </div>
              <div>
                <p className="font-display font-semibold text-2xl lg:text-3xl text-mint-deep">
                  100%
                </p>
                <p className="text-xs sm:text-sm text-muted mt-0.5">
                  Health checked
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Glass-Etched Inspection Capsule */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-card bg-paper/95 dark:bg-card/95 backdrop-blur-md border border-rule/80 shadow-card p-5 space-y-4 hover-lift transition-all">
              
              {/* Continuous Countdown Progress Line */}
              <div className="w-full h-1 bg-paper-2 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-accent transition-all ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Capsule Header with Status & Pause Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-mint-deep animate-radar"></span>
                  <span className="text-xs font-semibold text-ink">Spotlight Companion</span>
                  <span className="text-[11px] font-semibold text-mint-deep bg-mint/20 px-2 py-0.5 rounded-pill">
                    {activePet.status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  title={isPaused ? "Resume rotation" : "Pause rotation"}
                  aria-label={isPaused ? "Resume rotation" : "Pause rotation"}
                  className="p-1.5 rounded-full bg-paper-2 text-ink hover:bg-paper-3 border border-rule text-[10px] transition-colors press-down"
                >
                  {isPaused ? <FaPlay /> : <FaPause />}
                </button>
              </div>

              {/* Companion Narrative & Age */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-display font-semibold text-ink">
                    {activePet.name}
                  </h3>
                  <span className="text-xs font-semibold text-ink-2 bg-paper-2 px-2.5 py-0.5 rounded-pill border border-rule">
                    {activePet.age}
                  </span>
                </div>

                <p className="text-xs font-semibold text-accent-deep mt-0.5">
                  {activePet.species}
                </p>

                <p className="text-xs text-ink-2 mt-2 leading-relaxed">
                  {activePet.story}
                </p>
              </div>

              {/* Clinical Trait Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] px-2.5 py-0.5 rounded-pill bg-mint/20 text-mint-deep font-semibold flex items-center gap-1">
                  <FaShieldAlt className="text-[9px]" />
                  <span>100% Vetted Health</span>
                </span>
                {activePet.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] px-2.5 py-0.5 rounded-pill bg-paper-2 border border-rule text-ink font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Location & Direct Meet CTA */}
              <div className="pt-3 border-t border-rule flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-muted text-[11px] truncate max-w-[170px]">
                  <FaMapMarkerAlt className="text-accent-deep shrink-0" />
                  <span className="truncate">{activePet.location}</span>
                </div>
                <Link
                  to="/pet-listing"
                  className="font-semibold text-ink hover:text-accent-deep flex items-center gap-1 group"
                >
                  <span>Meet {activePet.name}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {/* Interactive Companion Selector Tabs */}
              <div className="pt-1 flex items-center justify-center gap-2">
                {spotlightPets.map((pet, idx) => (
                  <button
                    key={pet.id}
                    onClick={() => selectPet(idx)}
                    className={`px-3 py-1 rounded-pill text-[11px] font-semibold transition-all border flex items-center gap-1.5 press-down ${
                      activeIdx === idx
                        ? "bg-ink text-paper border-ink shadow-xs"
                        : "bg-paper-2 border-rule text-ink hover:bg-paper-3"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span>{pet.name}</span>
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
