import React, {useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';
import './Forgotpassword.css';
import forgotPassImg from '../Image/VR25-logo-removebg-preview.png';

const Forgotpassword = (props) => {
    const [credentials, setCredentials] = useState({email: ""}) 
    
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {

        e.preventDefault();
        alert("Please check your email address to view the link.")
        const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email})
        });
        const json = await response.json()
        console.log(json);
        
          
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='forgot-password'>
            <div className="change-password-image">
                <div className="change-img">
                    <img src={forgotPassImg} alt="VISHWARACERS" style={{"width":"50%","height":"50%"}}/>

                </div>
                <div className="logo-name">
                    <h2><span id="Vishwaracers">Support @VISHWARACERS</span></h2> 
                </div>
            </div>
            <div className="forgot-password-details">

                    <div className="forgot-password-heading">
                        <h2>
                            <span>
                                RESET PASSWORD
                            </span>
                        </h2>

                        <span>
                            Enter the email address associated with your account. Dont worry, we will be sending you the link to reset your password.
                        </span>

                    </div>
                    <div className="forgot-password-form">
                        <form  onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control forgotpasslabel" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            
                            <div className="forgot-password-button">
                                <button type="submit" className="engage-button">CONTINUE</button>
                            </div>

                        </form>
                    </div>
            </div>

                
            
        </div>
    )
}

export default Forgotpassword;