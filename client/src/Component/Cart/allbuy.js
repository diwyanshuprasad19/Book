import React, { useState,useEffect } from 'react';
import './allbuy.css';
import  Axios  from 'axios';
import {  useNavigate } from 'react-router-dom';

function AllBuy() {

const [data,setData] = useState([]);
const token = localStorage.getItem('Book-User');
const [pop,setpop] = useState(false);
const navigate = useNavigate();


useEffect(() => {
  // Axios GET request inside the useEffect
  Axios.post('http://localhost:3001/CartShow',{
    token:token,
  })
      .then(response => {
          setData(response.data.Cart); // Update state with fetched data
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}, );


const handledelete =(id)=>{

  Axios.post('http://localhost:3001/CartDelete',{
    id:id,
    token:token,
  })
      .then(response => {
          console.log('success');
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });

}


const handlebutton =(id,value,count)=>{


  if(count === 1 && value === -1)
  {
  console.log('Exceed');
  }
  else
  {
    Axios.post('http://localhost:3001/CartButton',{
      id:id,
      token:token,
      value:value,
    })
        .then(response => {
            console.log('success');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  
  }
 
}

const handlecross =()=>{
  setpop(false);
}

const handleClick = (event) => {
  // Prevent the default behavior of the link (e.g., navigating to a new page)
  event.preventDefault();
  // Stop the event from bubbling up the DOM tree
  event.stopPropagation();
setpop(true);

};


const totalItemCount = data.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.Count;
}, 0);

const totalItemCost = data.reduce((accumulator, currentValue) => {
  return accumulator + (currentValue.Count*currentValue.Price);
}, 0);


const handlebuy = ()=>{
  Axios.post('http://localhost:3001/CartBuy',{
    token:token,
  })
      .then(response => {
        if(response.data.type === 'success'){
          navigate('/Order');
          console.log('success');
        }
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });

}



  return (
   <>
<div className='storebody'>


<div className="shopping-cart">

      <div className="title">
        Shopping Bag
      </div>





{data.map((item,index)=>{

  return(

    <div className="item" key={index}>
    <div className="buttons" >
      <span className="delete-btn" onClick={()=>{handledelete(item._id)}}></span>
    </div>

    <div className="image">
      <img src={item.Image} alt={item.Title} className='imgphoto'/>
    </div>

    <div className="description">
      <span>{item.Title}</span>
      <span style={{'color':'silver',}}>{item.Author}</span>
      <span>{item.Genre}</span>
    </div>

    <div className="quantity">
      <button className="plus-btn" type="button" name="button" onClick={()=>{handlebutton(item._id,1,item.Count)}}>
        <img src="https://designmodo.com/demo/shopping-cart/plus.svg" alt="" />
      </button>
      <input type="text" name="name" value={item.Count} />
      <button className="minus-btn" type="button" name="button" onClick={()=>{handlebutton(item._id,-1,item.Count)}}>
        <img src="https://designmodo.com/demo/shopping-cart/minus.svg" alt="" />
      </button>
    </div>

    <div className="total-price">₹{item.Price * item.Count}({item.Count} Items)</div>
  </div>

  )
})}
  
    </div>
</div>


{data.length ===0 && 
      <div className='bodyemptycart'>
      <div className="cart-container">
      <div className="bigger-text">
        Your Shopping Cart is empty.
      </div>
      <div className="smaller-text">
      Discover your next great read at our bookshop! Browse through a diverse selection of titles, from bestsellers to hidden gems.
      </div>
      <div className="smaller-text">
        Continue shopping on the Publix.in homepage, learn about today's deals, and enjoy shopping.
      </div>
    </div>
    </div>
      }  



{data.length >0 &&
  <div className='checkout'>


<div className="coupon-container">
      <input
        type="text"
        placeholder="Enter coupon code"
        className="coupon-input" // Apply the CSS class for styling the input field
      />
      <button  className="apply-button">Apply Coupon</button>
    </div>
<div className='check'>
<ul>
                <li class="subtotal">Items 
                    <span>{totalItemCount}</span>
                </li>
                <li class="cart-total">Total
                <span>₹ {totalItemCost}</span></li>
            </ul>
            <a href="#"class="proceed-btn" onClick={handleClick}>Proceed to Checkout</a>
</div>


</div>
}





{pop && <div className='containerpop'><div className={`custom-model-main ${pop ? 'model-open' : ''}`}>
    <div className="custom-model-inner">        
    <div className="close-btn" onClick={handlecross}>×</div>
        <div className="custom-model-wrap">
            <div className="pop-up-content-wrap">


{/* inner content*/}
<div className="dialog">
          <p>Do you really want to proceed?</p>
          <button className="confirm-button" onClick={handlebuy}>
            Confirm Buy
          </button>
          <button className="cancel-button" onClick={handlecross}>
            Cancel
          </button>
        </div>






            </div>
        </div>    
    </div>  
    <div className="bg-overlay"></div>
</div>
</div>}


   </>
  );
}

export default AllBuy;