// E-Commerce Navbar Component in React for Easyshopper which is online shopping website.
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/web-logo-v0.3.png';
import cartlogo from '../Assets/shopping-cart.png';
import { Link } from 'react-router-dom';
import { Cart2 } from 'react-bootstrap-icons';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Login from '../../Pages/Login';

const Navbar = ({cartCount, setCartCount}) => {

    const accessToken = localStorage.getItem('token');
    
    const fetchCartCount = async () => {
        console.log('Fetching cart count' + cartCount); // Debugging statement
        try {
            // const response = await fetch('/api/cart');
            const response = await fetch('http://localhost:8000/api/cart', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            
            });
            const data = await response.json();
            // setCartCount(data.cart.length);
            // make setCartCount a function that takes a parameter
            setCartCount(data.cart.length);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchCartCount();
    }, []); 

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
    
    //Bug: The cart count is not updating when a product is added to the cart. Fix: Added a copy method to the shop and product page to update the cart count.

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

                    <Login />

                    {/* <Link to='/login'><button disabled= {!googleOauthURL} onClick= {userLoginButton}>Login</button></Link> */}
                    <Link to='/cart'><Cart2  style={{fontSize: '40px' }} /></Link>
                    {/* Cart count */}
                    <div className="nav-cart-count">{cartCount}</div>           
                </div>
            </div>
        </div>
    );
};

export default Navbar;