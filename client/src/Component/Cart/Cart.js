import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import AllBuy from './allbuy';
import { useNavigate } from 'react-router-dom';
function Cart() {


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
<AllBuy/>

   </>
  );
}

export default Cart;