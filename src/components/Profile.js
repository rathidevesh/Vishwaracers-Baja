import React, { useState,useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from 'react-router-dom';
import './Profile.css'

function Profile() {
  const context = useContext(noteContext);
  const { bookings, getallbookings } = context;

  const loggedInUserId = localStorage.getItem("id");
  console.log(loggedInUserId);
  console.log(bookings)

  useEffect(() => {
    getallbookings(loggedInUserId); // Call getbookings with the logged-in user's ID
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once when the component mounts


  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const userData = await response.json();
        setUserInfo(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Redirect to login or show an error message
        navigate('/login');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <>
    <div className="profileInfo">
      <div className="Profile-user-info">
        <div className="user-personal-info">
          <div className="user-greet">
            <span>Hello, </span> <span style={{color:"#fa5f1a"}}>{userInfo.first_name}</span>
          </div>
          <div className="user-email">
            <span>{userInfo.email}</span>
          </div>
        </div>
        
      </div>

      <div className="user-histroy-information">
        <div className="history-heading">
          <h2 className="history-page-quote">
            <span>"I couldn't find the sports car of my dreams, so I built it myself."</span>
            <span>-Ferdinand Porsche</span>
          </h2>
        </div>
      </div>
      {/* <p>Occupation: {userInfo.occupation}</p> */}
      {/* Add more fields as needed */}
    </div>



      <div className="bookingsHeading">
        <h1>
          <span>THANK YOU FOR YOUR PATIENCE</span>
        </h1>
      </div>

      {bookings.length === 0 ? (
        <p>No bookings to display yet..</p>
      ) : (
        bookings.map((booking) => {
          
          return (
            <div className="bookings-container" key={booking._id}>
              <div className="bookingItems">

                  <div className="left-sideview">
                    <img className="booking-image" src={booking.carphoto} alt="car-photo"/>
                  </div>

                  <div className="right-sideview">
                      <div className="booked-car-name">
                        <span>{booking.carname}</span>
                      </div>
                      <div className="booked-car-type">
                        <span>Model Type -{booking.Used_for}</span>
                      </div>
                      <div className="booked-car-cost">
                      <span>	&#8377; {booking.carcost}</span>
                      </div>
                      <div className="booked-car-date">
                      <span>Booked on - {new Date(booking.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div className="booked-status">
                        <div className="current-status">
                          <span>Status : CONFIRMED</span>
                        </div>
                      </div>

                      
                  </div>

                        
              </div>
            </div>

          );
        })
      )}
    </>
  );
  }

              

export default Profile;
