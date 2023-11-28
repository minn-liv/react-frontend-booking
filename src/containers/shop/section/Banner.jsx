import React, { Component, useState } from "react";
import Slider from "react-slick";
import banner from "../../../assets/banner/banner.jpg";
import banner2 from "../../../assets/banner/banner2.jpg";
import banner3 from "../../../assets/banner/banner3.jpg";

import "./Banner.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

class ImageSlider extends Component {
    render() {
        const { images } = this.props;

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 2000,
        };

        return (
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Image ${index + 1}`} />
                    </div>
                ))}
            </Slider>
        );
    }
}

class HeroBanner extends Component {
    render() {
        const images = [banner, banner2, banner3];

        return (
            <div className="banner-container">
                <div style={{ position: "relative" }}>
                    <ImageSlider images={images} />
                </div>
                <div className="policy-menu">
                    <ul className="menu-item">
                        <li>
                            <img />
                            <p>Giao hàng siêu tốc 2h</p>
                        </li>
                        <li>
                            <img />
                            <p>Hoàn tiền 120%</p>
                        </li>
                        <li>
                            <img />
                            <p>Đổi trả tận nơi</p>
                        </li>
                        <li>
                            <img />
                            <p>Cam kết 7 ngày hiệu quả</p>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default HeroBanner;
