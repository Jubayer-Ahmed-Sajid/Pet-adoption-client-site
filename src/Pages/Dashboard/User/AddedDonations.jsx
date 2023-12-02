import React from 'react';
import BasicTable from '../../../Components/BasicTable';
import useAddedDonations from '../../../Components/Hooks/useAddedDonations';

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
    
]
    return (
        <div>
            <BasicTable data={addedDonations} columns={addeddonationsColumns}></BasicTable>
        </div>
    );
};

export default AddedDonations;