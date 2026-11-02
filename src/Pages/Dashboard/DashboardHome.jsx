import React from "react";
import { Link } from "react-router-dom";
import {
  FaPaw,
  FaHeart,
  FaDollarSign,
  FaUsers,
  FaPlusCircle,
  FaClipboardList,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";
import { MdPets, MdOutlineVerifiedUser, MdOutlineMedicalServices } from "react-icons/md";
import useAuth from "../../Components/Hooks/useAuth";
import useUserDetails from "../../Components/Hooks/useUserDetails";
import usePlatformStats from "../../Components/Hooks/usePlatformStats";
import useAddedPets from "../../Components/Hooks/useAddedPets";
import useAdoptionRequest from "../../Components/Hooks/useAdoptionRequest";
import useFavorites from "../../Components/Hooks/useFavorites";
import useAddedDonations from "../../Components/Hooks/useAddedDonations";

const DashboardHome = () => {
  const { user } = useAuth();
  const { data: userDetails, isLoading: userLoading } = useUserDetails();
  const { stats, loading: statsLoading } = usePlatformStats();
  const [addedPets] = useAddedPets();
  const [adoptionRequests] = useAdoptionRequest();
  const [favorites] = useFavorites();
  const [addedDonations] = useAddedDonations();

  const isAdmin = userDetails?.isAdmin;
  const displayName = user?.displayName || userDetails?.name || "Guardian Member";
  const email = user?.email || userDetails?.email;
  const photo = user?.photoURL || userDetails?.photo_url;

  const pendingRequests = (adoptionRequests || []).filter(
    (req) => req.status === "pending" || !req.status
  ).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-paper-2 via-card to-paper-3 border border-rule p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            {photo ? (
              <img
                src={photo}
                alt={displayName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-accent/30 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent text-accent-ink font-display font-bold text-2xl flex items-center justify-center ring-4 ring-accent/30 shadow-sm">
                {displayName.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-pill text-[11px] font-semibold bg-mint-bg text-mint-deep border border-mint/30">
                  <MdOutlineVerifiedUser className="text-xs" />
                  {isAdmin ? "Platform Administrator" : "Active Foster Volunteer"}
                </span>
                <span className="text-xs text-muted">ID: {email?.split("@")[0]}</span>
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink mt-1.5">
                Welcome back, {displayName.split(" ")[0]}!
              </h1>
              <p className="text-sm text-ink-2 mt-1">
                {isAdmin
                  ? "Here is an overview of platform companions, active campaigns, and foster submissions."
                  : "Track your companion listings, review adoption inquiries, and manage rescue campaigns."}
              </p>
            </div>
          </div>

          {/* Quick Action Button in Banner */}
          <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
            <Link
              to="/dashboard/add-pet"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-pill bg-accent hover:bg-accent-hover text-accent-ink text-xs font-semibold shadow-sm transition-all press-down"
            >
              <FaPlusCircle className="text-sm" />
              <span>List a Pet</span>
            </Link>
            <Link
              to="/dashboard/create-donation"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-pill bg-card hover:bg-paper-2 text-ink text-xs font-semibold border border-rule shadow-sm transition-all press-down"
            >
              <MdOutlineMedicalServices className="text-sm text-coral" />
              <span>Start Fund</span>
            </Link>
          </div>
        </div>

        {/* Decorative background paw */}
        <div className="absolute -right-8 -bottom-8 text-rule/40 pointer-events-none select-none text-[180px] -rotate-12 opacity-40">
          <FaPaw />
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isAdmin ? (
          <>
            <div className="bg-card p-5 rounded-card border border-rule shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">Available Pets</span>
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent-ink flex items-center justify-center text-sm">
                  <FaPaw />
                </div>
              </div>
              <p className="font-display font-bold text-2xl text-ink mt-3">
                {stats?.totalAvailable ?? 12}
              </p>
              <span className="text-[11px] text-mint-deep font-medium flex items-center gap-1 mt-1">
                <FaCheckCircle className="text-xs" />
                Live in database
              </span>
            </div>

            <div className="bg-card p-5 rounded-card border border-rule shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">Medical Funds</span>
                <div className="w-8 h-8 rounded-full bg-coral/20 text-coral flex items-center justify-center text-sm">
                  <FaDollarSign />
                </div>
              </div>
              <p className="font-display font-bold text-2xl text-ink mt-3">
                ${(stats?.totalRaised ?? 6775).toLocaleString()}
              </p>
              <span className="text-[11px] text-muted mt-1 block">Verified community gifts</span>
            </div>

            <div className="bg-card p-5 rounded-card border border-rule shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">Pending Inquiries</span>
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center text-sm">
                  <FaClipboardList />
                </div>
              </div>
              <p className="font-display font-bold text-2xl text-ink mt-3">
                {pendingRequests}
              </p>
              <span className="text-[11px] text-muted mt-1 block">Awaiting review</span>
            </div>

            <div className="bg-card p-5 rounded-card border border-rule shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">Platform Role</span>
                <div className="w-8 h-8 rounded-full bg-mint/20 text-mint-deep flex items-center justify-center text-sm">
                  <FaShieldAlt />
                </div>
              </div>
              <p className="font-display font-bold text-lg text-ink mt-3">Full Access</p>
              <span className="text-[11px] text-mint-deep font-medium mt-1 block">
                Verified Admin privileges
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="bg-card p-5 rounded-card border border-rule shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">My Listed Pets</span>
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent-ink flex items-center justify-center text-sm">
                  <MdPets />
                </div>
              </div>
              <p className="font-display font-bold text-2xl text-ink mt-3">
                {addedPets?.length ?? 0}
              </p>
              <Link
                to="/dashboard/added-pets"
                className="text-[11px] text-accent-ink font-semibold flex items-center gap-1 mt-1 hover:underline"
              >
                <span>View listings</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>

            <div className="bg-card p-5 rounded-card border border-rule shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">Adoption Requests</span>
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center text-sm">
                  <FaClipboardList />
                </div>
              </div>
              <p className="font-display font-bold text-2xl text-ink mt-3">
                {adoptionRequests?.length ?? 0}
              </p>
              <span className="text-[11px] text-muted mt-1 block">
                {pendingRequests} pending decision
              </span>
            </div>

            <div className="bg-card p-5 rounded-card border border-rule shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">Saved Companions</span>
                <div className="w-8 h-8 rounded-full bg-coral/20 text-coral flex items-center justify-center text-sm">
                  <FaHeart />
                </div>
              </div>
              <p className="font-display font-bold text-2xl text-ink mt-3">
                {favorites?.length ?? 0}
              </p>
              <Link
                to="/favorites"
                className="text-[11px] text-coral font-semibold flex items-center gap-1 mt-1 hover:underline"
              >
                <span>View favorites</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>

            <div className="bg-card p-5 rounded-card border border-rule shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted">My Campaigns</span>
                <div className="w-8 h-8 rounded-full bg-mint/20 text-mint-deep flex items-center justify-center text-sm">
                  <FaDollarSign />
                </div>
              </div>
              <p className="font-display font-bold text-2xl text-ink mt-3">
                {addedDonations?.length ?? 0}
              </p>
              <Link
                to="/dashboard/created-donation"
                className="text-[11px] text-mint-deep font-semibold flex items-center gap-1 mt-1 hover:underline"
              >
                <span>Manage campaigns</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Two Column Section: Quick Hub & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Workflow Hub (1 col) */}
        <div className="bg-card p-6 rounded-card border border-rule shadow-sm space-y-4">
          <h3 className="font-display font-bold text-ink text-base">Quick Actions</h3>
          <div className="space-y-2.5">
            <Link
              to="/dashboard/add-pet"
              className="flex items-center justify-between p-3 rounded-stock bg-paper-2 hover:bg-paper-3 border border-rule transition-colors text-ink text-sm font-medium"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent-ink flex items-center justify-center text-xs">
                  <FaPlusCircle />
                </div>
                <span>Create Pet Profile</span>
              </div>
              <FaArrowRight className="text-xs text-muted" />
            </Link>

            <Link
              to="/dashboard/adoption-request"
              className="flex items-center justify-between p-3 rounded-stock bg-paper-2 hover:bg-paper-3 border border-rule transition-colors text-ink text-sm font-medium"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center text-xs">
                  <FaClipboardList />
                </div>
                <span>Review Applications</span>
              </div>
              <FaArrowRight className="text-xs text-muted" />
            </Link>

            <Link
              to="/dashboard/create-donation"
              className="flex items-center justify-between p-3 rounded-stock bg-paper-2 hover:bg-paper-3 border border-rule transition-colors text-ink text-sm font-medium"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-coral/20 text-coral flex items-center justify-center text-xs">
                  <FaDollarSign />
                </div>
                <span>Medical Emergency Fund</span>
              </div>
              <FaArrowRight className="text-xs text-muted" />
            </Link>

            <Link
              to="/pet-listing"
              className="flex items-center justify-between p-3 rounded-stock bg-paper-2 hover:bg-paper-3 border border-rule transition-colors text-ink text-sm font-medium"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-mint/20 text-mint-deep flex items-center justify-center text-xs">
                  <FaPaw />
                </div>
                <span>Browse All Companions</span>
              </div>
              <FaArrowRight className="text-xs text-muted" />
            </Link>
          </div>
        </div>

        {/* Adoption Inquiries & Activity Feed (2 cols) */}
        <div className="lg:col-span-2 bg-card p-6 rounded-card border border-rule shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-ink text-base">
                Recent Adoption Inquiries
              </h3>
              <p className="text-xs text-muted">
                Prospective guardians who have applied for companions in your care.
              </p>
            </div>
            <Link
              to="/dashboard/adoption-request"
              className="text-xs font-semibold text-accent-ink hover:underline flex items-center gap-1"
            >
              <span>See all ({adoptionRequests?.length || 0})</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          {adoptionRequests && adoptionRequests.length > 0 ? (
            <div className="divide-y divide-rule border border-rule rounded-stock overflow-hidden">
              {adoptionRequests.slice(0, 4).map((req, idx) => (
                <div
                  key={req._id || idx}
                  className="p-4 bg-paper-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-card border border-rule flex items-center justify-center text-xs text-ink font-semibold shrink-0">
                      {(req.requester_name || "A").slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-ink">
                        {req.requester_name || "Prospective Adopter"}
                      </h4>
                      <p className="text-xs text-muted">
                        Applied for:{" "}
                        <span className="font-semibold text-ink">
                          {req.pet_name || "Companion"}
                        </span>{" "}
                        • {req.requester_email || req.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span
                      className={`px-2.5 py-0.5 rounded-pill text-[11px] font-semibold border ${
                        req.status === "approved"
                          ? "bg-mint-bg text-mint-deep border-mint/30"
                          : req.status === "rejected"
                          ? "bg-coral/10 text-coral border-coral/30"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/30"
                      }`}
                    >
                      {req.status === "approved"
                        ? "Approved"
                        : req.status === "rejected"
                        ? "Declined"
                        : "Pending Review"}
                    </span>
                    <Link
                      to="/dashboard/adoption-request"
                      className="text-xs font-medium text-muted hover:text-ink px-2 py-1 rounded bg-card border border-rule"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-paper-2 rounded-stock border border-dashed border-rule">
              <FaClipboardList className="mx-auto text-3xl text-muted/60 mb-2" />
              <p className="text-sm font-medium text-ink">No adoption inquiries yet</p>
              <p className="text-xs text-muted mt-1 max-w-sm mx-auto">
                When prospective pet parents apply for companions you have listed, their applications and contact details will appear here.
              </p>
              <Link
                to="/dashboard/add-pet"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-accent-ink hover:underline"
              >
                <span>List a companion to find them a home</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
