import React, { Component } from "react";
import { connect } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import { changeLanguageApp } from "../../../store/actions";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

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
import FooterMini from "../footer/FooterMini";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            branches: [],
            staffList: [],
            services: [],
            selectedBranchId: null,
            staffListByBranch: [],
            selectedStaffId: null,
            selectedServiceId: null,
            selectedServicePrice: 0,
        };
    }

    componentDidMount() {
        //branch nè
        axios
            .get("/api/v1/Booking/branches")
            .then((response) => {
                const branches = response.data;
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
            .get("/api/ServiceApi")
            .then((servicesResponse) => {
                const services = servicesResponse.data;

                this.setState({ services });
            })
            .catch((servicesError) => {
                console.error("Error fetching services data:", servicesError);
            });
    }

    getStaffByBranch = (branchId) => {
        const staffList = this.state.staffList;
        const filteredStaffList = staffList.filter(
            (staff) => staff.branchId === branchId
        );
        return filteredStaffList;
    };

    handleBranchChange = (event) => {
        const selectedBranchId = parseInt(event.target.value);
        const staffListByBranch = this.getStaffByBranch(selectedBranchId);

        this.setState({
            selectedBranchId: selectedBranchId,
            staffListByBranch: staffListByBranch,
            selectedStaffId: null,
        });
    };

    handleServiceChange = (event) => {
        const selectedServiceId = parseInt(event.target.value);
        const selectedService = this.state.services.find(
            (service) => service.serviceId === selectedServiceId
        );

        if (selectedService) {
            this.setState({
                selectedServiceId: selectedServiceId,
                selectedServicePrice: selectedService.price,
            });
        } else {
            this.setState({
                selectedServiceId: null,
                selectedServicePrice: 0,
            });
        }
    };

    onSubmit = (ev) => {
        ev.preventDefault();
        toast.loading("Waiting.....", {
            duration: 1000,
        });
        const phone = document.getElementById("phone").value;
        const name = document.getElementById("password").value;
        const selectedStaffId = document.querySelector(".select-staff").value;
        const selectedServiceId =
            document.querySelector(".select-service").value;
        const selectedBranchId = document
            .querySelector('input[name="branch"]:checked')
            .id.split("-")[1];
        const selectedDate = document.querySelector(".input-date").value;
        const note = document.getElementById("textAreaExample").value;
        // this.props.userInfo && this.props.userInfo.userID
        //     ? userInfo.userID
        //     : null;
        let idUser;
        if (this.props.userInfo && this.props.userInfo.userID) {
            idUser = this.props.userInfo.userID;
        } else {
            idUser = null;
        }
        const clientId = idUser ? parseInt(idUser) : null;
        let responseMessage;
        if (clientId) {
            responseMessage = "Đặt lịch thành công. Vui lòng kiểm tra Email!";
        } else {
            responseMessage =
                "Đặt lịch thành công. Nhân viên sẽ liên hệ với bạn thông qua điện thoại";
        }
        if (
            phone &&
            name &&
            selectedStaffId &&
            selectedServiceId &&
            selectedBranchId &&
            selectedDate
        ) {
            const payload = {
                phone: phone,
                name: name,
                staffId: parseInt(selectedStaffId),
                comboId: parseInt(selectedServiceId),
                branchId: parseInt(selectedBranchId),
                dateTime: selectedDate,
                note: note,
                status: true,
                clientId: clientId,
            };

            axios
                .post("/api/v1/Booking/create", payload)
                .then((response) => {
                    setTimeout(() => {
                        toast.success(responseMessage);
                    }, 500);
                })
                .catch((error) => {
                    setTimeout(() => {
                        toast.error("Đặt lịch thất bại. Vui lòng thử lại!");
                    }, 500);
                });
        } else {
            console.error("All required fields must be filled.");
        }
    };

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
                                        Đặt lịch ne
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
                                        size="lg"
                                    />
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Họ và tên"
                                        id="password"
                                        type="text"
                                        size="lg"
                                    />
                                    <h3 className="text-start">
                                        Thông tin dịch vụ
                                    </h3>
                                    <h3 className="text-start">
                                        Chọn chi nhánh *
                                    </h3>
                                    <div className="select-branch">
                                        {branches.map((branch) => (
                                            <div key={branch.branchId}>
                                                <input
                                                    type="radio"
                                                    id={`branch-${branch.branchId}`}
                                                    name="branch"
                                                    value={branch.branchId}
                                                    checked={
                                                        this.state
                                                            .selectedBranchId ===
                                                        branch.branchId
                                                    }
                                                    onChange={
                                                        this.handleBranchChange
                                                    }
                                                />
                                                <label
                                                    htmlFor={`branch-${branch.branchId}`}
                                                >
                                                    {branch.address} -{" "}
                                                    {branch.hotline}
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                    <h3 className="text-stajrt">
                                        Yêu cầu kỹ thuật viên *
                                    </h3>
                                    <select
                                        name=""
                                        id=""
                                        className="form-control select-staff"
                                        value={this.state.selectedStaffId}
                                        onChange={(event) =>
                                            this.setState({
                                                selectedStaffId:
                                                    event.target.value,
                                            })
                                        }
                                    >
                                        <option value="" disabled>
                                            Chọn nhân viên
                                        </option>
                                        {this.state.staffListByBranch.map(
                                            (staff) => (
                                                <option
                                                    key={staff.staffId}
                                                    value={staff.staffId}
                                                >
                                                    {staff.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <h3 className="text-start">Dịch vụ *</h3>
                                    <select
                                        name=""
                                        id=""
                                        className="select-service"
                                        onChange={this.handleServiceChange}
                                        value={this.state.selectedServiceId}
                                    >
                                        <option value="" disabled>
                                            Select a service
                                        </option>
                                        {services.map((service) => (
                                            <option
                                                key={service.serviceId}
                                                value={service.serviceId}
                                            >
                                                {service.name}
                                            </option>
                                        ))}
                                    </select>
                                    <h4 className="text-start">
                                        Price services:{" "}
                                        {this.state.selectedServicePrice}
                                    </h4>
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
                    <FooterMini />
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
