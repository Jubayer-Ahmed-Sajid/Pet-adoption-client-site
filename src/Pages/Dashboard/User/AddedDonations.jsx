import React from 'react';
import BasicTable from '../../../Components/BasicTable';
import useAddedDonations from '../../../Components/Hooks/useAddedDonations';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Components/Hooks/useAxiosPublic';

const AddedDonations = () => {
    const [addedDonations, refetch] = useAddedDonations();
    const axiosPublic = useAxiosPublic();

    const handleDelete = (donation) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Delete campaign for ${donation.pet_name || "this animal"}? You won't be able to revert this!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete campaign!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/donations/${donation._id}`)
                    .then((res) => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: `Campaign deleted successfully`,
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    const addeddonationsColumns = [
        {
            header: 'Serial Number',
            accessorKey: 'serialNumber',
            cell: ({ row }) => (
                <span>{row.index + 1}</span>
            ),
        },
        {
            header: 'Image',
            accessorKey: 'image',
            cell: ({ row }) => (
                <img src={row.original.image} alt={row.original.pet_name || "campaign"} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
            ),
        },
        {
            header: 'Campaign Name',
            accessorKey: 'pet_name',
        },
        {
            header: 'Max Donation ($)',
            accessorKey: 'max_donation_amount'
        },
        {
            header: 'Last Date',
            accessorKey: 'last_date'
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => (
                <span className={`px-2 py-0.5 rounded-pill text-xs font-semibold ${row.original.status === 'Continue' ? 'bg-mint/20 text-mint-deep' : 'bg-paper-2 text-muted'}`}>
                    {row.original.status === 'Continue' ? 'Active' : 'Completed'}
                </span>
            ),
        },
        {
            header: 'Delete Campaign',
            accessorKey: 'Delete',
            cell: ({ row }) => (
                <button
                    onClick={() => handleDelete(row.original)}
                    className="p-2 rounded-full hover:bg-paper-2 text-accent-3 transition-colors"
                    title="Delete Campaign"
                >
                    <FaTrashAlt />
                </button>
            ),
        },
        {
            header: 'Update Campaign',
            accessorKey: 'update',
            cell: ({ row }) => (
                <Link
                    to={`/dashboard/all-donations/${row.original._id}`}
                    className="p-2 rounded-full hover:bg-paper-2 text-ink inline-block transition-colors"
                    title="Update Campaign"
                >
                    <button>
                        <FaEdit />
                    </button>
                </Link>
            ),
        },
    ];

    return (
        <div className="p-4 sm:p-6 bg-card rounded-card border border-rule shadow-sm">
            <h2 className="text-xl font-display font-semibold text-ink mb-4">My Emergency Relief Campaigns</h2>
            <BasicTable data={addedDonations || []} columns={addeddonationsColumns}></BasicTable>
        </div>
    );
};

export default AddedDonations;
