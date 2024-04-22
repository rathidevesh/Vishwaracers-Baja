import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Team.css';

import UpdateMember from "./UpdateMember";
import teamBaja from '../Image/baja team.png';

function Team() {
  const [team, setTeam] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = (memberId) => {
    setSelectedMemberId(memberId);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    // Make a GET request to the /display-team route
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/team/display-team", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Parse the JSON response
        const json = await response.json();
        console.log(json);

        // Check if the response contains team members
        if (json.teamMembers) {
          setTeam(json.teamMembers);
        } else {
          console.log("No team members found");
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []); // Empty dependency array to run the effect only once

  const loggedInUserId = localStorage.getItem("id");

  const handleDelete = async (memberId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/team/deletemember/${memberId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (response.status === 204) {
        // Remove the deleted member from the team state
        setTeam((prevTeam) => prevTeam.filter((member) => member._id !== memberId));
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  const domainGroups = team.reduce((groups, member) => {
    const domain = member.domain;
    if (!groups[domain]) {
      groups[domain] = [];
    }
    groups[domain].push(member);
    return groups;
  }, {});

  const domainPriority = [
    "Faculty",
    "Heads",
    "Chasis",
    "Brakes",
    "Electrical",
    "Suspension",
    "Transmission"
    // Add more domains as needed
  ];

  // Sort the domain groups based on priority
  const sortedDomainGroups = Object.entries(domainGroups)
    .sort(([domainA], [domainB]) => {
      const indexA = domainPriority.indexOf(domainA);
      const indexB = domainPriority.indexOf(domainB);
      return indexA - indexB;
    });

    function reveal() {
      var reveals = document.querySelectorAll(".reveal");
    
      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
    
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }
    
    window.addEventListener("scroll", reveal);
  return (
    <div className='team'>
      <div className="team-image">
        <img class="fullscreen" src="https://static.wixstatic.com/media/0031fc_5cf7222e8d1d454981e76fb6b06ec018~mv2.jpg/v1/fill/w_1899,h_1024,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0031fc_5cf7222e8d1d454981e76fb6b06ec018~mv2.jpg" alt="Pretty Pic"/>
      </div>
      <div className="team-introduction">
        <h1>
          <span style={{color:"#fff"}}>TEAM <span style={{color:"#fa5f1a"}}>VISHWARACERS</span></span>
        </h1>
        <div className="team-information reveal fade-left">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta cupiditate doloremque, asperiores quidem, debitis quam, tenetur suscipit quod voluptatum animi ab? Distinctio dolor odio amet soluta sunt, animi corporis voluptatem repellat harum tempore odit totam. Voluptas iure officia, cupiditate, vel fugit, voluptatibus laboriosam similique eaque distinctio minus omnis molestias assumenda.</p>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ratione ex eaque sapiente sit unde labore dolor, sed nostrum excepturi id dignissimos, maiores illo deleniti, maxime explicabo tempore natus enim quis. Nam repellat velit reprehenderit quidem ipsam itaque doloribus odio?</p>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta cupiditate doloremque, asperiores quidem, debitis quam, tenetur suscipit quod voluptatum animi ab? Distinctio dolor odio amet soluta sunt, animi corporis voluptatem repellat harum tempore odit totam. Voluptas iure officia, cupiditate, vel fugit, voluptatibus laboriosam similique eaque distinctio minus omnis molestias assumenda.</p>
          <br />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ratione ex eaque sapiente sit unde labore dolor, sed nostrum excepturi id dignissimos, maiores illo deleniti, maxime explicabo tempore natus enim quis. Nam repellat velit reprehenderit quidem ipsam itaque doloribus odio?</p>
          <br />
        </div>
      </div>

      <div className="team-container">
        {sortedDomainGroups.map(([domain, members]) => (
          <div key={domain}>
            <div className="member-position-heading reveal fade-left">
              <h3>
                <span>{getDomainHeading(domain)}</span>
              </h3>
            </div>
            <div className="Team-members">
              <div className="team-cards reveal fade-bottom">
                {members.map(member => (
                  <div className="team-card-details" key={member._id}>
                      <div className="update-delete-buttons">
                        {loggedInUserId === "64e1f9d254a4a71648e228ee" && (
                          <>
                            <button
                              className="update-button"
                              onClick={() => handleModalToggle(member._id)}
                            >
                              <i class="fa-solid fa-pen-to-square"> Update</i>
                            </button>
                            <button className="delete-button" onClick={() => handleDelete(member._id)}>
                            <i class="fa-solid fa-trash"> Delete</i>
                            </button>
                          </>
                        )}
                      </div>

                      {isModalOpen && selectedMemberId === member._id && (
                        <UpdateMember
                          memberId={member._id}
                          showModal={isModalOpen}
                          memberData={member}
                          onClose={handleModalToggle}
                        />
                      )}
                      
                    <div className="team-card" >
                      <div className="team-card-image">
                        <img src={`/images/${member.images[0]}`} alt="profile one" />
                      </div>
                      <ul className="team-social-icons">
                        <li>
                          <a href={member.insta}>
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href={`mailto:${member.email}`}>
                            <i className="fa-solid fa-envelope"></i>
                          </a>
                        </li>
                        <li>
                          <a href={member.linkedin}>
                            <i className="fab fa-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                      <div className="team-details">
                        <h2>
                          {member.name}
                          <br />
                          <span className="job-title">{member.position}</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getDomainHeading(domain) {
  switch (domain) {
    case "Faculty":
      return "FACULTY ADVISORS";
    case "Heads":
      return "HEADS AND OFFICIALS";
    case "Chasis":
      return "CHASIS";
    case "Brakes":
      return "BRAKES";
    case "Electrical":
      return "ELECTRICALS";
    case "Suspension":
      return "SUSPENSIONS AND STEERINGS";
    case "Transmission":
      return "TRANSMISSION";

    default:
      return "Other Domain"; // Default heading if domain is not recognized
  }
}

export default Team;

