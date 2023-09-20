import React, { Component, useState, createRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import { LANGUAGES } from "../../../utils/Constants";
import { changeLanguageApp } from "../../../store/actions";
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBRadio,
    MDBTextArea,
} from "mdb-react-ui-kit";

import axios from "../../../axios";
import "./Booking.scss";
import Header from "../header/Header";

class Register extends Component {
    constructor(props) {
        super(props);

        this.usernameRef = createRef();
        this.passwordRef = createRef();

        this.state = {
            branches: [],
            staffList: [],
            services: [],
        };
    }

    componentDidMount() {
        //branch nè
        axios
            .get("api/v1/Booking/branches")
            .then((response) => {
                const branches = response.data;
                console.log("Branch data from API:", branches);
                this.setState({ branches });
            })
            .catch((error) => {
                console.error("Error fetching branch data:", error);
            });

        //Staff nè
        axios
            .get("api/AdminApi")
            .then((staffResponse) => {
                const staffList = staffResponse.data;
                this.setState({ staffList });
            })
            .catch((staffError) => {
                console.error("Error fetching staff data:", staffError);
            });
        //Services nè
        axios
            .get("api/ServiceApi")
            .then((servicesResponse) => {
                const services = servicesResponse.data;
                this.setState({ services });
            })
            .catch((servicesError) => {
                console.error("Error fetching services data:", servicesError);
            });
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            username: this.usernameRef.current.value,
            password: this.passwordRef.current.value,
        };
        if (payload) {
            console.log(payload);
        }
    };

    data = [
        { text: "One", value: 1 },
        { text: "Two", value: 2 },
        { text: "Three", value: 3 },
        { text: "Four", value: 4 },
        { text: "Other", value: 5 },
    ];

    render() {
        const { branches, staffList, services } = this.state;
        return (
            <div className="">
                <Header />

                <div
                    className=""
                    style={{ background: "#f5f5f5", paddingBottom: "1rem" }}
                >
                    <form onSubmit={this.onSubmit}>
                        <MDBContainer
                            fluid
                            className=" overflow-hidden"
                            style={{ width: "50%" }}
                        >
                            <MDBCard
                                className=" p-5 shadow-5 background-radial-gradient"
                                style={{
                                    background: "hsla(0, 0%, 100%, 0.8)",
                                    backdropFilter: "blur(30px)",
                                    marginTop: "1rem",
                                    backgroundImage:
                                        "linear-gradient(0deg, rgba(233, 235, 242, 0), #e8edf4)",
                                }}
                            >
                                <MDBCardBody className="p-5 text-center">
                                    <h2 className="fw-bold mb-5">
                                        Đặt lịch lẹ mấy cha ơi :3
                                    </h2>
                                    <h3 className="text-start">
                                        Quý khách vui lòng cho biết thông tin
                                    </h3>
                                    <h4 className="text-start">
                                        (*) Vui lòng nhập thông tin bắt buộc
                                    </h4>
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Số điện thoại"
                                        id="phone"
                                        type="text"
                                        ref={this.usernameRef}
                                        size="lg"
                                    />
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Họ và tên"
                                        id="password"
                                        type="password"
                                        ref={this.passwordRef}
                                        size="lg"
                                    />
                                    <h3 className="text-start">
                                        Thông tin dịch vụ
                                    </h3>
                                    <h3 className="text-start">
                                        Chọn chi nhánh *
                                    </h3>
                                    <div className="radio-branch">
                                        {branches.map((branch) => (
                                            <div key={branch.branchId}>
                                                <MDBRadio
                                                    name="branch"
                                                    id={`branch-${branch.branchId}`}
                                                />
                                                <h2>{branch.address}</h2>
                                                <h2>{branch.hotline}</h2>
                                            </div>
                                        ))}
                                    </div>
                                    <h3 className="text-start">
                                        Yêu cầu kỹ thuật viên *
                                    </h3>
                                    <select
                                        name=""
                                        id=""
                                        className="select-staff"
                                    >
                                        {staffList.map((staff) => (
                                            <option
                                                key={staff.staffId}
                                                value={staff.staffId}
                                            >
                                                {staff.name}
                                            </option>
                                        ))}
                                    </select>
                                    <h3 className="text-start">Dịch vụ *</h3>
                                    <select
                                        name=""
                                        id=""
                                        className="select-service"
                                    >
                                        {services.map((service) => (
                                            <option
                                                key={service.serviceId}
                                                value={service.serviceId}
                                            >
                                                {service.name} - {service.price}
                                            </option>
                                        ))}
                                    </select>
                                    <h4 className="text-start">Tổng tiền: </h4>
                                    <h4 className="text-start">
                                        Thời lượng dự kiến:{" "}
                                    </h4>
                                    <h3 className="text-start">
                                        Ngày đặt lịch *
                                    </h3>
                                    <input type="date" className="input-date" />
                                    <h3 className="text-start">
                                        Chọn khung giờ dịch vụ *
                                    </h3>
                                    <MDBTextArea
                                        label="Ghi Chú"
                                        id="textAreaExample"
                                        rows={4}
                                        className="mb-4"
                                    />
                                    <MDBBtn
                                        className="w-100 mb-4 btn-register"
                                        size="lg"
                                        type="submit"
                                    >
                                        ĐẶT LỊCH
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBContainer>
                    </form>
                </div>

                <div className="footer-login d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2020. All rights reserved.
                    </div>
                    <div>
                        <MDBBtn
                            tag="a"
                            color="none"
                            className="mx-3"
                            style={{ color: "white" }}
                        >
                            <MDBIcon fab icon="facebook-f" size="md" />
                        </MDBBtn>

                        <MDBBtn
                            tag="a"
                            color="none"
                            className="mx-3"
                            style={{ color: "white" }}
                        >
                            <MDBIcon fab icon="twitter" size="md" />
                        </MDBBtn>

                        <MDBBtn
                            tag="a"
                            color="none"
                            className="mx-3"
                            style={{ color: "white" }}
                        >
                            <MDBIcon fab icon="google" size="md" />
                        </MDBBtn>

                        <MDBBtn
                            tag="a"
                            color="none"
                            className="mx-3"
                            style={{ color: "white" }}
                        >
                            <MDBIcon fab icon="linkedin-in" size="md" />
                        </MDBBtn>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
