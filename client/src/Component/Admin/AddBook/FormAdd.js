import React, { useState } from 'react';
import './FormAdd.css';
import Axios from 'axios';


function FormAdd() {

const [image,setimage] = useState('');
const [title,settitle] = useState('');
const [desc,setdesc] = useState('');
const [author,setauthor] = useState('');
const [genre,setgenre] = useState('Horror');
const [lang,setlang] = useState('');
const [pcount,setpcount] = useState(1);
const [price,setprice] = useState(1);
const [error,seterror] = useState('');
const [succ,setsucc] = useState('');



const paragraphStyle = {
  textAlign: 'center', // Center the text horizontally
  backgroundColor: 'red', // Set the background color to red
  color: 'black', // Set the text color to white
  padding: '0.5rem', // Add padding of 0.5rem to all sides
  margin: '1rem', // Add a margin of 1rem to all sides
};

const paragraphStyle1 = {
  textAlign: 'center', // Center the text horizontally
  backgroundColor: 'green', // Set the background color to red
  color: 'black', // Set the text color to white
  padding: '0.5rem', // Add padding of 0.5rem to all sides
  margin: '1rem', // Add a margin of 1rem to all sides
};



const handleSelectChange = (event) => {
  const selectedValue = event.target.value;
  setgenre(selectedValue);

};


const handlesubbook =(e)=>{
e.preventDefault();

Axios.post('http://localhost:3001/AddBook',{
image:image,
title:title,
desc:desc,
author:author,
genre:genre,
lang:lang,
pcount:pcount,
price:price,
  }).then(res =>{
    if(res.data.type === 'success')
    {
  console.log('Success');
  setsucc('New Book Created');
  setTimeout(() => {
    setsucc('');
  }, 2000);
    }
    else if(res.data.type === 'validation')
     {
      seterror(res.data.errors[0].msg);
      setTimeout(() => {
        seterror('');
      }, 2000);
     }
     else if(res.data.type === 'book')
     {
      seterror(res.data.errors);
      setTimeout(() => {
        seterror('');
      }, 2000);
     }

  }).catch(error =>{
    console.log(error);
  });

}



  return (
   <>
<div className='formaddbody'>

<div className="form-container">
      <h2>Book Form</h2>
      <form onSubmit={handlesubbook}>
      {error && <p style={paragraphStyle}>{error}</p>}
      {succ && <p style={paragraphStyle1}>{succ}</p>}
        <div className="form-group">
          <label>Book Image:</label>
          <input
            type="text"
            name="image"
            placeholder="URL of the book image"
            onChange={(e)=>{setimage(e.target.value)}}
            required
          />
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title"  onChange={(e)=>{settitle(e.target.value)}} required/>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            rows="6"
            placeholder="Description of the book..."
            onChange={(e)=>{setdesc(e.target.value)}}
            required
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input type="text" name="author"  onChange={(e)=>{setauthor(e.target.value)}} required/>
        </div>
        <div className="form-group">
          <label>Genre:</label>
          <select onChange={handleSelectChange}>
                    <option value="Thriller">Thriller</option>
                    <option value="Horror">Horror</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Action">Action</option>
                </select>
        </div>
        <div className="form-group">
          <label>Language:</label>
          <input type="text" name="lang" onChange={(e)=>{setlang(e.target.value)}} required/>
        </div>
        <div className="form-group">
          <label>Page Count:</label>
          <input type="number" name="author" min='1' onChange={(e)=>{setpcount(e.target.value)}} required/>
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price"  min='1' onChange={(e)=>{setprice(e.target.value)}} required/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>


</div>
   </>
  );
}

export default FormAdd;