import { FaEdit, FaTrashAlt } from "react-icons/fa";
import BasicTable from "../../../Components/BasicTable";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import useAllDonations from "../../../Components/Hooks/useAllDonations";

const AllDonations = () => {
  const [allDonations = [], refetch] = useAllDonations();
  const axiosPublic = useAxiosPublic();

  const handleDelete = (campaign) => {
    Swal.fire({
      title: `Delete ${campaign.name || campaign.pet_name || "Campaign"}?`,
      text: "This donation campaign will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/donations/${campaign._id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Campaign deleted",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        });
      }
    });
  };

  const allDonationsCol = [
    {
      header: "#",
      accessorKey: "serialNumber",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted">{row.index + 1}</span>
      ),
    },
    {
      header: "Photo",
      accessorKey: "image",
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.pet_name || "Campaign"}
          className="w-10 h-10 rounded-stock object-cover ring-1 ring-rule"
        />
      ),
    },
    {
      header: "Campaign Name",
      accessorKey: "pet_name",
      cell: ({ row }) => (
        <span className="font-semibold text-ink">
          {row.original.pet_name || row.original.name || "Rescue Campaign"}
        </span>
      ),
    },
    {
      header: "Fund Target",
      accessorKey: "max_donation_amount",
      cell: ({ row }) => (
        <span className="font-mono font-medium text-xs text-ink">
          ${Number(row.original.max_donation_amount || 0).toLocaleString()}
        </span>
      ),
    },
    {
      header: "Funded",
      accessorKey: "donated_amount",
      cell: ({ row }) => (
        <span className="font-mono font-medium text-xs text-accent-3">
          ${Number(row.original.donated_amount || 0).toLocaleString()}
        </span>
      ),
    },
    {
      header: "Deadline",
      accessorKey: "last_date",
      cell: ({ row }) => (
        <span className="text-xs text-muted font-mono">{row.original.last_date}</span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1.5">
          <Link
            to={`/dashboard/all-donations/${row.original._id}`}
            aria-label="Edit campaign"
            className="p-2 rounded-stock text-muted hover:text-ink hover:bg-paper-2 transition-colors"
          >
            <FaEdit className="text-sm" />
          </Link>
          <button
            onClick={() => handleDelete(row.original)}
            aria-label="Delete campaign"
            className="p-2 rounded-stock text-muted hover:text-accent-3 hover:bg-paper-2 transition-colors"
          >
            <FaTrashAlt className="text-sm" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold text-ink">
          Emergency Campaigns
        </h2>
        <p className="text-xs text-muted mt-0.5">
          Moderator overview of active and completed crowdfunding campaigns.
        </p>
      </div>

      <BasicTable data={allDonations} columns={allDonationsCol} />
    </div>
  );
};

export default AllDonations;
