import React, { useState,useEffect } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faCartShopping} from "@fortawesome/free-solid-svg-icons";
import  Axios  from 'axios';
import { useNavigate } from 'react-router-dom';


function Navbar() {


  const [data,setData] = useState([]);
  const token = localStorage.getItem('Book-User');


  useEffect(() => {
    // Axios GET request inside the useEffect
    Axios.post('http://localhost:3001/CartShow',{
      token:token,
    })
        .then(response => {
            setData(response.data.Cart);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  }, );

  const total = data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.Count;
  }, 0);

  const navigate = useNavigate();
const handlelogout = ()=>{
  localStorage.removeItem('Book-User');
navigate('/');
}


  return (
    <>
    <div className='navbody'>
    <div className='navcontainer'>
   
<nav>
 <input type='checkbox' id='check'/>
 <label htmlFor="check" className='checkbtn'>
  <FontAwesomeIcon icon={faBars} />
  </label>
   
<label className='logo'>
 Store
</label>

<ul>
  <li><a      href='/Home'>
    Home
    </a>
  </li>
  <li><a      href='/Book'>
    Books
    </a>
  </li>
  <li>
  <a   href='/Cart'>
  <label><FontAwesomeIcon icon={faCartShopping} /></label><span className="count" style={{'background':'white','padding':'5px','borderRadius':'50%','marginLeft':'5px','color':'black',}}>{total}</span>
    </a>
  </li>
  <li><a     href='/Order'>
    Orders
    </a>
  </li>
  <li><a      href='#' onClick={handlelogout}>
    Logout
    </a>
  </li>
</ul>
</nav>
</div>
</div>
    </>
  );
}

export default Navbar;