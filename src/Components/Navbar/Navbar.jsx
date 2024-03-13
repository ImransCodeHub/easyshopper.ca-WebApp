// E-Commerce Navbar Component in React for Easyshopper which is online shopping website.
import React from 'react';
import './Navbar.css';
import logo from '../Assets/web-logo-v0.3.png';
import cartlogo from '../Assets/shopping-cart.png';

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt='logo' />
            </div>
            <div className='nav-menu'>
                <ul className='nav-menu'>
                    <li>Home <hr/></li>
                    <li>Shop</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
                <div className="nav-login-cart">
                    <button>Login</button>
                    <img src={cartlogo} alt='cart' />                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;