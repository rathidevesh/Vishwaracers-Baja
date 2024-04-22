import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './UserOTP.css';

const Userotp = () => {
  const [userOtp, setUserOtp] = useState(["", "", "", "", "", ""]);
  const location = useLocation();
  const history = useNavigate();
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const handleChange = (e, index) => {
    const newValue = e.target.value;

    if (/^\d$/.test(newValue) || newValue === "") {
      const updatedOtp = [...userOtp];
      updatedOtp[index] = newValue;
      setUserOtp(updatedOtp);

      if (index < 5 && newValue !== "") {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredOtp = userOtp.join("");

    if (!enteredOtp) {
      alert("Please enter OTP");
      return;
    } else if (!/^\d{6}$/.test(enteredOtp)) {
      alert("Enter a valid 6-digit OTP");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/get-otp/${location.state}`);
      console.log(response.status, response.headers.get('content-type'))
      const data = await response.json();

      if (response.status === 200) {
        const otpFromServer = data.otp;

        if (enteredOtp === otpFromServer.toString()) {
          alert("OTP verified!");
          history('/login');
        } else {
          alert("Incorrect OTP");
        }
      } else if (response.status === 404) {
        alert("User not found");
      } else {
        alert("Error verifying OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error verifying OTP. Please try again.");
    }
  };

  return (
    <div className="otp-verification">
      <div className="verification">
        <div className="otp-notice">
          <h2>
            <span>
              OTP VERIFICATION
            </span>
          </h2>

          <span>Enter 6 digit verification code received on your Email ID.</span>

        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label"></label>
            <div className="otp-input">
              {userOtp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control otp-digit"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  ref={inputRefs.current[index]}
                />
              ))}
            </div>
          </div>
          <div className="otp-submit">
            <button type="submit" className="engage-button">
              VERIFY
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Userotp;

