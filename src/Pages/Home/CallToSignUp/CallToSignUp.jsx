import { Link } from "react-router-dom";
import { FaUserPlus, FaShieldAlt, FaHeart, FaPaw, FaArrowRight } from "react-icons/fa";

const CallToSignUp = () => {
  return (
    <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-card rounded-card border border-rule p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto shadow-card relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent/15 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-mint/20 blur-2xl pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-paper-2 border border-rule text-xs font-semibold text-ink shadow-xs">
            <FaShieldAlt className="text-mint-deep text-xs" />
            <span>Community Sanctuary Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold text-ink tracking-tight">
            Open your heart and home to a rescue
          </h2>

          <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
            Create a profile to save favorite companions, track your adoption applications in real-time, get notified when new rescues arrive, and sponsor emergency medical care.
          </p>

          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-xs inline-flex items-center gap-2 text-xs transition-colors"
            >
              <FaUserPlus />
              <span>Create Free Account</span>
            </Link>
            <Link
              to="/pet-listing"
              className="px-6 py-3.5 rounded-pill font-semibold text-ink bg-paper hover:bg-paper-2 border border-rule hover-lift press-down text-xs transition-colors inline-flex items-center gap-2"
            >
              <span>Browse Companion Directory</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          {/* Quick Metrics Guarantee */}
          <div className="pt-6 mt-4 border-t border-rule/70 flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <FaPaw className="text-accent-deep" />
              <span>Zero adoption screening fees</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FaHeart className="text-accent-3" />
              <span>Lifetime post-adoption support</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToSignUp;
