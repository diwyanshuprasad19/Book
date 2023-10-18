const express= require ('express');
const helmet = require('helmet');
const path = require('path');
const app = express();
const {body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const UserModel = require('./model/User');
const AddBookModel = require('./model/AddBook');
const CartModel = require('./model/Cart');
const ReviewModel = require('./model/Review');


app.use(helmet());
const cors = require('cors');
app.use(express.json());
app.use(cors());
var jwt = require('jsonwebtoken');
app.use(express.static(path.join(__dirname, 'client/build')))
var fetchuser = require('./middleware/fetchuser');




//server
mongoose.connect("mongodb+srv://diwyanshuprasad:qwerty12345@cluster0.i7t88bc.mongodb.net/Book?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
});



//signup user logic
app.post("/signupuser", [
    body('username', 'Enter a  name of min length 4').isLength({ min: 4 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ type:'validation' ,errors: errors.array() });
    }

const Username = req.body.username;
const Email = req.body.email;
const Password = req.body.password;
const Auth = req.body.auth;
let user = await UserModel.findOne({ Email: Email,Auth:Auth });
    if (user) {
      return res.send({type:'email',errors:'Email already exist'});
    }
    else{
const hashpassword = await bcrypt.hash(Password,10);
let user = new UserModel({Username:Username,Email:Email,Password:hashpassword,Auth:Auth});

try{
let usercreate = await user.save();
res.send({type:'success'});
}
catch(err){
res.send({type:'user not saved',errors:err});
}
    }
});


//for login non-authenticated user
app.post("/loginnonauthenticated", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ type:'validation',errors: errors.array() });
    }
  
    const { email, password,auth } = req.body;

        let user = await UserModel.findOne({ Email:email,Auth:auth });
        if (!user) {
          return res.send({ type:'email',errors: "Please try to login with correct email" });
        }
    
        const passwordCompare = await bcrypt.compare(password, user.Password);
        if (!passwordCompare) {
          return res.send({ type:'password', errors: "Please try to login with correct password" });
        }
        const data = {
          user: {
            id: user._id,
            email:user.Email
          }
        }
        const authtoken = jwt.sign(data, 'secretkey');

        return res.send({type:'success',token:authtoken});
    });


//for login authenticated user
app.post("/loginauthenticated", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ],async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ type:'validation',errors: errors.array() });
    }
  
    const { email, password,auth } = req.body;

        let user = await UserModel.findOne({ Email:email,Auth:auth });
        if (!user) {
          return res.send({ type:'email',errors: "Please try to login with correct email" });
        }
    
        const passwordCompare = await bcrypt.compare(req.body.password, user.Password);
        if (!passwordCompare) {
          return res.send({ type:'password', errors: "Please try to login with correct password" });
        }
        const data = {
          user: {
            id: user._id,
            email:user.Email
          }
        }
        const authtoken = jwt.sign(data, 'secretkey');

        return res.send({type:'success',token:authtoken});
    });

//Non - Authenticated User


//Book Description
app.post("/BookDescription",async(req,res)=>{

  const id = req.body.id;
  try{
    let Description = await AddBookModel.find({_id:id});
    res.send({type:'success',description:Description});
    }
    catch(err){
    res.send({type:'Book not there',errors:err});
    }
  });



//Buy Now
app.post("/BuyNow",fetchuser,async(req,res)=>{

  const id = req.body.id;
  const email  = req.user.email;


  try{
   let book = await AddBookModel.findOne({_id:id});
  let cart = await CartModel.findOne({Email:email,Title:book.Title,Author:book.Author,Order:false});

if(cart){
let count = cart.Count+1;
let newcart = await CartModel.updateOne({Email:email,Title:book.Title,Author:book.Author,Order:false},{Count:count});
res.send({type:'success'});
}
else{
  let cartadd = new CartModel({Email:email,Image:book.Image,Title:book.Title,Author:book.Author,Genre:book.Genre,Price:book.Price,Count:1,Order:false});
  let cartcreate = await cartadd.save();
  res.send({type:'success'});
}
    }
    catch(err){
    res.send({type:'Book not there',errors:err});
    }
  });


