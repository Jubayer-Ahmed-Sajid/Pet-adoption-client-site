import { FaCheckCircle, FaAward, FaHospital, FaHeart } from "react-icons/fa";
import heroDogHug from "../../../assets/photos/hero-dog-hug.jpg";

const commitments = [
  {
    icon: FaHospital,
    title: "100% Comprehensive Health Check",
    description: "Every companion receives full clinical exams, core vaccines, deworming, and microchipping before listing.",
  },
  {
    icon: FaAward,
    title: "Zero Fees for Certified Shelters",
    description: "501(c)(3) rescue sanctuaries and foster organizations list completely free with zero platform cut.",
  },
  {
    icon: FaHeart,
    title: "Direct Medical Crowdfunding",
    description: "100% of community contributions route straight to partner veterinary clinics for emergency surgeries.",
  },
];

const About = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-card rounded-card border border-rule overflow-hidden p-8 lg:p-12 shadow-sm">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Mission Narrative & Commitments */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold text-accent-deep tracking-wide uppercase">
              Our Compassionate Mission
            </span>

            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-ink leading-tight">
              A humane bridge connecting loving families with pets in need
            </h2>

            <p className="text-base text-ink-2 leading-relaxed">
              Founded on the belief that every companion deserves a safe, loving home, Paws & Hearts eliminates the barriers in animal adoption. We unite local rescue sanctuaries, dedicated foster parents, and adopting families under one transparent system.
            </p>

            <div className="space-y-4 pt-2">
              {commitments.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3.5">
                    <span className="p-2 rounded-full bg-paper-2 text-accent-deep border border-rule mt-0.5 shrink-0">
                      <Icon className="text-sm" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-ink">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-Res Authentic Image & Stat Pill */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-card overflow-hidden border border-rule shadow-card group">
              <img
                src={heroDogHug}
                className="w-full h-84 sm:h-104 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                alt="A girl warmly hugging her rescued companion dog in golden hour light"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Verified Network Overlay Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-paper/95 backdrop-blur-md p-4 rounded-input border border-rule shadow-xs flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-ink flex items-center gap-1.5">
                    <FaCheckCircle className="text-mint-deep" />
                    <span>Non-profit certified rescue network</span>
                  </p>
                  <p className="text-[11px] text-muted mt-0.5">
                    Over 1,480 successful adoptions across 16 accredited shelters.
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

export default About;
