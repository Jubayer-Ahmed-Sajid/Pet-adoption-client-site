import React from 'react';
import BasicTable from '../../../Components/BasicTable';
import useAddedPets from '../../../Components/Hooks/useAddedPets';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Components/Hooks/useAxiosPublic';
const AddedPets = () => {
    const [addedPets, refetch] = useAddedPets()
    const axiosPublic = useAxiosPublic()
    console.log(addedPets)
    const handleDelete = (pet) => {

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
                axiosPublic.delete(`/pets/${pet._id}`)
                    .then((res) => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: `${pet.name} is Deleted`,
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    const handleAdoption = (pet) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change status!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/pets/admin/${pet._id}`)
                    .then((res) => {
                        console.log(res.data)
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: `${pet.name} is available for adoption`,
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }

    const addedPetColumns = [
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


        {
            header: 'Update Pet',
            accessorKey: 'updatePet',
            cell: ({ row }) => (

                <Link to={`/dashboard/allpets/${row.original._id}`}>
                    <button>
                        <FaEdit></FaEdit>
                    </button>
                </Link>

            ),
        },
        {
            header: 'Adoption Status',
            accessorKey: 'adopted',
            cell: ({ row }) => (

                <div>
                    {
                        row.original.adopted ? <button onClick={() => handleAdoption(row.original)}>Adopted</button> : <button onClick={() => handleAdoption(row.original)}> Not adopted</button>
                    }
                </div>
            ),
        },
        {
            header: 'Delete User',
            accessorKey: 'Delete',
            cell: ({ row }) => (


                <button onClick={() => handleDelete(row.original)}>
                    <FaTrashAlt></FaTrashAlt>
                </button>

            ),
        },
    ]

    return (
        <div>
            <BasicTable data={addedPets} columns={addedPetColumns}></BasicTable>
        </div>
    );
};

export default AddedPets;