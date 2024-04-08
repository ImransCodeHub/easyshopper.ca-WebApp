import React from 'react';
import './CSS/Shop.css';
import { useState, useEffect } from 'react';
//import Navbar, {setCartCount} from '../Components/Navbar/Navbar';
import Layout from '../Components/Layout';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Plus } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';


const Shop = () => {

    // State variable to store products
    const [products, setProducts] = useState([]);

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            let response;
            try {
                // response = await fetch('http://localhost:8000/api/products');
                response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data); // Set products state variable
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                console.log("Response:", response);
            }
        };
        
        fetchProducts();
    }, []);

//TODO: Check if the user is logged in before adding to cart and append the email to the cart data as user identifier
    const addToCart = async (productId) => {
        const loggedIn = true;
        if (!loggedIn) { // Do the login part!
            // Redirect to the login page if the user is not logged in
            window.location.href = '/login';
            return;
        } else {
            try {
                console.log(productId + " added to cart testing");
                // Send a POST request to the backend to add the product to the cart
                // const response = await fetch(`http://localhost:8000/api/cart/${productId}`, {
                    const response = await fetch(`/api/cart/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity: 1 }),
                });
                
                // Bug: The cart count is not updating when a product is added to the cart. Fix:
                const fetchCartCount = async () => {
                    
                    try {
                        const response = await fetch('/api/cart');
                        // const response = await fetch('http://localhost:8000/api/cart');
                        const data = await response.json();
                        //if (data.userID === loggedInUser) { //TODO: Might not need this check because the addtocart already do this check...
                            // setCartCount(data.cart.length);
                            //setCartCount(data.cart.length); // does not work

                        //}
                    }
                    catch (error) {
                        console.error("Error fetching data:", error);
                    }
                }
                fetchCartCount();

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    };

    const navigate = useNavigate();

    return (

        <Layout>
            <div className="pt-20"> {/* Add padding top to create space below the navbar. Can add bg-black for bg*/}
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                    <header className='text-center'>
                        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>

                        <p className="mt-4 max-w-md mx-auto text-gray-500">
                        Welcome to our product collection!  
                        Browse through our curated selection and discover your new choice!
                        </p>

                    </header>

                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pt-10">
                        {products.map((product) => (
                        <a key={product.productId} href={product.href} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img
                                src={product.images[0]}
                                alt={product.imageAlt}
                                className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-450px]"
                                // add hover effect
                                style={{ cursor: 'pointer' }}
                                onClick = {() => navigate(`/products/${product.productId}`)}
                            />
                            </div>

                            <div className="relative bg-white pt-3"> {/* Has bg color*/}
                                    
                                    {/* #TODO Remove the underline? Text-m? */}
                                    <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                        {product.name}
                                    </h3>
                                    
                                    <p className="mt-1">
                                        {/* #TODO Remove price and add colors list or category or brand */}
                                        <span className="text-sm tracking-wider text-gray-900"> {product.category} </span>
                                    </p>

                                    <div className="absolute top-4 right-4">
                                        {/* Button Stlye 01 */}
                                        {/* <button onClick={() => addToCart(product.productId)} className="bg-gray-200 p-2 rounded-full">
                                            <Plus style={{fontSize: '2rem', marginLeft: '70px' }}/>
                                        </button> */}

                                        {/* Button Stlye 02 */}
                                        <button onClick={() => addToCart(product.productId)} className="bg-gray-200 p-2 rounded-full flex items-center">
                                            <span className="tracking-wider text-gray-900 pl-2">${product.price}</span>
                                            <Plus style={{ fontSize: '2rem', marginLeft: '4px' }} />
                                        </button>
                                    </div>
                            </div>
                        </a>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Shop;