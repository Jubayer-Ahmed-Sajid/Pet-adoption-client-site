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
import PetUpdate from "../Components/PetUpdate/PetUpdate";
import AddPet from "../Pages/Dashboard/User/AddPet";

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
            element:<AllPets></AllPets>
        },
        {
            path:'allpets/:id',
            element:<PetUpdate></PetUpdate>
        },
        {
            path:'addpet',
            element:<AddPet></AddPet>
        }
    ]
 }
])
export default router;