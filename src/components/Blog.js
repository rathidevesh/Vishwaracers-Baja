import React, { useState } from "react";
import './Blog.css';

const Blog = () => {
  const[blog ,setblog] = useState({
    name: "",
    description:"",
    images: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, images } = blog; 

    const formData = new FormData(); // Create a FormData object to handle image uploads
    formData.append("name", name);
    formData.append("description", description);
    

    // Append all selected images to the FormData
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    const response = await fetch("http://localhost:5000/api/blog/add-blog", {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      }, // This is needed if you want to upload files with this request
      body: formData, // Use the FormData object as the request body
    });

    const json = await response.json();
    console.log(json);

    if (json.message === "Blog Added Successfully") {
      // Handle success
      alert("Blog added successfully");
    } else {
      // Handle error
      alert("Failed to add blog");
    }
  };

  const handleImageChange = (e) => {
    setblog({
      ...blog,
      images: e.target.files, // Update the images state with selected files
    });
  };

  const onChange = (e) => {
    setblog({ ...blog, [e.target.name]: e.target.value });
  };

  return (
    <div className="addblogInfo">
      <div className="upcoming-blog-details">
        <h2>
          <span>
              Upcoming Blog Details
          </span>
        </h2>
      </div>
      <div className="add-blog-items">
        <form onSubmit={handleSubmit}>
          <div className="form-group" >
            <label htmlFor="name">BLOG NAME</label>
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
          <label htmlFor="description">DESCRIPTION</label>
          <textarea
            className="form-control"
            id="description"
            onChange={onChange}
            name="description"
            placeholder="Enter Description"
          />
        </div>
        <div id="Help" class="form-text">*Length of Description is infinite. Expected to review before adding.</div>
        
          <div className="form-group" style={{"margin":"10px"}} >
            <label htmlFor="image">IMAGE</label>
            <input
              type="file"
              className="form-control"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <div id="Help" class="form-text">*Image is Mandatory for great user experience.</div>

          

          <button type="submit" className="engage-button" style={{"margin":"10px"}}>ADD BLOG</button>
        </form>

      </div>
    </div>
  )
}

export default Blog

