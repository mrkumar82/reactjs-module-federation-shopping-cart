import React, { useState } from 'react';

const CartList = ({ cart, dispatch }) => {
  const { thumbnail, title, description, price, id, cartQuantity } = cart;

  const [productCount, setProductCount] = useState(0);
  const addtoCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: cart });
    setProductCount((prev) => prev + 1);
  };
  const removeFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    setProductCount((prev) => (prev === 0 ? 0 : prev - 1));
  };

  return (
    <div className='item'>
      <div className='item-content'>
        <div className='img-wrap'>
          <img src={thumbnail} alt={title} />
        </div>
        <div className='details'>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <div className='price-quantity'>
          <h2>$ {price * cartQuantity} </h2>
          <div className='buttons prod'>
            <i
              className='bi bi-dash-lg'
              data-id={id}
              onClick={removeFromCart}
            ></i>
            <div data-qty='${qty}' className={`quantity-{id}`}>
              {cartQuantity}
            </div>
            <i className='bi bi-plus-lg' data-id={id} onClick={addtoCart}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
