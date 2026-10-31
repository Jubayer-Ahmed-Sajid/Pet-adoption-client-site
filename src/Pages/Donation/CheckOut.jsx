import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAuth from "../../Components/Hooks/useAuth";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import useDonationDetails from "../../Components/Hooks/useDonationDetails";
import { FaShieldAlt, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";

const CheckOut = ({ id, onSuccess }) => {
  const axiosPublic = useAxiosPublic();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [donationDetails, refetch] = useDonationDetails(id);

  const [clientSecret, setClientSecret] = useState("");
  const [totalAmount, setTotalAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("25");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const maxAmount = Number(donationDetails.max_donation_amount) || 1000;
  const currentDonated = Number(donationDetails.donated_amount) || 0;
  const remainingAllowed = Math.max(0, maxAmount - currentDonated);

  const handlePreset = (amount) => {
    if (amount > remainingAllowed) {
      setError(`Maximum remaining donation for this campaign is $${remainingAllowed}`);
      return;
    }
    setError("");
    setTotalAmount(amount);
    setCustomAmount(String(amount));
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    const parsed = parseInt(val, 10);
    if (isNaN(parsed) || parsed <= 0) {
      setError("Please enter a valid donation amount.");
      setTotalAmount(0);
      return;
    }
    if (parsed > remainingAllowed) {
      setError(`Amount exceeds the campaign cap ($${remainingAllowed} remaining).`);
      setTotalAmount(0);
      return;
    }
    setError("");
    setTotalAmount(parsed);
  };

  useEffect(() => {
    if (totalAmount > 0) {
      axiosPublic
        .post("/create-payment-intent", { price: totalAmount })
        .then((res) => {
          if (res.data?.clientSecret) {
            setClientSecret(res.data.clientSecret);
          }
        })
        .catch((err) => {
          console.error("PaymentIntent error:", err);
        });
    }
  }, [axiosPublic, totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret || totalAmount <= 0) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setError("");

    const { error: methodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous Donor",
            email: user?.email || "anonymous@example.com",
          },
        },
      }
    );

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      const donationInfo = {
        email: user?.email,
        name: user?.displayName || "Generous Supporter",
        amount: totalAmount,
        petName: donationDetails.name || donationDetails.pet_name,
        transactionId: paymentIntent.id,
      };

      try {
        await axiosPublic.post("/payments", donationInfo);
        await axiosPublic.patch(`/donations/update/${donationDetails._id}`, {
          donatedAmount: totalAmount,
        });

        Swal.fire({
          icon: "success",
          title: "Thank you for your donation!",
          text: `Transaction ID: ${paymentIntent.id}`,
        });

        if (refetch) refetch();
        if (onSuccess) onSuccess();
      } catch (err) {
        console.error("Record update error:", err);
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Quick Preset Buttons */}
      <div>
        <label className="block text-xs font-semibold text-ink-2 mb-2">
          Select Donation Amount
        </label>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[10, 25, 50, 100].map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handlePreset(amt)}
              className={`py-2 rounded-pill text-xs font-semibold border transition-colors ${
                totalAmount === amt
                  ? "bg-accent text-accent-ink border-accent-deep"
                  : "bg-paper-2 text-ink border-rule hover:bg-paper-3"
              }`}
            >
              ${amt}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">
            $
          </span>
          <input
            type="number"
            min="1"
            max={remainingAllowed}
            value={customAmount}
            onChange={handleInputChange}
            placeholder="Custom amount"
            className="w-full pl-8 pr-4 py-2.5 rounded-input bg-paper-2 border border-rule text-sm text-ink focus:outline-none focus:border-accent-2 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Stripe Card Element Box */}
      <div>
        <label className="block text-xs font-semibold text-ink-2 mb-2">
          Credit or Debit Card
        </label>
        <div className="p-3.5 rounded-input bg-paper-2 border border-rule">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "14px",
                  color: "#1e1e1e",
                  "::placeholder": {
                    color: "#737373",
                  },
                },
                invalid: {
                  color: "#d9383a",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-xs text-accent-3 font-medium bg-accent-3/10 p-2.5 rounded-input border border-accent-3/20">
          {error}
        </p>
      )}

      {/* Secure Notice & Submit */}
      <div className="pt-2">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted mb-3">
          <FaLock className="text-[10px]" />
          <span>Encrypted 256-bit Stripe transaction</span>
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing || totalAmount <= 0}
          className="w-full py-3.5 rounded-pill font-semibold text-accent-ink bg-accent hover:bg-accent-deep hover-lift press-down shadow-sm text-sm transition-colors disabled:opacity-50"
        >
          {processing ? "Processing Donation…" : `Donate $${totalAmount} Now`}
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
