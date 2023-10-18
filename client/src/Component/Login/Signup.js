import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Signup() {
  const [isChecked, setIsChecked] = useState(false);
const[username,setusername] = useState('');
const[email,setemail] = useState('');
const[password,setpassword] = useState('');
const [error,seterror] = useState('');

const navigate = useNavigate();


const paragraphStyle = {
  textAlign: 'center', // Center the text horizontally
  backgroundColor: 'red', // Set the background color to red
  color: 'black', // Set the text color to white
  padding: '0.5rem', // Add padding of 0.5rem to all sides
  margin: '1rem', // Add a margin of 1rem to all sides
};

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };


const handlesubmit =(e)=>{
e.preventDefault();


Axios.post('http://localhost:3001/signupuser',{
  username:username,
  email:email,
  password:password,
  auth:isChecked,
}).then(res =>{
  if(res.data.type === 'success')
  {
console.log('Success');
    navigate("/");
  }
  else if(res.data.type === 'validation')
   {
    seterror(res.data.errors[0].msg);
    setTimeout(() => {
      seterror('');
    }, 2000);
   }
   else if(res.data.type === 'email'){
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
<div className='loginbody'>



<div className="cont" style={{'height':'500px',}}>
  
  <div className="form">
    <form onSubmit={handlesubmit}>
      <h1>Register</h1>
      {error && <p style={paragraphStyle}>{error}</p>}
      <input type="text"
             className="user"
             placeholder="Username"
             onChange={(e)=>{setusername(e.target.value)}}/>
     <input type="email"
             className="user"
             placeholder="Email"
             onChange={(e)=>{setemail(e.target.value)}}/>
      <input type="password" 
             className="pass"
             placeholder="Password"
             onChange={(e)=>{setpassword(e.target.value)}}/>
                 <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Admin
      </label>
    </div>
      <button className="login">Signup</button>
      <p className='register'>Already Registered?<Link to="/" className='logindec'>  Login Here ?</Link></p>
    </form>
  </div>
  

  
</div>

</div>

   </>
  );
}

export default Signup;