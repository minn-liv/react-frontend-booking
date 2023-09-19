import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    MDBBtn,
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
import axios from "../../../axios";

import "./Register.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";

import { ToastRegisterSuccess } from "../../../hoc/Toast/Toast";
function Register() {
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [errors, setErrors] = useState(null);

    const usernameRef = useRef();
    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const addressRef = useRef();
    const avatarRef = useRef();

    const navigate = useNavigate();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            username: usernameRef.current.value,
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            address: addressRef.current.value,
            // avatar: this.avatarRef.current.file[0],
        };
        if (!payload.username) {
            setErrors("Vui lòng nhập Tên tài khoản");
        } else if (!payload.name) {
            setErrors("Vui lòng nhập Tên người dùng");
        } else if (!payload.phone) {
            setErrors("Vui lòng nhập Số điện thoại");
        } else if (!payload.email) {
            setErrors("Vui lòng nhập Email");
        } else if (!payload.password) {
            setErrors("Vui lòng nhập Mật khẩu");
        } else if (!payload.address) {
            setErrors("Vui lòng nhập Địa chỉ");
        } else {
            console.log(payload);
            axios
                .post("api/v1/ClientLogin/Register", payload)
                .then((response) => {
                    setRegisterSuccess(true);
                })
                .catch((error) => {
                    if (error.response) {
                        setErrors(error.response.data);
                    } else if (error.request) {
                        console.log("Yêu cầu không thành công:", error.request);
                    } else {
                        console.log("Lỗi khi gửi yêu cầu:", error.message);
                    }
                });
        }
    };

    const delay = 1500;
    useEffect(() => {
        if (registerSuccess) {
            const timeout = setTimeout(() => {
                navigate("/login");
            }, delay);
        }
    }, [registerSuccess]);

    return (
        <div>
            <Header />
            <ToastRegisterSuccess showToast={registerSuccess} />
            <div className="" style={{ background: "#f5f5f5" }}>
                <form onSubmit={onSubmit} encType="multipart/form-data">
                    <MDBContainer
                        fluid
                        className=" overflow-hidden"
                        style={{ width: "50%" }}
                    >
                        <MDBCard
                            className="mx-5 mb-5 p-5 shadow-5 background-radial-gradient"
                            style={{
                                background: "hsla(0, 0%, 100%, 0.8)",
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
                                <h2 className="fw-bold mb-5">ĐĂNG KÝ</h2>

                                <MDBRow>
                                    <MDBCol col="6">
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Tên tài khoản"
                                            id="username"
                                            type="text"
                                            ref={usernameRef}
                                            autoFocus
                                        />
                                    </MDBCol>

                                    <MDBCol col="6">
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Tên người dùng"
                                            id="name"
                                            type="text"
                                            ref={nameRef}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Số điện thoại"
                                    id="phone"
                                    type="text"
                                    ref={phoneRef}
                                />
                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Email"
                                    id="email"
                                    type="email"
                                    ref={emailRef}
                                />
                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Mật khẩu"
                                    id="password"
                                    type="password"
                                    ref={passwordRef}
                                />
                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Địa chỉ"
                                    id="address"
                                    type="text"
                                    ref={addressRef}
                                />
                                <div>
                                    <label className="mb-2 d-flex">Ảnh</label>
                                    <MDBFile
                                        wrapperClass="mb-4"
                                        label=""
                                        id="avatar"
                                        className="mb-4"
                                        ref={avatarRef}
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

export default Register;
