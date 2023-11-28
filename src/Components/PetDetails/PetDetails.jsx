import { useParams } from "react-router-dom";
import usePetDetails from "../Hooks/usePetDetails";

const PetDetails = () => {
    const { id } = useParams()
    const { PetDetails } = usePetDetails(id)
    console.log(PetDetails)


    return (
        <div>
            <h2></h2>
        </div>
    );
};

export default PetDetails;