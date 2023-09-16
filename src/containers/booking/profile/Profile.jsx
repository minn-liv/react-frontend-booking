import React, { Component, useState, createRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils/Constants";
import { changeLanguageApp } from "../../../store/actions";
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

import "./Profile.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basicModal: false,
        };

        this.nameRef = createRef();
        this.phoneRef = createRef();
        this.addressRef = createRef();
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: this.nameRef.current.value,
            phone: this.phoneRef.current.value,
            address: this.addressRef.current.value,
        };
        if (payload) {
            console.log(payload);
        }
    };

    toggleShow = () => {
        this.setState((prevState) => ({
            basicModal: !prevState.basicModal,
        }));
    };

    render() {
        const { basicModal } = this.state;
        return (
            <div className="">
                <Header />

                <section style={{ backgroundColor: "#eee" }}>
                    <MDBModal show={basicModal} tabIndex="-1">
                        <form action="" onSubmit={this.onSubmit}>
                            <MDBModalDialog>
                                <MDBModalContent>
                                    <MDBModalHeader>
                                        <MDBModalTitle>
                                            Chỉnh sửa thông tin
                                        </MDBModalTitle>
                                        <MDBBtn
                                            className="btn-close"
                                            color="none"
                                            onClick={this.toggleShow}
                                        ></MDBBtn>
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Tên Người Dùng"
                                            id="name"
                                            type="text"
                                            ref={this.nameRef}
                                        />
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Số điện thoại"
                                            id="phone"
                                            type="text"
                                            ref={this.phoneRef}
                                        />
                                        <MDBInput
                                            wrapperClass="mb-4"
                                            label="Địa chỉ"
                                            id="address"
                                            type="text"
                                            ref={this.addressRef}
                                        />
                                    </MDBModalBody>

                                    <MDBModalFooter>
                                        <MDBBtn
                                            color="secondary"
                                            onClick={this.toggleShow}
                                        >
                                            Close
                                        </MDBBtn>
                                        <MDBBtn type="submit">
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
                                            style={{}}
                                            fluid
                                        />
                                        <p className="text-muted mb-1 mt-3">
                                            Full Stack Developer
                                        </p>
                                        <p className="text-muted mb-4">
                                            Bay Area, San Francisco, CA
                                        </p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <MDBBtn onClick={this.toggleShow}>
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
                                                    Full Name
                                                </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">
                                                    Johnatan Smith
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
                                                    example@example.com
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Phone</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">
                                                    (097) 234-5678
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>
                                                    Mobile
                                                </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">
                                                    (098) 765-4321
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>
                                                    Address
                                                </MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">
                                                    Bay Area, San Francisco, CA
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
