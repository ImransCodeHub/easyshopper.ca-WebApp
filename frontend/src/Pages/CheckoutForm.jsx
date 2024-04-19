import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {EmbeddedCheckoutProvider, EmbeddedCheckout} from '@stripe/react-stripe-js';
import {Navigate} from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render. - TODO: Do the same for Chatbot thing later.

// Put the publishable key in the .env file
const stripePromise = loadStripe("pk_test_51P3xQp04W06RgWe1YuUFUfntjfsj6Hq4TYlBYIxsf3tHQjuiMlEIXG89XKpP3bdXyvgOBRKTJ5pqCoatHbgtHBfx00UaRcT1OI", {
    timeout: 30000,
});

const accessToken = localStorage.getItem('token');

const CheckoutForm = () => {

    const fetchClientSecret = useCallback(() => {
        // Create a Checkout Session
        // return fetch("http://localhost:4242/api/create-checkout-session", {
        return fetch("/api/create-checkout-session", {

            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },

        })
        .then((res) => {console.log(res); return res.json();}) // Log the response
        .then((data) => {
            console.log('Client Secret:', data.clientSecret); // Log the client secret
            return data.clientSecret; // Return the client secret
        });
        
    }, []);

    const options = {fetchClientSecret};

    return (
        <div style={{padding: '230px'}} id="checkout">
        <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={options}
        >
            <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
        </div>
    )
}

const Return = ({status, setStatus, fetchCartCount}) => {

    const [customerEmail, setCustomerEmail] = useState('');
    //const navigate = useNavigate();

    useEffect(() => {
        const queryString = window.location.search; // returns the URL query String 
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');

        // fetch(`http://localhost:4242/api/session-status?session_id=${sessionId}`)
        fetch(`/api/session-status?session_id=${sessionId}`)
        .then((res) => {console.log(res); return res.json();}) 
        .then((data) => {
            console.log( "Data: " + data + ", Customer Email: " + data.customer_email);
            setStatus(data.status);
            console.log(status);
            setCustomerEmail(data.customer_email);
        });
    }, []);

    if (status === 'open') {
        console.log("Payment status is" + status);
        return (
        <Navigate to="/checkout" />
        )
    }

    if (status === 'complete') {
        console.log("Payment status is" + status + ", Emtptying cart...");
        console.log("accessToken is " + accessToken);

        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
    
        console.log("Headers sent to lambda:", headers);

        const emptyUserCartOnPayment = async () => {
            try {
                // const response = await fetch('http://localhost:4242/api/empty-cart', {
                const response = await fetch('/api/empty-cart', {
                    method: 'DELETE',
                    headers: headers,
                });
                console.log("response is " + response);
                setStatus(null);
                //TODO: Future update: Use the setCartCount function to update the cart count in the navbar
                //window.location.reload();
                fetchCartCount();
            }
            catch (error) {
                console.error("Error emptying cart:", error);
            }
        }
        
        emptyUserCartOnPayment();
 
        return (
            <Navigate to="/success" />
        );
    }

  return null;
}

export {CheckoutForm, Return};

