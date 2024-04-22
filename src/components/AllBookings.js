import React, { useEffect, useState } from 'react';
import './AllBooking.css'

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBookingType, setSelectedBookingType] = useState('All'); // Default: Show all bookings
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/Bookingsroute/allbookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          }
        });
        const json = await response.json();
        console.log(json);
        if (json.length > 0) {
          setBookings(json);
        } else {
          alert('No Bookings Found');
        }
      } catch (error) {
        console.error("Error fetching Bookings:", error);
      }
    };
    fetchAllBookings();
  }, []);

  // Filter bookings based on the selected booking type
  useEffect(() => {
    // Filter bookings based on the selected booking type
    const filtered = selectedBookingType === 'All' ? bookings : bookings.filter(booking => booking.Used_for === selectedBookingType);
    setFilteredBookings(filtered); // Update filteredBookings here
    console.log(filteredBookings);
  }, [bookings, selectedBookingType]);
  
  return (
    <div className='allbooking'>
      <div className="allbookings-heading">
        <h2>
          <span>BOOKINGS TILL DATE</span>
          </h2>
      </div>


      {/* Dropdown/select to filter by booking type */}
      <div className="select-filter">
        <select
          value={selectedBookingType}
          onChange={(e) => setSelectedBookingType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="farmer">Farmer</option>
          <option value="manager">Manager</option>
          <option value="tourist">Tourist</option>
        </select>

      </div>

      {filteredBookings.map(booking => (
        <>
          <div className="all-bookings-information" key={booking._id}>
            <div className="all-booking-cars-image">
              <img src={booking.carphoto} alt="Car" />
            </div>
            <div className="all-bookings-car-value">
              <div class="booking-table">
                  <div class="booking-row">
                      <div class="booking-cell">BOOKED BY</div>
                      <div class="booking-cell">{booking.bookedusername}</div>
                  </div>
                  <div class="booking-row">
                      <div class="booking-cell">VEHICLE TYPE</div>
                      <div class="booking-cell">{booking.Used_for}</div>
                  </div>
                  <div class="booking-row">
                      <div class="booking-cell">VEHICLE NAME</div>
                      <div class="booking-cell">{booking.carname}</div>
                  </div>
                  <div class="booking-row">
                      <div class="booking-cell">VEHICLE COST</div>
                      <div class="booking-cell">{booking.carcost}</div>
                  </div>
                  <div class="booking-row">
                      <div class="booking-cell">MOBILE NUMBER</div>
                      <div class="booking-cell">{booking.mobileNumber}</div>
                  </div>
                  <div class="booking-row">
                      <div class="booking-cell">BOOKING DATE</div>
                      <div class="booking-cell">{new Date(booking.date).toLocaleString()}</div>
                  </div>
              </div>
            </div>
            
          </div>
          <div className="horizontal-division">
            <div className="horizontal-bar"></div>
          </div>
          </>
      ))}
        
      
    </div>
  );
}

export default AllBookings;