import React from 'react';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';
import BasicTable from '../../../Components/BasicTable';
import usePets from '../../../Components/Hooks/usePets';
import { FaEdit, FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllPets = () => {
    const [pets, refetch] = usePets()
    const axiosSecure = useAxiosSecure()
   
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
                axiosSecure.delete(`/pets/${pet._id}`)
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
                axiosSecure.patch(`/pets/admin/${pet._id}`)
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

    const petColumns = [
        {
            header: 'Image',
            accessorKey: 'image_url',
            cell: ({ row }) => (
                <img src={row.original.image_url} alt="pet" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
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
            accessorKey: 'update',
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
                        row.original.adopted ? <button onClick={() => handleAdoption(row.original)}>Adopted</button> : <button onClick={() => handleAdoption(row.original)}> Available</button>
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
    ]


    return (
        <BasicTable data={pets} columns={petColumns}>

        </BasicTable>
    );
};

export default AllPets;