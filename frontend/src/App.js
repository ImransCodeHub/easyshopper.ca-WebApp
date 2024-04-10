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

function App() {

  const [cartCount, setCartCount] = useState(0);
  const accessToken = localStorage.getItem('token');

  const fetchCartCount = async () => {
    
    try {
        //const response = await fetch('/api/cart');
        const response = await fetch('http://localhost:8000/api/cart', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = await response.json();
        setCartCount(data.cart.length);
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
      fetchCartCount();
  }, []);

  // When passing props to a component, remember to destructure the props in the component
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar cartCount={cartCount} setCartCount={setCartCount}/> */}
        <Navbar fetchCartCount={fetchCartCount} cartCount={cartCount} />
        <Routes>
            {/* <Route path="/shop" element={<Shop setCartCount={setCartCount}/>} /> */}
            <Route path="/shop" element={<Shop fetchCartCount={fetchCartCount} />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> 
            {/* <Route path="/products/:productId" element={<Product setCartCount={setCartCount}/>} /> */}
            <Route path="/products/:productId" element={<Product fetchCartCount={fetchCartCount} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/register" element={<Register />} />
            <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;