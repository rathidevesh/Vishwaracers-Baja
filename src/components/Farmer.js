import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
import './Vehicle.css';

const Farmer = () => {
  const context = useContext(noteContext);
  const { farmersvechile, forfarmers } = context;

  useEffect(() => {
    forfarmers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let navigate = useNavigate();

  const handleBookNow = (booking) => {
    navigate(`/booking/${booking._id}`, {
      state: {
        car: booking,
      },
    });
  };

  return (
    <>
    <div className="vehicle">
      <div className="vehicle-type-heading">
        
        <h1>
          <span style={{"color":"#fa5f1a"}}>Farmer's</span> <span>Partners in Motion</span>
        </h1>
        <h4>
          <span>Built Tough for the Toughest Work</span>
        </h4>
      </div>
      {farmersvechile.length === 0 ? (
        <p>No bookings to display</p>
      ) : (
        farmersvechile.map((booking) => (
          <div className="vehicle-container" key={booking._id}>
            <div className="vehicle-image">
                <img src={booking.photo} alt="" style={{"width":"20rem","borderRadius":"20px"}} />
            </div>
            <div className="vehicle-details">
                        <div className="vehicle-name">
                            <h2>
                              <span style={{color:"#FF4B2B"}}>{booking.name}</span>
                            </h2>
                        </div>
                        <div className="vehicle-details-description">
                          
                            <p>{booking.description}</p>
                          
                        </div>

                        <div className="vehicle-cost">
                            <h5>
                              <span style={{color:"#FF4B2B"}}>Rs {booking.cost}</span>
                            </h5>
                        </div>
            
                        {localStorage.getItem("id") !== "64e060ecc46fb3732b59c2a2" && (
                          <div className="bookButton">
                            <button
                              className="sign-up-button"
                              onClick={() => handleBookNow(booking)}
                            >
                              MORE ABOUT CAR
                            </button>
                          </div>
                        )}
                  </div>
          </div>
        ))
      )}
      </div>
    </>
  );
};

export default Farmer;