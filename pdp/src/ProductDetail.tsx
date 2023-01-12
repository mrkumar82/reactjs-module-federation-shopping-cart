import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './index.scss';

const ProductDetail = ({ dispatch }) => {
  const { id } = useParams();
  const [detail, setDetail] = useState();
  const localstorageCart = JSON.parse(localStorage.getItem('cart'));

  const fetchDetail = async () => {
    const resp = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await resp.json();
    setDetail(data);
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const addtoCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: detail });
  };
  const removeFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: detail.id });
  };

  if (!detail) return <div className='container'>Loading...</div>;

  const { thumbnail, title, description, price } = detail;
  const quantity = localstorageCart.find((item) => item.id === detail.id);

  return (
    <div className='container p-detail'>
      <div className='item'>
        <div className='item-content'>
          <div className='img-wrap'>
            <img src={thumbnail} alt={title} />
          </div>
          <div className='details'>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className='price-quantity mt-4'>
              <h2>Price : $ {price} </h2>
              <div className='buttons prod'>
                <i className='bi bi-dash-lg' onClick={removeFromCart}></i>
                <div data-qty='${qty}' className={`quantity-{id}`}>
                  {quantity === undefined ? 0 : quantity.cartQuantity}
                </div>
                <i className='bi bi-plus-lg' onClick={addtoCart}></i>
              </div>

              <button
                type='button'
                className='mt-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
                onClick={addtoCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
