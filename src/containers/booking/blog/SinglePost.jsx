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

    function formatDateTime(inputDateTime) {
        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
            timeZone: "Asia/Ho_Chi_Minh",
        };

        const formattedDateTime = new Date(inputDateTime).toLocaleString(
            "en-US",
            options
        );

        const [datePart, timePart] = formattedDateTime.split(", ");
        const [month, day, year] = datePart.split("/");
        const [hour, minute] = timePart.split(":");
        const formattedResult = `${day}/${month}/${year} - ${hour}:${minute}`;

        return formattedResult;
    }
    const blogName = blogs.staff;
    const blogDateTime = blogs.dateTime;
    console.log(blogDateTime);
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
                                        By: {blogName.name}
                                    </h5>
                                    <small className="post__author-info-time">
                                        {formatDateTime(blogDateTime)}
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
