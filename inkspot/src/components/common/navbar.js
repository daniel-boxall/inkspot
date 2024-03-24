import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/artist/profile">Artist Profile</Link>
        </li>
        <li>
          <Link to="/artist/portfolio/upload">Portfolio Upload</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;