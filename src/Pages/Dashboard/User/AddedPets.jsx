import React from 'react';
import BasicTable from '../../../Components/BasicTable';
import useAddedPets from '../../../Components/Hooks/useAddedPets';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';
const AddedPets = () => {
    const [addedPets,refetch] = useAddedPets()
    console.log(addedPets)
   const addedPetColumns=[ {
        header: 'Image',
        accessorKey: 'image',
        cell: ({ row }) => (
            <img src={row.original.image} alt="pet" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
        ),
    },
    {
        header: 'Name',
        accessorKey: 'name'
    },
    {
        header: 'Age',
        accessorKey: 'age'
    },
    {
        header: 'Location',
        accessorKey: 'pet_location'
    }
    ,


    // {
    //     header: 'Make Admin',
    //     accessorKey: 'Admin',
    //     cell: ({ row }) => (

    //         <Link to={`/dashboard/allpets/${row.original._id}`}>
    //         <button>
    //             <FaEdit></FaEdit>
    //         </button>
    //         </Link>

    //     ),
    // },
    // {
    //     header: 'Adoption Status',
    //     accessorKey: 'adopted',
    //     cell: ({ row }) => (

    //         <div>
    //             {
    //                 row.original.adopted ? <button onClick={() => handleAdoption(row.original)}>Adopted</button> : <button onClick={() => handleAdoption(row.original)}> Available</button>
    //             }
    //         </div>
    //     ),
    // },
    // {
    //     header: 'Delete User',
    //     accessorKey: 'Delete',
    //     cell: ({ row }) => (


    //         <button onClick={() => handleDelete(row.original)}>
    //             <FaTrashAlt></FaTrashAlt>
    //         </button>

    //     ),
    // },
]

    return (
        <div>
            <BasicTable data={addedPets} columns={addedPetColumns}></BasicTable>
        </div>
    );
};

export default AddedPets;