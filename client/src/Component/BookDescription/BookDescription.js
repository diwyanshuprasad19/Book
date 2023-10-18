import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Description from './Description';
import { useNavigate } from 'react-router-dom';


function BookDescription() {

  
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
<Description/>

   </>
  );
}

export default BookDescription;