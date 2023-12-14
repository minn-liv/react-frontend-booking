import "./FilterSection.scss";
import axios from "../../../axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import ReactPaginate from "react-paginate";

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
                        {/* <h3>Mã Sản phảm: {product.productId}</h3> */}
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
        axios.get(`/api/ProductApi`).then((response) => {
            setData(response.data);
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

function FilterSection() {
    const [productsLength, setProductsLength] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/ProductApi");
                setProductsLength(response.data.length);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="filter-container container-custom">
            <p className="filter-title mb-0">DANH MỤC</p>
            <ul className="filter-menu">
                <a href="/danh-muc" className="filter-menu-selected">
                    Tất cả
                </a>
                <a href="/danh-muc/tao-mau-cho-toc">Tạo kiểu tóc</a>
                <a href="/danh-muc/cham-soc-da-mat">Chăm sóc da mặt</a>
                <a href="/danh-muc/cham-soc-toc">Chăm sóc tóc</a>
                <a href="/#">Gôm giữ nếp</a>
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
            <PaginatedItems itemsPerPage={5} />
        </div>
    );
}

export default FilterSection;
