import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./CategoryShop.scss";
import Header from "../header/Header";
import FooterMini from "../../booking/footer/FooterMini";
function Category1() {
    const [products, setProducts] = useState([]);
    const [productsLength, setProductsLength] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "api/v1/ClientSearchProduct/filterProduct?productTypeId=8"
                );
                console.log("API Response:", response.data);
                setProducts(response.data);
                setProductsLength(response.data.length);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const replaceIfOverflow = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + "...";
        }
        return str;
    };
    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "₫";
    }

    return (
        <React.Fragment>
            <Header />
            <div className="filter-container container-custom">
                <p className="filter-title mb-0">DANH MỤC</p>
                <ul className="filter-menu">
                    <a href="/category">Tất cả</a>
                    <a
                        href="/category/tao-mau-cho-toc"
                        className="filter-menu-selected"
                    >
                        Tạo kiểu tóc
                    </a>
                    <a href="/#">Máy sấy tóc</a>
                    <a href="/#">Sáp vuốt tóc</a>
                    <a href="/#">Gôm giữ nếp</a>
                </ul>
                <div className="filter-info">
                    <p className="mb-0 filter-info-text text-center">
                        {productsLength} sản phẩm được tìm thấy theo *Tạo kiểu
                        tóc*
                    </p>
                    <div className="filter-button">
                        <p className="mb-0">Sắp xếp theo</p>
                        <select>
                            <option defaultChecked>Mặc định</option>
                            <option>Giá thấp nhất đến cao nhất</option>
                            <option>Giá cao nhất đến thấp nhất</option>
                        </select>
                    </div>
                </div>
                <div className="shop-main-content container mt-3">
                    <div className="shop-main-card">
                        {products.map((product) => (
                            <Link
                                key={product.productId}
                                to={`/product/${product.productId}`}
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
                                    <h3 className="shop-main-item-name mb-0">
                                        {replaceIfOverflow(product.name, 40)}
                                    </h3>
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
            </div>
            <FooterMini />
        </React.Fragment>
    );
}
export default Category1;
