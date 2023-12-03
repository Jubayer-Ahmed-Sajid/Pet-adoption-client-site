import React from 'react';
import BasicTable from '../../../Components/BasicTable';
import useAddedDonations from '../../../Components/Hooks/useAddedDonations';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AddedDonations = () => {
    const [addedDonations] = useAddedDonations()
    const addeddonationsColumns =[
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

            <Link to={`/dashboard/allpets/${row.original._id}`}>
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