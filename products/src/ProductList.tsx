import React, { useEffect, useState } from 'react';
import Product from './Product';

import './index.scss';

const ProductList = ({ dispatch }) => {
  const [data, setData] = useState([]);
  const fetchProducts = async () => {
    const resp = await fetch('https://dummyjson.com/products');
    const data = await resp.json();
    setData(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!data.length) return <div className='container'>Loading...</div>;

  return (
    <div className='container'>
      <div className='product-list'>
        {data &&
          data.map((product) => (
            <Product key={product.id} product={product} dispatch={dispatch} />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
