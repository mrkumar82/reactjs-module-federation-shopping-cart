import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import RemoteProducts from 'products/ProductsList';
import RemoteHeader from 'header/Header';
import RemoteFooter from 'header/Footer';
import NoMatch from './NoMatch';
import { useStore, ContextStore } from 'store/ContextStore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';

const CartComponent = lazy(() => import('cart/Cart'));
const ProductDetail = lazy(() => import('pdp/Pdp'));
const App = () => {
  const [state, dispatch] = useStore();

  return (
    <div className='text-3xl mx-auto max-w-12xl'>
      <BrowserRouter>
        <RemoteHeader state={state} />
        <Routes>
          <Route
            path='/'
            element={<RemoteProducts state={state} dispatch={dispatch} />}
          />
          <Route path='/cart' element={<CartComponent dispatch={dispatch} />} />
          <Route
            path='/product/:id'
            element={<ProductDetail dispatch={dispatch} />}
          />
          <Route path='*' element={<NoMatch />} />
        </Routes>
        <RemoteFooter />
      </BrowserRouter>
    </div>
  );
};
ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <ContextStore>
      <App />
    </ContextStore>
  </Suspense>,
  document.getElementById('app')
);
