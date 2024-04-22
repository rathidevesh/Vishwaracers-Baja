import React, { useState, useEffect } from 'react';
import './Navbar.css';
import navImage from '../Image/VR25-logo.png';
import LogoImage from '../Image/logoVIIT-removebg-preview.png';
import {Link,useLocation } from "react-router-dom";
import { useNavigate} from "react-router-dom";

function Navbar() {
  const isAuthenticated = localStorage.getItem("token");
  let location = useLocation();
  let history = useNavigate();
  const handleLogout =()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('occupation');
      history('/login')
    }

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <>
        <nav className= {`navbar fixed-top navbar-expand-lg ${scrolled ? 'scrolled' : ''} `} >
  <div className="container-fluid">
  {/* <img src={navImage} className="lzy1Td" role="img"/> */}
  

    <div className="flip-container">
      <div className="flipper">
          <div clas="front">
          <img src={navImage} className="lzy1Td" role="img" style={{width:"50px","height":"50px"}} alt='frontFlip' ></img>

          </div>
          <div className="back">
              <img src={LogoImage} style={{width:"50px","height":"50px"}}/>
          </div>

      </div>
  </div>


    <a className="navbar-brand" href="/home" style={{marginLeft:"10px"}}>VISHWARACERS <span style={{color:"#fa5f1a"}}>BAJA</span></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{"backgroundColor":"white","border":"none"}}>
      <span className="navbar-toggler-icon" style={{"backgroundColor":"white","border":"none"}} ></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav" style={{"justifyContent":"flex-end"}}>
      <ul className="navbar-nav">
        <li className="nav-item">
          {/* <a className="nav-link " aria-current="page" href="/home">HOME</a> */}
          <Link className={`nav-link ${location.pathname === "/home" ? "active-link" : " "}`}to="/home">HOME</Link>
          
        </li>
        <li className="nav-item">
          {/* <a className="nav-link" href="/contact">CONTACT US</a> */}
          <Link className={`nav-link ${location.pathname === "/contact" ? "active-link" : " "}`}to="/contact">CONTACT US</Link>
        </li>
        <li className="nav-item">
          {/* <a className="nav-link" href="/team">TEAM</a> */}
          <Link className={`nav-link ${location.pathname === "/team" ? "active-link" : " "}`}to="/team">TEAM</Link>
        </li>
        <li className="nav-item">
          {/* <a className="nav-link" href="/allblog">BLOG</a> */}
          <Link className={`nav-link ${location.pathname === "/allblog" ? "active-link" : " "}`}to="/allblog">BLOG</Link>
        </li>
        {localStorage.getItem('occupation')==="farmer" &&(
            <li className="nav-item">
            {/* <a className="nav-link" href="/farmer">FARMER MODELS</a> */}
            <Link className={`nav-link ${location.pathname === "/farmer" ? "active-link" : " "}`}to="/farmer">FARMER MODELS</Link>
          </li>
        )}
        {localStorage.getItem('occupation')==="other" &&(
            <li className="nav-item">
            {/* <a className="nav-link" href="/farmer">FARMER MODELS</a> */}
            <Link className={`nav-link ${location.pathname === "/allCars" ? "active-link" : " "}`}to="/allCars">ALL FLEETS</Link>
          </li>
        )}
        {localStorage.getItem('occupation')==="tourist" &&(
            <li className="nav-item">
            {/* <a className="nav-link" href="/tourist">TOURIST MODELS</a> */}
            <Link className={`nav-link ${location.pathname === "/tourist" ? "active-link" : " "}`}to="/tourist">TOURIST MODELS</Link>
          </li>
        )}
          
        {localStorage.getItem('id') === "6538a630b3c2a6e390adf19e" && (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/add-car" ? "active-link" : " "
                }`}
                to="/add-car"
              >
                ADD VEHICLE
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/dashboard" ? "active-link" : " "
                }`}
                to="/dashboard"
              >
                DASHBOARD
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/allbookings" ? "active-link" : " "
                }`}
                to="/allbookings"
              >
                ALL BOOKINGS
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${
                  location.pathname === "/blog" ? "active-link" : " "
                }`}
                to="/blog"
              >
                ADD BLOG
              </Link>
              </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${
                  location.pathname === "/addteam" ? "active-link" : " "
                }`}
                to="/addteam"
              >
                ADD TEAM
              </Link>
              </li>
            </>
        )}
        {isAuthenticated ? (
            <>
                {/* <li className="nav-item">
                  <a className="nav-link" href="/profile">
                    <div className="UserContainerIcon">
                        <i class="fa-solid fa-user usericon"></i>

                    </div>
                  </a>
                </li> */}

                  <div class="nav-item custom-dropdown my-1">
                      <a class="custom-dropdown-toggle" href="#" role="button">
                          <div class="UserContainerIcon">
                              <i class="fa-solid fa-user usericon"></i>
                          </div>
                      </a>
                      <ul class="custom-dropdown-menu">
                          <li>
                            <div className="profile-link">
                              <a href="/profile" style={{"textDecoration":"none","color":"#fa5f1a"}}>Profile</a>
                              </div>
                          </li>
                          <li>
                              <div class="log-out-button">
                                  <button onClick={handleLogout} class="team-engage-button">Logout</button>
                              </div>
                          </li>
                      </ul>
                  </div>

            </>
          ) : (
            <form className="d-flex">
              
              <li className="nav-item">
                {/* <a className="nav-link" href="/login">LOGIN</a> */}
                <Link className={`nav-link ${location.pathname === "/login" ? "active-link" : " "}`}to="/login">LOGIN</Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link" href="/signup">SIGN UP</a> */}
                <Link className={`nav-link ${location.pathname === "/signup" ? "active-link" : " "}`}to="/signup">SIGN UP</Link>
              </li>
            </form>
          )}
      </ul>
    </div>
       
  </div>
</nav>
    </>
  )
}

export default Navbar


