import React, { useState } from "react";
import './UpdateMember.css'

const UpdateMember = ({ memberId, showModal, memberData, onClose }) => {
  const [formData, setFormData] = useState({
    name: memberData ? memberData.name : "",
    position: memberData ? memberData.position : "",
    email: memberData ? memberData.email : "",
    linkedin: memberData ? memberData.linkedin : "",
    insta: memberData ? memberData.insta : "",
    domain: memberData ? memberData.domain : "",
    image: memberData ? memberData.images : [""],
    
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      [e.target.image]: e.target.files, 
    });
  };

  console.log(formData.image);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formDataWithImage = new FormData();
      for (const key in formData) {
        console.log(key);
        console.log(formData[key]);
        if (key === "image") {
          for (let i = 0; i < formData[key].length; i++) {
            formDataWithImage.append("image", formData[key][i]);
          }
        } else {
          formDataWithImage.set(key, formData[key]);
        }
      }

      console.log("formDataWithImage is over");
      const response = await fetch(
        `http://localhost:5000/api/team/update-team/${memberId}`,
        {
          method: "PUT",
          headers: {
            "auth-token": localStorage.getItem("token"),
            // Add this line
          },
          body: formDataWithImage,
        }
      );

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Error updating team member:", error);
    }
  };

  return (
    <>
      <div className="updateMember">
        <form onSubmit={handleUpdate} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">TEAM MEMBER NAME</label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={onChange}
              name="name"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={onChange}
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">TEAM POSITION</label>
            <input
              type="text"
              className="form-control"
              id="position"
              onChange={onChange}
              name="position"
              aria-describedby="emailHelp"
              placeholder="Enter position"
            />
          </div>

          <div className="form-group">
            <label htmlFor="linkedin">LINKEDIN</label>
            <input
              type="text"
              className="form-control"
              id="linkedin"
              onChange={onChange}
              name="linkedin"
              aria-describedby="emailHelp"
              placeholder="Enter linkedin"
            />
          </div>

          <div className="form-group">
            <label htmlFor="insta">INSTAGRAM</label>
            <input
              type="text"
              className="form-control"
              id="insta"
              onChange={onChange}
              name="insta"
              aria-describedby="emailHelp"
              placeholder="Enter insta"
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              name="image" // Use 'image' instead of 'images'
              accept="image/*"
              onChange={handleImageChange}
            />
          </div> */}

          <div className="mb-3">
            <label htmlFor="domain" className="form-label">
              ENTER DOMAIN
            </label>
            <select
              className="form-select"
              value={formData.domain}
              onChange={onChange}
              name="domain"
              id="domain"
            >
              <option value="" disabled>Select domain</option>
              <option value="faculty">Faculty Advisors</option>
              <option value="Heads">Heads and Officials</option>
              <option value="Chasis">Chasis</option>
              <option value="Brakes">Brakes</option>
              <option value="Electrical">Electrical</option>
              <option value="Suspension">Suspension and Steering</option>
              <option value="Transmission">Transmission</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <button type="submit" className="update-info-button">UPDATE TEAM MEMBER</button>
        </form>
        <button onClick={onClose} className="close-button"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </>
  );
};

export default UpdateMember;