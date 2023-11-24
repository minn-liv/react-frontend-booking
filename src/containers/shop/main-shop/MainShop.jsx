import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios";
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
    return (
        <div className="shop-container">
            <div className="shop-title text-center">
                <p className="mb-0">GỢI Ý HÔM NAY MUA SẮM LIỀN TAY</p>
                <p className="mb-0">Lựa Chọn Ưa Chuộng Dành Cho Quý Khách</p>
            </div>
            <div className="shop-wrapper">
                <div className="shop-main-menu container">
                    <ul className="shop-main-menu-bar mb-0">
                        <li>Sản phẩm mới</li>
                        <li>Tạo kiểu tóc</li>
                        <li>Chăm sóc tóc</li>
                        <li>Chăm sóc da</li>
                    </ul>
                </div>
            </div>
            <div className="shop-main-content container mt-3">
                <div className="shop-main-card">
                {products.map((product) => (
                    <Link key={product.productId} to={`/product/${product.productId}`}>
                        <div key={product.productId} className="shop-main-item">
                            <img src={`https://localhost:7109${product.image}`} alt={product.name} />
                            <h3><strong>{product.name}</strong></h3>
                            <h3>Mã Sản phảm: {product.productId}</h3>
                            <p>{product.price} đ</p>
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
