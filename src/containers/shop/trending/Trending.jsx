import React, { Component } from "react";
import Slider from "react-slick";

import sanpham1 from "../../../assets/shop/product/sanpham1.jpg";
import suaruamat from "../../../assets/shop/product/sua-rua-mat-1.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Trending.scss";

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
                    <a key={index} href="#" className="trending-image">
                        <img src={image} alt={`Image ${index + 1}`} />
                    </a>
                ))}
            </Slider>
        );
    }
}

class Trending extends Component {
    render() {
        const images = [sanpham1, suaruamat, sanpham1, suaruamat];

        return (
            <React.Fragment>
                <div className="container trending-container">
                    <h2 className="trending-title">TOP TÌM KIẾM</h2>
                    <div style={{ position: "relative" }} className="container">
                        <ImageSlider images={images} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Trending;
