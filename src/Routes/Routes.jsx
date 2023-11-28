import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Petlisting from "../Pages/Petlisting/Petlisting";
import SignUp from "../Pages/Auth/SignUp";
import SignIn from "../Pages/Auth/SignIn";

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
            element:<Petlisting></Petlisting>
        }
    ]
 }
])
export default router;