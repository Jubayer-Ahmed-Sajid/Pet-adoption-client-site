import { createBrowserRouter, Navigate } from "react-router-dom";
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
import CategoryPets from "../Pages/Home/Categories/CategoryPets";
import PrivacyPolicy from "../Pages/Legal/PrivacyPolicy";
import TermsOfService from "../Pages/Legal/TermsOfService";
import NotFound from "../Pages/NotFound/NotFound";

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
                path: 'pet-listing',
                element: <Petlisting></Petlisting>
            },
            {
                path: 'petlisting',
                element: <Navigate to="/pet-listing" replace />
            },
            {
                path: 'categoryPets/:category',
                element: <CategoryPets></CategoryPets>
            },
            {
                path: 'donation-campaign',
                element: <DonationCampaign></DonationCampaign>
            },
            {
                path: 'donationCampaign',
                element: <Navigate to="/donation-campaign" replace />
            },
            {
                path: 'donation-campaign/:id',
                element: <DonationDetails></DonationDetails>,
            },
            {
                path: 'pet-listing/:id',
                element: <PetDetails></PetDetails>,
            },
            {
                path: 'favorites',
                element: <PrivateRoutes><Favorites></Favorites></PrivateRoutes>
            },
            {
                path: 'events',
                element: <PrivateRoutes><EventCard></EventCard></PrivateRoutes>
            },
            {
                path: 'privacy',
                element: <PrivacyPolicy></PrivacyPolicy>
            },
            {
                path: 'terms',
                element: <TermsOfService></TermsOfService>
            },
            {
                path: '*',
                element: <NotFound></NotFound>
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
                path: 'alldonations',
                element: <Navigate to="/dashboard/all-donations" replace />
            },
            {
                path: 'all-donations/:id',
                element: <AdminRoutes><DonationCampaignUpdate></DonationCampaignUpdate></AdminRoutes>
            },
            {
                path: 'alldonations/:id',
                element: <AdminRoutes><DonationCampaignUpdate></DonationCampaignUpdate></AdminRoutes>
            },
            {
                path: 'all-pets/:id',
                element: <PrivateRoutes><PetUpdate></PetUpdate></PrivateRoutes>
            },
            {
                path: 'add-pet',
                element: <PrivateRoutes><AddPet></AddPet></PrivateRoutes>
            },
            {
                path: 'create-donation',
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
]);

export default router;
