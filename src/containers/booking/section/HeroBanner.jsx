import React, { Component, useState } from "react";
import Slider from "react-slick";
import banner from "../../../assets/banner/banner.jpg";
import banner2 from "../../../assets/banner/banner2.jpg";
import banner3 from "../../../assets/banner/banner3.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroBanner.scss";
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
            <div
                style={{ position: "relative" }}
                className="hero-banner-container"
            >
                <ImageSlider images={images} />
                <div className="booking-click">
                    <h3>ĐẶT LỊCH GIỮ CHỖ CHỈ 30 GIÂY</h3>
                    <p>Cắt xong trả tiền, hủy lịch không sao</p>
                    <Link to="/dat-lich" className="booking-click-link">
                        ĐẶT LỊCH NGAY
                    </Link>
                </div>
            </div>
        );
    }
}

export default HeroBanner;
