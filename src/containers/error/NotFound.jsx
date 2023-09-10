import React, { Component } from "react";
import { connect } from "react-redux";
import { changeLanguageApp } from "../../store/actions";

import "./NotFound.scss";
import Header from "../booking/header/Header";
import { Link } from "react-router-dom";
class NotFound extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <section class="page_404">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 ">
                                <div class=" col-sm-offset-1  text-center">
                                    <div class="four_zero_four_bg">
                                        <h1 class="text-center ">404</h1>
                                    </div>

                                    <div class="contant_box_404">
                                        <h3 class="h2">
                                            Look like you're lost
                                        </h3>

                                        <p>
                                            the page you are looking for not
                                            avaible!
                                        </p>

                                        <Link to="/" class="link_404">
                                            Go to Home
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
