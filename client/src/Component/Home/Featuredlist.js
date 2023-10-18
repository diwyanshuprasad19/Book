import React, { useState,useEffect } from 'react';
import './Featuredlist.css';
import  Axios  from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar, faStarHalfAlt as halfStar } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

function FeaturedList() {
const [data,setData] = useState([]);
const navigate = useNavigate();
const token = localStorage.getItem('Book-User');
const [buy,setbuy] = useState(-1);




useEffect(() => {
  // Axios GET request inside the useEffect
  Axios.get('http://localhost:3001/GetBook')
      .then(response => {
          setData(response.data.books); // Update state with fetched data
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}, );


const handledesc = (id)=>{
navigate('/Description/'+id);
}



const handlebuy =(e,id,index)=>{
e.stopPropagation();

Axios.post('http://localhost:3001/BuyNow',{
  id:id,
  token:token,
})
.then(response => {
   if(response.data.type ==='success'){
    console.log('success');
    setbuy(index);
    setTimeout(() => {
      setbuy(-1);
    }, 1000);
   }

})
.catch(error => {
    console.error('Error fetching data:', error);
});


}

  return (
   <>
   <div className='FeaturedList'>
<div className="tools">

</div>


<div className="products ">


  {data.slice(0,4).map((item,index)=>{

let ratingscore = Math.floor(((item.rate *2)));
let fullstarfilled = parseInt(ratingscore/2);
let halfstarfilled = parseInt(ratingscore%2);
let emptystarfilled = parseInt((10-ratingscore)/2);
let elements =[];

for (let i = 0; i <fullstarfilled; i++) {
  elements.push( <FontAwesomeIcon  icon={solidStar} className="star-icon" />);
}
for (let j = 0; j < halfstarfilled; j++) {
  elements.push(<FontAwesomeIcon  icon={halfStar} className="star-icon" />);
}
for (let k = 0; k < emptystarfilled; k++) {
  elements.push( <FontAwesomeIcon icon={regularStar} className="star-icon"  />);
}


    return(
<div className="product" key={index} onClick={()=>{handledesc(item._id)}}>
    <div className="product-img">
      <img src={item.Image}/>
    </div>
    <div className="product-content">
      <h3>
       {item.Title}
        <small>{item.Author}</small>
        <small>{item.Genre}</small>
      </h3>
      <p className="product-text price">₹{item.Price}</p><br/>
      <div className='starhome'>
          {elements}
          ({item.rate} )
      </div><br/>
      
      <button className='product-text genre' onClick={(e)=>{handlebuy(e,item._id,index)}}> {buy === index ? <p>Bought</p>:<p>Buy Now</p>}</button>
      
    </div>
  </div>
    )
  })}
  
 
</div>
</div>



   </>
  );
}

export default FeaturedList;