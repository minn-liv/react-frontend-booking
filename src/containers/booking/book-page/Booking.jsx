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

import "./Booking.scss";
import Header from "../header/Header";

class Register extends Component {
    constructor(props) {
        super(props);

        this.usernameRef = createRef();
        this.passwordRef = createRef();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.state({
            ...copyState,
        });
    };
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
                                        Booking Schedule
                                    </h2>
                                    <h3 className="text-start">
                                        please enter your information
                                    </h3>
                                    <h4 className="text-start" style={{ color: 'red' }}>

                                        (*)Please enter required information
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
                                        <MDBRadio
                                            name="flexRadioDefault"
                                            id="flexRadioDefault1"
                                            label="QUẬN 1: 77 Yersin, Quận 1, TP. HCM"
                                            defaultChecked
                                        />
                                    </div>
                                    <div className="radio-branch">
                                        <MDBRadio
                                            name="flexRadioDefault"
                                            id="flexRadioDefault2"
                                            label="QUẬN 2: 37 Xuân Thủy, Phường Thảo Điền, Quận 2"
                                        />
                                    </div>
                                    <div className="radio-branch">
                                        <MDBRadio
                                            name="flexRadioDefault"
                                            id="flexRadioDefault3"
                                            label="QUẬN 3: 262c Điện Biên Phủ, P. Võ Thị Sáu"
                                        />
                                    </div>
                                    <h3 className="text-start">
                                        Yêu cầu kỹ thuật viên *
                                    </h3>
                                    <select
                                        name=""
                                        id=""
                                        className="select-staff"
                                    >
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">
                                            Mercedes
                                        </option>
                                        <option value="audi">Audi</option>
                                    </select>
                                    <h3 className="text-start">Dịch vụ *</h3>
                                    <select
                                        name=""
                                        id=""
                                        className="select-service"
                                    >
                                        <option value="volvo">
                                            Uốn lạnh 300.000đ
                                        </option>
                                        <option value="saab">
                                            Nhuộm 7 màu 500.000đ
                                        </option>
                                        <option value="mercedes">
                                            Nhuộm 1000 màu 1 tỷ
                                        </option>
                                        <option value="audi">Audi</option>
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
