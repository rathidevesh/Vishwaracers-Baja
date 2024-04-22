import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogDetail.css';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/blog/blogs/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const json = await response.json();
                setBlog(json);
            } catch (error) {
                console.error("Error fetching Blog:", error);
            }
        };
        fetchBlog();
    }, [id]);

    // Add a conditional check to ensure blog.images exists before rendering
    if (!blog || !blog.images) {
        return <div>Loading...</div>; // You can customize the loading state
    }

    return (
        <div className="blogDetails">
            <div className='blogDetail'>
                <div className="blogName">
                    <span style={{ fontSize: "3rem", color: "#fa5f1a" }}>{blog.name}</span>
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
                <div className="blogImg">
                    <img src={`/images/${blog.images[0]}`} alt={`${blog.name}'s Image`} />
                </div>
                <div className="blogDescription">
                    <span>
                        {blog.description}
                    </span>
                </div>
            </div>

        </div>
    );
}

export default BlogDetail;

