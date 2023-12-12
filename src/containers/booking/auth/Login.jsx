import { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
} from "mdb-react-ui-kit";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../../axios";

import * as actions from "../../../store/actions";
import "./Login.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errMessage: "",
            loginSuccess: false,
        };
    }

    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        });
    };
    onChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    onLogin = async () => {
        this.setState({
            errMessage: "",
        });
        const payload = {
            username: this.state.username,
            password: this.state.password,
        };
        if (!payload.username) {
            this.setState({
                errMessage: "Vùi lòng nhập tên tài khoản",
            });
        } else if (!payload.password) {
            this.setState({
                errMessage: "Vui lòng nhập mật khẩu",
            });
        } else {
            axios
                .post("api/v1/ClientLogin/Login", payload)
                .then((response) => {
                    toast.loading("Waiting.....", {
                        duration: 1000,
                    });
                    setTimeout(() => {
                        toast.success("Đăng nhập thành công!");
                    }, 1500);
                    setTimeout(() => {
                        this.setState({
                            loginSuccess: true,
                        });
                        this.props.userLoginSuccess(response.data);
                    }, 2500);
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 400) {
                            this.setState({
                                errMessage: "Sai tên tài khoản hoặc mật khẩu",
                            });
                        } else {
                            console.log("Lỗi khi gửi yêu cầu:", error.message);
                        }
                    }
                });
        }
    };

    render() {
        return (
            <div className="">
                {this.props.isLoggedIn && <Navigate to="/" />}
                <Toaster />
                <Header />
                <div className="" style={{ background: "#f5f5f5" }}>
                    <MDBContainer
                        fluid
                        className=" overflow-hidden pb-5 pt-3"
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
                                {this.state.errMessage && (
                                    <div className="alert_message failed">
                                        {this.state.errMessage}
                                    </div>
                                )}
                                <h2 className="fw-bold mb-5">ĐĂNG NHẬP</h2>

                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Tên tài khoản"
                                    type="text"
                                    size="lg"
                                    value={this.state.username}
                                    onChange={(event) =>
                                        this.onChangeUsername(event)
                                    }
                                    autoFocus
                                />
                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Mật khẩu"
                                    type="password"
                                    value={this.state.password}
                                    onChange={(event) =>
                                        this.onChangePassword(event)
                                    }
                                    size="lg"
                                />

                                <MDBBtn
                                    className="w-100 mb-4 btn-register"
                                    size="lg"
                                    onClick={() => {
                                        this.onLogin();
                                    }}
                                >
                                    ĐĂNG NHẬP
                                </MDBBtn>

                                <div className="text-center">
                                    <p>
                                        Not Registered?{" "}
                                        <Link to="/dang-ky">Đăng ký</Link>
                                    </p>
                                    {/* <p>or sign up with:</p>

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
                                        <MDBIcon fab icon="twitter" size="sm" />
                                    </MDBBtn>

                                    <MDBBtn
                                        tag="a"
                                        color="none"
                                        className="mx-3"
                                        style={{ color: "#1266f1" }}
                                    >
                                        <MDBIcon fab icon="google" size="sm" />
                                    </MDBBtn>

                                    <MDBBtn
                                        tag="a"
                                        color="none"
                                        className="mx-3"
                                        style={{ color: "#1266f1" }}
                                    >
                                        <MDBIcon fab icon="github" size="sm" />
                                    </MDBBtn> */}
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBContainer>
                </div>
                <FooterMini />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
