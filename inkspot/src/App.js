// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/home';
// import Login from './components/auth/login';
// import Signup from './components/auth/signup';
import ArtistProfile from './components/artist/artistProfile';
// import PortfolioUpload from './components/artist/portfolioUpload';
import Navbar from './components/common/navbar';

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" component={Home} />
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route path="/signup" component={Signup} /> */}
        <Route path="/artist/profile" component={ArtistProfile} />
        {/* <Route path="/artist/portfolio/upload" component={PortfolioUpload} /> */}
      </Routes>
    </Router>
  );
}

export default App;

