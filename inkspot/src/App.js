// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/home';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import ArtistProfile from './components/artist/artistProfile';
// import PortfolioUpload from './components/artist/portfolioUpload';
import Navbar from './components/common/navbar';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/artist/profile" element={<ArtistProfile />} />
        {/* <Route path="/artist/portfolio/upload" component={PortfolioUpload} /> */}
      </Routes>
    </Router>
  );
}

export default App;

