import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

import "./MainShop.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const replaceIfOverflow = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + "...";
    }
    return str;
};

function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "₫";
}

function Items({ currentItems }) {
    return (
        <div className="shop-main-card">
            {currentItems.map((product, index) => (
                <Link
                    key={product.productId}
                    to={`/san-pham/${product.productId}`}
                >
                    <div key={product.productId} className="shop-main-item">
                        <div>
                            <img
                                src={`https://localhost:7109${product.image}`}
                                alt={product.name}
                            />
                        </div>
                        <h3 className="shop-main-item-name">
                            {replaceIfOverflow(product.name, 55)}
                        </h3>
                        <p className="mb-0">{currencyFormat(product.price)}</p>
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
    );
}

function PaginatedItems({ itemsPerPage }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get(`/api/ProductApi`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="shop-main-content container mt-3">
            <Items currentItems={currentItems} />

            <div className="shop-main-show-more">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    className="paginate-container d-flex justify-content-center mt-5 "
                />
            </div>
        </div>
    );
}

function MainShop() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                axios
                    .get("/api/BlogApi")
                    .then((response) => {
                        setBlogs(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchBlogs();
    }, []);

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
                <p className="mb-0" style={{ color: "black" }}>
                    GỢI Ý HÔM NAY MUA SẮM LIỀN TAY
                </p>
                <p className="mb-0" style={{ color: "black" }}>
                    Lựa Chọn Ưa Chuộng Dành Cho Quý Khách
                </p>
            </div>
            <div className="shop-wrapper">
                <div className="shop-main-menu container">
                    <ul id="list" className="shop-main-menu-bar mb-0">
                        <li className="active">
                            {" "}
                            <a href="/cua-hang" style={{ color: "black" }}>
                                Sản phẩm mới
                            </a>
                        </li>
                        <li>
                            <a
                                href="/cua-hang/tao-kieu-toc"
                                style={{ color: "black" }}
                            >
                                Tạo kiểu tóc
                            </a>
                        </li>
                        <li>
                            <a
                                href="/cua-hang/cham-soc-da-mat"
                                style={{ color: "black" }}
                            >
                                Chăm sóc da mặt
                            </a>
                        </li>
                        <li>
                            <a
                                href="/cua-hang/cham-soc-co-the"
                                style={{ color: "black" }}
                            >
                                Chăm sóc cơ thể
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <PaginatedItems itemsPerPage={5} />
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
