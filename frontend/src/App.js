import Navbar from './Components/Navbar/Navbar';
// how to import all the components from the Components folder
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import ThankYou from './Pages/ThankYou';
import Layout from './Components/Layout';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/shop" element={<Shop />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
