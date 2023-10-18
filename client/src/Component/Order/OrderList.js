import React, { useState,useEffect } from 'react';
import './OrderList.css';
import  Axios  from 'axios';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { bindActionCreators } from 'redux';
import { reviewCreators } from '../../redux';



function OrderList() {

  const [data,setData] = useState([]);
  const token = localStorage.getItem('Book-User');


const dispatch = useDispatch();
const {reviewstore} = bindActionCreators(reviewCreators,dispatch);


const navigate = useNavigate();


  useEffect(() => {
    // Axios GET request inside the useEffect
    Axios.post('http://localhost:3001/CartShowOrder',{
      token:token,
    })
        .then(response => {
            setData(response.data.Cart); // Update state with fetched data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  }, );
  
const handlereview =(Title,Author)=>{
const obj ={
  Title:Title,
  Author:Author,
}
  reviewstore(obj);

  navigate('/Review');

}

const handleinvoice =(id)=>{
  navigate('/Invoice/'+id);
}



  return (
   <>
<div className='midorderhishead'>
  Order History
</div>



{data.length === 0 &&
  <div className='bodyemptycart'>
      <div className="cart-container">
      <div className="bigger-text">
      Looks like your cart is on a diet – it's empty!
      </div>
      <div className="smaller-text">
      Your cart is as empty as a magician's hat after a rabbit show.<br/>
       No groceries here, but don't worry, we've got shelves full of goodies waiting for you to pick and pack.
      </div>
      <div className="smaller-text">
      Let's fill this cart with Bookish adventures! 🛒📚📖.
      </div>
    </div>
    </div>
}

{data.map((item,index)=>{

  return(
<div className='bodyroworder'>
<div className='orderhistorybody'>
                <div className="order-info">
                    <p><strong>Order ID:</strong> {item.OrderId}</p>
                    <p><strong>Title:</strong> {item.Title}</p>
                    <p><strong>Author:</strong>{item.Author}</p>
                    <p><strong>Genre : </strong>{item.Genre}</p>
                    <p><strong>Total Price:</strong>₹{item.Price * item.Count}({item.Count} Items) </p>
                </div>
                <img className="order-image" src={item.Image} alt={item.Title} height='200' />
</div>


<div className='coltwo'>
<button className='button' onClick={()=>{handlereview(item.Title,item.Author)}}>Review</button>
<button className='button' onClick={()=>{handleinvoice(item._id)}}>Invoice</button>
</div>

</div>
  )
})}



   </>
  );
}

export default OrderList;