import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => (
  <>
    <nav>
      <Link to="/authorization"> Authorization Page </Link>
      <Link to="/main"> Main Page </Link>
      <Link to="/settings"> Settings Page </Link>
    </nav>
    <div>
      Main Page
    </div>
  </>
);

export default MainPage;
