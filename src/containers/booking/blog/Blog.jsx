import { Link } from "react-router-dom";

import "./Blog.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";

import { useEffect, useState } from "react";
import axios from "../../../axios";

function Blog() {
    const [blogs, setBlogs] = useState([]);
    // const [categories, setCategories] = useState([]);

    const replaceIfOverflow = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + "...";
        }
        return str;
    };
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get("/api/BlogApi");
                setBlogs(response.data);

                // const resCategory = await axios.get("/api/BlogCategoryApi");
                // setCategories(resCategory.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchBlogs();
    }, []);

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

    return (
        <div className="">
            <Header />
            {/* <section className="blog__featured">
                <div className="container featured__container">
                    <div className="post__thumbnail">
                        <img src={blog10} alt="" />
                    </div>
                    <div className="post__info">
                        <a href="/#" className="post__category-button">
                            Wild Life
                        </a>
                        <h2 className="post__title">
                            <Link to="/post">Lorem ipsum, dolor sit ament</Link>
                        </h2>
                        <p className="post__body">
                            {replaceIfOverflow(textEx, 200)}
                        </p>
                        <div className="post__author">
                            <div className="post__author-avatar">
                                <img src={avatar7} alt="" />
                            </div>
                            <div className="post__author-info">
                                <h5 className="post__author-info-title">
                                    By: Minh
                                </h5>
                                <small className="post__author-info-time">
                                    19/9/2023 - 10:00
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="posts">
                <div className="container post_container">
                    {blogs.map((item, index) => (
                        <article className="post" key={index}>
                            <div className="post__thumbnail">
                                <img
                                    src={`https://localhost:7109${item.thumbnail}`}
                                    alt=""
                                />
                            </div>
                            <div className="post__info">
                                <a href="/#" className="post__category-button">
                                    {item.blogCategory.title}
                                </a>
                                <h3 className="post__title">
                                    <Link to={`/bai-viet/${item.blogPostId}`}>
                                        {item.titile}
                                    </Link>
                                </h3>
                                <p className="post__body">
                                    {replaceIfOverflow(item.body, 170)}
                                </p>
                                <div className="post__author">
                                    {/* <div className="post__author-avatar">
                                        <img src={avatar7} alt="" />
                                    </div> */}
                                    <div className="post__author-info">
                                        <h5 className="post__author-info-title">
                                            By: {item.staff.name}
                                        </h5>
                                        <small className="post__author-info-time">
                                            {formatDateTime(item.dateTime)}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* <section className="category__buttons">
                <div className="container-custom category__buttons-container">
                    {categories.map((item, index) => (
                        <Link to="" className="category__button" key={index}>
                            {item.title}
                        </Link>
                    ))}
                </div>
            </section> */}
            <FooterMini />
        </div>
    );
}

export default Blog;
