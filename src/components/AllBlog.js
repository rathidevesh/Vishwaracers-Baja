import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './AllBlog.css';

const AllBlog = () => {
    const [allblog, setAllBlog] = useState([]);

    useEffect(() => {
        const fetchAllBlog = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/blog/allblog", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const json = await response.json();
                if (json.length > 0) {
                    setAllBlog(json);
                } else {
                    alert('No Bookings Found');
                }
            } catch (error) {
                console.error("Error fetching Bookings:", error);
            }
        };
        fetchAllBlog();
    }, []);

    return (
        <div className='allblogs'>
            <div className="allBlogsHeading ">
              <h1>
                <span style={{color:"#fa5f1a"}}>ViswaR-25 <span style={{color:"#fff"}}>VOYAGES</span></span>
              </h1>
              <h4>
                <span style={{color:"#fff"}}>Unveiling the Inner Workings of Vishwaracers Formula Racing</span>
              </h4>
            </div>
            <div className="allBlogCards ">
                {allblog.map(blog => (
                    <div className="blogCards" key={blog._id}>
                      <div className="blogImg">
                        <img src={`/images/${blog.images[0]}`} alt={`${blog.name}'s Image`} />
                      </div>
                      <div className="blogName">
                        <span style={{fontSize:"3rem","color":"#fa5f1a"}}>{blog.name}</span>
                      </div>
                      <div className="blogDate">
                        <span>
                            {new Date(blog.date).toLocaleString('en-US', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </span>
                      </div>
                      <div className="blogDescription">
                        <span>
                           {blog.description.length > 200
                                ? `${blog.description.slice(0, 200)}...`
                                : blog.description}
                        </span>
                      </div>

                        <Link to={`/blogs/${blog._id}`}><button className='blog-button' style={{"margin":"20px 10px"}}>Read More</button></Link> {/* Link to the detailed blog page */}
                    </div>
                    
                ))}
            </div>
        </div>
    );
}

export default AllBlog;
