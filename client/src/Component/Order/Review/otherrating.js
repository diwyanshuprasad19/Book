import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar, faStarHalfAlt as halfStar } from '@fortawesome/free-regular-svg-icons';
import './review.css';
import  Axios  from 'axios';




const Otherrating =(props)=>{

  const token = localStorage.getItem('Book-User');
  const [data,setData] = useState([]);


  useEffect(() => {
    // Axios GET request inside the useEffect
    Axios.post('http://localhost:3001/OtherRating',{
      token:token,
      author:props.author,
      title:props.title,
    })
        .then(response => {
            setData(response.data.items); // Update state with fetched data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  }, );

  return (
    <>

      
<form className="review-form" >


{data.map((item,index)=>{


const date = new Date(item.createdAt);

const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (months are 0-based) and pad with leading zero if necessary
const year = date.getFullYear();

const formattedDate = `${day}-${month}-${year}`;



  return(
<div key={index}>
  
<div className="rating">
  {item.Rating>=1 && <FontAwesomeIcon  icon={solidStar} className='stargolden' />} 
  {item.Rating>=2 && <FontAwesomeIcon  icon={solidStar}  className='stargolden'/>} 
  {item.Rating>=3 && <FontAwesomeIcon  icon={solidStar} className='stargolden' />} 
  {item.Rating>=4 && <FontAwesomeIcon  icon={solidStar} className='stargolden' />} 
  {item.Rating>=5 && <FontAwesomeIcon  icon={solidStar} className='stargolden'/>} 



  {item.Rating<1 && <FontAwesomeIcon icon={regularStar} className='stargolden' />} 
  {item.Rating<2 && <FontAwesomeIcon icon={regularStar} className='stargolden' />} 
  {item.Rating<3 && <FontAwesomeIcon icon={regularStar}  className='stargolden'/>} 
  {item.Rating<4 && <FontAwesomeIcon icon={regularStar} className='stargolden' />} 
  {item.Rating<5 && <FontAwesomeIcon icon={regularStar}  className='stargolden'/>} 

  </div>

  <div className="desccont">
        <div className="description">
           {formattedDate}
        </div>
        <div className="name1">
            {item.Email}
        </div>
        <div className="name">
            {item.Review}
        </div>
    </div>

</div>
  )
})}




</form>




    </>
  );
}

export default Otherrating;