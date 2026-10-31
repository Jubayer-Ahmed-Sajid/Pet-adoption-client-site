import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../Components/Hooks/useAuth";
import logo from "../assets/Gemini_Generated_Image (3).jpg";
import { MdClose, MdMenu, MdFavorite } from "react-icons/md";
import { FaHeart, FaPaw, FaShieldAlt } from "react-icons/fa";
import DropDown from "../Components/DropDown";
import ThemeToggle from "../Components/ThemeToggle";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/pet-listing", label: "Find Companions", icon: FaPaw },
  { path: "/donation-campaign", label: "Medical Relief", icon: FaHeart },
  { path: "/favorites", label: "Saved Pets", icon: MdFavorite },
];

const NavBar = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route transition
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `relative px-4 py-2 rounded-pill text-xs font-semibold tracking-tight transition-all duration-200 flex items-center gap-1.5 ${isActive
      ? "bg-ink text-paper shadow-sm"
      : "text-ink-2 hover:text-ink hover:bg-paper-2"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-paper/90 backdrop-blur-md border-b border-rule/80 shadow-xs py-3.5"
        : "bg-paper/70 backdrop-blur-sm border-b border-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Brand Wordmark & Mission Identifier */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={logo}
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-accent/60 group-hover:ring-accent transition-all duration-300 group-hover:scale-105"
              alt="Paws & Hearts platform emblem"
            />
            <span className="absolute -bottom-0.5 -right-0.5 bg-mint-deep text-white rounded-full p-1 text-[9px] shadow-xs">
              <FaShieldAlt />
            </span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-ink block leading-none">
              Paws & <span className="text-accent-3">Hearts</span>
            </span>
            <span className="text-[10px] uppercase font-semibold text-muted tracking-wider block mt-1">
              Ethical Rescue Network
            </span>
          </div>
        </Link>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-paper-2/90 p-1.5 rounded-pill border border-rule/80 shadow-xs">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.path} to={item.path} className={navLinkClasses}>
                {Icon && <Icon className="text-[11px] opacity-75" />}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop Quick CTA & User Hub */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/pet-listing"
            className="px-4 py-2 rounded-pill text-xs font-semibold text-ink bg-paper border border-rule hover:bg-paper-2 transition-colors flex items-center gap-1.5"
          >
            <FaPaw className="text-accent-deep text-xs" />
            <span>Adopt a Companion</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-3 pl-1">
              <span className="text-xs font-semibold text-ink-2 max-w-[120px] truncate">
                {user.displayName || user.email}
              </span>
              <DropDown />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/signin"
                className="px-5 py-2.5 rounded-pill text-xs font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-xs transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="lg:hidden flex items-center gap-2.5">
          <ThemeToggle />
          {user && <DropDown />}
          <button
            onClick={() => setOpen(!open)}
            className="p-2.5 rounded-pill bg-paper-2 border border-rule text-ink hover:bg-paper-3 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {open ? <MdClose className="text-xl" /> : <MdMenu className="text-xl" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden bg-paper/95 backdrop-blur-xl border-b border-rule px-4 py-6 space-y-4 shadow-card animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-card text-sm font-semibold flex items-center gap-2.5 transition-colors ${isActive
                      ? "bg-ink text-paper"
                      : "text-ink-2 hover:bg-paper-2 hover:text-ink"
                    }`
                  }
                >
                  {Icon && <Icon className="text-sm" />}
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-rule space-y-2.5">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-xs font-semibold text-muted">Theme Appearance</span>
              <ThemeToggle showLabel className="px-3 py-1.5" />
            </div>

            <Link
              to="/pet-listing"
              className="w-full text-center py-3 rounded-pill bg-accent text-accent-ink font-semibold text-xs flex items-center justify-center gap-2 shadow-xs"
            >
              <FaPaw />
              <span>Explore Adoptable Pets</span>
            </Link>

            {!user && (
              <Link
                to="/signin"
                className="w-full text-center py-3 rounded-pill bg-paper-2 border border-rule text-ink font-semibold text-xs block hover:bg-paper-3 transition-colors"
              >
                Sign In / Recruiter Access
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
