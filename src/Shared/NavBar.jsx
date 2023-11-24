import { NavLink } from "react-router-dom";

const NavBar = () => {
    const navLinks = <>
    
        <li>
            <NavLink to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to='/petlisting'>Pet Listing</NavLink>
        </li>
        <li>
            <NavLink to='/donationCampaign'>Donation Campaign</NavLink>
        </li>
        <li>
            <NavLink to='/login'>Login</NavLink>
        </li>
    
    </>
    return (
        <div>
            <div className="flex list-none justify-between">
                <ul>

                {navLinks}
                </ul>
            </div>
                <h2 className="text-8xl text-center">hello</h2>

        </div>
    );
};

export default NavBar;