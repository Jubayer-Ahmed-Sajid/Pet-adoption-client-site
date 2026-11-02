import React, { useState } from "react";
import useAdoptionRequest from "../../../Components/Hooks/useAdoptionRequest";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import {
  MdCheckCircle,
  MdCancel,
  MdOutlinePets,
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineHome,
  MdOutlineWorkOutline,
  MdOutlineAccessTime,
} from "react-icons/md";
import { FaHeart, FaPaw, FaInfoCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const AdoptionRequest = () => {
  const [adoptionRequests, refetch, isLoading] = useAdoptionRequest();
  const axiosPublic = useAxiosPublic();
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleApprove = async (request) => {
    const result = await Swal.fire({
      title: `Approve adoption of ${request.pet_name || "companion"}?`,
      text: `This will mark ${request.requester_name || "the applicant"} as the adoptive guardian and update this companion's status to Adopted across the platform.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve Adoption",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosPublic.post(`/adoption/request/${request._id}/approve`);
        if (res.data.success || res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Adoption Finalized! 🎉",
            text: `${request.pet_name || "Companion"} has officially found their forever home.`,
            timer: 2500,
            showConfirmButton: false,
          });
          refetch();
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Approval Failed",
          text: err.response?.data?.error || "Could not process adoption approval.",
        });
      }
    }
  };

  const handleReject = async (request) => {
    const result = await Swal.fire({
      title: "Decline application?",
      text: `Are you sure you want to decline ${request.requester_name}'s adoption request for ${request.pet_name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Decline",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosPublic.post(`/adoption/request/${request._id}/reject`);
        if (res.data.success || res.status === 200) {
          Swal.fire({
            icon: "info",
            title: "Application Declined",
            text: "The application has been marked as declined.",
            timer: 1800,
            showConfirmButton: false,
          });
          refetch();
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Action Failed",
          text: err.response?.data?.error || "Could not decline request.",
        });
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rule">
        <div>
          <h2 className="font-display font-bold text-2xl text-ink">Adoption Applications</h2>
          <p className="text-sm text-muted mt-0.5">
            Review prospective guardians, verify living arrangements, and approve permanent rehoming.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-pill text-xs font-semibold bg-accent/20 text-accent-ink border border-accent/40">
            {adoptionRequests?.length || 0} Total Received
          </span>
        </div>
      </div>

      {/* Applications List */}
      {!adoptionRequests || adoptionRequests.length === 0 ? (
        <div className="bg-card border border-dashed border-rule rounded-card p-12 text-center">
          <FaPaw className="mx-auto text-4xl text-muted/50 mb-3" />
          <h3 className="font-display font-semibold text-ink text-base">No adoption requests found</h3>
          <p className="text-xs text-muted max-w-sm mx-auto mt-1">
            When visitors submit applications for companions listed under your profile or rescue sanctuary, they will appear here for verification.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {adoptionRequests.map((req, idx) => (
            <div
              key={req._id || idx}
              className="bg-card border border-rule rounded-card p-5 shadow-sm transition-all hover:border-accent/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
            >
              {/* Pet & Applicant Profile */}
              <div className="flex items-start gap-4">
                {req.image ? (
                  <img
                    src={req.image}
                    alt={req.pet_name}
                    className="w-16 h-16 rounded-card object-cover ring-2 ring-rule shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-card bg-paper-2 border border-rule flex items-center justify-center text-muted text-xl shrink-0">
                    <MdOutlinePets />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display font-bold text-base text-ink">
                      {req.pet_name || "Companion"}
                    </h3>
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
                        ? "Adoption Approved"
                        : req.status === "rejected"
                        ? "Declined"
                        : "Pending Review"}
                    </span>
                  </div>

                  <p className="text-xs text-ink-2 font-medium">
                    Applicant: <span className="font-semibold text-ink">{req.requester_name || "Prospective Adopter"}</span> ({req.requester_email || req.email})
                  </p>

                  {/* Dossier quick tags */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted pt-1">
                    {req.phone && (
                      <span className="flex items-center gap-1">
                        <MdOutlinePhone className="text-sm text-accent-3" />
                        {req.phone}
                      </span>
                    )}
                    {req.address && (
                      <span className="flex items-center gap-1">
                        <MdOutlineLocationOn className="text-sm text-accent-3" />
                        <span className="truncate max-w-[200px]">{req.address}</span>
                      </span>
                    )}
                    {req.livingSpace && (
                      <span className="flex items-center gap-1">
                        <MdOutlineHome className="text-sm text-mint-deep" />
                        <span className="capitalize">{req.livingSpace}</span>
                      </span>
                    )}
                    {req.experience && (
                      <span className="flex items-center gap-1">
                        <MdOutlineWorkOutline className="text-sm text-accent-ink" />
                        <span className="capitalize">{req.experience.replace("-", " ")}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2 w-full lg:w-auto justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-rule">
                {req.status === "approved" ? (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill bg-mint-bg text-mint-deep text-xs font-semibold border border-mint/30">
                    <MdCheckCircle className="text-sm" />
                    <span>Adoption Completed</span>
                  </div>
                ) : req.status === "rejected" ? (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill bg-coral/10 text-coral text-xs font-semibold border border-coral/30">
                    <MdCancel className="text-sm" />
                    <span>Application Closed</span>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleReject(req)}
                      className="px-3.5 py-2 rounded-pill bg-paper-2 hover:bg-paper-3 text-coral hover:text-coral-deep text-xs font-semibold border border-rule transition-colors press-down"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleApprove(req)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-pill bg-mint-deep hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors press-down"
                    >
                      <MdCheckCircle className="text-sm" />
                      <span>Approve Adoption</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdoptionRequest;
