import "./FilterSection.scss";
import sanpham1 from "../../../assets/shop/product/sanpham1.jpg";
import axios from "../../../axios";
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FilterSection() {
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
        <div className="filter-container container-custom">
            <p className="filter-title mb-0">GÔM DỮ NẾP</p>
            <ul className="filter-menu">
                <li className="filter-menu-selected">Tất cả</li>
                <li>Tạo màu cho tóc</li>
                <li>Máy sấy tóc</li>
                <li>Sáp vuốt tóc</li>
                <li>Gôm giữ nếp</li>
            </ul>
            <div className="filter-info">
                <p className="mb-0 filter-info-text">Khum tìm thấy gì đâu</p>
                <div className="filter-button">
                    <p className="mb-0">Sắp xếp theo</p>
                    <select>
                        <option defaultChecked>Mặc định</option>
                        <option>A dến Á</option>
                        <option>Kimochi</option>
                    </select>
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
        </div>
    );
}

export default FilterSection;
