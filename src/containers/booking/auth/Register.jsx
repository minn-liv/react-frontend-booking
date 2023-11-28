import { useState, useRef, useEffect, Component } from "react";
import { Link, Navigate } from "react-router-dom";
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
import CommonUtils from "../../../utils/CommonUtils";
import "./Register.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";
import toast, { Toaster } from "react-hot-toast";

import { ToastRegisterSuccess } from "../../../hoc/Toast/Toast";
// function Register() {
//     const [registerSuccess, setRegisterSuccess] = useState(false);
//     const [errors, setErrors] = useState(null);

//     const usernameRef = useRef();
//     const nameRef = useRef();
//     const phoneRef = useRef();
//     const emailRef = useRef();
//     const passwordRef = useRef();
//     const addressRef = useRef();
//     const avatarRef = useRef();

//     const navigate = useNavigate();

//     // const onChangeImage = async (event) => {
//     //     let data = event.target.files;
//     //     let file = data[0];
//     //     if(file) {
//     //         let base64 = await
//     //     }
//     // }

//     const openPreviewImage = () => {
//         if (!avatarRef) {
//             return;
//         }
//     };
//     const onSubmit = (ev) => {
//         ev.preventDefault();
//         const payload = {
//             username: usernameRef.current.value,
//             name: nameRef.current.value,
//             phone: phoneRef.current.value,
//             email: emailRef.current.value,
//             password: passwordRef.current.value,
//             address: addressRef.current.value,
//             // avatar: this.avatarRef.current.file[0],
//         };
//         if (!payload.username) {
//             setErrors("Vui lòng nhập Tên tài khoản");
//         } else if (!payload.name) {
//             setErrors("Vui lòng nhập Tên người dùng");
//         } else if (!payload.phone) {
//             setErrors("Vui lòng nhập Số điện thoại");
//         } else if (!payload.email) {
//             setErrors("Vui lòng nhập Email");
//         } else if (!payload.password) {
//             setErrors("Vui lòng nhập Mật khẩu");
//         } else if (!payload.address) {
//             setErrors("Vui lòng nhập Địa chỉ");
//         } else {
//             console.log(payload);
//             axios
//                 .post("api/v1/ClientLogin/Register", payload)
//                 .then((response) => {
//                     setRegisterSuccess(true);
//                 })
//                 .catch((error) => {
//                     if (error.response) {
//                         setErrors(error.response.data);
//                     } else if (error.request) {
//                         console.log("Yêu cầu không thành công:", error.request);
//                     } else {
//                         console.log("Lỗi khi gửi yêu cầu:", error.message);
//                     }
//                 });
//         }
//     };

//     const delay = 1500;
//     useEffect(() => {
//         if (registerSuccess) {
//             const timeout = setTimeout(() => {
//                 navigate("/login");
//             }, delay);
//         }
//     }, [registerSuccess]);
//     return (

