import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product, dispatch }) => {
  const { id, thumbnail, title, description, price } = product;
  const [productCount, setProductCount] = useState(0);

  const itemsInCart = JSON.parse(localStorage.getItem('cart')) || [];
  const quanity = itemsInCart.find((item) => item.id === id);

  const addtoCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setProductCount((prev) => prev + 1);
  };
  const removeFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product.id });
    setProductCount((prev) => (prev === 0 ? 0 : prev - 1));
  };
  return (
    <div className='item'>
      <div className='item-content'>
        <div className='img-wrap'>
          <Link to={`/product/${id}`}>
            <img width='220' src={thumbnail} alt={title} />
          </Link>
        </div>
        <div className='details'>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className='price-quantity'>
        <h2>$ {price} </h2>
        <div className='buttons prod'>
          <i
            className='bi bi-dash-lg'
            data-id={id}
            onClick={removeFromCart}
          ></i>
          <div data-qty='${qty}' className={`quantity-{id}`}>
            {quanity === undefined ? 0 : quanity.cartQuantity}
          </div>
          <i className='bi bi-plus-lg' data-id={id} onClick={addtoCart}></i>
        </div>
      </div>
    </div>
  );
};

export default Product;
