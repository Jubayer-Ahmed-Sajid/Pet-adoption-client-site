import { Link } from "react-router-dom";
import { FaPaw, FaHeart } from "react-icons/fa";
import logo from "../assets/Gemini_Generated_Image (3).jpg";
import ThemeToggle from "../Components/ThemeToggle";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-rule bg-paper-2 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-accent/60"
                alt="Paws & Hearts logo"
              />
              <span className="text-xl font-display font-semibold tracking-tight text-ink">
                Paws & <span className="text-accent-3">Hearts</span>
              </span>
            </Link>
            <p className="text-sm text-ink-2 max-w-sm leading-relaxed">
              An open platform connecting rescued companion animals with certified loving families. Built to eliminate shelter overcrowding and support emergency veterinary crowdfunding.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted pt-2">
              <FaHeart className="text-accent-3 text-[11px]" />
              <span>Dedicated to zero-kill rescue initiatives worldwide.</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-muted">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-ink-2">
              <li>
                <Link to="/" className="hover:text-ink transition-colors duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pet-listing" className="hover:text-ink transition-colors duration-150">
                  Browse adoptable pets
                </Link>
              </li>
              <li>
                <Link to="/donation-campaign" className="hover:text-ink transition-colors duration-150">
                  Donation campaigns
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-ink transition-colors duration-150">
                  Saved favorites
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-ink transition-colors duration-150">
                  Adoption fairs and events
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Account Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-muted">
              Platform & dashboard
            </h4>
            <ul className="space-y-2 text-sm text-ink-2">
              <li>
                <Link to="/dashboard" className="hover:text-ink transition-colors duration-150">
                  Adopter & volunteer dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-pet" className="hover:text-ink transition-colors duration-150">
                  List a rescue for adoption
                </Link>
              </li>
              <li>
                <Link to="/dashboard/create-donation" className="hover:text-ink transition-colors duration-150">
                  Start an emergency campaign
                </Link>
              </li>
              <li>
                <Link to="/signin" className="hover:text-ink transition-colors duration-150">
                  Sign in or demo login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-rule/70 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <div className="flex items-center gap-3">
            <p>© {currentYear} Paws & Hearts Platform</p>
            <ThemeToggle showLabel className="px-2.5 py-1 text-[11px]" />
          </div>
          <p className="text-[11px] text-muted" data-credits>
            Photographs: Basile Morin, Alvesgaspar, Charles J. Sharp (CC BY-SA, Wikimedia Commons)
          </p>
          <div className="flex items-center gap-6">
            <span>Non-profit registered platform</span>
            <span>Privacy policy</span>
            <span>Terms of adoption</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
