import { Link } from "react-router-dom";

import "./Blog.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";

import avatar7 from "../../../assets/avatar/avatar7.jpg";
import blog10 from "../../../assets/blog/blog10.jpg";

function Blog() {
    const replaceIfOverflow = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + "...";
        }
        return str;
    };
    let textEx =
        "Lorem ipsum, dolor sit ament, Lorem ipsum, dolor sit ament, Lorem ipsum, dolor sit ament Lorem ipsum, dolor sit ament, Lorem ipsum, dolor sit ament ,Lorem ipsum, dolor sit ament";
    return (
        <div className="">
            <Header />
            <section className="blog__featured">
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
            </section>

            <section className="posts">
                <div className="container post_container">
                    <article className="post">
                        <div className="post__thumbnail">
                            <img src={blog10} alt="" />
                        </div>
                        <div className="post__info">
                            <a href="/#" className="post__category-button">
                                Wild Life
                            </a>
                            <h3 className="post__title">
                                <Link to="/post">
                                    Lorem ipsum, dolor sit ament
                                </Link>
                            </h3>
                            <p className="post__body">
                                {replaceIfOverflow(textEx, 170)}
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
                    </article>

                    <article className="post">
                        <div className="post__thumbnail">
                            <img src={blog10} alt="" />
                        </div>
                        <div className="post__info">
                            <a href="/#" className="post__category-button">
                                Wild Life
                            </a>
                            <h3 className="post__title">
                                <Link to="/post">
                                    Lorem ipsum, dolor sit ament
                                </Link>
                            </h3>
                            <p className="post__body">
                                Lorem ipsum, dolor sit ament, Lorem ipsum, dolor
                                sit ament, Lorem ipsum, dolor sit ament Lorem
                                ipsum, dolor sit ament, Lorem ipsum, dolor sit
                                ament ,Lorem ipsum, dolor sit ament
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
                    </article>

                    <article className="post">
                        <div className="post__thumbnail">
                            <img src={blog10} alt="" />
                        </div>
                        <div className="post__info">
                            <a href="/#" className="post__category-button">
                                Wild Life
                            </a>
                            <h3 className="post__title">
                                <Link to="/post">
                                    Lorem ipsum, dolor sit ament
                                </Link>
                            </h3>
                            <p className="post__body">
                                Lorem ipsum, dolor sit ament, Lorem ipsum, dolor
                                sit ament, Lorem ipsum, dolor sit ament Lorem
                                ipsum, dolor sit ament, Lorem ipsum, dolor sit
                                ament ,Lorem ipsum, dolor sit ament
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
                    </article>

                    <article className="post">
                        <div className="post__thumbnail">
                            <img src={blog10} alt="" />
                        </div>
                        <div className="post__info">
                            <a href="/#" className="post__category-button">
                                Wild Life
                            </a>
                            <h3 className="post__title">
                                <Link to="/post">
                                    Lorem ipsum, dolor sit ament
                                </Link>
                            </h3>
                            <p className="post__body">
                                Lorem ipsum, dolor sit ament, Lorem ipsum, dolor
                                sit ament, Lorem ipsum, dolor sit ament Lorem
                                ipsum, dolor sit ament, Lorem ipsum, dolor sit
                                ament ,Lorem ipsum, dolor sit ament
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
                    </article>

                    <article className="post">
                        <div className="post__thumbnail">
                            <img src={blog10} alt="" />
                        </div>
                        <div className="post__info">
                            <a href="/#" className="post__category-button">
                                Wild Life
                            </a>
                            <h3 className="post__title">
                                <Link to="/post">
                                    Lorem ipsum, dolor sit ament
                                </Link>
                            </h3>
                            <p className="post__body">
                                Lorem ipsum, dolor sit ament, Lorem ipsum, dolor
                                sit ament, Lorem ipsum, dolor sit ament Lorem
                                ipsum, dolor sit ament, Lorem ipsum, dolor sit
                                ament ,Lorem ipsum, dolor sit ament
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
                    </article>

                    <article className="post">
                        <div className="post__thumbnail">
                            <img src={blog10} alt="" />
                        </div>
                        <div className="post__info">
                            <a href="/#" className="post__category-button">
                                Wild Life
                            </a>
                            <h3 className="post__title">
                                <Link to="/post">
                                    Lorem ipsum, dolor sit ament
                                </Link>
                            </h3>
                            <p className="post__body">
                                Lorem ipsum, dolor sit ament, Lorem ipsum, dolor
                                sit ament, Lorem ipsum, dolor sit ament Lorem
                                ipsum, dolor sit ament, Lorem ipsum, dolor sit
                                ament ,Lorem ipsum, dolor sit ament
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
                    </article>
                </div>
            </section>

            <section className="category__buttons">
                <div className="container-custom category__buttons-container">
                    <Link to="" className="category__button">
                        Art
                    </Link>
                    <Link to="" className="category__button">
                        Wild Life
                    </Link>
                    <Link to="" className="category__button">
                        Travel
                    </Link>
                    <Link to="" className="category__button">
                        Science & Technology
                    </Link>
                    <Link to="" className="category__button">
                        Food
                    </Link>
                    <Link to="" className="category__button">
                        Music
                    </Link>
                </div>
            </section>
            <FooterMini />
        </div>
    );
}

export default Blog;
