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
                //<Link to='/login'><button onClick={() => localStorage.clear()}>Logout</button></Link>
                <button type='button' class="Btn" onClick={() => {localStorage.clear(); window.location.reload();} }>
  
                <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                
                <div class="text-login">Logout</div>
                </button>
            ) : (
                //<Link to='/login'><button disabled={!googleOauthURL} onClick={userLoginButton}>Login</button></Link>
                <Link to='/login'><button class="signin" disabled={!googleOauthURL} onClick={userLoginButton}>
                <svg
                  viewBox="0 0 256 262"
                  preserveAspectRatio="xMidYMid"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    fill="#EB4335"
                  ></path>
                </svg>
                Sign in with Google
              </button>
              </Link>
            )}
        </div>
    );
};

export default React.memo(Login); // Memoize the Login component
