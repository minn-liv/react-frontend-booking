import "./FilterSection.scss";
import axios from "../../../axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function FilterSection() {
    const [products, setProducts] = useState([]);
    const [productsLength, setProductsLength] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/ProductApi");
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
        <div className="filter-container container-custom">
            <p className="filter-title mb-0">DANH MỤC</p>
            <ul className="filter-menu">
                <a href="/category" className="filter-menu-selected">
                    Tất cả
                </a>
                <a href="/category/tao-mau-cho-toc">Tạo màu cho tóc</a>
                <a>Máy sấy tóc</a>
                <a>Sáp vuốt tóc</a>
                <a>Gôm giữ nếp</a>
            </ul>
            <div className="filter-info">
                <p className="mb-0 filter-info-text">
                    {productsLength} sản phẩm được tìm thấy theo *Tất cả*
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
                                <h3 className="shop-main-item-name  mb-0">
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
    );
}

export default FilterSection;
