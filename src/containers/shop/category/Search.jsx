import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import empty_cart from "../../../assets/shop/empty-cart.png";
import Header from "../header/Header";
import FooterMini from "../../booking/footer/FooterMini";

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
        <div className="shop-main-card mt-4 ">
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
    const [errorData, setErrorData] = useState(false);
    const { query } = useParams();
    const [productsLength, setProductsLength] = useState(0);
    const [sortType, setSortType] = useState("default");

    useEffect(() => {
        axios
            .get(`/api/v1/ClientSearchProduct/search?keyword=${query}`)
            .then((response) => {
                setData(response.data);
                setErrorData(false);
                setProductsLength(response.data.length);
            })
            .catch((error) => {
                console.log(error);
                setErrorData(true);
            });
    }, [query]);

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    const handleSort = (type) => {
        setSortType(type);
        let sortedData = [];

        if (type === "default") {
            sortedData = [...data];
        } else if (type === "lowToHigh") {
            sortedData = [...data].sort((a, b) => a.price - b.price);
        } else if (type === "highToLow") {
            sortedData = [...data].sort((a, b) => b.price - a.price);
        }
        setData(sortedData);
    };

    return (
        <div className="shop-main-content container mt-3">
            <div className="filter-info">
                <p className="mb-0 filter-info-text text-center">
                    {errorData
                        ? ""
                        : `${productsLength} sản phẩm được tìm thấy theo *${query}*`}
                </p>
                <div className="filter-button">
                    <p className="mb-0">Sắp xếp theo</p>
                    <select
                        id="sortSelect"
                        value={sortType}
                        onChange={(e) => handleSort(e.target.value)}
                    >
                        <option value="default">Mặc định</option>
                        <option value="lowToHigh">
                            Giá thấp nhất đến cao nhất
                        </option>
                        <option value="highToLow">
                            Giá cao nhất đến thấp nhất
                        </option>
                    </select>
                </div>
            </div>
            {errorData ? (
                <div className="shop-main-content-error">
                    <img src={empty_cart} alt="empty-cart" />
                    <p>Không tìm thấy sản phẩm phù hợp</p>
                </div>
            ) : (
                <Items currentItems={currentItems} />
            )}
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

function Search() {
    return (
        <React.Fragment>
            <Header />
            <div className="filter-container container-custom">
                <p className="filter-title mb-0">Tìm kiếm</p>
                <ul className="filter-menu">
                    <a href="/danh-muc">Tất cả</a>
                    <a href="/danh-muc/tao-mau-cho-toc">Tạo kiểu tóc</a>
                    <a href="/danh-muc/cham-soc-da-mat">Chăm sóc da mặt</a>
                    <a href="/danh-muc/cham-soc-toc">Chăm sóc tóc</a>
                </ul>

                <PaginatedItems itemsPerPage={5} />
            </div>
            <FooterMini />
        </React.Fragment>
    );
}
export default Search;
