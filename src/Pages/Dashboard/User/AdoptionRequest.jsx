import React from 'react';
import BasicTable from '../../../Components/BasicTable';
import useAdoptionRequest from '../../../Components/Hooks/useAdoptionRequest';
import { MdCancel, MdCheckCircle } from 'react-icons/md';
import useAxiosPublic from '../../../Components/Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
const AdoptionRequest = () => {
    const [adoptionRequests, refetch] = useAdoptionRequest()
    console.log(adoptionRequests)
    const axiosPublic = useAxiosPublic()

    const handleReject = async (info) => {
        const rejectInfo = await axiosPublic.delete(`/adoption/request/${info._id}`)
        if (rejectInfo.data.deletedCount) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Rejected the request",
                showConfirmButton: false,
                timer: 1500
            });
            refetch()
        }


    }
    const handleAccept = async (id) => {
        const acceptInfo = await axiosPublic.put(`/adoption/request/${id._id}`)
        refetch()
    }
    const handleStatus = async (id) => {
        const statusInfo = await axiosPublic.patch(`/adoption/request?id=${id}`)
        if (statusInfo.data.modifiedCount) {

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Adoption Successful",
                showConfirmButton: false,
                timer: 1500
            });
            refetch()
        }
    }

    const requestColumns = [
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
        header: 'Pet Name',
        accessorKey: 'pet_name'
    },
    {
        header: 'Name',
        accessorKey: 'requester_name'
    },
    {
        header: 'Email',
        accessorKey: 'requester_email'
    },
    {
        header: 'Address',
        accessorKey: 'address'
    }
        ,
    {
        header: 'Phone',
        accessorKey: 'phone'
    } ,
    {
        header: 'Accept Request',
        accessorKey: 'Delete',
        cell: ({ row }) => (


            <div className=' font-bold'>
                {
                    row.original.status === 'pending' ? <button onClick={() => { handleAccept(row.original); handleStatus(row.original.id) }}
                        className='text-3xl text-green-500' > <MdCheckCircle /></button> : 'Adopted'
                }
            </div >

        ),
    },

    {
        header: 'Reject Request',
        accessorKey: 'Accept',
        cell: ({ row }) => (


            <button className='text-3xl text-red-500' onClick={() => handleReject(row.original)}>
                <MdCancel></MdCancel>
            </button>

        ),
    },

    ]

    return (
        <div>
            <BasicTable data={adoptionRequests} columns={requestColumns}></BasicTable>
        </div>
    );
};

export default AdoptionRequest;