import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

import uon_han_quoc from "../../../assets/service/uon_han_quoc.jpg";
import cat_goi_message from "../../../assets/service/icon/cat_goi_message.jpg";
import "./ServiceExperience.scss";

class ServiceExperience extends Component {
    render() {
        return (
            <div className="container service-experience">
                <div>
                    <Link to="/services" className="service-experience-link">
                        Trải nghiệm dịch vụ
                    </Link>
                    <h3 className="service-experience-text">
                        Thư giãn 30 phút bạn sẽ tỏa sáng
                    </h3>
                </div>

                <Link to="/services">
                    {" "}
                    <img
                        src={uon_han_quoc}
                        alt=""
                        className="service-experience-img"
                    />
                </Link>

                <div className="service-experience-container">
                    <Link to="/services" className="service-experience-box">
                        <img src={cat_goi_message} alt="" className="" />
                        <div>
                            <h4>Thuốc uốn cao cấp</h4>
                            <p>Được sao Hàn tin dùng</p>
                        </div>
                    </Link>
                    <Link to="/services" className="service-experience-box">
                        <img src={cat_goi_message} alt="" className="" />
                        <div>
                            <h4>Style tay nghề cao</h4>
                            <p>100% áp dụng công nghệ giao...</p>
                        </div>
                    </Link>
                    <Link to="/services" className="service-experience-box">
                        <img src={cat_goi_message} alt="" className="" />
                        <div>
                            <h4>Đa dạng phong cách</h4>
                            <p>Bao đẹp trai với mọi khuôn mặt</p>
                        </div>
                    </Link>
                    <Link to="/services" className="service-experience-box">
                        <img src={cat_goi_message} alt="" className="" />
                        <div>
                            <h4>Cắt gội message</h4>
                            <p>Bảng giá 2023 (hấp dẫn)</p>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default ServiceExperience;
