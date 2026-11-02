import React from "react";
import {
  MdCheckCircle,
  MdOutlinePrint,
  MdClose,
  MdOutlineVerified,
  MdOutlineMedicalServices,
} from "react-icons/md";
import { FaPaw, FaShieldAlt } from "react-icons/fa";

const DonationReceiptModal = ({ receipt, onClose }) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-card rounded-card border border-rule shadow-2xl overflow-hidden print:shadow-none print:border-none print:w-full">
        {/* Top Accent Strip */}
        <div className="h-2 bg-gradient-to-r from-accent via-coral to-mint" />

        {/* Modal Close Button (hidden during print) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-muted hover:text-ink hover:bg-paper-2 transition-colors print:hidden"
          aria-label="Close receipt"
        >
          <MdClose className="text-xl" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header & Verification Seal */}
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-mint-bg text-mint-deep mx-auto flex items-center justify-center text-2xl mb-2">
              <MdCheckCircle />
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-mint-deep">
              <MdOutlineVerified />
              <span>Direct Clinical Disbursement Confirmed</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-ink">
              Official Donation Receipt
            </h3>
            <p className="text-xs text-muted">
              Paws & Hearts Rescue Sanctuary • Partner Veterinary Escrow
            </p>
          </div>

          {/* Receipt Data Box */}
          <div className="bg-paper-2 rounded-stock p-4 border border-rule space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-rule">
              <span className="text-muted">Transaction ID:</span>
              <span className="font-semibold text-ink truncate max-w-[220px]">
                {receipt.transactionId}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-rule">
              <span className="text-muted">Date & Time:</span>
              <span className="text-ink">
                {new Date(receipt.date || Date.now()).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-rule">
              <span className="text-muted">Donor Name:</span>
              <span className="font-semibold text-ink">{receipt.donorName}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-rule">
              <span className="text-muted">Beneficiary:</span>
              <span className="font-semibold text-accent-3">{receipt.petName}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-rule">
              <span className="text-muted">Medical Purpose:</span>
              <span className="text-ink">{receipt.purpose || "Surgical & Recovery Fund"}</span>
            </div>
            <div className="flex items-center justify-between pt-1 text-sm font-sans">
              <span className="font-semibold text-ink">Total Gift:</span>
              <span className="font-display font-bold text-xl text-ink">
                ${Number(receipt.amount).toFixed(2)} USD
              </span>
            </div>
          </div>

          {/* Legal / Partner Disclaimer */}
          <div className="p-3 bg-card rounded-stock border border-rule/60 text-[11px] text-muted space-y-1">
            <p className="font-semibold text-ink flex items-center gap-1">
              <FaShieldAlt className="text-mint-deep text-xs" />
              Accredited Veterinary Partner Guarantee
            </p>
            <p>
              100% of this contribution is held in clinical escrow and directly disbursed to cover certified surgical fees, diagnostic care, and rehabilitation for {receipt.petName}.
            </p>
          </div>

          {/* Action Buttons (hidden in print) */}
          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-pill bg-paper-2 hover:bg-paper-3 text-ink text-xs font-semibold border border-rule transition-colors press-down"
            >
              <MdOutlinePrint className="text-base" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-pill bg-accent hover:bg-accent-hover text-accent-ink text-xs font-semibold shadow-sm transition-colors press-down"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationReceiptModal;
