import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './components/Register';
import Home from './components/Home'; 
import Products from './components/Products';
import Login from './components/Login';
import Nav from './components/Nav';
import Cart from './components/Cart';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="App">
        <div className="container">
        <Nav isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout}/>
        <div className="content">
          <Routes>
              <Route path="/" element={<Home />} /> 
              <Route path="/register" element={<Register/>}/>
              <Route path="/products" element={<Products userId={user?.id} />}/>
              <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
              <Route path="/cart" element={<Cart userId={user?.id} />} />
          </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;
