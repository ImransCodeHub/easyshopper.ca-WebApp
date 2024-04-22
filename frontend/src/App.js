import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import ThankYou from './Pages/ThankYou';
import Layout from './Components/Layout';
import Register from './Pages/Register';
import Success from './Pages/Success';
import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Payment Processing Imports
import{ CheckoutForm, Return } from './Pages/CheckoutForm';

// Chatbot Imports
import ActionProvider from './Components/Chatbot/ActionProvider';
import MessageParser from './Components/Chatbot/MessageParser';
import config from './Components/Chatbot/config';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import chatbotIconRed from './Components/Assets/chatbot-icon-red.png';
//import './Components/Chatbot/ChatbotUI.css';
// import { X } from 'react-bootstrap-icons';



function App() {
  const [status, setStatus] = useState(null);

  const [cartCount, setCartCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const accessToken = localStorage.getItem('token');
    
  const fetchCartCount = async () => {
      try {
          const response = await fetch('/api/cart', {
          //const response = await fetch('http://localhost:8000/api/cart', {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
              //console: console.log('fetchCart NavBar accessToken value: ' + accessToken)
          
          });
          const data = await response.json();
          //console.log('fetchCart NavBar data value: ' + JSON.stringify(data.cart.length));

          setCartCount(data.cart.length);

          return data;
      }
      catch (error) {
          console.error("Error fetching data:", error);
      }
  }

  useEffect(() => {
    fetchCartCount();
  }, [cartCount]);

  const toggleChatbot = () => {
    
    setIsOpen(!isOpen);
  };

// When passing props to a component, remember to destructure the props in the component
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar cartCount={cartCount} fetchCartCount={fetchCartCount} />
        <Routes>            
            <Route path="/shop" element={<Shop fetchCartCount={fetchCartCount} />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/products/:productId" element={<Product fetchCartCount={fetchCartCount} />} />
            <Route path="/login" element={<Login fetchCartCount={fetchCartCount} />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/register" element={<Register />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cart" element={<Cart fetchCartCount={fetchCartCount} status={status} setStatus={setStatus} />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/return" element={<Return status={status} setStatus={setStatus} fetchCartCount={fetchCartCount} />} />
        </Routes>
      </BrowserRouter>

      {/* Floating chatbot icon */}
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <img src={chatbotIconRed} alt="Chatbot" style={{ height: '50px', width: '50', position: 'fixed', bottom: '0', right: '0' }} />
        {/* <img src={chatbotIconRed} alt="Chatbot" /> */}

      </div>

      {/* Floating chatbot container */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h1>Angry Helper</h1>
            {/* <button onClick={toggleChatbot}>< X style={{fontSize: '40px' }} /></button> */}
            <button className="close-icon" onClick={toggleChatbot}>
              <span className="close-icon-text" style={{ fontSize: '30px' }}>&times;</span>
            </button>

          </div>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
      
    </div>
  );
}

export default App;
