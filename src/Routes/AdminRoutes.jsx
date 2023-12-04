import { Spinner } from "@material-tailwind/react";
import useAdmin from "../Components/Hooks/useAdmin";
import useAuth from "../Components/Hooks/useAuth";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({children}) => {
    const {user,loading} = useAuth()
    const [data,isLoading] = useAdmin()
    if(loading || isLoading){
        return <div className='h-screen flex items-center justify-center'><Spinner className="h-16 w-16 text-gray-900/50" />;</div>
    }
    if(user && data){
        return children
    }
    return <Navigate to='/signin'></Navigate>
};

export default AdminRoutes;