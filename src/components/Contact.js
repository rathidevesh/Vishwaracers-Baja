import React,{useState} from 'react'
import './Contact.css';
import ContactCarImg from '../Image/contactImg.jpg'
import mapImage from '../Image/mapimg.png'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    mobileNumber:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    
    // e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact/createcontact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(formData), // Convert formData to JSON
      });
      
      const json = await response.json();
      console.log(json);
      alert('Mail Sent Successfully');
      // You can display a success message or perform other actions here
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle errors here
    }
  };
  return (
    <>
      <div className="ContactImg">
        <img src={ContactCarImg} alt="ContactPageImg" />
      </div>
      <div className="Contact-us-heading">
        <h2>
          <span style={{color:"white"}}>GET IN TOUCH</span>
        </h2>
      </div>
    
    <div className="Contact">
      <div className="contact-us-information">
        {/* <div className="contact-number">
            <div className="contact-number-logo">
              <i class="fa-solid fa-phone" style={{fontSize:"50px",paddingRight:"15px"}}></i>
            </div>
            <div className="official-contact-numbers">
              <span>+91 8075463<br/>+91 8075463</span>
            </div>
        </div>
        <div className="help-line-number">
            <div className="help-line-number-logo">
            <i class="fa-solid fa-headset" style={{fontSize:"50px",paddingRight:"15px"}}></i>
            </div>
            <div className="official-help-line-number">
              <span>541+96198641</span>
            </div>
        </div> */}

        <div className="map-image">
         <a target="_blank" href="https://www.google.com/maps/place/Vishwakarma+Institute+of+Information+Technology,+Survey+No.+2%2F3%2F4,+VIM+Private+Rd,+Kapil+Nagar,+Kondhwa,+Pune,+Maharashtra+411048/@18.4595506,73.8851748,20.54z/data=!4m6!3m5!1s0x3bc2eaf47d15ce33:0x8098faf1b47cc4ba!8m2!3d18.4595591!4d73.8854285!16s%2Fg%2F12hn57rjf?entry=ttu"><img src={mapImage} alt="Map" style={{height:"25rem","objectFit":"fill"}} /></a> 
        </div>

        <div className="official-address">
            <div className="official-address-logo">
            <i class="fa-solid fa-location-dot" style={{fontSize:"50px",paddingRight:"15px","color":"white"}}></i>
            </div>
            <div className="official-address-information" style={{"color":"white"}}>
            <span>Vishwakarma Institute of Information Technology
                             <br/>Survey No. 3/4, Kondhwa (Budruk)<br/>Pune – 411048, Maharashtra (India)</span>
            </div>
        </div>
      </div>
      <div className="user-contact-information">
        <div className="user-contact-box">
          <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="email" class="form-label" >EMAIL</label>
                <input type="email" class="form-control" id="email" aria-describedby="email" name="email" value={formData.email} onChange={handleChange} placeholder='Please enter email'/>
                <div id="Help" class="form-text">*Enter a Valid Email Address</div>
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">NAME</label>
                <input type="text" class="form-control" id="name" name='name' value={formData.name} onChange={handleChange} placeholder='Please enter name'/>
              </div>
              <div class="mb-3">
                <label for="mobileNo" class="form-label">PHONE NUMBER</label>
                <input type="tel" class="form-control" id="mobileNo" name='mobileNumber' value={formData.mobileNumber} onChange={handleChange} placeholder='Please enter phone number'/>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">What do you have in Mind?</label>
                <textarea class="form-control" id="message" name='message' value={formData.message} onChange={handleChange} rows="4" maxlength="200" placeholder="Please enter query..."></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style={{width:"100%","backgroundColor":"#fa5f1a","border":"1px solid #fa5f1a"}}>Submit</button>
          </form>
          </div>
      </div>
      
    </div>

    </>

      
  )
}

export default Contact

