// E-Commerce Navbar Component in React for Easyshopper which is online shopping website.
import React from 'react';
import './Navbar.css';
import logo from '../Assets/web-logo-v0.3.png';
import cartlogo from '../Assets/shopping-cart.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    
    const [menu, setMenu] = React.useState("home"); // State to manage the active menu item

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt='logo' />
            </div>
            <div className='nav-menu'>
                <ul className='nav-menu'> 
                {/* Menu items with active state. Used inline conditional rendering to show active state of menu item. */}
                    <li onClick={()=>{setMenu("home")}}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>Home</Link>{menu==="home"? <hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/shop'>Shop</Link>{menu==="shop"? <hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("about")}}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/about'>About</Link>{menu==="about"? <hr/>:<></>}</li>
                    <li onClick={()=>{setMenu("contact")}}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/contact'>Contact</Link>{menu==="contact"? <hr/>:<></>}</li>
                </ul>
                <div className="nav-login-cart">
                    <Link to='/login'><button>Login</button></Link>
                    <Link to='/cart'><img src={cartlogo} alt='cart' /></Link>
                    {/* Cart count */}
                    <div className="nav-cart-count">0</div>           
                </div>
            </div>
        </div>
    );
};

export default Navbar;