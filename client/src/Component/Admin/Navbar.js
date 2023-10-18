import React from 'react';
import '../Navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars,faCartShopping} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();
const handlelogout = ()=>{
  localStorage.removeItem('Book-Admin');
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
  <li><a      href='/Admin/Store'>
    Store
    </a>
  </li>
  <li><a      href='/Admin/AddBook'>
    Add Book
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