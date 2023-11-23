import React, { Component } from "react";
import { connect } from "react-redux";
import "./FooterMini.scss";

class FooterMini extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer-login d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2023. All rights reserved.
                </div>
            </div>
        );
    }
}

export default FooterMini;
