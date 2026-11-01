import { FaPaw, FaHandHoldingHeart, FaUserPlus, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import MotionReveal from "../../../Components/MotionReveal";

const steps = [
  {
    step: "01",
    title: "Compassionate Adoption",
    description:
      "Filter companion animals by species, view full medical records, and submit a direct adoption request without agency middleman delays.",
    icon: FaPaw,
    action: "Explore adoptable pets",
    link: "/pet-listing",
    accent: "bg-accent/20 text-accent-deep",
  },
  {
    step: "02",
    title: "Direct Rescue Crowdfunding",
    description:
      "Sponsor urgent surgeries, specialized nutrition, and rehabilitation for shelter pets through secure, fee-free Stripe donations.",
    icon: FaHandHoldingHeart,
    action: "Support active campaigns",
    link: "/donation-campaign",
    accent: "bg-accent-3/20 text-accent-3",
  },
  {
    step: "03",
    title: "Foster & Volunteer Network",
    description:
      "Join our verified network of foster volunteers, create companion listings as a shelter manager, and support post-adoption transitions.",
    icon: FaUserPlus,
    action: "Join rescue community",
    link: "/signup",
    accent: "bg-mint/25 text-mint-deep",
  },
];

const Services = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <MotionReveal direction="up" distance={16}>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-accent-deep tracking-wide uppercase">
            How Paws & Hearts Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-ink mt-1">
            Everything needed for a safe, lifelong companion bond
          </h2>
          <p className="text-sm sm:text-base text-ink-2 mt-2 leading-relaxed">
            From the first application to years of joyful companionship, we empower every step of ethical pet rescue.
          </p>
        </div>
      </MotionReveal>

      {/* Connecting Flow Line for Desktop */}
      <div className="hidden md:block absolute top-[280px] left-16 right-16 pointer-events-none z-0">
        <svg className="w-full h-8" viewBox="0 0 1000 30" fill="none" preserveAspectRatio="none">
          <path
            d="M 50,15 L 950,15"
            stroke="var(--color-rule)"
            strokeWidth="2"
            strokeDasharray="6 8"
            className="animate-dash-flow motion-reduce:hidden"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        {steps.map((service, index) => {
          const Icon = service.icon;
          return (
            <MotionReveal key={index} direction="up" delay={index * 120} distance={24}>
              <div
                className="bg-card rounded-card border border-rule p-7 flex flex-col justify-between hover-lift shadow-sm hover:border-accent-deep/50 hover:shadow-card transition-all relative group h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-stock flex items-center justify-center text-lg ${service.accent} transition-transform group-hover:scale-110 relative`}
                    >
                      <Icon />
                      <span className="animate-radar absolute inset-0 rounded-stock bg-current opacity-0 group-hover:opacity-40 motion-reduce:hidden"></span>
                    </div>
                    <span className="font-display font-semibold text-2xl text-muted/40">
                      {service.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-ink mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-rule">
                  <Link
                    to={service.link}
                    className="text-xs sm:text-sm font-semibold text-ink hover:text-accent-deep inline-flex items-center gap-2 group/link transition-colors"
                  >
                    <span>{service.action}</span>
                    <FaArrowRight className="text-xs transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </MotionReveal>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
