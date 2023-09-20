import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "../../../axios";

import "./SinglePost.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";

import avatar7 from "../../../assets/avatar/avatar7.jpg";
import blog1 from "../../../assets/blog/blog1.jpg";

function SinglePost() {
    return (
        <>
            <Header />
            <section className="singlepost">
                <div className="container singlepost__container">
                    <h2 className="post__title">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                    </h2>
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
                    <div className="singlepost__thumbnail">
                        <img src={blog1} alt="" />
                    </div>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Corrupti, ipsam. Accusamus officiis, similique
                        praesentium amet omnis doloremque fugiat rem numquam
                        inventore repellat ipsum. Iusto numquam ratione quia
                        accusantium dolorem aspernatur corrupti itaque veniam
                        aut, nam, at, quidem maiores. Laboriosam, tempore?
                    </p>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Corrupti, ipsam. Accusamus officiis, similique
                        praesentium amet omnis doloremque fugiat rem numquam
                        inventore repellat ipsum. Iusto numquam ratione quia
                        accusantium dolorem aspernatur corrupti itaque veniam
                        aut, nam, at, quidem maiores. Laboriosam, tempore?
                    </p>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Corrupti, ipsam. Accusamus officiis, similique
                        praesentium amet omnis doloremque fugiat rem numquam
                        inventore repellat ipsum. Iusto numquam ratione quia
                        accusantium dolorem aspernatur corrupti itaque veniam
                        aut, nam, at, quidem maiores. Laboriosam, tempore?
                    </p>
                </div>
            </section>
            <FooterMini />
        </>
    );
}

export default SinglePost;
