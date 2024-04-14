import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './CSS/Cart.css';

const Cart = ({fetchCartCount}) => {

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const accessToken = localStorage.getItem('token');

    const fetchProductInfo = async (productId) => {
        try {
            const response = fetch(`/api/products/${productId}`);
            //const response = fetch(`http://localhost:8000/api/products/${productId}`);
            const productData = (await response).json();
            console.log('Product info json being fetched: ' + JSON.stringify(productData));

            // return json data
            return productData;
        } catch (error) {
            console.error('Error while attempting to fetch product info: ', error);
            return null;
        }
    };

    const fetchCartData = async () => {
        try {
            const response = await fetch('/api/cart', { 
            //const response = await fetch('http://localhost:8000/api/cart', { 
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            const cartData = await response.json();
            console.log('Cart json being fetched: ' + JSON.stringify(cartData));

            const cartItemsWithProductInfo = await Promise.all(cartData.cart.map (async (item) => {
                const productInfo = await fetchProductInfo(item.productId);
                console.log(productInfo);
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    image: productInfo?.images[0] || 'Product image not found',
                    name: productInfo?.name || 'Product name not found',
                    price: productInfo?.price || 0,
                    image: productInfo?.image || 'Product image not found',
                    totalPrice: item.quantity * productInfo.price
                };
            }));

            setCartItems(cartItemsWithProductInfo);

            // loop through products in the cart and 
        } catch (error) {
            console.error('Error fetching cart data: ', error);
        }
    };

    const handleDeleteClick = async (productId) => {
        try {
            const response = await fetch(`/api/cart/${productId}`, {
            //const response = await fetch(`http://localhost:8000/api/cart/${productId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const updatedCart = cartItems.filter(item => item.productId != productId);
                setCartItems(updatedCart);
                fetchCartCount();
            } else {
                console.error('Error - Bad response');
            }
        } catch (error) {
            console.error('Error attempting to remove product from cart', error);
        }
    };

    const handleCheckoutClick = async () => {
        // empty the cart
        // send customer to success page and thank them for shopping
        try {
            // loop through the cart - delete all products
            for (const cartItem of cartItems) {
                await fetch(`http://localhost:8000/api/cart/${cartItem.productId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });
            }

            window.location.href = '/success';
        } catch (error) {
            console.error('Error when attempting to checkout', error);
        }
    };

    useEffect(() => {
        try {
            fetchCartData();
        } catch (error) {
            console.log('Error attempting to fetch cart data: ', error);
        }
        
    }, []);

    useEffect(() => {
        const calculateTotalCartPrice = () => {
            const total = cartItems.reduce((x, currentItem) => {
                return x + currentItem.price * currentItem.quantity;
            }, 0);
            setTotalPrice(total);
        }

        calculateTotalCartPrice();
    }, [cartItems]);

    return (
        <div className='cart-container'>
            {cartItems.length === 0 ? (
                <div>
                    <h1 className='cart-h1'>Your cart is empty; try adding some products first!</h1>
                </div>
            ) : (
                <div className='cart-container'>
                    <div className='center-loading'>
                    {
                        (() => {
                            if(loading) {
                                    return (
                                        <div class="w-full gap-x-2 flex justify-center items-center">
                                            <div
                                              class="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"
                                            ></div>
                                            <div
                                              class="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"
                                            ></div>
                                            <div
                                              class="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"
                                            ></div>
                                          </div>
                                    )
                                }
                        })()  
                    }
                    </div>
                    
                    <h1 className='cart-h1'>Shopping Cart</h1>
                    <div className='table-container'>
                        <table className='cart-table'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price Per Unit</th>
                                    <th>Total Price</th>
                                    <th>Remove?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(product => (
                                    <tr key={product.productId}>
                                        <td>
                                            <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.quantity}</td>
                                        <td>{'$' + product.price.toFixed(2)}</td>
                                        <td>{'$' + product.totalPrice.toFixed(2)}</td>
                                        <td>
                                            <button className='deleteButton' onClick={() => handleDeleteClick(product.productId)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 50 59"
                                                    className='bin'
                                                >
                                                    <path
                                                        fill="#B5BAC1"
                                                        d="M0 7.5C0 5.01472 2.01472 3 4.5 3H45.5C47.9853 3 50 5.01472 50 7.5V7.5C50 8.32843 49.3284 9 48.5 9H1.5C0.671571 9 0 8.32843 0 7.5V7.5Z"
                                                    ></path>
                                                    <path
                                                        fill="#B5BAC1"
                                                        d="M17 3C17 1.34315 18.3431 0 20 0H29.3125C30.9694 0 32.3125 1.34315 32.3125 3V3H17V3Z"
                                                    ></path>
                                                    <path
                                                        fill="#B5BAC1"
                                                        d="M2.18565 18.0974C2.08466 15.821 3.903 13.9202 6.18172 13.9202H43.8189C46.0976 13.9202 47.916 15.821 47.815 18.0975L46.1699 55.1775C46.0751 57.3155 44.314 59.0002 42.1739 59.0002H7.8268C5.68661 59.0002 3.92559 57.3155 3.83073 55.1775L2.18565 18.0974ZM18.0003 49.5402C16.6196 49.5402 15.5003 48.4209 15.5003 47.0402V24.9602C15.5003 23.5795 16.6196 22.4602 18.0003 22.4602C19.381 22.4602 20.5003 23.5795 20.5003 24.9602V47.0402C20.5003 48.4209 19.381 49.5402 18.0003 49.5402ZM29.5003 47.0402C29.5003 48.4209 30.6196 49.5402 32.0003 49.5402C33.381 49.5402 34.5003 48.4209 34.5003 47.0402V24.9602C34.5003 23.5795 33.381 22.4602 32.0003 22.4602C30.6196 22.4602 29.5003 23.5795 29.5003 24.9602V47.0402Z"
                                                        clipRule="evenodd"
                                                        fillRule="evenodd"
                                                    ></path>
                                                    <path fill="#B5BAC1" d="M2 13H48L47.6742 21.28H2.32031L2 13Z"></path>
                                                </svg>
                                                <span className='tooltip'>Delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br></br>
                        <div className='total-price'>
                            <h1>Total: ${totalPrice.toFixed(2)} * 15% HST</h1>
                        </div>
                        <div className='total-price'>
                            <h1>Amount Due at Checkout: ${(totalPrice * 1.15).toFixed(2)}</h1>
                        </div>
                        <br></br>
                        <div className='button-container'>
                            <Link to='/success'>
                                <button className='checkout-button' onClick={handleCheckoutClick}>
                                    Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;