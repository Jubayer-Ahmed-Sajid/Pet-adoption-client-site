import React from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";

const PrivacyPolicy = () => {
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
          <span className="text-xs uppercase tracking-wider font-semibold text-mint-deep flex items-center gap-1.5 mb-2">
            <FaShieldAlt />
            <span>Data Privacy & Trust</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-semibold text-ink">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted mt-2">
            Effective Date: November 2, 2026 · Last Updated: November 2, 2026
          </p>
        </div>

        <div className="prose prose-sm text-ink-2 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-ink">1. Overview & Commitment</h2>
            <p>
              Paws & Hearts ("Platform", "we", "us") connects prospective adopters, foster caretakers, and rescue partners. We believe in transparency and respect for your personal information. This policy describes how we collect, store, and process data when you browse our listings, apply for adoption, or contribute to veterinary relief campaigns.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-ink">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li><strong>Account Data:</strong> Name, email address, and profile photo when signing in via Google, GitHub, or email authentication.</li>
              <li><strong>Adoption Application Data:</strong> Contact details, residential environment information, and pet care experience provided when submitting an adoption inquiry.</li>
              <li><strong>Transaction Data:</strong> Payment confirmations for emergency veterinary campaigns processed via certified payment gateways (e.g., Stripe). We never store raw credit card numbers on our servers.</li>
              <li><strong>Communications:</strong> Inquiries sent via our contact forms or customer assistance channels.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-ink">3. How Information is Used</h2>
            <p>
              Your data is used solely to facilitate companion rehoming, deliver emergency medical funding to partner veterinary clinics, verify adopter applications, and communicate status updates regarding your account or inquiries. We never sell or rent user information to third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-ink">4. Data Sharing & Security</h2>
            <p>
              Adoption application details are shared exclusively with the verified shelter or foster organization managing that specific companion animal. Data transmission is secured using standard TLS encryption, and access controls are strictly enforced.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-display font-semibold text-ink">5. Your Rights & Inquiries</h2>
            <p>
              You may request access to, correction of, or deletion of your profile data at any time by contacting our privacy liaison at <a href="mailto:privacy@pawsandhearts.org" className="text-accent-3 underline">privacy@pawsandhearts.org</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

