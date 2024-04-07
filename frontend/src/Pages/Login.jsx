/**
 * Bug: <Login /> component renders multiple times because it's being called within the Navbar component.
 * Fix: Use a memoization technique, memoize the Login component using the React.memo higher-order component.
 */
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    
    // User login functionality
    const [googleOauthURL, setGoogleOauthURL] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Track of the user's login status
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();


    // Runs once when the component is loaded
    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            localStorage.setItem('token', token);
            setLoggedIn(true); // set the user's login status to true
            navigate('/');
        }

    }, []);

    // Runs once when the component is loaded
    useEffect(() => {
        fetch('http://localhost:8000/api/google/url')
        // fetch('/api/google/url')
            .then(response => response.json())
            .then(data => setGoogleOauthURL(data.url))
            .catch(error => {
                console.error("Error fetching data:", error);
                localStorage.clear();
            });
        }
    );

    const userLoginButton = () => {
        window.location.href = googleOauthURL;
    };
            
    if (loggedIn) {
        console.log(loggedIn);
        console.log('Logged in');
        return (<Link to='/login'><button onClick={() => localStorage.clear()}>Logout</button></Link>)
    }
    else {
        console.log(loggedIn);
        console.log('Not logged in');        
        return (<Link to='/login'><button disabled={!googleOauthURL} onClick={userLoginButton}>Login</button></Link>)

    }
};

export default React.memo(Login); // Memoize the Login component
