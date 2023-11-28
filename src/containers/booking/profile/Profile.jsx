import { Component } from "react";
import { Navigate } from "react-router-dom";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
} from "mdb-react-ui-kit";
import { connect } from "react-redux";

import axios from "../../../axios";
import "./Profile.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            phone: "",
            address: "",
            userData: "",
            basicModal: false,
        };
    }

    // if (!idUser) {
    //     return <Navigate to="/login" />;
    // }
    fetchData = async () => {
        try {
            if (this.props.userInfo.userID) {
                const response = await fetch(
                    `https://localhost:7109/api/v1/ClientLogin/user/${this.props.userInfo.userID}`
                );
                const user = await response.json();
                this.setState({
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    componentDidUpdate() {
        this.fetchData();
    }

    onSubmit = async () => {
        const payload = {
            name: "",
            phone: "",
            address: "",
        };
        if (payload) {
            try {
                const clientId = this.props.userInfo.userID;
                const response = await axios.put(
                    `/api/v1/ClientUpdateApi/update/${clientId}`,
                    payload
                );
                if (response.status === 200) {
                    const data = response.data;
                    console.log(data);
                    console.log(
                        data.name,
                        data.phone,
                        data.address,
                        data.email
                    );
                } else {
                    console.error("Failed to update client:", response.data);
                }
            } catch (error) {
                console.error("Error updating client", error);
            }
        }
    };

    toggleShow = () => {};
    render() {
        let userInfo = this.props.userInfo;
        return (
            <div className="">
                <Header />
                <section style={{ backgroundColor: "#eee" }}>
                    <MDBModal
                        show={this.state.basicModal}
                        setShow={() => this.toggleShow()}
                        tabIndex="-1"
                    >
                        <form action="">
                            <MDBModalDialog>
                                <MDBModalContent>
                                    <MDBModalHeader>
                                        <MDBModalTitle>
                                            Chỉnh sửa thông tin
                                        </MDBModalTitle>
                                        <MDBBtn
                                            className="btn-close"
                                            color="none"
                                            onClick={() => this.toggleShow()}
                                        ></MDBBtn>
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Tên Người Dùng"
                                            id="name"
                                            type="text"
                                        />
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Số điện thoại"
                                            id="phone"
                                            type="text"
                                        />
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Địa chỉ"
                                            id="address"
                                            type="text"
                                        />
                                    </MDBModalBody>

                                    <MDBModalFooter>
                                        <MDBBtn
                                            color="secondary"
                                            type="button"
                                            onClick={() => this.toggleShow()}
                                        >
                                            Close
                                        </MDBBtn>
                                        <MDBBtn
                                            type="submit"
                                            onClick={() => this.toggleShow()}
                                        >
                                            Save changes
                                        </MDBBtn>
                                    </MDBModalFooter>
                                </MDBModalContent>
                            </MDBModalDialog>
                        </form>
                    </MDBModal>
                    <MDBContainer className="py-5">
                        <MDBRow>
                            <MDBCol lg="4">
                                <MDBCard className="mb-4">
                                    <MDBCardBody className="profile-avatar-container text-center ps-4">
                                        <MDBCardImage
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                            alt="avatar"
                                            className="rounded-circle"
                                            fluid
                                        />
                                        <p
                                            className="text-muted mb-4 mt-4"
                                            style={{ fontSize: "20px" }}
                                        >
                                            {userInfo.name}
                                        </p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <MDBBtn
                                                onClick={() => this.fetchData()}
                                            >
                                                Chỉnh sửa thông tin
                                            </MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol lg="8">
                                <MDBCard className="mb-4">
                                    <MDBCardBody className="profile-information-container">
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>
                                                    Tên người dùng
                                                </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">
                                                    {userInfo.name}
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Email</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">
                                                    {userInfo.email}
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>
                                                    Số điện thoại
                                                </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">
                                                    {userInfo.phone}
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>
                                                    Địa chỉ
                                                </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">
                                                    {userInfo.address}
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
                <FooterMini />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
