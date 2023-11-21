import { useState, useRef, useEffect } from "react";
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

import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "../../../axios";
import "./Profile.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";

function Profile() {
    const { user, id, setId, setUser } = useStateContext();
    const [basicModal, setBasicModal] = useState(false);

    const nameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const idUser = localStorage.getItem("Id");

    useEffect(() => {
        if (user) {
            nameRef.current.value = user.name || "";
            phoneRef.current.value = user.phone || "";
            addressRef.current.value = user.address || "";
        }
    }, [user]);

    if (!idUser) {
        return <Navigate to="/login" />;
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value,
        };
        if (payload) {
            try {
                const clientId = user.clientId;
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

    const toggleShow = () => {
        setBasicModal(!basicModal);
    };

    return (
        <div className="">
            <Header />
            <section style={{ backgroundColor: "#eee" }}>
                <MDBModal
                    show={basicModal}
                    setShow={setBasicModal}
                    tabIndex="-1"
                >
                    <form action="" onSubmit={onSubmit}>
                        <MDBModalDialog>
                            <MDBModalContent>
                                <MDBModalHeader>
                                    <MDBModalTitle>
                                        Chỉnh sửa thông tin
                                    </MDBModalTitle>
                                    <MDBBtn
                                        className="btn-close"
                                        color="none"
                                        onClick={toggleShow}
                                    ></MDBBtn>
                                </MDBModalHeader>
                                <MDBModalBody>
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Tên Người Dùng"
                                        id="name"
                                        type="text"
                                        ref={nameRef}
                                    />
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Số điện thoại"
                                        id="phone"
                                        type="text"
                                        ref={phoneRef}
                                    />
                                    <MDBInput
                                        wrapperClass="mb-4"
                                        label="Địa chỉ"
                                        id="address"
                                        type="text"
                                        ref={addressRef}
                                    />
                                </MDBModalBody>

                                <MDBModalFooter>
                                    <MDBBtn
                                        color="secondary"
                                        type="button"
                                        onClick={toggleShow}
                                    >
                                        Close
                                    </MDBBtn>
                                    <MDBBtn type="submit" onClick={toggleShow}>
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
                                        {user.username}
                                    </p>
                                    <div className="d-flex justify-content-center mb-2">
                                        <MDBBtn onClick={toggleShow}>
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
                                                {user.name}
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
                                                {user.email}
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
                                                {user.phone}
                                            </MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Địa chỉ</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">
                                                {user.address}
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

export default Profile;
