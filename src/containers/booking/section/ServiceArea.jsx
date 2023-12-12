import React, { Component } from "react";
import { Link } from "react-router-dom";

import cat_goi_message from "../../../assets/service/icon/cat_goi_message.jpg";
import khong_gian from "../../../assets/service/khong-gian-banner.png";
import cong_nghe_vuot_troi from "../../../assets/service/cong_nghe_vuot_troi.png";
import lam_chu_thoi_gian from "../../../assets/service/lam_chu_thoi_gian.png";

import "./ServiceArea.scss";

class ServiceArea extends Component {
    render() {
        return (
            <div className="container service-area">
                <div>
                    <Link to="/dich-vu" className="service-experience-link">
                        KHÔNG GIAN & CÔNG NGHỆ
                    </Link>
                    <h3 className="service-experience-text">
                        Trải nghiệm không gian mở
                    </h3>
                </div>

                <Link to="/dich-vu">
                    {" "}
                    <img
                        src={khong_gian}
                        alt=""
                        className="service-experience-img"
                    />
                </Link>

                <div className="service-experience-container row">
                    <Link to="/dich-vu" className="service-experience-box col">
                        <img src={cong_nghe_vuot_troi} alt="" className="" />
                        <div>
                            <h4 className="text-center">Công nghệ hiện đại</h4>
                        </div>
                    </Link>
                    <Link to="/dich-vu" className="service-experience-box col">
                        <img src={lam_chu_thoi_gian} alt="" className="" />
                        <div>
                            <h4 className="text-center">Làm chủ thời gian</h4>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default ServiceArea;
