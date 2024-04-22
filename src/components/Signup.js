import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import './SignUp.css';
import {Link} from 'react-router-dom';


const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [passshow, setPassshow] = useState(false);
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name,last_name,email, password, cpassword } = credentials;
    if (password !== cpassword) {
      alert("Passwords do not match. Please confirm your password.");
      return;
    }
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name,last_name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect

      localStorage.setItem("token", json.authtoken);
      history("/otp", { state: email });
      // props.showAlert("Sucessfully Signed In" , "success")
      alert("You Sign up successfully");
    } else {
      // props.showAlert("Invalid Credentials" , "danger")
      alert("Enter Correct Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='signUp-page'>
      <div className="sign-up-contents">
        <div className="sign-up-box">
          <div className="signUp-left-content">
            <div className="sign-up-introHeading">
              <h1>
                <span style={{color:"white"}}>Welcome</span>
              </h1>
              <span style={{color:"white"}}>We build dreams</span>
            </div>
            <div className="sign-up-options">
              <div class="social-container">
                <a href="#" class="social"><i class="fab fa-facebook-f" style={{color:"white"}}></i></a>
                <a href="#" class="social"><i class="fab fa-google-plus-g" style={{color:"white"}}></i></a>
                <a href="#" class="social"><i class="fab fa-linkedin-in" style={{color:"white"}}></i></a>
              </div>

              <div className="sign-up-other-info">
                <span style={{color:"white"}}>Or use your mail for signing up</span>
              </div>
            </div>
          </div>
          <div className="signUp-right-content">
            <div className="sign-up-heading">
              <h3>
                <span>CREATE ACCOUNT</span>
              </h3>
            </div>
            <div className="sign-up-body">
              <form onSubmit={handleSubmit} >
                <div className="user-name-section">
                    <div class="mb-3" style={{"margin":"10px"}}>
                      <label for="first_name" class="form-label">First Name</label>
                      <input type="text" class="form-control" id="first_name" onChange={onChange} name="first_name" style={{"borderRadius":"20px"}} />
                    </div>
                    <div class="mb-3" style={{"margin":"10px"}}>
                      <label for="last_name" class="form-label">Last Name</label>
                      <input type="text" class="form-control" id="last_name" onChange={onChange} name="last_name" style={{"borderRadius":"20px"}} />
                    </div>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label" >Email</label>
                  <input type="email" class="form-control" id="email" aria-describedby="email" onChange={onChange} name="email" style={{"borderRadius":"20px"}}/>
                  <div id="Help" class="form-text" style={{"color":"white"}}>*Enter a Valid Email Address</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control"  id="password" onChange={onChange} name="password" style={{"borderRadius":"20px"}}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" style={{"borderRadius":"20px"}}/>
              </div>

              <div className="sign-up-terms">
                <span>By signing up, I agree to the terms of services and privacy policy.</span>
              </div>
              <button type="submit" className='sign-up-button'>Sign Up</button>

              </form>
            </div>
            <div className="redirect-login">
              <span>Already have an Account ? </span>
              <Link className=" mx-Link" to="/login" role="button">Login Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
