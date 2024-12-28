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
import DonationDetails from "../Pages/Donation/DonationDetails";
import AdminRoutes from "./AdminRoutes";
import Favorites from "../Pages/Favorites/Favorites";
import EventCard from "../Pages/Events/Events";
import ConditionalRender from "../Components/PetDetails/conditionalRender";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'render',
                element: <ConditionalRender></ConditionalRender>

            },
            {
                path: 'signUp',
                element: <SignUp></SignUp>
            },
            {
                path: 'signin',
                element: <SignIn></SignIn>
            },
            {
                path: 'petlisting',
                element: <PrivateRoutes><Petlisting></Petlisting></PrivateRoutes>
            },
            {
                path: 'donationCampaign',
                element: <PrivateRoutes><DonationCampaign></DonationCampaign></PrivateRoutes>
            },
            {
                path: 'donationCampaign/:id',
                element: <PrivateRoutes><DonationDetails></DonationDetails></PrivateRoutes>,


            },
            {
                path: 'petlisting/:id',
                element: <PrivateRoutes><PetDetails></PetDetails></PrivateRoutes>,
            },


            {
                path: 'favorites',
                element: <PrivateRoutes><Favorites></Favorites></PrivateRoutes>
            },
            {
                path: 'events',
                element: <PrivateRoutes><EventCard></EventCard></PrivateRoutes>
            }


        ],
    },
    {
        path: '/dashboard',
        element: <DashBoard></DashBoard>,
        children: [
            {
                path: 'all-users',
                element: <AdminRoutes><Users></Users></AdminRoutes>
            },
            {
                path: 'all-pets',
                element: <AdminRoutes><AllPets></AllPets></AdminRoutes>
            },
            {
                path: 'all-donations',
                element: <AdminRoutes><AllDonations></AllDonations></AdminRoutes>

            },
            {
                path: 'all-donations/:id',
                element: <AdminRoutes><DonationCampaignUpdate></DonationCampaignUpdate></AdminRoutes>
            }
            ,
            {
                path: 'all-pets/:id',
                element: <PrivateRoutes><PetUpdate></PetUpdate></PrivateRoutes>


            },
            {
                path: 'add-pet',
                element: <PrivateRoutes><AddPet></AddPet></PrivateRoutes>
            },
            {
                path: 'created-onation',
                element: <PrivateRoutes><AddDonationCampaign></AddDonationCampaign></PrivateRoutes>
            },
            {
                path: 'added-pets',
                element: <PrivateRoutes><AddedPets></AddedPets></PrivateRoutes>
            },
            {
                path: 'created-donation',
                element: <PrivateRoutes><AddedDonations></AddedDonations></PrivateRoutes>
            },
            {
                path: 'adoption-request',
                element: <PrivateRoutes><AdoptionRequest></AdoptionRequest></PrivateRoutes>
            },

        ]
    }
])
export default router;