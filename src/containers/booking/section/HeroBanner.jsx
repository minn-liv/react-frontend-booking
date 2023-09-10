import React, { Component, useState } from "react";
import Slider from "react-slick";
import banner from "../../../assets/banner/banner.jpg";
import banner2 from "../../../assets/banner/banner2.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HeroBanner.scss";

class HeroBanner extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        };
        return (
            <div className="home__slide">
                <div className="home__slider">
                    <Slider {...settings}>
                        <div>
                            <img src={banner} />
                            123123
                        </div>
                        <div>
                            <img src={banner2} />
                        </div>
                    </Slider>
                </div>
            </div>
        );
    }
}

export default HeroBanner;
