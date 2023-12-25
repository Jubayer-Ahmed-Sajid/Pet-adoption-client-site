import { FaEdit, FaTrashAlt } from "react-icons/fa";
import BasicTable from "../../../Components/BasicTable";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import useAllDonations from '../../../Components/Hooks/useAllDonations'


const AllDonations = () => {
    const [allDonations, refetch] = useAllDonations()
    console.log(allDonations)
    const axiosPublic = useAxiosPublic()
    const handleDelete = (campaign) => {

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
                axiosPublic.delete(`/donations/${campaign._id}`)
                    .then((res) => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: `${campaign.name} is Deleted`,
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    const AllDonationsCol = [
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
            header: 'Max Donation',
            accessorKey: 'max_donation_amount'
        },
        {
            header: 'Last Date',
            accessorKey: 'last_date'
        },
        {
            header: 'Status',
            accessorKey: 'adopted',
            cell: ({ row }) => (

                <div>
                    {
                        row.original.paused ? <button onClick={() => handleAdoption(row.original)}>Paused</button> : <button onClick={() => handleAdoption(row.original)}>Continues</button>
                    }
                </div>
            ),
        },
        {
            header: 'Update Campaign',
            accessorKey: 'update',
            cell: ({ row }) => (

                <Link to={`/dashboard/alldonations/${row.original._id}`}>
                    <button>
                        <FaEdit></FaEdit>
                    </button>
                </Link>

            )
        },
        
        {
            header: 'Delete Campaign',
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
            <BasicTable data={allDonations} columns={AllDonationsCol}></BasicTable>
        </div>
    );
};

export default AllDonations;