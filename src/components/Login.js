import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import './Login.css';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: "",occupation:""}) 
    const[passshow , setPassshow] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password,occupation:credentials.occupation})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and id to localStorage
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('id', json.id);
            localStorage.setItem('occupation',json.occupation)
            console.log(json.occupation);
          
            if (json.occupation === "other") {
              navigate("/allcars");
            } else if (json.occupation === "farmer") {
              navigate("/farmer");
            } else if (json.occupation === "tourist") {
              navigate("/tourist");
            } else {
              navigate("/home");
            }
          
            // Display a success alert
            alert("You have logged in successfully");
          } else {
            // Display an error alert
            alert("Please enter correct credentials. Make sure you have selected the Occupation.");
          }
          
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className='login-page'>
      <div className="login-contents">
        <div className="login-box">
          <div className="login-left-content">
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                      <label for="email" class="form-label" >Email</label>
                      <input type="email" class="form-control" id="email" name='email' aria-describedby="email" value={credentials.email} onChange={onChange} style={{"borderRadius":"20px"}}/>
                      
                  </div>
                  <label htmlFor="password" className="form-label">Password</label>
                    <input type={!passshow ? "password" : "text"} className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                    <div className="showpass" onClick={()=>setPassshow(!passshow)}>
                        Show
                        {!passshow ? "password" : "text"}
                    </div>
                  <div className="mb-3">
                    <label htmlFor="occupation" className="form-label">Occupation</label>
                    <select className="form-select" value={credentials.occupation} onChange={onChange} name="occupation" id="occupation">
                    <option value="">Select Occupation</option>
                    <option value="farmer">Farmer</option>
                    <option value="tourist">Tourist</option>
                    <option value="other">Other</option>
                    </select>
                </div>
                  <button type="submit" className='login-button'>Log In</button>
                  <Link className=" mx-Link" to="/forgotpassword" role="button" style={{"color":"white"}}>Forgot Password ?</Link>
              </form>
            </div>
            <div className="redirect-signup">
              <span>Don't have an Account ? </span>
              <Link className=" mx-Link" to="/signup" role="button" style={{"color":"white"}}>Create Account Here</Link>
            </div>

          </div>
          <div className="login-right-content">
              <div className="login-introHeading" style={{paddingBottom:"20px"}}>
                  <h1>
                    <span style={{color:"white"}}>Welcome Back</span>
                  </h1>
              </div>
                  
              <div className="login-options">
                <div className="login-ways">
                  <span style={{color:"white"}}>Login with </span>
                </div>
                <div class="social-container">
                  <a href="#" class="social"><i class="fab fa-facebook-f" style={{color:"white"}}></i></a>
                  <a href="#" class="social"><i class="fab fa-google-plus-g" style={{color:"white"}}></i></a>
                  <a href="#" class="social"><i class="fab fa-linkedin-in" style={{color:"white"}}></i></a>
                </div>

                <div className="login-other-info">
                  <span style={{color:"white"}}>Or use your mail for logging in</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
