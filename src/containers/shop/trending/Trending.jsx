import React, { Component } from "react";
import Slider from "react-slick";
import axios from "../../../axios";

import sanpham1 from "../../../assets/shop/product/sanpham1.jpg";
import suaruamat from "../../../assets/shop/product/sua-rua-mat-1.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Trending.scss";

class Trending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrProduct: [],
        };
    }

    replaceIfOverflow = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + "...";
        }
        return str;
    };

    componentDidMount(prevProps, prevState, snapshot) {
        axios
            .get(`/api/v1/ClientBuyProductApi/GetBestSellingProduct`)
            .then((response) => {
                this.setState({
                    arrProduct: response.data,
                });
            })
            .catch((error) => {
                console.error("Error fetching branch data:", error);
            });
    }

    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        };

        const product = this.state.arrProduct;
        return (
            <div className=" trending-wrapper pb-5 mb-3">
                <div className="trending-container">
                    <h2 className=" trending-title mt-3">TOP TÌM KIẾM</h2>
                    <div className="trending-box mt-5">
                        <div className="trending-card">
                            <Slider {...settings}>
                                {product.map((item, index) => (
                                    <div key={index}>
                                        <div className=" d-flex justify-content-center align-items-center ">
                                            <img
                                                src={`https://localhost:7109${item.image}`}
                                                alt=""
                                                style={{ objectFit: "contain" }}
                                            />
                                        </div>

                                        <div className="d-flex flex-column align-items-center justify-content-center  ">
                                            <p
                                                className="text-xl font-semibold "
                                                style={{ height: "40px" }}
                                            >
                                                {this.replaceIfOverflow(
                                                    item.name,
                                                    100
                                                )}
                                            </p>
                                        </div>
                                        <a
                                            className="trending-link text-center"
                                            href={`/san-pham/${item.productId}`}
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
