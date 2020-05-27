import React from 'react';
import './Navbar.css'

const Navbar = ({ routeChange }) => {
  return (
    <div className="Navbar">
      <h1>Guest Book App</h1>
      <div className="NavLinks">
        <p onClick={() => routeChange('home')}>Home</p>
        <p onClick={() => routeChange('newPost')}>Add New Post</p>
        <p onClick={() => routeChange('signin')}>Signout</p>
      </div>
    </div>
  );
};

export default Navbar;
