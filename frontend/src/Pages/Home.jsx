import React, { useEffect } from 'react';
import Layout from '../Components/Layout';
import './CSS/Home.css';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const Home = () => {
    const [text] = useTypewriter({
        words: ['boots', 'hats', 'bags', 'coats', 'shirts', 'pants', 'jackets'],
        loop: {},
        typeSpeed: 120,
        deleteSpeed: 80,
    });

    useEffect(() => {
        document.title = "Easyshopper.ca";
    }, []);

    return (
        <Layout>
            {/* build a hero section with tailwind */}

            <br />
            {/* <div className="container"> - Preventing other elements from overlapping it, like chatbot */}
                <h1 className="centered-text">Welcome to EasyShopper.ca</h1>
                <h1 className='typewriter-start'>Your one-stop shop for 
                    <span style={{fontWeight: 'bold', color: 'green', marginLeft: '18px'}}>
                        {text}
                    </span>
                    <span style={{color: 'red'}}>
                        <Cursor cursorStyle = '<' />
                    </span>
                </h1>
            {/* </div> */}
        </Layout>    
    );
};

export default Home;


/* <div className="pt-20"> 
<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="sr-only">Home</h2>
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <a href="#" className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-black xl:aspect-h-8 xl:aspect-w-7">
                 <img
                    
                    src="https://images.unsplash.com/photo-1622831180729-3f8d8a3c6b8b"
                    alt="home"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                /> 
                <div className='text-home text-center pt-14'>
                    <p className="wel-home">WELCOME</p>
                    <p className="wel-home">EASY</p>
                    <p className="wel-home">SHOPPER</p>
                </div>
            </div>
        </a>
    </div>
    
</div>
</div> */