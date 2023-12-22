import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "../../../axios";

import "./SinglePost.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";

function SinglePost() {
    const { blogPostId } = useParams();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (blogPostId) {
                    const response = await axios.get(
                        `/api/BlogApi/GetBlogById/${blogPostId}`
                    );
                    const productData = response.data;
                    setBlogs(productData);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchData();
    }, [blogPostId]);

    function formatDateAndTime(input) {
        if (input) {
            let dateTime = new Date(input);

            // Get information about the date, month, year, hour, minute, second
            let date = dateTime.toLocaleDateString("en-US");
            let time = dateTime.toLocaleTimeString("en-US", { hour12: false });

            // Combine into the desired format
            let result = `${date} - ${time}`;

            return result;
        }
    }
    const blogName = blogs?.staff?.name;
    const blogDateTime = blogs.dateTime;
    const timeFormat = formatDateAndTime(blogDateTime);
    return (
        <>
            <Header />
            <section className="singlepost">
                <div className="container singlepost__container">
                    {blogs ? (
                        <div>
                            <h2 className="post__title">{blogs.titile}</h2>
                            <div className="post__author">
                                {/* <div className="post__author-avatar">
                                    <img src={avatar7} alt="" />
                                </div> */}
                                <div className="post__author-info">
                                    <h5 className="post__author-info-title">
                                        By: {blogName || "Unknown"}
                                    </h5>
                                    <small className="post__author-info-time">
                                        {timeFormat}
                                    </small>
                                </div>
                            </div>
                            <div className="singlepost__thumbnail">
                                <img
                                    src={`https://localhost:7109${blogs.thumbnail}`}
                                    alt=""
                                />
                            </div>
                            <p>{blogs.body}</p>
                        </div>
                    ) : (
                        <div>Loading</div>
                    )}
                </div>
            </section>
            <FooterMini />
        </>
    );
}

export default SinglePost;
