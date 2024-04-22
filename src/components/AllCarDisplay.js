import React from 'react';
import{useState,useEffect } from 'react';
import './AllCarDisplay.css';
import { useNavigate } from "react-router-dom";

function AllCarDisplay() {
    const [carData , setCarData] = useState([]);
    useEffect(()=>{
        const fetchAllCars= async () =>{ 
            try {
                const response = await fetch("http://localhost:5000/api/rent/allcars", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token':localStorage.getItem('token'),
                    },
                });
                
                const data = await  response.json();
                setCarData(data);
                console.log(data);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCars();
        
    },[]);

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
      <div className="vehicle-type-heading">
        
        <h2>
          <span>Experience All Our Fleets</span>
        </h2>
        <h6>
          <span>Built Tough for the Toughest Work</span>
        </h6>
      </div>
      {carData.length === 0 ? (
        <p>No bookings to display</p>
      ) : (
        carData.map((booking) => (
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
                              Book Now
                            </button>
                          </div>
                        )}
                  </div>
          </div>
        ))
      )}
    </>
  )
}

export default AllCarDisplay

