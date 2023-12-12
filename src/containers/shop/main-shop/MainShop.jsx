import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./MainShop.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MainShop() {
    const [products, setProducts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/ProductApi");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();

        const fetchBlogs = async () => {
            try {
                const response = await axios.get("/api/BlogApi");
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchBlogs();
    }, []);

    const onActiveBorder = () => {
        const listItems = document.querySelectorAll("#list li ");
        listItems.forEach((item) => {
            item.addEventListener("click", () => {
                listItems.forEach((li) => {
                    li.classList.remove("active");
                });

                item.classList.add("active");
            });
        });
    };
    const replaceIfOverflow = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + "...";
        }
        return str;
    };

    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "₫";
    }
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <div className="shop-container">
            <div className="shop-title text-center">
                <p className="mb-0">GỢI Ý HÔM NAY MUA SẮM LIỀN TAY</p>
                <p className="mb-0">Lựa Chọn Ưa Chuộng Dành Cho Quý Khách</p>
            </div>
            <div className="shop-wrapper">
                <div className="shop-main-menu container">
                    <ul id="list" className="shop-main-menu-bar mb-0">
                        <li onClick={onActiveBorder} className="active">
                            {" "}
                            Sản phẩm mới
                        </li>
                        <li onClick={onActiveBorder}>Tạo kiểu tóc</li>
                        <li onClick={onActiveBorder}>Chăm sóc tóc</li>
                        <li onClick={onActiveBorder}>Chăm sóc da</li>
                    </ul>
                </div>
            </div>
            <div className="shop-main-content container mt-3">
                <div className="shop-main-card">
                    {products.map((product) => (
                        <Link
                            key={product.productId}
                            to={`/san-pham/${product.productId}`}
                        >
                            <div
                                key={product.productId}
                                className="shop-main-item"
                            >
                                <div>
                                    <img
                                        src={`https://localhost:7109${product.image}`}
                                        alt={product.name}
                                    />
                                </div>
                                <h3 className="shop-main-item-name">
                                    {replaceIfOverflow(product.name, 55)}
                                </h3>
                                {/* <h3>Mã Sản phảm: {product.productId}</h3> */}
                                <p className="mb-0">
                                    {currencyFormat(product.price)}
                                </p>
                                <div className="shop-main-item-rating">
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="shop-main-show-more">
                    <button className="text-center">Xem thêm</button>
                </div>
            </div>

            <div className="shop-blog-container">
                <div className="trending-wrapper pb-5 mb-3">
                    <div className="trending-container">
                        <h2 className=" trending-title mt-3">BLOG</h2>
                        <div className="trending-box mt-5">
                            <div className="trending-card">
                                <Slider {...settings}>
                                    {blogs.map((item, index) => (
                                        <div key={index} className="">
                                            <div className=" d-flex justify-content-center align-items-center ">
                                                <img
                                                    src={`https://localhost:7109${item.thumbnail}`}
                                                    alt=""
                                                    style={{
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </div>

                                            <div className="d-flex flex-column align-items-center justify-content-center  ">
                                                <p className="text-xl font-semibold mt-3">
                                                    {replaceIfOverflow(
                                                        item.titile,
                                                        130
                                                    )}
                                                </p>
                                            </div>
                                            <a
                                                className="trending-link text-center"
                                                href={`/bai-viet/${item.blogPostId}`}
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
            </div>
        </div>
    );
}

export default MainShop;
