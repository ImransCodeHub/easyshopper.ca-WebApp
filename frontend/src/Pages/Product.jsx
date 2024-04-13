import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const Product = ({fetchCartCount}) => {
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const { productId } = useParams();

    const [activeImg, setActiveImage] = useState()
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${productId}`);
                //const response = await fetch(`/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const productData = await response.json();
                console.log('Product details:', productData);
                setProduct(productData);
                setActiveImage(productData.images[0])
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('token');

    const checkLogin = async () => {
        if (!accessToken) {
            setLoading(false);
            navigate('/register');
            //navigate(googleOauthURL); - future implementation
        } else {
            try {
                // const response = await fetch('/api/verifyToken', {
                const response = await fetch('http://localhost:8000/api/verifyToken', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        }
    };

    //TODO: Remove this method and use the one from Shop.jsx - keep in mind the quantity of the product has taken from the state
    const addToCart = async (productId) => {
        checkLogin();

        try {
            console.log(productId + " adding to cart attempt... Quantity: " + amount);

            const response = await fetch(`http://localhost:8000/api/cart/${productId}`, {
            //const response = await fetch(`/api/cart/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ quantity: amount }),
            });

            if (!response.ok) {
                throw new Error('Error adding to cart');
            }

            // Move fetchCartCount code to app.js as parent component
            fetchCartCount();

        } catch (error) {
            console.error('Error adding to cart:', error);
        }
        
    };


    return (
        <div>
            {product && (
                <>
                <br />
                <br />
                <div className='pt-32 container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
                    <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
                        <div className='flex flex-col gap-6 lg:w-2/4'>
                            <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl'/>
                            <div className='flex flex-row justify-between h-24'>
                                {/* Do this in a better way? */}
                                <img src={product.images[0]} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(product.images[0])}/>
                                <img src={product.images[1]} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(product.images[1])}/>
                                <img src={product.images[2]} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(product.images[2])}/>
                                <img src={product.images[3]} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(product.images[3])}/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 lg:w-2/4'>
                            <div>
                                <span className=' text-violet-600 font-semibold'>{product.category}</span>
                                <h1 className='text-3xl font-bold'>{product.name}</h1>
                            </div>
                            <p className='text-gray-700'>{product.description}</p>
                            <h6 className='text-2xl font-semibold'>${product.price}</h6>
                            <div className='flex flex-row items-center gap-12'>
                                <div className='flex flex-row items-center'>
                                    <button className='bg-gray-200 py-2 px-5 rounded-xl text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                                    <span className='py-4 px-6 rounded-lg'>{amount}</span>
                                    <button className='bg-gray-200 py-2 px-4 rounded-xl text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                                </div>
                                <button onClick={() => addToCart(product.productId)} className='bg-black text-white font-semibold py-3 px-16 rounded-xl h-full'>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
    );
};

export default Product;