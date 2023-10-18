import React,{useState,useEffect} from 'react';
import './StoreList.css';
import  Axios  from 'axios';
import {useNavigate} from 'react-router-dom';
import './Edit.css';




function StoreList() {

  const [data, setData] = useState([]);
const [search,setsearch]= useState('');
const [click,setclick]= useState('');
const[pop,setpop]  = useState(false);
const navigate = useNavigate();


const [editid,seteditid] = useState('');
const [image,setimage] = useState('');
const [title,settitle] = useState('');
const [desc,setdesc] = useState('');
const [author,setauthor] = useState('');
const [genre,setgenre] = useState('');
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




  useEffect(() => {
//Login user can only access it.
      // Axios GET request inside the useEffect
      Axios.get('http://localhost:3001/GetBook')
          .then(response => {
              setData(response.data.books); // Update state with fetched data
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }, );



const handledelete =(id)=>{
      //post to delete item
      
Axios.post('http://localhost:3001/DeleteBook',{
id:id,
    })
          .then(response => {
              console.log('success');
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
}

const handleedit =(item)=>{

seteditid(item._id);
setimage(item.Image);
settitle(item.Title);
setdesc(item.Description);
setauthor(item.Author);
setgenre(item.Genre);
setlang(item.Language);
setprice(item.Price);
setpcount(item.Pagecount);
setpop(true);


}

const handlecross =()=>{
  setpop(false);
}

const handleclick =(value)=>{
  setsearch(value);
}

const handleupdate =(e)=>{
e.preventDefault();

Axios.post('http://localhost:3001/UpdateBook',{
id:editid,
image:image,
title:title,
author:author,
desc:desc,
genre:genre,
lang:lang,
pcount:pcount,
price:price,
    })
           .then(res => {
            if(res.data.type === 'success')
            {
          console.log('Success');
          setsucc('Book Updated');
          setTimeout(() => {
            setsucc('');
            navigate('/Admin/Store');
            setpop(false);
          }, 1000);
            }
            else if(res.data.type === 'validation')
             {
              seterror(res.data.errors[0].msg);
              setTimeout(() => {
                seterror('');
              }, 2000);
             }
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });

}



  return (
   <>



<div className='searchbody'>
<div className="container">
            <div className="search-container">
                <input type="text" className="search-bar" placeholder="Search by Title" onChange={(e)=>{setclick(e.target.value)}}/>
                <button className="search-button" onClick={()=>{handleclick(click)}}>Search</button>
    </div>
</div>
</div>




<div className='bodytablebook'>

<div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>SN No</th>
            <th >Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Genre(Page Count)</th>
            <th>Language</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.filter(item=>item.Title.toLowerCase().includes(search)).map((item, index) => (
            <tr key={index} className='bottomstore'>
              <td>{index + 1}</td>
              <td className='midimgstore'>      <img
        src={item.Image}
        alt={index+1}
        style={{ width: 100, height: 120 }}
      /><br/>
                {item.Title}</td>
              <td className="description-cell">{item.Description}</td>
              <td>{item.Author}</td>
              <td>{item.Genre}({item.Pagecount})</td>
              <td>{item.Language}</td>
              <td>₹{item.Price}</td>
              <td>
              <button onClick={()=>{handleedit(item)}}>Edit</button>
              <button onClick={()=>{handledelete(item._id)}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</div>



{pop && <div className='containerpop'><div className={`custom-model-main ${pop ? 'model-open' : ''}`}>
    <div className="custom-model-inner">        
    <div className="close-btn" onClick={handlecross}>×</div>
        <div className="custom-model-wrap">
            <div className="pop-up-content-wrap">


{/* inner content*/}

<form  onSubmit={handleupdate}>
{error && <p style={paragraphStyle}>{error}</p>}
{succ && <p style={paragraphStyle1}>{succ}</p>}
      <div>
        <label>Book Image:</label>
        <input type="text" name="bookImage" value={image}  onChange={(e)=>{setimage(e.target.value)}}/>
      </div>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={title}   onChange={(e)=>{settitle(e.target.value)}}/>
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={desc}   onChange={(e)=>{setdesc(e.target.value)}}/>
      </div>
      <div>
        <label>Author:</label>
        <input type="text" name="author" value={author}   onChange={(e)=>{setauthor(e.target.value)}}/>
      </div>
      <div>
        <label>Genre:</label>
        <select name="genre" value={genre}  onChange={(e)=>{setgenre(e.target.value)}}>
        <option value="Thriller">Thriller</option>
        <option value="Horror">Horror</option>
        <option value="Mystery">Mystery</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Action">Action</option>
        </select>
      </div>
      <div>
        <label>Language:</label>
        <input type="text" name="language" value={lang}   onChange={(e)=>{setlang(e.target.value)}}/>
      </div>
      <div>
        <label>Page Count:</label>
        <input type="number" name="pageCount" value={pcount}  onChange={(e)=>{setpcount(e.target.value)}} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={price}   onChange={(e)=>{setprice(e.target.value)}}/>
      </div>
      <button type="submit">Update</button>
    </form>




            </div>
        </div>    
    </div>  
    <div className="bg-overlay"></div>
</div>
</div>}





   </>
  );
}

export default StoreList;