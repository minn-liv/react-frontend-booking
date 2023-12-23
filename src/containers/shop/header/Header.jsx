import React, { Component, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import main_banner from "../../../assets/main_banner.png";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import axios from "../../../axios";

function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const onSubmitSearch = (event) => {
        event.preventDefault();
        navigate(`/tim-kiem/${searchQuery}`);
    };
    return (
        <form onSubmit={onSubmitSearch}>
            <input
                type="text"
                placeholder="Nhập từ khóa..."
                className="nav__items-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Tìm kiếm</button>
        </form>
    );
}

function NotificationsCart() {
    const userInfo = useSelector((state) => state.user.userInfo);
    const [arrCart, setArtCart] = useState([]);
    const lengthCart = arrCart.length;
    useEffect(() => {
        if (userInfo) {
            axios
                .get(`/api/v1/ClientBuyProductApi/GetCart/${userInfo.userID}`)
                .then((response) => {
                    setArtCart(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching branch data:", error);
                });
        }
    }, []);

    if (lengthCart) {
        return <div className="nav__items-cart-notification">{lengthCart}</div>;
    }
}
class Header extends Component {
    render() {
        const { userLogout, userInfo } = this.props;
        return (
            <div className="nav-wrapper">
                <nav className="nav__shop">
                    <div className="container-custom nav__container">
                        <Link to="/" className="nav__logo">
                            <img
                                src={main_banner}
                                alt="img-banner"
                                style={{ objectFit: "contain" }}
                            />
                        </Link>
                        <ul className="nav__items">
                            <li>
                                <Search />
                            </li>
                            <li>
                                {userInfo && userInfo.userID ? (
                                    <li className="nav__profile">
                                        <div className="nav__profile-avatar">
                                            <p className="mb-0">
                                                {userInfo.username} {""}
                                                <svg
                                                    viewBox="0 0 1024 1024"
                                                    focusable="false"
                                                    data-icon="caret-down"
                                                    width="1em"
                                                    height="1em"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                                                </svg>
                                            </p>
                                        </div>
                                        <ul>
                                            <li>
                                                <Link
                                                    to={`/trang-ca-nhan/${userInfo.userID}`}
                                                >
                                                    Thông tin cá nhân
                                                </Link>
                                            </li>

                                            <li>
                                                <a onClick={userLogout}>
                                                    Đăng xuất
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                ) : (
                                    <ul
                                        style={{ display: "flex", gap: "2rem" }}
                                    >
                                        <li>
                                            <Link
                                                to="/dang-nhap"
                                                className="nav__items--register"
                                            >
                                                Đăng nhập
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li className="nav__items-last-child">
                                {userInfo && userInfo.userID ? (
                                    <Link
                                        className="nav__items-cart icon"
                                        to={`/gio-hang/${userInfo.userID}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            id="cart"
                                        >
                                            <path
                                                fill="#444"
                                                d="M14 13.1V12H4.6l.6-1.1 9.2-.9L16 4H3.7L3 1H0v1h2.2l2.1 8.4L3 13v1.5c0 .8.7 1.5 1.5 1.5S6 15.3 6 14.5 5.3 13 4.5 13H12v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.4-1.2-1-1.4zM4 5h10.7l-1.1 4-8.4.9L4 5z"
                                            ></path>
                                        </svg>

                                        <NotificationsCart />
                                    </Link>
                                ) : (
                                    <Link
                                        className="nav__items-cart icon"
                                        to="/gio-hang-false"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#000000"
                                            version="1.1"
                                            id="Capa_1"
                                            width="800px"
                                            height="800px"
                                            viewBox="0 0 902.86 902.86"
                                        >
                                            <g>
                                                <g>
                                                    <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z     M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z" />
                                                    <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717    c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744    c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742    C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744    c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z     M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742    S619.162,694.432,619.162,716.897z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="nav__menu">
                    <ul className="nav__menu-items mb-0">
                        <li>
                            <a href="/danh-muc">Danh mục</a>
                        </li>
                        <li>
                            <a href="/danh-muc/san-pham-ban-chay">
                                {" "}
                                Sản Phẩm Bán Chạy{" "}
                            </a>
                        </li>

                        <li>
                            <a href="/ve-chung-toi"> Giới Thiệu</a>
                        </li>
                        <li>
                            <a href="/#"> Liên Hệ </a>
                        </li>
                        <li>
                            <a href="/blog">Blog</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { userLogout: () => dispatch(actions.userLogout()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
