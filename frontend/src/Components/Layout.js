import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import '../App.css';

function Layout({ children }) {
  return (
    <div className='App'>
      {/* <Navbar /> - Bug: This was causing the Navbar to render twice, creating a duplicate Navbar */}

      <main className='layout'>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
