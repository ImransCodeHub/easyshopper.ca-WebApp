import Navbar from './Components/Navbar/Navbar';
// how to import all the components from the Components folder
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Navbar /> {/* Navbar Component will display on every page */}
      
      {/* Routes for different pages of the website.
        Task: Add category in the shop page and display products based on category.
      */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>

      <div className="App-header">
        <h1>Welcome to Easyshopper</h1>
        <p>Online Shopping Website</p>
      </div>

    </div>
  );
}

export default App;
