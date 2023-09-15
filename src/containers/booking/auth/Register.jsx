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

import "./Register.scss";
import axios from "../../../axios";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";

class Register extends Component {
    constructor(props) {
        super(props);
        this.usernameRef = createRef();
        this.nameRef = createRef();
        this.phoneRef = createRef();
        this.emailRef = createRef();
        this.passwordRef = createRef();
        this.addressRef = createRef();
        this.avatarRef = createRef();

        this.state = {
            error: "",
        };
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
            name: this.nameRef.current.value,
            phone: this.phoneRef.current.value,
            email: this.emailRef.current.value,
            password: this.passwordRef.current.value,
            address: this.addressRef.current.value,
            // avatar: this.avatarRef.current.file[0],
        };
        axios
            .post("api/v1/ClientLogin/Register", payload)
            .then((response) => {
                alert("Đăng ký thành công!");
            })
            .catch((error) => {
                if (error.response) {
                    this.setState({
                        error: error.response.data,
                    });
                } else if (error.request) {
                    console.log("Yêu cầu không thành công:", error.request);
                } else {
                    console.log("Lỗi khi gửi yêu cầu:", error.message);
                }
            });
    };

    render() {
        return (
            <div className="">
                <Header />
                <div className="" style={{ background: "#f5f5f5" }}>
                    <form
                        onSubmit={this.onSubmit}
                        encType="multipart/form-data"
                    >
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
                                    <h2 className="fw-bold mb-5">
                                        Đăng ký lẹ lên tml
                                    </h2>

                                    <MDBRow>
                                        <MDBCol col="6">
                                            <MDBInput
                                                wrapperClass="mb-4"
                                                label="Tên Đăng Nhập"
                                                id="username"
                                                type="text"
                                                ref={this.usernameRef}
                                            />
                                            {this.state.error && this.state.error.message && (
                                                <p style={{ color: "red" }}>{this.state.error.message}</p>
                                            )}
                                        </MDBCol>

                                        <MDBCol col="6">
                                            <MDBInput
                                                wrapperClass="mb-4"
                                                label="Họ Và Tên"
                                                id="name"
                                                type="text"
                                                ref={this.nameRef}
                                            />
                                            {this.state.error && this.state.error.message && (
                                                <p style={{ color: "red" }}>{this.state.error.message}</p>
                                            )}
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Số điện thoại"
                                        id="phone"
                                        type="text"
                                        ref={this.phoneRef}
                                    />
                                    {this.state.error && this.state.error.message && (
                                        <p style={{ color: "red" }}>{this.state.error.message}</p>
                                    )}
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Email"
                                        id="email"
                                        type="email"
                                        ref={this.emailRef}
                                    />
                                    {this.state.error && this.state.error.message && (
                                        <p style={{ color: "red" }}>{this.state.error.message}</p>
                                    )}
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Mật khẩu"
                                        id="password"
                                        type="password"
                                        ref={this.passwordRef}
                                    />
                                    {this.state.error && this.state.error.message && (
                                        <p style={{ color: "red" }}>{this.state.error.message}</p>
                                    )}
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Địa chỉ"
                                        id="address"
                                        type="text"
                                        ref={this.addressRef}
                                    />
                                    {this.state.error && this.state.error.message && (
                                        <p style={{ color: "red" }}>{this.state.error.message}</p>
                                    )}
                                    <div>
                                        <label className="mb-2 d-flex">
                                            Ảnh
                                        </label>
                                        <MDBFile
                                            wrapperClass="mb-4"
                                            label=""
                                            id="avatar"
                                            className="mb-4"
                                            ref={this.avatarRef}
                                        />
                                    </div>

                                    <div className="d-flex justify-content-center mb-4">
                                        <MDBCheckbox
                                            name="flexCheck"
                                            value=""
                                            id="flexCheckDefault"
                                            label="Đồng ý với các điều khoản của chúng tôi"
                                        />
                                    </div>

                                    <MDBBtn
                                        className="w-100 mb-4 btn-register"
                                        size="lg"
                                        type="submit"
                                    >
                                        ĐĂNG KÝ
                                    </MDBBtn>

                                    <div className="text-center">
                                        <p>
                                            Already Register?{" "}
                                            <Link to="/login">Đăng nhập</Link>
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
