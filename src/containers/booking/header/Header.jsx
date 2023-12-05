import { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import toast, { Toaster } from "react-hot-toast";
import "./Header.scss";
import avatar7 from "../../../assets/avatar/avatar7.jpg";
import icon_vo_van from "../../../assets/icon_vo_van.png";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errMessage: "",
        };
    }
    onLogout = () => {
        this.props.userLogout();
        toast.success("Đăng xuất thành công!");
    };
    render() {
        const { userInfo } = this.props;
        return (
            <nav>
                <Toaster />
                <div className="container-custom nav__container">
                    <Link to="/" className="nav__logo">
                        <img src={icon_vo_van} />
                    </Link>
                    <ul className="nav__items">
                        <li>
                            <Link to="/services" className="nav__items-link">
                                Trải nghiệm dịch vụ
                            </Link>
                        </li>
                        <li>
                            <a href="/shop" className="nav__items-link">
                                Cửa hàng
                            </a>
                        </li>
                        <li>
                            <Link to="/blog" className="nav__items-link">
                                Hành trình tỏa sáng
                            </Link>
                        </li>
                        <li>
                            <a href="" className="nav__items-link">
                                Tìm baber gần nhất
                            </a>
                        </li>
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
                                        <a onClick={() => this.onLogout()}>
                                            Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <ul style={{ display: "flex", gap: "2rem" }}>
                                <li>
                                    <Link
                                        to="/register"
                                        className="nav__items--register"
                                    >
                                        Đăng ký
                                    </Link>
                                </li>
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
                    </ul>
                    {/* <div className="nav__items--language">
                        <div
                            className={
                                language === LANGUAGES.VI
                                    ? "language-vi active"
                                    : "language-vi"
                            }
                        >
                            <span>VN</span>
                        </div>
                        <div
                            className={
                                language === LANGUAGES.EN
                                    ? "language-en active"
                                    : "language-en"
                            }
                        >
                            <span>EN</span>
                        </div>
                    </div> */}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { userLogout: () => dispatch(actions.userLogout()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
