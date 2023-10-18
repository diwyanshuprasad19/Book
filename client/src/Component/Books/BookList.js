import React, { useState,useEffect } from 'react';
import './BookList.css';
import  Axios  from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar, faStarHalfAlt as halfStar } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../Search.css';

function BookList() {

  const [data,setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('Book-User');
  const [buy,setbuy] = useState(-1);
  const [selectedOption, setSelectedOption] = useState('Title');
  const [value,setvalue] = useState('');
const[orignal,setorignal]=useState([]);


const [currentpage,setcurrentpage] = useState(1);

let itemperpage =8;
let startIndex = (currentpage - 1) * itemperpage;
let endIndex = startIndex + itemperpage;
let totalPages = Math.ceil(data.length / itemperpage);

const repeatedElements = Array.from({ length: totalPages }, (_, index) => (
  <button key={index} className={`page-button ${currentpage === index+1 ? 'active' :' '}`} onClick={() => handlePageChange(index+1)}
          disabled={currentpage === 1}>{index+1}</button>
));


const handlePageChange = (newPage) => {
  setcurrentpage(newPage);
};


  const handleSelectChange = (event) => {
    // Get the selected value from the event
    const selectedValue = event.target.value;
    // Update the state with the selected value
    setSelectedOption(selectedValue);
    setData(orignal);
    // Perform actions based on the selected value if needed
    console.log('Selected option:', selectedValue);
  };

  const handlesearch =()=>{
    setData(orignal);
    if(selectedOption === 'Title'){
      if(value === ''){
      setData(orignal);
      }
      else
      {
        let arr = data.filter(item => item.Title.toLowerCase().includes(value.toLowerCase()));
        setData(arr);
      }
    }
    else if(selectedOption === 'Author'){
      if(value === ''){
        setData(orignal);
        }
        else
        {
          let arr = data.filter(item => item.Author.toLowerCase().includes(value.toLowerCase()));
          setData(arr);
        }
    }
    else if(selectedOption === 'Genre'){
      if(value === ''){
        setData(orignal);
        }
        else
        {
          let arr = data.filter(item => item.Genre.toLowerCase().includes(value.toLowerCase()));
          setData(arr);
        }
    }
  }
  
  useEffect(() => {
    // Axios GET request inside the useEffect
    Axios.get('http://localhost:3001/GetBook')
        .then(response => {
            setData(response.data.books); // Update state with fetched data
            setorignal(response.data.books); // Update state with fetched data
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

{/*Search menu*/}
<div className="search-container">
  <input type="text" className="search-bar" placeholder="Dropdown for target search" onChange={(e)=>{setvalue(e.target.value)}}/>
  <button className="search-button" onClick={handlesearch}>Search</button>
  <div className="custom-select">
    <select className="select-tag" onChange={handleSelectChange}>
      <option value="Title">Title</option>
      <option value="Author">Author</option>
      <option value="Genre">Genre</option>
    </select>
  </div>
</div>






{/*Book Display*/}
   <div className='FeaturedList'>
<div className="tools">

</div>


<div className="products ">
  

{data.slice(startIndex,endIndex).map((item,index)=>{

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
<div className="product"  onClick={()=>{handledesc(item._id)}} key={index}>
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



<div className="pagination">
    <button className='page-button' onClick={() => handlePageChange(currentpage - 1)}
          disabled={currentpage === 1}>Prev</button>

{repeatedElements}

    <button 
className='page-button' onClick={() => handlePageChange(currentpage + 1)}
          disabled={currentpage === totalPages}>Next</button>
  </div>




   </>
  );
}

export default BookList;