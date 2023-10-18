import React, { useState,useEffect } from 'react';
import './Description.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar,faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar, faStarHalfAlt as halfStar } from '@fortawesome/free-regular-svg-icons';
import { useParams } from 'react-router-dom';
import  Axios  from 'axios';




function Description() {

const [data,setData]=useState([]);
const {id}= useParams();
const[count,setcount]= useState(1);
const token = localStorage.getItem('Book-User');


useEffect(() => {
  // Axios GET request inside the useEffect
  Axios.post('http://localhost:3001/BookDescription',{
    id:id,
  })
      .then(response => {
        console.log(response.data.description);
          setData(response.data.description); 
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}, );



const handleadd = (id,count)=>{

  if(count <=0){
 console.log('Put positive number');
  }
  else{
    Axios.post('http://localhost:3001/AddToCart',{
      id:id,
      count:count,
      token:token,
    })
        .then(response => {
        console.log('success');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  }


}



  return (
   <>



{data.map((item,index)=>{


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
  <div className='descriptionbody' key={index}>
  <div className = "card-wrapper">
    <div className = "card">
      <div className = "product-imgs">
        <div className = "img-display">
          <div className = "img-showcase">
            <img src = {item.Image} alt = {item.Title}/>
           
          </div>
        </div>
      </div>
      <div className = "product-content">
  
        <div className = "product-detail">
          <h2>About This Book: </h2>
          <p>{item.Description}</p>
  
          <div className = "product-rating">
             {elements}
          <span>{item.rate}({item.ratecount})</span>
        </div>
          <ul>
            <li>Title: <span>{item.Title}</span></li>
            <li>Author: <span>{item.Author}</span></li>
            <li>Price: <span>₹{item.Price}</span></li>
            <li>Language: <span>{item.Language}</span></li>
            <li>Page Count: <span>{item.Pagecount}</span></li>
          </ul>
        </div>
  
        <div className = "purchase-info">
          <input type = "number" min = "1"   onClick={(e)=>{setcount(e.target.value)}}/>
          <button type = "button" className = "btn" onClick={()=>{handleadd(item._id,count)}}>
            Add to Cart <FontAwesomeIcon icon={faCartShopping}  />
          </button>
        </div>
  
      
      </div>
    </div>
  </div>
  </div>)

})}
   </>
  );
}

export default Description;