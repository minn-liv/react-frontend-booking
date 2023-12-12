import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import { LANGUAGES } from "../../../utils/Constants";
import "./Services.scss";
import { changeLanguageApp } from "../../../store/actions";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import cat_goi_10_buoc from "../../../assets/service/cat_goi_10_buoc.jpg";
import service_list_1 from "../../../assets/service/list_combo/service_list_1.jpg";
import service_list_2 from "../../../assets/service/list_combo/service_list_2.jpg";
import service_list_3 from "../../../assets/service/list_combo/service_list_3.jpg";
import service_list_4 from "../../../assets/service/list_combo/service_list_4.jpg";
import vip_combo from "../../../assets/service/vip_combo.jpg";

class Services extends Component {
    constructor(props) {
        super(props);
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    render() {
        let language = this.props.language;
        return (
            <div>
                <Header />
                <section className="service-section mt-0">
                    <div className="container container-service">
                        <div className="service-block service-block-first">
                            <div className="service-block-title">
                                Combo cắt gội 10 bước
                            </div>
                            <div className="service-block-img">
                                <div className="">
                                    <img src={cat_goi_10_buoc} alt="" />
                                </div>
                            </div>

                            <div className="service-block-text">
                                Dịch vụ chăm sóc tóc đặc biệt dùng kèm Combo
                            </div>

                            <MDBRow className="service-block-list-container">
                                <MDBCol
                                    size={3}
                                    className="service-block-list-item"
                                >
                                    <img src={service_list_1} alt="" />
                                </MDBCol>
                                <MDBCol
                                    size={3}
                                    className="service-block-list-item"
                                >
                                    <img src={service_list_2} alt="" />
                                </MDBCol>
                                <MDBCol
                                    size={3}
                                    className="service-block-list-item"
                                >
                                    <img src={service_list_3} alt="" />
                                </MDBCol>
                                <MDBCol
                                    size={3}
                                    className="service-block-list-item"
                                >
                                    <img src={service_list_4} alt="" />
                                </MDBCol>
                            </MDBRow>
                        </div>
                        <div className="service-block">
                            <div className="service-block-title">VIP COMBO</div>
                            <div className="service-block-img">
                                <div className="">
                                    <img src={vip_combo} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <FooterMini />
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

export default connect(mapStateToProps, mapDispatchToProps)(Services);
