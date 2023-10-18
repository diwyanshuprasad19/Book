import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

const handleshop =()=>{
  navigate('/Book');
}


  return (
   <>
<div className='herobody'>
<div className="hero-wrapper">
  <div className="overlay">
    <div className="hero-content">
      <h1>Online Book Store App</h1>
    <p>Bookshop, bookstore, reading haven, novel nook, literature hub,
         page paradise, story sanctuary, bibliophile's delight, literary emporium, tale treasure, booklover's dream, fiction corner.</p>
      <div class="btns">
        <button onClick={handleshop}>Shop now</button>
      </div>
  </div>
  </div>
  
</div>
    </div>
   </>
  );
}

export default Hero;