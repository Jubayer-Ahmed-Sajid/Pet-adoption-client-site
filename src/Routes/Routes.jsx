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
import AdoptionRequest from "../Pages/Dashboard/User/AdoptionRequest";
import CategoryPets from "../Pages/Home/Categories/CategoryPets";
import DonationDetails from "../Pages/Donation/DonationDetails";
import AdminRoutes from "./AdminRoutes";

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
            element:<PrivateRoutes><DonationCampaign></DonationCampaign></PrivateRoutes>
        },
        {
            path:'donationCampaign/:id',
            element:<PrivateRoutes><DonationDetails></DonationDetails></PrivateRoutes>,
            loader:({params})=>fetch(`http://localhost:5000/donations/${params.id}`)

        },
        {
            path:'petlisting/:id',
            element:<PrivateRoutes><PetDetails></PetDetails></PrivateRoutes>,
        },
        {
            path:'categoryPets/:category',
            element:<PrivateRoutes><CategoryPets></CategoryPets></PrivateRoutes>,
            loader:({params})=> fetch(`http://localhost:5000/pets/category/${params.category}`)
        }
       
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
            element:<AdminRoutes><AllPets></AllPets></AdminRoutes>
        },
        {
            path:'alldonations',
            element:<AdminRoutes><AllDonations></AllDonations></AdminRoutes>

        },
        {
            path:'alldonations/:id',
            element:<AdminRoutes><DonationCampaignUpdate></DonationCampaignUpdate></AdminRoutes>,
            loader:({params})=> fetch(`http://localhost:5000/donations/${params.id}`)
        }
        ,
        {
            path:'allpets/:id',
            element:<PrivateRoutes><PetUpdate></PetUpdate></PrivateRoutes>
           
            
        },
        {
            path:'addpet',
            element:<PrivateRoutes><AddPet></AddPet></PrivateRoutes>
        },
        {
            path:'createdonation',
            element:<PrivateRoutes><AddDonationCampaign></AddDonationCampaign></PrivateRoutes>
        },
        {
            path:'addedpets',
            element:<PrivateRoutes><AddedPets></AddedPets></PrivateRoutes>
        },
        {
            path:'createddonation',
            element:<PrivateRoutes><AddedDonations></AddedDonations></PrivateRoutes>
        },
        {
            path:'adoptionrequest',
            element:<PrivateRoutes><AdoptionRequest></AdoptionRequest></PrivateRoutes>
        }
    ]
 }
])
export default router;