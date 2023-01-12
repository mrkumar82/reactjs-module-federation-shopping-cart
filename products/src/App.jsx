import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import ProductList from './ProductList';

const App = () => (
  <div className='mt-10 text-3xl mx-auto max-w-6xl'>
    <div>Name: Products</div>
    <ProductList />
  </div>
);
ReactDOM.render(<App />, document.getElementById('app'));
