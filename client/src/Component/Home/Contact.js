import React from 'react';
import './Contact.css';

function Contact() {


const handleclick =(e)=>{
    e.stopPropagation();
e.preventDefault();
}

  return (
   <>

<div className='Contactbody'>


<section className="contact">
        <div className="contact container">
        <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7119.344223428197!2d81.02249976325011!3d26.850379314477706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3990e4dffcc4248f%3A0x75c3e0cdfb2cb5bd!2sSahara%20Hospital!5e0!3m2!1sen!2sin!4v1697582370628!5m2!1sen!2sin"
                width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <form >
            <div className="form">
                <div className="form-txt">
                    <h4>INFORMATION</h4>
                    <h1>Contact Us</h1>
                    <span>Discover endless stories at our online bookstore – your gateway to literary adventures and knowledge treasures.</span>
                    <h3>India</h3>
                    <p>42 Lotus Avenue, Mumbai, Maharashtra, 400001, India.<br/>+43 982-314-0958</p>
                    <h3>India</h3>
                    <p>17 Jasmine Lane, New Delhi, Delhi, 110011, India.<br/>411014</p>
                </div>
                <div className="form-details">
                    <input type="text" name="name"  placeholder="Name" required />
                    <input type="email" name="email"  placeholder="Email" required/>
                    <textarea name="message"  cols="52" rows="7" placeholder="Message" required></textarea>
                    <button onClick={handleclick}>SEND MESSAGE</button>
                </div>
            </div>
        </form>
    </div>
    </section>




</div>

   </>
  );
}

export default Contact;