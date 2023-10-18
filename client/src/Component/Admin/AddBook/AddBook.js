import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import FormAdd from './FormAdd';
import { useNavigate } from 'react-router-dom';

function AddBook() {

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
<FormAdd/>
   </>
  );
}

export default AddBook;