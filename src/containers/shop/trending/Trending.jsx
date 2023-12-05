import React, { Component } from "react";
import Slider from "react-slick";

import sanpham1 from "../../../assets/shop/product/sanpham1.jpg";
import suaruamat from "../../../assets/shop/product/sua-rua-mat-1.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Trending.scss";

class Trending extends Component {
    replaceIfOverflow = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + "...";
        }
        return str;
    };
    render() {
        const images = [sanpham1, suaruamat, sanpham1, suaruamat];

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        };
        const data = [
            {
                name: `  30Shine - chuỗi salon tóc nam lớn nhất Việt Nam
                được đầu tư gần 15 triệu USDđược đầu tư gần 15 triệu USDđược đầu tư gần 15 triệu USDđược đầu tư gần 15 triệu USD`,
                img: sanpham1,
            },
            {
                name: `  30Shine - chuỗi salon tóc nam lớn nhất Việt Nam
                được đầu tư gần 15 triệu USD`,
                img: suaruamat,
            },
            {
                name: `  30Shine - chuỗi salon tóc nam lớn nhất Việt Nam
                được đầu tư gần 15 triệu USD`,
                img: sanpham1,
            },
            {
                name: `  30Shine - chuỗi salon tóc nam lớn nhất Việt Nam
                được đầu tư gần 15 triệu USD`,
                img: suaruamat,
            },
        ];

        return (
            <div className=" trending-wrapper pb-5 mb-3">
                <div className="trending-container">
                    <h2 className=" trending-title mt-3">TOP TÌM KIẾM</h2>
                    <div className="trending-box mt-5">
                        <div className="trending-card">
                            <Slider {...settings}>
                                {data.map((d) => (
                                    <div key={d.name} className="">
                                        <div className=" d-flex justify-content-center align-items-center ">
                                            <img
                                                src={d.img}
                                                alt=""
                                                className=" "
                                            />
                                        </div>

                                        <div className="d-flex flex-column align-items-center justify-content-center  ">
                                            <p className="text-xl font-semibold mt-3">
                                                {this.replaceIfOverflow(
                                                    d.name,
                                                    130
                                                )}
                                            </p>
                                        </div>
                                        <a
                                            className="trending-link text-center"
                                            href="#"
                                        >
                                            Xem tiếp &#8594;
                                        </a>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Trending;
