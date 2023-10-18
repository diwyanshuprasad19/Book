import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';





function Login() {

  const [isChecked, setIsChecked] = useState(false);
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


const handlelogin =(e)=>{
  e.preventDefault();

if(isChecked){
  Axios.post('http://localhost:3001/loginauthenticated',{
    email:email,
    password:password,
    auth:isChecked,
  }).then(res =>{
    if(res.data.type === 'success')
    {
  console.log('Success');
  localStorage.setItem('Book-Admin',res.data.token);
      navigate("/Admin/Store");
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
     else if(res.data.type === 'password'){
      seterror(res.data.errors);
      setTimeout(() => {
        seterror('');
      }, 2000);
     }
  }).catch(error =>{
    console.log(error);
  });
  
  
}
else{
  Axios.post('http://localhost:3001/loginnonauthenticated',{
    email:email,
    password:password,
    auth:isChecked,
  }).then(res =>{
    if(res.data.type === 'success')
    {
  console.log('Success');
  localStorage.setItem('Book-User',res.data.token);
      navigate("/Home");
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
     else if(res.data.type === 'password'){
      seterror(res.data.errors);
      setTimeout(() => {
        seterror('');
      }, 2000);
     }
  }).catch(error =>{
    console.log(error);
  });
  
  
}
 
  
}


  return (
   <>
<div className='loginbody'>



<div className="cont">
  
  <div className="form">
    <form onSubmit={handlelogin}>
      <h1>Login</h1>
      {error && <p style={paragraphStyle}>{error}</p>}
      <input type="text"
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


      <button  className="login">Login</button>
      <p className='register'>Not registered yet?<Link to="/Signup" className='logindec'>  Create an account ?</Link></p>
    </form>
  </div>
  

  
</div>
</div>

   </>
  );
}

export default Login;