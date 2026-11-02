import React from "react";
import { Link } from "react-router-dom";
import { FaPaw, FaHome, FaSearch } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-card rounded-card border border-rule p-8 sm:p-12 max-w-lg w-full text-center shadow-card">
        <div className="w-16 h-16 rounded-full bg-accent/20 text-accent-deep text-2xl flex items-center justify-center mx-auto mb-5">
          <FaPaw />
        </div>
        <span className="text-xs font-semibold text-accent-3 uppercase tracking-wider">
          404 Error · Page Not Found
        </span>
        <h1 className="text-3xl font-display font-semibold text-ink mt-2">
          Looks like this trail wandered off
        </h1>
        <p className="text-xs sm:text-sm text-ink-2 mt-3 leading-relaxed">
          The page or companion profile you are looking for has been moved, adopted, or does not exist. Let's get you back on track!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-pill bg-accent hover:bg-accent-deep text-accent-ink font-semibold text-xs transition-colors inline-flex items-center justify-center gap-2 press-down shadow-xs"
          >
            <FaHome className="text-xs" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/pet-listing"
            className="w-full sm:w-auto px-6 py-2.5 rounded-pill bg-paper-2 hover:bg-paper-3 border border-rule text-ink font-semibold text-xs transition-colors inline-flex items-center justify-center gap-2 press-down shadow-xs"
          >
            <FaSearch className="text-xs" />
            <span>Explore Adoptable Pets</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

