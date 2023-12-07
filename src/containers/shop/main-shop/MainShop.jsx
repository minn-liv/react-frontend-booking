import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./MainShop.scss";
function MainShop() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/ProductApi");
                console.log("API Response:", response.data);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
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
            <div className="shop-branding container">
                <p>THƯƠNG HIỆU</p>
            </div>

            <div className="shop-blog container">
                <p>BLOG</p>
            </div>
        </div>
    );
}

export default MainShop;
