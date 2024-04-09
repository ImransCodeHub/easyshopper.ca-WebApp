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
import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  const [cartCount, setCartCount] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar cartCount={cartCount} setCartCount={setCartCount}/>
        <Routes>
            <Route path="/shop" element={<Shop cartCount={cartCount} setCartCount={setCartCount}/>} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
