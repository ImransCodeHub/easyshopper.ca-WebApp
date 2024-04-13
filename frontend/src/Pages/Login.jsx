/**
 * Bug: <Login /> component renders multiple times because it's being called within the Navbar component.
 * Fix: Use a memoization technique, memoize the Login component using the React.memo higher-order component.
 */
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Pages/CSS/Login.css';

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

    // const checkLogin = async () => {
    //     if (!accessToken) {
    //         setLoading(false);
    //         navigate('/register');
    //         //navigate(googleOauthURL); - future implementation
    //     } else {
    //         try {
    //             const response = await fetch('/api/verifyToken', {
    //             //const response = await fetch('http://localhost:8000/api/verifyToken', {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             });
    //             if (response.status === 200) {
    //                 setIsLoggedIn(true);
    //             } else {
    //                 setIsLoggedIn(false);
    //             }
    //         } catch (error) {
    //             console.error('Error verifying token:', error);
    //             setIsLoggedIn(false);
    //         } finally {
    //             setLoading(false); // Set loading to false after the request completes
    //         }
    //     }
    // };

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
                //<Link to='/login'><button disabled={!googleOauthURL} onClick={userLoginButton}>Login</button></Link>
                <Link to='/login'><button class="Btn" disabled={!googleOauthURL} onClick={userLoginButton}>
  
                <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                
                <div class="text">Logout</div>
              </button></Link>
            )}
        </div>
    );
};

export default React.memo(Login); // Memoize the Login component
