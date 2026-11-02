import { FaCheckCircle, FaAward, FaHospital, FaHeart } from "react-icons/fa";
import heroDogHug from "../../../assets/photos/hero-dog-hug.jpg";
import MotionReveal from "../../../Components/MotionReveal";

const commitments = [
  {
    icon: FaHospital,
    title: "100% Comprehensive Health Check",
    description: "Every companion receives full clinical exams, core vaccines, deworming, and microchipping before listing.",
  },
  {
    icon: FaAward,
    title: "Zero Fees for Certified Shelters",
    description: "Accredited rescue sanctuaries and community foster networks list completely free with zero platform cut.",
  },
  {
    icon: FaHeart,
    title: "Direct Medical Crowdfunding",
    description: "100% of community contributions route straight to partner veterinary clinics for emergency surgeries.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Photo-Led Section Breaking Card Monotony (No Card Container) */}
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* Left Column: Mission Narrative & Commitments */}
        <div className="lg:col-span-6">
          <MotionReveal direction="up" distance={20} className="space-y-6">
            <span className="text-xs font-semibold text-mint-deep tracking-wide uppercase flex items-center gap-1.5">
              <FaHospital className="text-xs" />
              <span>Certified Sanctuary Commitment</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-ink leading-[1.12]">
              A humane bridge connecting loving families with pets in need
            </h2>

            <p className="text-base sm:text-lg text-ink-2 leading-relaxed">
              Founded on the belief that every companion deserves a safe, loving home, Paws & Hearts eliminates the barriers in animal adoption. We unite local rescue sanctuaries, dedicated foster parents, and adopting families under one transparent system.
            </p>

            <div className="space-y-4 pt-2">
              {commitments.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-3.5 rounded-card bg-paper-2 border border-rule/70 group hover:border-mint-deep/40 transition-colors">
                    <span className="p-2.5 rounded-full bg-paper text-mint-deep border border-rule shrink-0 transition-transform group-hover:scale-105 shadow-xs">
                      <Icon className="text-sm" />
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-ink">
                        {item.title}
                      </h4>
                      <p className="text-xs text-ink-2 mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </MotionReveal>
        </div>

        {/* Right Column: High-Res Authentic Image & Stat Pill */}
        <div className="lg:col-span-6 relative">
          <MotionReveal direction="up" delay={150} distance={24}>
            <div className="relative rounded-card overflow-hidden border border-rule shadow-card group hover-lift transition-transform">
              <img
                src={heroDogHug}
                className="w-full h-96 sm:h-112 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                alt="A volunteer warmly hugging a rescued companion dog"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Verified Network Overlay Strip with Crisp AA Contrast */}
              <div className="absolute bottom-5 left-5 right-5 bg-black/80 backdrop-blur-md p-4 sm:p-5 rounded-card border border-white/20 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-400 text-sm shrink-0" />
                    <span>Non-profit certified rescue network</span>
                  </p>
                  <p className="text-xs text-white/90 mt-1 leading-normal">
                    Over 1,480 successful adoptions across 16 accredited regional shelters.
                  </p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>

      </div>
    </section>
  );
};

export default About;
