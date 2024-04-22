import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import "./Profile.css";

const History = () => {
  const context = useContext(noteContext);
  const { bookings, getallbookings } = context;

  // Get the logged-in user's ID from the token or wherever it is stored
  const loggedInUserId = localStorage.getItem("id");
  console.log(loggedInUserId);

  useEffect(() => {
    getallbookings(loggedInUserId); // Call getbookings with the logged-in user's ID
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <>
      <h1 className="my-3"><center>My Bookings</center></h1>
      {bookings.length === 0 ? (
        <div className="no-booking-display">
          <span>No bookings to display</span>
        </div>

      ) : (
        bookings.map((booking) => {
          

          return (
            <div className="history-container" key={booking._id}>
              <div className="left-sideview">
                <div className="car-info1">
                  <b>{booking.carname}</b>
                </div>
                <div className="car-info1">
                  Car Cost: <b>{booking.carcost}/perday</b>
                </div>
                
              </div>
              <div className="middle-sideview">
                
                <div className="booking-info">
                  Date of booking: <b>{new Date(booking.date).toLocaleDateString()}</b>
                </div>
              </div>
              <div className="right-sideview">
                <img
                  className="history-image"
                  src={booking.carphoto}
                  alt="car-photo"
                />
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default History;