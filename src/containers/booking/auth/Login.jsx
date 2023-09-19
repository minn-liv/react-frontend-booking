import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/Constants";
import { changeLanguageApp } from "../../../store/actions";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
} from "mdb-react-ui-kit";

import axios from "../../../axios";

import "./Login.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";
import { ToastLoginSuccess } from "../../../hoc/Toast/Toast";
import { useStateContext } from "../../../contexts/ContextProvider";

function Login() {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [errors, setErrors] = useState(null);

    const usernameRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();
    const { setUser, setId, id } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };
        if (!payload.username) {
            setErrors("Vui lòng nhập tên đăng nhập");
        } else if (!payload.password) {
            setErrors("Vui lòng nhập mật khẩu");
        } else {
            axios
                .post("api/v1/ClientLogin/Login", payload)
                .then((response) => {
                    setLoginSuccess(true);
                    setId(response.data.userID);
                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 400) {
                            setErrors("Sai tên tài khoản hoặc mật khẩu !");
                        } else {
                            console.log("Lỗi khi gửi yêu cầu:", error.message);
                        }
                    }
                });
        }
    };

    const delay = 1000;
    useEffect(() => {
        if (loginSuccess) {
            const timeout = setTimeout(() => {
                navigate("/");
            }, delay);
        }
    }, [loginSuccess]);

    return (
        <div className="">
            <Header />
            <ToastLoginSuccess showToast={loginSuccess} />
            <div className="" style={{ background: "#f5f5f5" }}>
                <form onSubmit={onSubmit}>
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
                                {errors && (
                                    <div className="alert_message failed">
                                        {errors}
                                    </div>
                                )}
                                <h2 className="fw-bold mb-5">ĐĂNG NHẬP</h2>

                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Tên tài khoản"
                                    id="phone"
                                    type="text"
                                    ref={usernameRef}
                                    size="lg"
                                    autoFocus
                                />
                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Mật khẩu"
                                    id="password"
                                    type="password"
                                    ref={passwordRef}
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

export default Login;
