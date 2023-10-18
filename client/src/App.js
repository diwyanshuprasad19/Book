import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Component/Login/Login';
import Signup from './Component/Login/Signup';
import Home from './Component/Home/Home';
import Books from './Component/Books/Books';
import Cart from './Component/Cart/Cart';
import BookDescription from './Component/BookDescription/BookDescription';
import Order from './Component/Order/Order';
import Store from './Component/Admin/Store/Store';
import AddBook from './Component/Admin/AddBook/AddBook';
import Review from './Component/Order/Review/review';
import Invoice from './Component/Order/Invoice/invoice';




function App() {
  return (
   <>

<Router>

      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/Book" element={<Books/>} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/Description/:id" element={<BookDescription/>} />
      <Route path="/Order" element={<Order/>} />
      <Route path="/Admin/Store" element={<Store/>} />
      <Route path="/Admin/AddBook" element={<AddBook/>} />
      <Route path="/Review" element={<Review/>} />
      <Route path="/Invoice/:id" element={<Invoice/>} />


      </Routes>
    </Router>



   </>
  );
}

export default App;
