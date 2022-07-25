import React from 'react';
import { NavLink } from "react-router-dom";

export const Navbar = () => {

    return (
        <div className='navbar flex space-between place-center'>
            <div className="logo">Product Management App</div>
            <div className='links-wrapper flex place-center'>
                <NavLink className='forward' to={`/`} >Products</NavLink>
                {/* <NavLink className='forward' to={`/products/${id}`} >product details</NavLink> */}
            </div>
        </div>
    )
}