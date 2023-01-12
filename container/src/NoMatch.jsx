import React from 'react';
import { Link } from 'react-router-dom';
const NoMatch = () => {
  return (
    <div className='container'>
      <h2>Page not found</h2>
      <Link to='/'>Back to home</Link>
    </div>
  );
};

export default NoMatch;