// Cart Show object
app.post("/CartShow",fetchuser,async(req,res)=>{

  const email  = req.user.email;

  try{
  let cart = await CartModel.find({Email:email,Order:false});
res.send({type:'success',Cart:cart});

    }
    catch(err){
    res.send({type:'Cart not there',errors:err});
    }
  });


// Cart delete
app.post("/Cartdelete",fetchuser,async(req,res)=>{

  const id =req.body.id;
  const email  = req.user.email;

  try{
  let cart = await CartModel.deleteOne({Email:email,Order:false,_id:id});
  res.send({type:'success'});

    }
    catch(err){
    res.send({type:'Cart not there',errors:err});
    }
  });

// Cart Button
app.post("/CartButton",fetchuser,async(req,res)=>{

  const id =req.body.id;
  const email  = req.user.email;
const value = req.body.value;
  try{
  let cart = await CartModel.findOne({Email:email,Order:false,_id:id});
  let count = cart.Count+parseInt(value);
  let updatedcart = await CartModel.updateOne({Email:email,Order:false,_id:id},{Count:count});
  res.send({type:'success'});

    }
    catch(err){
    res.send({type:'Cart not there',errors:err});
    }
  });



// Order Show object
app.post("/CartShowOrder",fetchuser,async(req,res)=>{

  const email  = req.user.email;

  try{
  let cart = await CartModel.find({Email:email,Order:true});
res.send({type:'success',Cart:cart});

    }
    catch(err){
    res.send({type:'Cart not there',errors:err});
    }
  });






//Add to cart
app.post("/AddToCart",fetchuser,async(req,res)=>{

  const id = req.body.id;
  const email  = req.user.email;
const countadd = parseInt(req.body.count);

  try{
   let book = await AddBookModel.findOne({_id:id});
  let cart = await CartModel.findOne({Email:email,Title:book.Title,Author:book.Author,Order:false});

if(cart){
let count = cart.Count+countadd;
let newcart = await CartModel.updateOne({Email:email,Title:book.Title,Author:book.Author,Order:false},{Count:count});
res.send({type:'success'});
}
else{
  let cartadd = new CartModel({Email:email,Image:book.Image,Title:book.Title,Author:book.Author,Genre:book.Genre,Price:book.Price,Count:countadd,Order:false});
  let cartcreate = await cartadd.save();
  res.send({type:'success'});
}
    }
    catch(err){
    res.send({type:'Book not there',errors:err});
    }
  });



//Cart Buy
app.post("/CartBuy",fetchuser,async(req,res)=>{

  const email  = req.user.email;
  const min = 10000; // Minimum value for a 5-digit number
  const max = 99999; // Maximum value for a 5-digit number
  const OrderId =  Math.floor(Math.random() * (max - min + 1)) + min;
  try{
  let cart = await CartModel.updateMany({Email:email,Order:false},{Order:true,OrderId:OrderId});
res.send({type:'success'});

    }
    catch(err){
    res.send({type:'Cart not there',errors:err});
    }
  });





//Save Review given by Customer
app.post("/ReviewSave",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const title = req.body.title;
  const author = req.body.author;
  const rate = parseInt(req.body.rate);
  const desc = req.body.desc;
  

  //check if that user for that product already reviewed
  let reviewalready = await ReviewModel.findOne({Email:email,Title:title,Author:author});
  if(reviewalready)
  {
    res.send({type:'Already reviewed'});
  }
  else
  {
    try{
      //update in review
      let review = new ReviewModel({Email:email,Title:title,Author:author,Rating:rate,Review:desc});
      let reviewcreate = await review.save();
  
    //Book rating update
    let product = await AddBookModel.findOne({Title:title,Author:author});
    let prate = product.rate;
    let pnumber = product.ratecount;
    let total = ((prate * pnumber)+rate)/(pnumber+1);
    let totalnew = total.toFixed(2);
    let productupdate = await AddBookModel.updateOne({Title:title,Author:author},{$set:{rate:totalnew,ratecount:pnumber+1}});
  
      return res.send({type:'Success'});
    }
    catch(err){
      console.log(err);
    res.send({type:'error',errors:err});
    }

  }
  });



