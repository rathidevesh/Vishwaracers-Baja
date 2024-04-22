import React, {useState} from 'react'
import { useNavigate,useLocation, useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import './ResetPassword.css';
import forgotPassImg from '../Image/VR25-logo-removebg-preview.png';

const ResetPassword = (props) => {
    const [credentials, setCredentials] = useState({ password: ""}) 
    const[passshow , setPassshow] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {id ,token} = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/reset-password/${id}/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if(json.Status === "Success"){
            navigate('/login')
        }
        else{
            alert("there is some issue. Please try it again.")
        }
        
          
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='reset-password'>
            <div className="change-password-image">
                <div className="change-img">
                    <img src={forgotPassImg} alt="VISHWARACERS" style={{"width":"50%","height":"50%"}}/>

                </div>
                <div className="logo-name">
                    <h2><span id="Vishwaracers">Support @VISHWARACERS</span></h2> 
                </div>
            </div>
            <div className="reset-password-form">
                <form  onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label resetpassLabel">ENTER NEW PASSWORD</label>
                        <input type={!passshow ? "password" : "text"} className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" placeholder='Please enter your new password!' />
                        <div className="showpass" onClick={()=>setPassshow(!passshow)}>
                            
                            {!passshow ? "show password" : "hide"}
                        </div>
                    </div>
                    <div className="reset-password-button">
                        <button type="submit" className="engage-button">UPDATE</button>
                    </div>
                </form>

            </div>
        </div>


                

                
            
    )
}

export default ResetPassword;