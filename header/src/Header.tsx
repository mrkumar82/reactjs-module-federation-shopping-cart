import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ state }) => {
  const cartStorage = JSON.parse(localStorage.getItem('cart')) || [];
  console.log('cartStorage', cartStorage);
  const totalQuantity = () => {
    return cartStorage
      .map((item) => item.cartQuantity)
      .reduce((acc, value) => acc + value, 0);
  };
  return (
    <div className='navbar'>
      <Link to='/'>
        <h2>Spray & Cream</h2>
        <p>React js module federation shopping cart app</p>
      </Link>

      <Link to='/cart' className='show-cart'>
        <i className='bi bi-cart2'></i>
        <div id='cartAmount' className='cartAmount'>
          {totalQuantity()}
        </div>
      </Link>
    </div>
  );
};

export default Header;
