import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { LANGUAGES } from "../../../utils/Constants";
import "./FooterMini.scss";
import { changeLanguageApp } from "../../../store/actions";

import { MDBIcon } from "mdb-react-ui-kit";

class FooterMini extends Component {
    constructor(props) {
        super(props);
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    render() {
        let language = this.props.language;
        return (
            <div className="footer-login d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2023. All rights reserved.
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterMini);