//read review for that unique product
app.post("/OtherRating",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const title = req.body.title;
  const author = req.body.author;
  try{
    let review = await ReviewModel.find({Title:title,Author:author}).limit(5);
    return res.send({type:'Success',items:review});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });



//invoice for that product
app.post("/Invoice",fetchuser,async(req,res)=>{

  const email = req.user.email;
  const id = req.body.id;
  try{
    let order = await CartModel.findOne({Email:email,_id:id});
    return res.send({type:'Success',order:order});
  }
  catch(err){
  res.send({type:'error',errors:err});
  }
  });





//Authenticated User


//Add book 
app.post("/AddBook", [
  body('title', 'Enter a  title of min length 3').isLength({ min: 3 }),
  body('desc', 'Enter a Description of min 30 charatcers').isLength({ min: 3 }),
  body('author', 'Enter a  author name of min length 3').isLength({ min: 3 }),
  body('lang', 'Enter a  lang of min length 3').isLength({ min: 3 }),
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ type:'validation' ,errors: errors.array() });
  }


const image = req.body.image;
const title = req.body.title;
const desc = req.body.desc;
const author = req.body.author;
const genre = req.body.genre;
const lang = req.body.lang;
const pcount = req.body.pcount;
const price = req.body.price;



let book = await AddBookModel.findOne({ Title: title,Author:author });
  if (book) {
    return res.send({type:'book',errors:'Book already exist'});
  }
  else{
let newbook = new AddBookModel({ Image:image,Title:title,Description:desc,Author:author,Genre:genre,Language:lang,Pagecount:pcount,Price:price});

try{
let bookcreate = await newbook.save();
res.send({type:'success'});
}
catch(err){
res.send({type:'book not saved',errors:err});
}
  }
});


//Edit Book

app.post("/UpdateBook", [
  body('title', 'Enter a  title of min length 3').isLength({ min: 3 }),
  body('desc', 'Enter a Description of min 30 charatcers').isLength({ min: 3 }),
  body('author', 'Enter a  author name of min length 3').isLength({ min: 3 }),
  body('lang', 'Enter a  lang of min length 3').isLength({ min: 3 }),
],async(req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ type:'validation' ,errors: errors.array() });
  }

const id =req.body.id;
const image = req.body.image;
const title = req.body.title;
const desc = req.body.desc;
const author = req.body.author;
const genre = req.body.genre;
const lang = req.body.lang;
const pcount = req.body.pcount;
const price = req.body.price;

try{
let updatebook = await AddBookModel.updateOne({_id:id},{$set:{ Image:image,Title:title,Description:desc,Author:author,Genre:genre,Language:lang,Pagecount:pcount,Price:price}});
res.send({type:'success'});
}
catch(err){
res.send({type:'book not saved',errors:err});
}


});


//Get Books
app.get("/GetBook",async(req,res)=>{

try{
  let book = await AddBookModel.find({});
  res.send({type:'success',books:book});
  }
  catch(err){
  res.send({type:'Book not there',errors:err});
  }
});


//Delete Books
app.post("/DeleteBook",async(req,res)=>{

  const id = req.body.id;
  
  try{
    let book = await AddBookModel.deleteOne({_id:id});
    res.send({type:'success'});
    }
    catch(err){
    res.send({type:'Book not there',errors:err});
    }
  });



app.listen(3001,()=>{

    console.log('server running');
})