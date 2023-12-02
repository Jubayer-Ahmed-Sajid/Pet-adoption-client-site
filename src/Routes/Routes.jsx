import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Petlisting from "../Pages/Petlisting/Petlisting";
import SignUp from "../Pages/Auth/SignUp";
import SignIn from "../Pages/Auth/SignIn";
import DonationCampaign from "../Pages/Donation/DonationCampaign";
import PetDetails from "../Components/PetDetails/PetDetails";
import DashBoard from "../Layout/Dashboard";
import PrivateRoutes from "./PrivateROutes";
import Users from "../Pages/Dashboard/Admin/Users";
import AllPets from "../Pages/Dashboard/Admin/AllPets";
import AddPet from "../Pages/Dashboard/User/AddPet";
import AddDonationCampaign from "../Pages/Dashboard/User/AddDonationCampaign";
import AddedPets from "../Pages/Dashboard/User/AddedPets";
import AddedDonations from "../Pages/Dashboard/User/AddedDonations";
import AllDonations from "../Pages/Dashboard/Admin/AllDonations";
import PetUpdate from "../Components/PetUpdate/PetUpdate";
import DonationCampaignUpdate from "../Components/PetUpdate/DonationCampaignUpdate/DonationCampaignUpdate";

const router = createBrowserRouter([
 {
    path:'/',
    element:<Main></Main>,
    children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'signUp',
            element:<SignUp></SignUp>
        },
        {
            path:'signin',
            element:<SignIn></SignIn>
        },
        {
            path:'petlisting',
            element:<PrivateRoutes><Petlisting></Petlisting></PrivateRoutes>
        },
        {
            path:'donationCampaign',
            element:<DonationCampaign></DonationCampaign>
        },
        {
            path:'petlisting/:id',
            element:<PetDetails></PetDetails>,
            
            
        },
       
    ],
 },
 {
    path:'/dashboard',
    element:<DashBoard></DashBoard>,
    children:[
        {
            path:'allusers',
            element:<Users></Users>
        },
        {
            path:'allpets',
            element:<PrivateRoutes><AllPets></AllPets></PrivateRoutes>
        },
        {
            path:'alldonations',
            element:<AllDonations></AllDonations>

        },
        {
            path:'alldonations/:id',
            element:<DonationCampaignUpdate></DonationCampaignUpdate>,
            loader:({params})=> fetch(`http://localhost:5000/donations/${params.id}`)
        }
        ,
        {
            path:'allpets/:id',
            element:<PetUpdate></PetUpdate>,
            loader:({params})=> fetch(`http://localhost:5000/pets/${params.id}`)
            
        },
        {
            path:'addpet',
            element:<AddPet></AddPet>
        },
        {
            path:'createdonation',
            element:<AddDonationCampaign></AddDonationCampaign>
        },
        {
            path:'addedpets',
            element:<PrivateRoutes><AddedPets></AddedPets></PrivateRoutes>
        },
        {
            path:'createddonation',
            element:<PrivateRoutes><AddedDonations></AddedDonations></PrivateRoutes>
        }
    ]
 }
])
export default router;