import React from "react";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import BasicTable from "../../../Components/BasicTable";
import usePets from "../../../Components/Hooks/usePets";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllPets = () => {
  const [pets = [], refetch] = usePets();
  const axiosPublic = useAxiosPublic();

  const handleDelete = (pet) => {
    Swal.fire({
      title: `Delete ${pet.name}?`,
      text: "This pet listing will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/pets/${pet._id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: `${pet.name} was deleted`,
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

  const handleAdoption = (pet) => {
    const nextStatus = !pet.adopted;
    Swal.fire({
      title: `Mark ${pet.name} as ${nextStatus ? "Adopted" : "Available"}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Update status",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.patch(`/pets/admin/${pet._id}`).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Status updated!",
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

  const petColumns = [
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
          alt={row.original.name}
          className="w-10 h-10 rounded-stock object-cover ring-1 ring-rule"
        />
      ),
    },
    {
      header: "Pet Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <span className="font-semibold text-ink">{row.original.name}</span>
      ),
    },
    {
      header: "Species",
      accessorKey: "category",
      cell: ({ row }) => (
        <span className="px-2.5 py-0.5 rounded-pill bg-paper-2 text-ink text-xs capitalize border border-rule">
          {row.original.category}
        </span>
      ),
    },
    {
      header: "Location",
      accessorKey: "pet_location",
      cell: ({ row }) => (
        <span className="text-xs text-ink-2">{row.original.pet_location}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "adopted",
      cell: ({ row }) => (
        <button
          onClick={() => handleAdoption(row.original)}
          className={`px-3 py-1 rounded-pill text-xs font-semibold border transition-colors ${
            row.original.adopted
              ? "bg-paper-2 text-muted border-rule"
              : "bg-mint/30 text-ink border-mint"
          }`}
        >
          {row.original.adopted ? "Adopted" : "Available"}
        </button>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="inline-flex items-center gap-1.5">
          <Link
            to={`/dashboard/all-pets/${row.original._id}`}
            aria-label="Edit pet"
            className="p-2 rounded-stock text-muted hover:text-ink hover:bg-paper-2 transition-colors"
          >
            <FaEdit className="text-sm" />
          </Link>
          <button
            onClick={() => handleDelete(row.original)}
            aria-label="Delete pet"
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
          All Pet Listings
        </h2>
        <p className="text-xs text-muted mt-0.5">
          Moderator overview of all user-submitted animal rescue listings.
        </p>
      </div>

      <BasicTable data={pets} columns={petColumns} />
    </div>
  );
};

export default AllPets;
