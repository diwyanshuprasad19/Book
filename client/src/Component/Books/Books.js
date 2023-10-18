import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import BookList from './BookList';
import { useNavigate } from 'react-router-dom';

function Books() {

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    marginBottom: '20px',
};

const buttonStyle = {
    cursor: 'pointer',
    padding: '8px 16px',
    margin: '0 5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
};

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
<BookList/>

   </>
  );
}

export default Books;