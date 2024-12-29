import React from 'react';
import BasicTable from '../../../Components/BasicTable';
import useAddedDonations from '../../../Components/Hooks/useAddedDonations';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Components/Hooks/useAxiosPublic';

const AddedDonations = () => {
    const [addedDonations,refetch] = useAddedDonations()
    const axiosPublic = useAxiosPublic()
    const handleDelete = (donation) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete pet!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/donations/${donation._id}`)
                    .then((res) => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: `campaign is Deleted`,
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    const addeddonationsColumns =[
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
            <img src={row.original.image} alt="pet" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
        ),
    },
    {
        header:'Max Donation',
        accessorKey:'max_donation_amount'
    },
    {
        header:'Last Date',
        accessorKey:'last_date'
    },
    {
        header: 'Status',
        accessorKey: 'adopted',
        cell: ({ row }) => (

            <div>
                {
                    row.original.status ==='Continue' ? <button onClick={() => handleAdoption(row.original)}>Continue</button> : <button onClick={() => handleAdoption(row.original)}> Paused</button>
                }
            </div>
        ),
    },
    {
        header: 'Delete Pet',
        accessorKey: 'Delete',
        cell: ({ row }) => (


            <button onClick={() => handleDelete(row.original)}>
                <FaTrashAlt></FaTrashAlt>
            </button>

        ),
    },
    {
        header: 'Update Pet',
        accessorKey: 'update',
        cell: ({ row }) => (

            <Link to={`/dashboard/all-pets/${row.original._id}`}>
            <button>
                <FaEdit></FaEdit>
            </button>
            </Link>

        ),
    },
    
]
    return (
        <div>
            <BasicTable data={addedDonations} columns={addeddonationsColumns}></BasicTable>
        </div>
    );
};

export default AddedDonations;