import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import './Store.css';
import StoreList from './StoreList';
import { useNavigate } from 'react-router-dom';

function Store() {
  
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('Book-Admin');
     if(!token){
     navigate('/');
     }
    }, []);


  return (
   <>
<Navbar/>
<StoreList/> 
   </>
  );
}

export default Store;