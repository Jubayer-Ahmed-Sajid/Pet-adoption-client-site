import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaArrowLeft } from "react-icons/fa";

const TermsOfService = () => {
  return (
    <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-ink mb-6 transition-colors"
      >
        <FaArrowLeft className="text-[10px]" />
        <span>Return to Home</span>
      </Link>

      <div className="bg-card rounded-card border border-rule p-8 sm:p-12 shadow-sm space-y-8">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-accent-3 flex items-center gap-1.5 mb-2">
            <FaHeart />
            <span>Adoption & Platform Guidelines</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-ink">
            Terms of Service & Adoption Code
          </h1>
          <p className="text-xs text-muted mt-2">
            Effective Date: November 2, 2026 · Last Updated: November 2, 2026
          </p>
        </div>

        <div className="prose prose-sm text-ink-2 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-ink">1. Purpose & Scope</h2>
            <p>
              Paws & Hearts operates an ethical companion discovery and veterinary relief coordination platform. By creating an account, browsing listings, submitting adoption applications, or contributing to campaigns, you agree to adhere to these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-ink">2. Adoption Screening & Animal Welfare</h2>
            <p>
              Submitting an adoption application does not constitute a guaranteed transfer of ownership. Each participating shelter or foster organization reserves the right to screen prospective homes, conduct introductory meet-and-greets, and verify living arrangements to ensure lifelong pet welfare and safety.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-ink">3. Medical Crowdfunding & Veterinary Payouts</h2>
            <p>
              Emergency relief funds raised on Paws & Hearts are routed strictly to partner veterinary clinics and accredited rescue groups for documented surgical and medical expenses. Donations are voluntary and processed through certified merchant handlers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-ink">4. Honest Listings & Community Standards</h2>
            <p>
              Shelter partners and community fosters must provide accurate health assessments, temperament details, and authentic photographs. Any fraudulent listings, unauthorized breeding, or commercial animal sales are strictly prohibited and result in immediate termination of platform access.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-ink">5. Contact Information</h2>
            <p>
              Questions regarding adoption agreements, shelter onboarding, or terms enforcement may be directed to <a href="mailto:support@pawsandhearts.org" className="text-accent-3 underline">support@pawsandhearts.org</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

