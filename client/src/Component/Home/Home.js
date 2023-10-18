import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import FeaturedList from './Featuredlist';
import Hero from './Hero';
import Contact from './Contact';
import { useNavigate } from 'react-router-dom';


function Home() {

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif', // Replace 'Arial' with your desired font family
    margin:'10px 0px 0px 0px',
  };
  
  const textStyle = {
    fontSize: '36px', // Adjust the font size as needed
    position: 'relative',
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
<Hero/>

<div style={containerStyle}>
      <div style={textStyle}>
            Featured
      </div>
    </div>




<FeaturedList/>
<Contact/>

   </>
  );
}

export default Home;