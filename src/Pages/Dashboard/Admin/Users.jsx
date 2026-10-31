import Swal from "sweetalert2";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import BasicTable from "../../../Components/BasicTable";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import useUsers from "../../../Components/Hooks/useUsers";

const Users = () => {
  const [users = [], refetch] = useUsers();
  const axiosPublic = useAxiosPublic();

  const handleAdmin = (user) => {
    Swal.fire({
      title: `Promote ${user.name}?`,
      text: "This user will receive full administrative access.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, promote to Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              title: `${user.name} is now an Admin`,
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

  const handleDelete = (user) => {
    Swal.fire({
      title: `Delete ${user.name}?`,
      text: "This account will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: `${user.name} was removed`,
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

  const columns = [
    {
      header: "#",
      accessorKey: "serialNumber",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted">{row.index + 1}</span>
      ),
    },
    {
      header: "Avatar",
      accessorKey: "photo_url",
      cell: ({ row }) => (
        <img
          src={
            row.original.photo_url ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
          }
          alt={row.original.name || "User"}
          className="w-9 h-9 rounded-full object-cover ring-1 ring-rule"
        />
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <span className="font-semibold text-ink">{row.original.name || "Unnamed"}</span>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }) => (
        <span className="text-xs text-ink-2 font-mono">{row.original.email}</span>
      ),
    },
    {
      header: "Role Status",
      accessorKey: "isAdmin",
      cell: ({ row }) =>
        row.original.isAdmin ? (
          <span className="px-2.5 py-1 rounded-pill bg-mint/30 text-ink text-xs font-semibold">
            Admin
          </span>
        ) : (
          <button
            onClick={() => handleAdmin(row.original)}
            className="px-3 py-1 rounded-pill bg-paper-2 hover:bg-accent hover:text-accent-ink border border-rule text-xs font-medium text-ink transition-colors inline-flex items-center gap-1.5"
          >
            <FaUserShield className="text-[11px]" />
            <span>Make Admin</span>
          </button>
        ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <button
          onClick={() => handleDelete(row.original)}
          aria-label="Delete user"
          className="p-2 rounded-stock text-muted hover:text-accent-3 hover:bg-paper-2 transition-colors"
        >
          <FaTrashAlt className="text-sm" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold text-ink">
          User Management
        </h2>
        <p className="text-xs text-muted mt-0.5">
          View all registered accounts, elevate administrative permissions, or remove accounts.
        </p>
      </div>

      <BasicTable data={users} columns={columns} />
    </div>
  );
};

export default Users;
