import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  cart: [],
  cartTotalQuantity: 0,
};

const globalContext = createContext();

const reducer = (state, action) => {
  if (action.type === 'ADD_TO_CART') {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemInCart = cartItems.findIndex(
      (item) => item.id === action.payload.id
    );

    if (itemInCart >= 0) {
      cartItems[itemInCart].cartQuantity += 1;
      localStorage.setItem('cart', JSON.stringify(cartItems));
      return { ...state, cart: [...cartItems] };
    }
    const tempProduct = { ...action.payload, cartQuantity: 1 };
    cartItems.push(tempProduct);

    localStorage.setItem('cart', JSON.stringify(cartItems));
    return { ...state, cart: [...cartItems] };
  }

  if (action.type === 'REMOVE_FROM_CART') {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (
      cartItems?.find((item) => item.id === action.payload)?.cartQuantity === 1
    ) {
      const cartRemaining = cartItems?.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem('cart', JSON.stringify(cartRemaining));
      return { ...state, cart: [...cartRemaining] };
    } else {
      const remainingItems = cartItems?.map((item) => {
        if (item.id === action.payload) {
          return { ...item, cartQuantity: item.cartQuantity - 1 };
        } else {
          return item;
        }
      });
      localStorage.setItem('cart', JSON.stringify(remainingItems));
      return { ...state, cart: [...remainingItems] };
    }
  }
  return state;
};

export const ContextStore = ({ children }) => {
  const value = useReducer(reducer, initialState);

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
};

export const useStore = () => {
  return useContext(globalContext);
};
