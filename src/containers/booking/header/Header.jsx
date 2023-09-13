import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { LANGUAGES } from "../../../utils/Constants";
import "./Header.scss";
import { changeLanguageApp } from "../../../store/actions";

class Header extends Component {
    constructor(props) {
        super(props);
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    render() {
        let language = this.props.language;
        return (
            <nav>
                <div className="container-custom nav__container">
                    <Link to="/" className="nav__logo">
                        Avatar Đẹp Trai
                    </Link>
                    <ul className="nav__items">
                        <li>
                            <Link to="/services" className="nav__items-link">
                                <FormattedMessage id="header.service-experience" />
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="nav__items-link">
                                <FormattedMessage id="header.shop" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="nav__items-link">
                                <FormattedMessage id="header.shining-journey" />
                            </a>
                        </li>
                        <li>
                            <a href="" className="nav__items-link">
                                <FormattedMessage id="header.find-baber" />
                            </a>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="nav__items--register"
                            >
                                <FormattedMessage id="header.register" />
                            </Link>
                        </li>
                    </ul>
                    <div className="nav__items--language">
                        <div
                            className={
                                language === LANGUAGES.VI
                                    ? "language-vi active"
                                    : "language-vi"
                            }
                        >
                            <span
                                onClick={() =>
                                    this.changeLanguage(LANGUAGES.VI)
                                }
                            >
                                VN
                            </span>
                        </div>
                        <div
                            className={
                                language === LANGUAGES.EN
                                    ? "language-en active"
                                    : "language-en"
                            }
                        >
                            <span
                                onClick={() =>
                                    this.changeLanguage(LANGUAGES.EN)
                                }
                            >
                                EN
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => {
            dispatch(changeLanguageApp(language));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
