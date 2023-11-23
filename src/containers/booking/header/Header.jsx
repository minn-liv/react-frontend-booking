import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";

import { ToastLogoutSuccess } from "../../../hoc/Toast/Toast";
import "./Header.scss";
import avatar7 from "../../../assets/avatar/avatar7.jpg";
import icon_vo_van from "../../../assets/icon_vo_van.png";
function Header() {
    const { user, id, setId, setUser } = useStateContext();
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    const idUser = localStorage.getItem("Id");
    useEffect(() => {
        if (idUser) {
            fetchData();
        }
    }, [idUser]);
    const onLogout = () => {
        setId(null);
        setUser(null);
        setLogoutSuccess(true);
    };

    const fetchData = async () => {
        try {
            const response = await fetch(
                `https://localhost:7109/api/v1/ClientLogin/user/${idUser}`
            );
            const result = await response.json();
            setUser(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <nav>
            <ToastLogoutSuccess showToast={logoutSuccess} />
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
                    {idUser ? (
                        <li className="nav__profile">
                            <div className="nav__profile-avatar">
                                <img src={avatar7} alt="" />
                            </div>
                            <ul>
                                <li>
                                    <Link to={`profile/${idUser}`}>
                                        Thông tin cá nhân
                                    </Link>
                                </li>
                                <li>
                                    <a onClick={onLogout}>Đăng xuất</a>
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

export default Header;
