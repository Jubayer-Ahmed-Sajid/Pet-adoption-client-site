import { FaPaw, FaHandHoldingHeart, FaUserPlus, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="bg-card rounded-card border border-rule p-7 flex flex-col justify-between hover-lift shadow-sm hover:border-accent-deep/50 hover:shadow-card transition-all relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-stock flex items-center justify-center text-lg ${service.accent} transition-transform group-hover:scale-110`}>
                    <Icon />
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
          );
        })}
      </div>
    </section>
  );
};

export default Services;
