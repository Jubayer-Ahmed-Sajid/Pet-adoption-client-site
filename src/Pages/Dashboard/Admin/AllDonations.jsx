import { FaEdit, FaTrashAlt } from "react-icons/fa";
import BasicTable from "../../../Components/BasicTable";
import useDonations from "../../../Components/Hooks/useDonations";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";

const AllDonations = () => {
    const [donations, refetch] = useDonations()
    const axiosSecure = useAxiosSecure()
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
                axiosSecure.delete(`/donations/${campaign._id}`)
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
            <BasicTable data={donations} columns={AllDonationsCol}></BasicTable>
        </div>
    );
};

export default AllDonations;