import { FaHeart, FaPaw, FaMedkit, FaHome, FaShieldAlt } from "react-icons/fa";

const activities = [
  {
    icon: FaPaw,
    color: "text-accent-deep",
    title: "Milo (Golden Retriever)",
    text: "found a loving forever home in Austin",
  },
  {
    icon: FaMedkit,
    color: "text-accent-3",
    title: "Max's Care Campaign",
    text: "surpassed 100% of medical goal ($1,850)",
  },
  {
    icon: FaHome,
    color: "text-mint-deep",
    title: "St. Jude Rescue",
    text: "welcomed 6 new adoptable kittens",
  },
  {
    icon: FaPaw,
    color: "text-accent-deep",
    title: "Luna (Tabby Cat)",
    text: "completed foster care & ready for adoption",
  },
  {
    icon: FaShieldAlt,
    color: "text-mint-deep",
    title: "14 Rescues",
    text: "passed comprehensive veterinary health exams",
  },
  {
    icon: FaHeart,
    color: "text-accent-3",
    title: "Community Match",
    text: "$5,000 emergency medical grant unlocked",
  },
];

const CommunityMarquee = () => {
  return (
    <div className="w-full bg-paper-2 border-y border-rule py-3.5 overflow-hidden relative">
      {/* Edge gradient scrims for seamless scrolling look */}
      <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-paper-2 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-paper-2 to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee gap-8 items-center flex">
        {/* Track 1 */}
        {activities.map((act, i) => {
          const Icon = act.icon;
          return (
            <div
              key={`track1-${i}`}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-pill bg-paper border border-rule shrink-0 text-xs text-ink-2 shadow-xs hover:border-accent-deep/40 transition-colors cursor-default"
            >
              <span className={`p-1 rounded-full bg-paper-2 ${act.color}`}>
                <Icon className="text-xs" />
              </span>
              <span className="font-semibold text-ink">{act.title}</span>
              <span className="text-muted">{act.text}</span>
            </div>
          );
        })}

        {/* Track 2 (Duplicate for continuous loop) */}
        {activities.map((act, i) => {
          const Icon = act.icon;
          return (
            <div
              key={`track2-${i}`}
              aria-hidden="true"
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-pill bg-paper border border-rule shrink-0 text-xs text-ink-2 shadow-xs hover:border-accent-deep/40 transition-colors cursor-default"
            >
              <span className={`p-1 rounded-full bg-paper-2 ${act.color}`}>
                <Icon className="text-xs" />
              </span>
              <span className="font-semibold text-ink">{act.title}</span>
              <span className="text-muted">{act.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityMarquee;

