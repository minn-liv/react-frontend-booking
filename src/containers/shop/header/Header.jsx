import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import avatar7 from "../../../assets/avatar/avatar7.jpg";
import icon_vo_van from "../../../assets/icon_vo_van.png";
import "./Header.scss";

class Header extends Component {
    render() {
        const { userLogout, userInfo } = this.props;
        return (
            <div className="nav-wrapper">
                <nav className="nav__shop">
                    <div className="container-custom nav__container">
                        <Link to="/" className="nav__logo">
                            <img src={icon_vo_van} />
                        </Link>
                        <ul className="nav__items">
                            <li>
                                <input
                                    type="text"
                                    className="nav__items-search"
                                    placeholder="Tìm kiếm sản phẩm"
                                    id="search"
                                />
                            </li>
                            <li>
                                {/* <button className="nav__items-login">
                                    Đăng Nhập
                                </button> */}
                                {userInfo && userInfo.userID ? (
                                    <li className="nav__profile">
                                        <div className="nav__profile-avatar">
                                            <img src={avatar7} alt="" />
                                        </div>
                                        <ul>
                                            <li>
                                                <Link
                                                    to={`/profile/${userInfo.userID}`}
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
                                                to="/login"
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
                                        to={`/cart/${userInfo.userID}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            data-name="Layer 1"
                                            viewBox="0 0 24 24"
                                            id="cart"
                                        >
                                            <path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z"></path>
                                        </svg>
                                    </Link>
                                ) : (
                                    <Link
                                        className="nav__items-cart icon"
                                        to="/cart"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            data-name="Layer 1"
                                            viewBox="0 0 24 24"
                                            id="cart"
                                        >
                                            <path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z"></path>
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
                            <a href="/category">Danh mục</a>
                        </li>
                        <li>
                            <a href="#"> Combo Siêu Hời</a>
                        </li>
                        <li>
                            <a href="#"> Sản Phẩm Bán Chạy </a>
                        </li>
                        <li>
                            <a href="#">Sản Phẩm Mới</a>
                        </li>
                        <li>
                            <a href="#"> Thương Hiệu </a>
                        </li>
                        <li>
                            <a href="#"> Giới Thiệu</a>
                        </li>
                        <li>
                            <a href="#"> Liên Hệ </a>
                        </li>
                        <li>
                            <a>Blog</a>
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
