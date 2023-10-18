import React, { useState,useEffect } from 'react';
import './review.css';
import { useSelector } from 'react-redux';
import Navbar from '../../Navbar';
import Otherrating from './otherrating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar, faStarHalfAlt as halfStar } from '@fortawesome/free-regular-svg-icons';
import Axios  from 'axios';
import { useNavigate } from 'react-router-dom';



function Review() {


  const review = useSelector((state) => state.review);
  const [rate,setrate] = useState(1);
 const [desc,setdesc] = useState('');
 const [already,setalready] = useState(false);
 const [sub,setsub] = useState(false);
 const token = localStorage.getItem('Book-User');
 const [error123,seterror123] = useState('');


 const navigate = useNavigate();

 useEffect(() => {
 let token = localStorage.getItem('Book-User');
  if(!token){
  navigate('/');
  }
 }, []);


const handlesubmit = (event)=>{
  event.preventDefault();
  event.stopPropagation();

  Axios.post('http://localhost:3001/ReviewSave',{
        token:token,
       title:review.Title,
       author:review.Author,
        desc:desc,
        rate:rate,
       }).then(res=>{
         if(res.data.type ==='Success')
         {
          console.log('Success');
          setsub(true);
           setTimeout(() => {
            setsub(false);
           }, 2000);

         }
         else if(res.data.type ==='Already reviewed')
         {
          setalready(true);
          setTimeout(() => {
           setalready(false);
          }, 2000);
         }
       else if(res.data.type ==='error')
       {
            seterror123(res.data.errors);
       }
    }).catch(err =>{
     console.log(err);
    });
  
  }


  return (
   <>
<Navbar/>



<div className="containerreview">
<form className="review-form" onSubmit={handlesubmit}>
  <h2>Write Your Review</h2>
  <div className="rating">
  {rate>=1 && <FontAwesomeIcon  icon={solidStar} className='stargolden' onClick={(e)=>{setrate(1)}}/>} 
  {rate>=2 && <FontAwesomeIcon  icon={solidStar} className='stargolden' onClick={(e)=>{setrate(2)}} />} 
  {rate>=3 && <FontAwesomeIcon  icon={solidStar} className='stargolden' onClick={(e)=>{setrate(3)}} />} 
  {rate>=4 && <FontAwesomeIcon  icon={solidStar} className='stargolden' onClick={(e)=>{setrate(4)}}/>} 
  {rate>=5 && <FontAwesomeIcon  icon={solidStar} className='stargolden' onClick={(e)=>{setrate(5)}}/>} 



  {rate<1 && <FontAwesomeIcon icon={regularStar} className='stargolden' onClick={(e)=>{setrate(1)}}/>} 
  {rate<2 && <FontAwesomeIcon icon={regularStar} className='stargolden' onClick={(e)=>{setrate(2)}}/>} 
  {rate<3 && <FontAwesomeIcon icon={regularStar} className='stargolden' onClick={(e)=>{setrate(3)}}/>} 
  {rate<4 && <FontAwesomeIcon icon={regularStar} className='stargolden' onClick={(e)=>{setrate(4)}}/>} 
  {rate<5 && <FontAwesomeIcon icon={regularStar} className='stargolden' onClick={(e)=>{setrate(5)}}/>} 

  </div>
  <span  className="help-block">
    Click on a star to change your rating 1 - 5, where 5 = great! and 1 = really bad
  </span>
  <div className="form-group">
    <label className="control-label" for="review">Your Review:</label>
    <textarea className="form-control" rows="10" placeholder="Your Reivew" name="review" onChange={(e)=>{setdesc(e.target.value)}}></textarea>
    <span  className="help-block pull-right">
      {sub &&<span style={{'color':'green','fontSize':'200'}}>Review Successfully Submitted</span>}
      {already &&<span style={{'color':'red','fontSize':'200'}}>Already Reviewed This product </span>}
    </span>
  </div>
  <button  className="btn btn-primary" >Submit</button>
  <span  className="help-block">
    By clicking <strong>Submit</strong>, I authorize the sharing of my name and review on the web. (email will not be shared)
  </span>
</form>
<h2>Read what others have said about us:</h2>
<div className="review-container">
    <Otherrating title={review.Title} author={review.Author}/>
</div>
</div>




   </>
  );
}

export default Review;