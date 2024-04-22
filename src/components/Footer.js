import React from 'react'
import fbImage from '../Image/facebook.png';
import twitterImage from '../Image/twitter.png';
import linkedinImage from '../Image/linkedin.png';
import instaImage from '../Image/instagram.png';
import youtubeImage from '../Image/youtube.png';
import './Footer.css';

function Footer() {
  return (
    <>
    <footer className="footer">
        <div className='footerDetails'>
            
                <div className="contactUsInfo">
                    <h5>Contact Us</h5>
                    <div className="mobileNUmbers">
                        <div className="mobileIcon">
                            <i class="fa-solid fa-phone" style ={{"margin-right": "10px"}} ></i>
                            <span>+999-123456789</span>,
                            <span>+999-123456789</span>
                        </div>
                        
                    </div>
                </div>

                <div className="EmailAddress">
                    <h5>Email Address</h5>
                    <div className="Email">
                        <i class="fa-solid fa-envelope" style ={{"margin-right": "10px"}}></i>
                        <span>vishwaracers@gmail.com</span>
                    </div>
                </div>

                <div className="LocationAddress">
                    <h5>Location</h5>
                    <div className="location" style={{display:"flex"}}>
                        <i class="fa-solid fa-location-dot" style ={{"margin-right": "10px","margin-top":"5px"}}></i>
                         <div className='locationInfo'>
                             <span>Vishwakarma Institute of Information Technology
                             <br/>Survey No. 3/4, Kondhwa (Budruk)<br/>Pune – 411048, Maharashtra (India)</span>
                         </div>
                           
                           
                    </div>
                </div>
            
        </div>

      <div className="SocialMediaLinksInfo">
            <div className="socialMediaLinksHeading">
                <h5>Follow Us on our Socials for daily Updates</h5>
            </div>

            <div className="socialIcons">

                <div className="facebookLink">
                    <a href="#">
                        <img src={fbImage} alt="facebook" style={{width:"20px","margin":"0px 10px"}}/>
                    </a>
                </div>
                <div className="InstagramLink">
                <a href="#">
                        <img src={instaImage} alt="facebook" style={{width:"20px","margin":"0px 10px"}}/>
                    </a>
                </div>
                <div className="twitterLink">
                <a href="#">
                        <img src={twitterImage} alt="twitter" style={{width:"20px","margin":"0px 10px"}}/>
                    </a>
                </div>
                <div className="linkedinLink">
                <a href="#">
                        <img src={linkedinImage} alt="linkedIn" style={{width:"20px","margin":"0px 10px"}}/>
                    </a>
                </div>
                <div className="youTubeLink">
                <a href="#">
                        <img src={youtubeImage} alt="youtube" style={{width:"20px","margin":"0px 10px"}}/>
                    </a>
                </div>
            
            </div>
      </div>
      </footer>
    </>
  )
}

export default Footer
