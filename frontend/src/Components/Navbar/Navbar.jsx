// E-Commerce Navbar Component in React for Easyshopper which is online shopping website.
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/web-logo-v0.3.png';
import cartlogo from '../Assets/shopping-cart.png';
import { Link } from 'react-router-dom';
import { Cart2 } from 'bootstrap-icons-react';

const Navbar = () => {

    // Active menu item state
    const [menu, setMenu] = React.useState();

    useEffect(() => {
        if (window.location.pathname === '/') {
            setMenu('home');
        }else{
            const currentUrl = window.location.href;
            const page = (currentUrl.slice(currentUrl.lastIndexOf('/') + 1));
            setMenu(page);
        }
        
    }, []);
    

    // Navbar visibility on scroll
    const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollpos]);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;

        setPrevScrollpos(currentScrollPos);
        setVisible(visible);
    };

    return (
        <div className={`navbar ${visible ? 'navbar-visible' : 'navbar-hidden'}`}>
            {/* <div className='nav-logo'>
                <img src={logo} alt='logo' />
            </div> */}
            <div className='text-logo'>
                <p className="easy">EASY</p>
                <br /> {/* Add line break to move "Shopper" to a new line */}
                <p className="shopper">SHOPPER</p>
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
                    <Link to='/cart'><Cart2  style={{fontSize: '40px' }} /></Link>
                    {/* Cart count */}
                    <div className="nav-cart-count">0</div>           
                </div>
            </div>
        </div>
    );
};

export default Navbar;