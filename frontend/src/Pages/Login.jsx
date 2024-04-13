/**
 * Bug: <Login /> component renders multiple times because it's being called within the Navbar component.
 * Fix: Use a memoization technique, memoize the Login component using the React.memo higher-order component.
 */
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    
    const navigate = useNavigate();
    
    // User login functionality
    const [googleOauthURL, setGoogleOauthURL] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Runs once when the component is loaded
    useEffect(() => {
        const token = searchParams.get('token');

        const handleTokenVerification = async () => {
            if (token) {
                localStorage.setItem('token', token);
                //await checkLoginStatus();
                navigate('/');
            }
        };
        handleTokenVerification();

    }, []);

    // Runs once when the component is loaded
    useEffect(() => {
        //fetch('http://localhost:8000/api/google/url')
        fetch('/api/google/url')
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


    // const checkLoginStatus = async () => {
    //     try {
    //         // const response = await fetch('/api/verifyToken', {
    //         const response = await fetch('http://localhost:8000/api/verifyToken', {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         });
    //         if (response.status === 200) {
    //             console.log('User is verified and logged in');
    //             setIsLoggedIn(true);
    //             console.log(isLoggedIn);
    //         } else {
    //             setIsLoggedIn(false);
    //         }
    //     } catch (error) {
    //         console.error('Error verifying token:', error);
    //         setIsLoggedIn(false);
    //     }
    // };

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
                const response = await fetch('/api/verifyToken', {
                //const response = await fetch('http://localhost:8000/api/verifyToken', {
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

    const userloggedIn = async () => {
        
        // check if there's a localstorage token
        // if so, user is logged in
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        // try {
        //     const response = await fetch('/api/verifyToken', {
        //     //const response = await fetch('http://localhost:8000/api/verifyToken', {
        //         headers: {
        //             Authorization: `Bearer ${accessToken}`,
        //         },
        //     });
        //     if (response.status === 200) {
        //         setIsLoggedIn(true);
        //     } else {
        //         setIsLoggedIn(false);
        //     }
        // } catch (error) {
        //     console.error('Error verifying token:', error);
        //     setIsLoggedIn(false);
        // } finally {
        //     setLoading(false); // Set loading to false after the request completes
        // }
    };

    useEffect(() => {
        if (accessToken) {
            userloggedIn();
        } else {
            setLoading(false);
        }
    }, [accessToken]);

    return (
        <div>
            {isLoggedIn ? (
                <Link to='/login'><button onClick={() => localStorage.clear()}>Logout</button></Link>
            ) : (
                <Link to='/login'><button disabled={!googleOauthURL} onClick={userLoginButton}>Login</button></Link>
            )}
        </div>
    );
};

export default React.memo(Login); // Memoize the Login component
