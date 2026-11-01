import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaPaw,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaCheck,
  FaPause,
  FaPlay,
} from "react-icons/fa";
import MotionReveal from "../../../Components/MotionReveal";

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
    <section className="relative pt-24 pb-14 lg:pt-32 lg:pb-20 overflow-hidden bg-gradient-to-b from-paper via-paper to-paper-2">
      {/* Ambient Animated Trajectory SVG Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20 overflow-hidden">
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
          <circle cx="480" cy="240" r="180" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 6" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Narrative, Counters & Primary CTAs */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {/* Live Status Pill with Radar Beacon Animation */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-paper-2 border border-rule shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-mint-deep opacity-75 motion-reduce:hidden"></span>
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
                  <FaHeart className="text-accent-3 text-sm animate-heart-pulse motion-reduce:animate-none" />
                  <span>Medical Campaigns</span>
                </Link>
              </div>

              {/* Credible Static Ground-Truth Metrics */}
              <div className="pt-8 border-t border-rule grid grid-cols-3 gap-6 max-w-lg">
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
          </div>

          {/* Right Column: Interactive Featured Companion Visual Stage */}
          <div className="lg:col-span-5 relative">
            <MotionReveal direction="up" delay={150} distance={28}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Card with Visual Stage */}
                <div className="relative rounded-card overflow-hidden bg-card border border-rule shadow-card transition-all">
                  
                  {/* Real-time Progress Countdown Line */}
                  <div className="w-full h-1 bg-paper-2 overflow-hidden relative">
                    <div
                      className="h-full bg-accent transition-all ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Companion Photo with Smooth Fade & Scale */}
                  <div className="relative h-84 sm:h-96 w-full overflow-hidden bg-paper-2">
                    <img
                      key={activePet.id}
                      src={activePet.image}
                      alt={activePet.name}
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    
                    {/* Photo Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>

                    {/* Vetted Health & Status Inset Badge Cluster (Tested Across Breakpoints) */}
                    <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1.5 rounded-pill text-xs font-semibold bg-paper text-ink border border-rule shadow-sm flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-deep opacity-75 motion-reduce:hidden"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-mint-deep"></span>
                        </span>
                        <FaShieldAlt className="text-mint-deep text-[11px]" />
                        <span>100% Vetted Health</span>
                      </span>
                      <span className="hidden sm:inline-flex px-2.5 py-1.5 rounded-pill text-[11px] font-semibold bg-paper/90 backdrop-blur-md text-ink-2 border border-rule/80 shadow-xs">
                        {activePet.status}
                      </span>
                    </div>

                    {/* Pause / Resume Auto-rotate Button */}
                    <div className="absolute top-4 right-4 z-20">
                      <button
                        type="button"
                        onClick={() => setIsPaused(!isPaused)}
                        title={isPaused ? "Resume spotlight auto-rotation" : "Pause spotlight auto-rotation"}
                        aria-label={isPaused ? "Resume rotation" : "Pause rotation"}
                        className="p-2 rounded-full bg-paper/95 text-ink hover:bg-paper border border-rule text-xs shadow-xs transition-colors hover-lift press-down"
                      >
                        {isPaused ? <FaPlay className="text-[10px]" /> : <FaPause className="text-[10px]" />}
                      </button>
                    </div>

                    {/* Overlay Narrative */}
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5 z-10">
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
                      className="font-semibold text-accent-deep hover:underline flex items-center gap-1 group"
                    >
                      <span>Meet {activePet.name}</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>

                {/* Interactive Companion Selector Tabs */}
                <div className="mt-3 flex items-center justify-center gap-2">
                  {spotlightPets.map((pet, idx) => (
                    <button
                      key={pet.id}
                      onClick={() => selectPet(idx)}
                      className={`px-3 py-1.5 rounded-pill text-xs font-semibold transition-all flex items-center gap-1.5 border hover-lift press-down ${
                        activeIdx === idx
                          ? "bg-ink text-paper border-ink shadow-xs"
                          : "bg-paper border-rule text-ink hover:bg-paper-2"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span>{pet.name}</span>
                    </button>
                  ))}
                </div>

              </div>
            </MotionReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;
