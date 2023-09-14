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
        
        axios.post("/api/v1/ClientLogin/Login", payload)
            .then((response) => {
                // Kiểm tra trạng thái của phản hồi từ API
                if (response.status === 200) {
                    console.log("Đăng nhập thành công!");
                    // Thực hiện các hành động sau khi đăng nhập thành công, ví dụ: chuyển hướng người dùng
                } else {
                    console.log("Đăng nhập không thành công!");
                    // Xử lý trường hợp đăng nhập không thành công, ví dụ: hiển thị thông báo lỗi
                }
            })
            .catch((error) => {
                // Xử lý lỗi từ API
                console.error("Lỗi khi gọi API đăng nhập:", error);
                // Hiển thị thông báo lỗi cho người dùng hoặc thực hiện các hành động khác tùy thuộc vào loại lỗi
                
                // In nội dung lỗi từ máy chủ
                console.log("Nội dung lỗi từ máy chủ:", error.response.data);
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
