import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import BasicTable from "../../../Components/BasicTable";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import useUsers from "../../../Components/Hooks/useUsers";


const Users = () => {
    const [users, refetch] = useUsers()
    const axiosSecure = useAxiosSecure()
    const handleAdmin = (user) => {
        console.log(user)


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: `${user.name} is Admin now`,
                                // text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }
    const handleDelete = (user) => {
        console.log(user)


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete User!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then((res) => {
                        if (res.data.modifiedCount) {
                            Swal.fire({
                                title: `${user.name} is Deleted`,
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }


    /** @type import ('@tanstack/react-table').columnDef<any>*/



    const columns = [
        {
            header: 'name',
            accessorKey: 'name'

        },
        {
            header: 'email',
            accessorKey: 'email'
        },
        {
            header: 'Photo',
            accessorKey: 'photo_url',
            cell: ({ row }) => (
                <img src={row.original.photo_url} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            ),
        },

        {
            header: 'Make Admin', // Button column
            accessorKey: 'Admin', // Use a unique key
            cell: ({ row }) => (
                <div>

                    {
                        row.original.isAdmin ? "Admin" :
                            <button onClick={() => handleAdmin(row.original)}>
                                <FaUsers></FaUsers>
                            </button>
                    }
                </div>
            ),
        },
        {
            header: 'Delete User', // Button column
            accessorKey: 'Delete', // Use a unique key
            cell: ({ row }) => (


                <button onClick={() => handleDelete(row.original)}>
                    <FaTrashAlt></FaTrashAlt>
                </button>

            ),
        },
    ]

   
    return (
        <div>
         <BasicTable data={users} columns={columns} delete={handleDelete} admin = {handleAdmin}></BasicTable>
            
        </div>
    );
};

export default Users;