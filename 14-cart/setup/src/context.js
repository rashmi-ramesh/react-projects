import React,{useState,useEffect,useReducer,useContext} from 'react';
import cartItems from './data';
import {reducer} from './reducer';

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  loading: false,
  cart: cartItems,
  total:0,
  amount:0,
}

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state,dispatch] = useReducer(reducer,initialState);

  const clearItems = () => {
    dispatch({type: 'CLEAR_ITEMS'});
  }

  const removeItem = (id) => {
    dispatch({type: 'REMOVE_ITEM',payload:id});
  }

  const increase = (id) => {
    dispatch({type: 'INCREASE',payload:id});
  }

  const decrease = (id) => {
    dispatch({type: 'DECREASE',payload:id});
  }

  const fetchData = async () => {
    dispatch({type: 'LOADING'});
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type: 'DISPLAY_ITEMS',payload:cart});
  }

  useEffect(()=>{
    fetchData();
  },[]);

  useEffect(()=>{
    dispatch({type: 'GET_TOTALS'});
  },[state.cart]);


  return (
    <AppContext.Provider value={{...state,clearItems,removeItem,increase,decrease}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export {AppContext,AppProvider};
