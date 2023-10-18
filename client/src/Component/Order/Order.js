import React, { useState,useEffect } from 'react';
import Navbar from '../Navbar';
import OrderList from './OrderList';
import './Order.css';
import { useNavigate } from 'react-router-dom';

function Order() {


  const navigate = useNavigate();

  useEffect(() => {
  let token = localStorage.getItem('Book-User');
   if(!token){
   navigate('/');
   }
  }, []);
  



  return (
   <>
<Navbar/>
<OrderList/>
   </>
  );
}

export default Order;