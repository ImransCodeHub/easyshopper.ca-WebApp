import React, { useState } from 'react';
import backgroundImage1 from '../Assets/background-image1.jpg';
import backgroundImage2 from '../Assets/background-image2.jpg';

function HomePage() {
    const [backgroundImage, setBackgroundImage] = useState(backgroundImage1);

    // Function to toggle between background images
    const toggleBackgroundImage = () => {
        setBackgroundImage(backgroundImage === backgroundImage1 ? backgroundImage2 : backgroundImage1);
    };

    return (
        <div className="home-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <button onClick={toggleBackgroundImage}>Change Background</button>
            {/* Other content of your home page */}
        </div>
    );
}

export default HomePage;
