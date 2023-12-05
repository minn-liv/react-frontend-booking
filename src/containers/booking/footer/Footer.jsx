import React, { Component } from "react";
import { connect } from "react-redux";

import "./Footer.scss";
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
            <footer className="footer">
                {/* <div className="footer-socials">
                    <a href="">C</a>
                    <a href="">o</a>
                    <a href="">n</a>
                    <a href="">C</a>
                    <a href="">u</a>
                </div> */}
                <div className="container footer-container">
                    <article>
                        <h4>Support</h4>
                        <ul>
                            <li>
                                <a href="">Online Support</a>
                            </li>
                            <li>
                                <a href="">Call Numbers</a>
                            </li>
                            <li>
                                <a href="">Email</a>
                            </li>
                            <li>
                                <a href="">Social Support</a>
                            </li>
                            <li>
                                <a href="">Location</a>
                            </li>
                        </ul>
                    </article>
                    <article>
                        <h4>Permalinks</h4>
                        <ul>
                            <li>
                                <a href="">Home</a>
                            </li>
                            <li>
                                <a href="">Blog</a>
                            </li>
                            <li>
                                <a href="">About</a>
                            </li>
                            <li>
                                <a href="">Services</a>
                            </li>
                            <li>
                                <a href="">Contact</a>
                            </li>
                        </ul>
                    </article>
                    <article>
                        <h4>Blog</h4>
                        <ul>
                            <li>
                                <a href="">Safety</a>
                            </li>
                            <li>
                                <a href="">Repair</a>
                            </li>
                            <li>
                                <a href="">Recent</a>
                            </li>
                            <li>
                                <a href="">Popular</a>
                            </li>
                            <li>
                                <a href="">Categories</a>
                            </li>
                        </ul>
                    </article>
                    <article>
                        <h4>Blog</h4>
                        <ul>
                            <li>
                                <a href="">Safety</a>
                            </li>
                            <li>
                                <a href="">Repair</a>
                            </li>
                            <li>
                                <a href="">Recent</a>
                            </li>
                            <li>
                                <a href="">Popular</a>
                            </li>
                            <li>
                                <a href="">Categories</a>
                            </li>
                        </ul>
                    </article>
                </div>
            </footer>
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
