import BasicTable from "../../../Components/BasicTable";
import useDonations from "../../../Components/Hooks/useDonations";

const AllDonations = () => {
    const [donations,refetch] = useDonations()
    const AllDonationsCol =[
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
            <BasicTable data={donations} columns={AllDonationsCol}></BasicTable>
        </div>
    );
};

export default AllDonations;