import React, { useEffect } from 'react';
import './CSS/Success.css';

const Success = () => {
    useEffect(() => {
        document.title = "Thank You!";
    }, []);
    
    return (
        <div className='pyro'>
            <div className='before'></div>
            <div className='after'></div>
            <h1 className='thankyou'>Thank you for shopping with EasyShopper!</h1>
        </div>
    )
}

export default Success;