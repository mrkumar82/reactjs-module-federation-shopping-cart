import React from 'react';
import CartList from './CartList';

const Cart = ({ dispatch }) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log('cart page');
  return (
    <div className='container cart-page'>
      {cart.map((item) => (
        <CartList key={item.id} cart={item} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default Cart;