//     );
// }

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            previewImgURL: "",
            errors: "",
            username: "",
            name: "",
            phone: "",
            email: "",
            password: "",
            address: "",
            avatar: "",
            registerSuccess: false,
        };
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };

        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    // checkValidateInput = () => {
    //     let isValid = true;
    //     let arrCheck = [
    //         "email",
    //         "password",
    //         "firstName",
    //         "lastName",
    //         "phoneNumber",
    //         "address",
    //         "gender",
    //         "position",
    //         "role",
    //         "avatar",
    //     ];
    //     for (let i = 0; i < arrCheck.length; i++) {
    //         if (!this.state[arrCheck[i]]) {
    //             isValid = false;
    //             alert("This is input is required: " + arrCheck[i]);
    //             break;
    //         }
    //     }

    //     return isValid;
    // };

    onSubmit = () => {
        const payload = {
            username: this.state.username,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            avatar: this.state.avatar,
        };
        if (!payload.username) {
            this.setState({
                errors: "Vui lòng nhập Tên tài khoản",
            });
        } else if (!payload.name) {
            this.setState({
                errors: "Vui lòng nhập Tên người dùng",
            });
        } else if (!payload.phone) {
            this.setState({
                errors: "Vui lòng nhập Số điện thoại",
            });
        } else if (!payload.email) {
            this.setState({
                errors: "Vui lòng nhập Tên Email",
            });
        } else if (!payload.password) {
            this.setState({
                errors: "Vui lòng nhập Mật khẩu",
            });
        } else if (!payload.address) {
            this.setState({
                errors: "Vui lòng nhập Địa chỉ",
            });
        } else {
            axios
                .post("api/v1/ClientLogin/Register", payload)
                .then((response) => {
                    toast.loading("Waiting.....", {
                        duration: 1500,
                    });
                    setTimeout(() => {
                        toast.success("Đăng ký thành công!");
                    }, 2000);
                    setTimeout(() => {
                        this.setState({
                            registerSuccess: true,
                        });
                    }, 3500);
                })
                .catch((error) => {
                    let errorMessage = error.response.data.message;
                    this.setState({
                        errors: errorMessage,
                    });
                });
            // }
        }
    };

    render() {
        let {
            username,
            name,
            phone,
            email,
            password,
            address,
            avatar,
            errors,
        } = this.state;
        return (
            <div>
                {this.state.registerSuccess && <Navigate to="/login" />}
                <Header />
                <Toaster />
                {/* <ToastRegisterSuccess showToast={registerSuccess} /> */}
                <div
                    className="register-container"
                    style={{ background: "#f5f5f5" }}
                >
                    <div>
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
                                    {this.state.errors && (
                                        <div className="alert_message failed">
                                            {this.state.errors}
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
                                                value={username}
                                                autoFocus
                                                onChange={(event) => {
                                                    this.onChangeInput(
                                                        event,
                                                        "username"
                                                    );
                                                }}
                                            />
                                        </MDBCol>

                                        <MDBCol col="6">
                                            <MDBInput
                                                wrapperClass="mb-4"
                                                label="Tên người dùng"
                                                id="name"
                                                type="text"
                                                value={name}
                                                onChange={(event) => {
                                                    this.onChangeInput(
                                                        event,
                                                        "name"
                                                    );
                                                }}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Số điện thoại"
                                        id="phone"
                                        type="text"
                                        value={phone}
                                        onChange={(event) => {
                                            this.onChangeInput(event, "phone");
                                        }}
                                    />
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Email"
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(event) => {
                                            this.onChangeInput(event, "email");
                                        }}
                                    />
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Mật khẩu"
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(event) => {
                                            this.onChangeInput(
                                                event,
                                                "password"
                                            );
                                        }}
                                    />
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Địa chỉ"
                                        id="address"
                                        type="text"
                                        value={address}
                                        onChange={(event) => {
                                            this.onChangeInput(
                                                event,
                                                "address"
                                            );
                                        }}
                                    />
                                    <div>
                                        <label
                                            className="mb-2 d-flex"
                                            htmlFor="avatar"
                                        >
                                            Ảnh
                                        </label>
                                        <MDBFile
                                            wrapperClass="mb-4"
                                            id="avatar"
                                            className="mb-4"
                                            type="file"
                                            onChange={(event) => {
                                                this.handleOnChangeImage(event);
                                            }}
                                        />
                                        <div
                                            className="preview-image"
                                            style={{
                                                backgroundImage: `url(${this.state.previewImgURL})`,
                                            }}
                                            onClick={() => {
                                                this.openPreviewImage();
                                            }}
                                        ></div>
                                    </div>

                                    <div className="d-flex justify-content-center mb-4">
                                        <MDBCheckbox
                                            name="flexCheck"
                                            value=""
                                            id="flexCheckDefault"
                                            label="Đồng ý với các điều khoản của chúng tôi"
                                        />
                                    </div>

                                    <button
                                        className="w-100 mb-4 btn-register"
                                        size="lg"
                                        onClick={() => {
                                            this.onSubmit();
                                        }}
                                    >
                                        ĐĂNG KÝ
                                    </button>

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
                    </div>
                </div>
                <FooterMini />
            </div>
        );
    }
}
export default Register;
