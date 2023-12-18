import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import avatar7 from "../../../assets/avatar/avatar7.jpg";
import icon_vo_van from "../../../assets/icon_vo_van.png";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

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
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { searchQuery: "" };
    }

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
                                                    class=""
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
                                        to="/gio-hang-false"
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
