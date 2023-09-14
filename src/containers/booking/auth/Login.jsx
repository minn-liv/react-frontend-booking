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
    MDBRow,
    MDBCol,
    MDBCheckbox,
    MDBFile,
} from "mdb-react-ui-kit";

import { handleLoginApi } from "../../../service/authService";
import axios from "../../../axios";

import "./Login.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";

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
        axios.post("api/v1/ClientLogin/Login", payload)
        .then((response) => {
          alert("Đăng nhập thành công!");
        })
        .catch((error) => {
          if (error.response) {
            // Lỗi từ máy chủ, xem chi tiết lỗi
            console.log("Lỗi từ máy chủ:", error.response.data);
          } else if (error.request) {
            // Yêu cầu không thành công (không kết nối đến máy chủ)
            console.log("Yêu cầu không thành công:", error.request);
          } else {
            // Lỗi trong quá trình gửi yêu cầu
            console.log("Lỗi khi gửi yêu cầu:", error.message);
          }
        });
      
    };
    

    render() {
        return (
            <div className="">
                <Header />

                <div className="" style={{ background: "#f5f5f5" }}>
                    <form onSubmit={this.onSubmit}>
                        <MDBContainer
                            fluid
                            className=" overflow-hidden"
                            style={{ width: "50%" }}
                        >
                            <MDBCard
                                className="mx-5 mb-5 p-5 shadow-5 background-radial-gradient"
                                style={{
                                    background: "hsla(0, 0%, 100%, 0.8)",
                                    backdropFilter: "blur(30px)",
                                    marginTop: "1rem",
                                    backgroundImage:
                                        "linear-gradient(0deg, rgba(233, 235, 242, 0), #e8edf4)",
                                }}
                            >
                                <MDBCardBody className="p-5 text-center">
                                    <div className="alert_message">
                                        Alert nè :3 :3
                                    </div>
                                    <h2 className="fw-bold mb-5">
                                        Đăng nhập đi tml
                                    </h2>

                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Tên đăng nhập"
                                        id="phone"
                                        type="text"
                                        ref={this.usernameRef}
                                        size="lg"
                                    />
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Mật khẩu"
                                        id="password"
                                        type="password"
                                        ref={this.passwordRef}
                                        size="lg"
                                    />

                                    <MDBBtn
                                        className="w-100 mb-4 btn-register"
                                        size="lg"
                                        type="submit"
                                    >
                                        ĐĂNG NHẬP
                                    </MDBBtn>

                                    <div className="text-center">
                                        <p>
                                            Not Registered?{" "}
                                            <Link to="/register">Đăng ký</Link>
                                        </p>
                                        <p>or sign up with:</p>

                                        <MDBBtn
                                            tag="a"
                                            color="none"
                                            className="mx-3"
                                            style={{ color: "#1266f1" }}
                                        >
                                            <MDBIcon
                                                fab
                                                icon="facebook-f"
                                                size="sm"
                                            />
                                        </MDBBtn>

                                        <MDBBtn
                                            tag="a"
                                            color="none"
                                            className="mx-3"
                                            style={{ color: "#1266f1" }}
                                        >
                                            <MDBIcon
                                                fab
                                                icon="twitter"
                                                size="sm"
                                            />
                                        </MDBBtn>

                                        <MDBBtn
                                            tag="a"
                                            color="none"
                                            className="mx-3"
                                            style={{ color: "#1266f1" }}
                                        >
                                            <MDBIcon
                                                fab
                                                icon="google"
                                                size="sm"
                                            />
                                        </MDBBtn>

                                        <MDBBtn
                                            tag="a"
                                            color="none"
                                            className="mx-3"
                                            style={{ color: "#1266f1" }}
                                        >
                                            <MDBIcon
                                                fab
                                                icon="github"
                                                size="sm"
                                            />
                                        </MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBContainer>
                    </form>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
