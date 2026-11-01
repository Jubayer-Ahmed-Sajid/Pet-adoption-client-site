import React, { useState } from "react";
import { FaShieldAlt, FaHeart, FaHome, FaStethoscope } from "react-icons/fa";

const milestones = [
  {
    step: "01",
    title: "Sanctuary Intake",
    tagline: "Safe Haven & Nutrition",
    detail: "Immediate medical triage, behavioral intake, and safe warm shelter upon rescue.",
    icon: FaShieldAlt,
    color: "text-mint-deep",
    bg: "bg-mint/20",
    border: "border-mint/30",
  },
  {
    step: "02",
    title: "Clinical Care",
    tagline: "100% Health Guarantee",
    detail: "Core vaccinations, spay/neuter surgery, deworming, and microchip registration.",
    icon: FaStethoscope,
    color: "text-accent-3",
    bg: "bg-accent-3/20",
    border: "border-accent-3/30",
  },
  {
    step: "03",
    title: "Foster Home",
    tagline: "Socialization & Love",
    detail: "Living with certified foster families to build trust, house manners, and confidence.",
    icon: FaHome,
    color: "text-mint-deep",
    bg: "bg-mint/20",
    border: "border-mint/30",
  },
  {
    step: "04",
    title: "Forever Family",
    tagline: "Lifelong Matching",
    detail: "Direct adopter introductions, trial sleepovers, and ongoing shelter post-care.",
    icon: FaHeart,
    color: "text-accent-ink",
    bg: "bg-accent",
    border: "border-accent-deep/50",
  },
];

export default function RescueTrajectoryGraphic() {
  const [activeNode, setActiveNode] = useState(1);

  return (
    <div className="w-full bg-card rounded-card border border-rule p-6 sm:p-10 shadow-card relative overflow-hidden my-12">
      {/* Background Animated Motion Graphic Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-25 overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Gentle Sine Wave Trajectory */}
          <path
            d="M 0,150 Q 250,60 500,150 T 1000,150"
            stroke="var(--color-rule)"
            strokeWidth="2"
            strokeDasharray="6 8"
            className="animate-dash-flow motion-reduce:hidden"
          />
          {/* Subtle Ambient Glow Path */}
          <path
            d="M 0,150 Q 250,60 500,150 T 1000,150"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-rule">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-paper-2 border border-rule text-xs font-semibold text-ink mb-2">
            <span className="w-2 h-2 rounded-full bg-mint-deep relative flex">
              <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-mint-deep opacity-75"></span>
            </span>
            <span>Living Rescue Protocol</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-semibold text-ink">
            The Journey from Rescue to Lifelong Home
          </h3>
          <p className="text-xs sm:text-sm text-ink-2 mt-1 max-w-xl">
            Every companion follows an orchestrated, transparent 4-stage rehabilitation path before meeting their adoptive family.
          </p>
        </div>

        {/* Milestone Indicator Pills */}
        <div className="text-xs text-muted flex items-center gap-1.5 self-start sm:self-auto font-medium">
          <span>Click any milestone to inspect care details</span>
        </div>
      </div>

      {/* 4 Interactive Milestone Nodes */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {milestones.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeNode === idx;

          return (
            <div
              key={item.step}
              onClick={() => setActiveNode(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveNode(idx);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Milestone ${item.step}: ${item.title}`}
              className={`p-5 rounded-card border transition-all duration-300 cursor-pointer flex flex-col justify-between group relative ${
                isActive
                  ? `bg-paper border-accent shadow-card-hover -translate-y-1 ring-1 ring-accent/60`
                  : `bg-paper-2/70 border-rule hover:bg-paper hover:border-rule/80 hover:-translate-y-0.5`
              }`}
            >
              <div>
                {/* Node Top with Badge & Step Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-stock flex items-center justify-center text-lg ${item.bg} ${item.color} border ${item.border} transition-transform group-hover:scale-110 relative`}
                  >
                    <Icon />
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent relative flex">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 motion-reduce:hidden"></span>
                      </span>
                    )}
                  </div>
                  <span className="font-display font-semibold text-lg text-muted/60">
                    {item.step}
                  </span>
                </div>

                <h4 className="text-base font-display font-semibold text-ink group-hover:text-accent-deep transition-colors">
                  {item.title}
                </h4>

                <p className="text-[11px] font-semibold text-muted mt-0.5 uppercase tracking-wide">
                  {item.tagline}
                </p>

                <p className="text-xs text-ink-2 mt-2.5 leading-relaxed">
                  {item.detail}
                </p>
              </div>

              {/* Status Bar Indicator */}
              <div className="pt-4 mt-4 border-t border-rule/60 flex items-center justify-between text-[11px] font-semibold">
                <span className={isActive ? item.color : "text-muted"}>
                  {isActive ? "Active Inspection" : "Step Overview"}
                </span>
                <span className="text-xs transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Detail Callout for Selected Node */}
      <div className="relative z-10 mt-8 p-4 sm:p-5 rounded-input bg-paper-2 border border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-full bg-mint/30 text-mint-deep shrink-0 mt-0.5 sm:mt-0">
            <FaShieldAlt className="text-sm" />
          </div>
          <div>
            <p className="text-xs font-semibold text-ink">
              Clinical Standard: {milestones[activeNode].title} ({milestones[activeNode].step}/04)
            </p>
            <p className="text-xs text-ink-2 mt-0.5">
              {milestones[activeNode].detail} Full records are archived on every companion profile.
            </p>
          </div>
        </div>

        <a
          href="#about"
          className="text-xs font-semibold text-accent-deep hover:underline shrink-0 self-start sm:self-auto"
        >
          Read shelter guarantee →
        </a>
      </div>
    </div>
  );
}
