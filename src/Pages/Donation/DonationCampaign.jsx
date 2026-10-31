import { Link } from "react-router-dom";
import useDonations from "../../Components/Hooks/useDonations";
import { FaHeart, FaCalendarAlt, FaHospital, FaShieldAlt, FaArrowRight, FaUsers } from "react-icons/fa";

const DonationCampaign = () => {
  const [donations] = useDonations();

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-accent-3/15 text-accent-3 text-xs font-semibold mb-4 shadow-xs">
          <FaHospital className="text-xs" />
          <span>Emergency Medical Relief & Veterinary Aid</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-semibold text-ink tracking-tight">
          Support rescue medical campaigns
        </h1>

        <p className="text-base text-ink-2 mt-3 leading-relaxed">
          100% of community gifts directly sponsor emergency surgeries, post-trauma therapy, specialized nourishment, and clinical medications for rescue animals in critical care.
        </p>

        {/* Trust Badges Strip */}
        <div className="mt-8 pt-6 border-t border-rule grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-2xl mx-auto text-xs text-muted">
          <div className="flex items-center justify-center gap-2">
            <FaShieldAlt className="text-mint-deep text-sm" />
            <span className="text-ink-2 font-medium">Direct Clinic Disbursement</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaHeart className="text-accent-3 text-sm" />
            <span className="text-ink-2 font-medium">Zero Platform Fee</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaHospital className="text-accent-deep text-sm" />
            <span className="text-ink-2 font-medium">Verified Veterinary Receipts</span>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      {(!donations || donations.length === 0) ? (
        <div className="bg-card rounded-card border border-rule p-12 text-center max-w-md mx-auto shadow-sm">
          <FaHeart className="text-accent-3 text-3xl mx-auto mb-3" />
          <h3 className="text-xl font-display font-semibold text-ink">
            No active medical campaigns
          </h3>
          <p className="text-xs sm:text-sm text-ink-2 mt-2 leading-relaxed">
            All current medical emergencies have been fully funded. Check back soon or register a new emergency care fund from your coordinator dashboard.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donations.map((campaign) => {
            const maxAmount = Number(campaign.max_donation_amount) || 1;
            const currentAmount = Number(campaign.donated_amount) || 0;
            const percentage = Math.min(
              100,
              Math.round((currentAmount / maxAmount) * 100)
            );
            const remaining = Math.max(0, maxAmount - currentAmount);

            return (
              <div
                key={campaign._id}
                className="bg-card rounded-card border border-rule overflow-hidden shadow-sm hover-lift flex flex-col justify-between group transition-all hover:border-accent-3/40 hover:shadow-card"
              >
                <div>
                  {/* Campaign Image Stage */}
                  <div className="relative h-64 w-full overflow-hidden bg-paper-2">
                    <img
                      src={campaign.image}
                      alt={campaign.name || "Campaign image"}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    {/* Deadline Pill */}
                    <div className="absolute top-3 right-3 bg-paper/95 backdrop-blur-md px-3 py-1 rounded-pill border border-rule text-[11px] font-semibold text-ink inline-flex items-center gap-1.5 shadow-xs">
                      <FaCalendarAlt className="text-muted text-[10px]" />
                      <span>{campaign.last_date ? `Closes ${campaign.last_date}` : "Active"}</span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute bottom-3 left-4">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-pill bg-accent-3 text-white shadow-xs">
                        Urgent Veterinary Care
                      </span>
                    </div>
                  </div>

                  {/* Campaign Content Body */}
                  <div className="p-6">
                    <h3 className="text-2xl font-display font-semibold text-ink group-hover:text-accent-3 transition-colors mb-2">
                      {campaign.pet_name || campaign.name || "Medical Recovery Fund"}
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-2 line-clamp-2 leading-relaxed mb-6">
                      {campaign.short_description ||
                        "Help provide the necessary medication, surgical treatment, and clinical rehabilitation required for recovery."}
                    </p>

                    {/* Thermometer Progress Bar */}
                    <div className="space-y-2 p-4 rounded-input bg-paper-2 border border-rule/70">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="font-semibold text-ink">
                          ${currentAmount.toLocaleString()}{" "}
                          <span className="font-normal text-muted">funded</span>
                        </span>
                        <span className="font-semibold text-accent-3 text-xs">
                          {percentage}%
                        </span>
                      </div>

                      <div className="w-full h-2.5 rounded-pill bg-paper overflow-hidden border border-rule p-0.5">
                        <div
                          className="h-full bg-accent-3 transition-all duration-700 rounded-pill"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-muted pt-1">
                        <span>Goal: ${maxAmount.toLocaleString()}</span>
                        <span>${remaining.toLocaleString()} needed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/donation-campaign/${campaign._id}`}
                    className="w-full py-3 rounded-pill font-semibold text-xs text-white bg-accent-3 hover:bg-accent-3/90 hover-lift press-down shadow-xs transition-colors flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Sponsor {campaign.pet_name || "Care"}</span>
                    <FaArrowRight className="text-[10px] transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default DonationCampaign;
