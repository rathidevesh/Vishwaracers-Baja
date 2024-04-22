import React, { useState } from "react";
import './Addteam.css'

const AddTeamMember = () => {
  const [inputfield, setInputField] = useState({
    name: "",
    email: "",
    position: "",
    linkedin: "",
    insta: "",
    domain: "",
    images: [], // Updated to hold an array of images
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, position, linkedin, insta, images, domain } =
      inputfield; // Include images in the destructuring

    const formData = new FormData(); // Create a FormData object to handle image uploads
    formData.append("name", name);
    formData.append("email", email);
    formData.append("position", position);
    formData.append("linkedin", linkedin);
    formData.append("insta", insta);
    formData.append("domain", domain);

    // Append all selected images to the FormData
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    const response = await fetch("http://localhost:5000/api/team/add-team", {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      }, // This is needed if you want to upload files with this request
      body: formData, // Use the FormData object as the request body
    });

    const json = await response.json();
    console.log(json);

    if (json.message === "Team Member Added Successfully") {
      // Handle success
      alert("Team member added successfully");
    } else {
      // Handle error
      alert("Failed to add team member");
    }
  };

  const handleImageChange = (e) => {
    setInputField({
      ...inputfield,
      images: e.target.files, // Update the images state with selected files
    });
  };

  const onChange = (e) => {
    setInputField({ ...inputfield, [e.target.name]: e.target.value });
  };
  return (

    <div className="addteamMembers">
      <div className="add-member-headline">
        <h2>
          <span>
            WELCOME YOUR NEW MEMBER.
          </span>
        </h2>
      </div>
        <div className="add-team-members-details">

            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Enter Team Member Name</label>
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
            <div className="form-group"  style={{"margin":"10px"}}>
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

            <div className="form-group"  style={{"margin":"10px"}}>
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

            <div className="form-group"  style={{"margin":"10px"}}>
                <label htmlFor="linkedin">LINKEDIN </label>
                <input
                type="text"
                className="form-control"
                id="linkedin"
                onChange={onChange}
                name="linkedin"
                aria-describedby="emailHelp"
                placeholder="Enter LinkedIn URL of New Member"
                />
            </div>

            <div className="form-group"  style={{"margin":"10px"}}>
                <label htmlFor="insta">INSTAGRAM</label>
                <input
                type="text"
                className="form-control"
                id="insta"
                onChange={onChange}
                name="insta"
                aria-describedby="emailHelp"
                placeholder="Enter Instagram URL of New Member"
                />
            </div>
            <div className="form-group"  style={{"margin":"10px"}}>
                <label htmlFor="image">MEMBER'S PHOTOGRAPH</label>
                <input
                type="file"
                className="form-control"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                />
            </div>

            <div className="mb-3"  style={{"margin":"10px"}}>
                <label htmlFor="domain" className="form-label">
                DOMAIN
                </label>
                <select
                className="form-select"
                value={inputfield.domain}
                onChange={onChange}
                name="domain"
                id="domain"
                >
                <option value="">Select domain</option>
                <option value="Faculty">Faculty Advisors</option>
                <option value="Heads">Heads and Officials</option>
                <option value="Chasis">Chasis</option>
                <option value="Brakes">Brakes</option>
                <option value="Electrical">Electrical</option>
                
                <option value="Suspension">Suspension and Steering</option>
                <option value="Transmission">Transmission</option>
                {/* Add more options as needed */}
                </select>
            </div>

            <button type="submit" className="engage-button"  style={{"margin":"10px"}}>Add Team Member</button>
            </form>
        </div>
    </div>
  );
};

export default AddTeamMember;