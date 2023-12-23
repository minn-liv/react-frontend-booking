import { Component, useEffect, useState, useRef } from "react";
import ReactPaginate from "react-paginate";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from "mdb-react-ui-kit";
import { connect } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import axios from "../../../axios";
import "./Profile.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";
import moment from "moment-timezone";

const replaceIfOverflow = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + "...";
    }
    return str;
};

function formatDateTime(dateTimeString) {
    let originalMoment = moment(dateTimeString);

    let vietnamMoment = originalMoment.clone().tz("Asia/Ho_Chi_Minh");

    return vietnamMoment.format("DD/MM/YYYY HH:mm");
}
function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "₫";
}
function ItemsBooking({ currentItems }) {
    return (
        <>
            <MDBCardText className="mb-4">
                <span
                    className=" font-italic me-1 font-weight-bold"
                    style={{
                        color: "black",
                        fontSize: "1.5rem",
                    }}
                >
                    <strong>Lịch sử đặt lịch cắt tóc</strong>
                </span>{" "}
            </MDBCardText>
            <MDBTable hover>
                <MDBTableHead light>
                    <tr>
                        <th scope="col">Dịch vụ</th>
                        <th scope="col">Nhân viên phục vụ</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Tình Trạng</th>
                        <th scope="col">Thời gian</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {currentItems &&
                        currentItems.length > 0 &&
                        currentItems.map((item, index) => (
                            <tr key={index}>
                                <th scope="col">{item.combo.name}</th>
                                <th scope="col">{item.staff.name}</th>
                                <th scope="col">{item.branch.address}</th>
                                <th scope="col">
                                    {item.status ? "Đang Đợi" : "Hoàn Thành"}
                                </th>
                                <th scope="col">
                                    {formatDateTime(item.dateTime)}
                                </th>
                            </tr>
                        ))}
                </MDBTableBody>
            </MDBTable>
        </>
    );
}

function PaginatedItemsBooking({ itemsPerPage }) {
    const [data, setData] = useState([]);
    const userInfo = useSelector((state) => state.user.userInfo);
    useEffect(() => {
        axios
            .get(`/api/v1/ClientBuyProductApi/GetBooking/${userInfo.userID}`)
            .then((response) => {
                setData(response.data);
            });
    }, []);
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <MDBRow className="mt-5">
            <MDBCol md="12">
                <MDBCard className="mb-4 mb-md-0">
                    <div className="p-5">
                        <ItemsBooking currentItems={currentItems} />
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">>"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="<<"
                            renderOnZeroPageCount={null}
                            className="paginate-container d-flex justify-content-center mt-5 "
                        />
                    </div>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    );
}

function ItemsBuying({ currentItems }) {
    console.log(currentItems);
    return (
        <>
            <MDBCardText className="mb-4">
                <span
                    className=" font-italic me-1 font-weight-bold"
                    style={{
                        color: "black",
                        fontSize: "1.5rem",
                    }}
                >
                    <strong>Lịch sử mua hàng</strong>
                </span>{" "}
            </MDBCardText>
            <MDBTable hover responsive>
                <MDBTableHead light>
                    <tr>
                        <th scope="col" colSpan={9}>
                            Tên sản phẩm
                        </th>
                        <th scope="col" colSpan={1}>
                            Số lượng
                        </th>
                        <th scope="col" colSpan={1}>
                            Tổng thanh toán
                        </th>
                        <th scope="col" colSpan={1}>
                            Thời Gian
                        </th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {currentItems &&
                        currentItems.length > 0 &&
                        currentItems.map((item, index) => (
                            <tr key={index}>
                                <th scope="col" colSpan={9}>
                                    {replaceIfOverflow(item.productName, 50)}
                                </th>
                                <th scope="col" colSpan={1}>
                                    {item.quantity}
                                </th>
                                <th scope="col" colSpan={1}>
                                    {currencyFormat(item.price)}
                                </th>
                                <th scope="col" colSpan={1}>
                                    {formatDateTime(item.createdAt)}
                                </th>
                            </tr>
                        ))}
                </MDBTableBody>
            </MDBTable>
        </>
    );
}

function PaginatedItemsBuying({ itemsPerPage }) {
    const [data, setData] = useState([]);
    const userInfo = useSelector((state) => state.user.userInfo);

    useEffect(() => {
        axios
            .get(
                `/api/v1/ClientBuyProductApi/GetAllBillDetails/${userInfo.userID}`
            )
            .then((response) => {
                setData(response.data);
            });
    }, []);
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <MDBRow className="mt-5">
            <MDBCol md="12">
                <MDBCard className="mb-4 mb-md-0">
                    <div className="p-5">
                        <ItemsBuying currentItems={currentItems} />
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">>"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="<<"
                            renderOnZeroPageCount={null}
                            className="paginate-container d-flex justify-content-center mt-5 "
                        />
                    </div>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    );
}

function ModalProfile(userData) {
    const [basicModal, setBasicModal] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const user = userData.userData;

    useEffect(() => {
        setName(user.name);
        setPhone(user.phone);
        setAddress(user.address);
    }, [userData]);

    const toggleOpen = () => setBasicModal(!basicModal);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: name,
            phone: phone,
            address: address,
        };
        if (!payload.name && !payload.phone && !payload.address) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
        } else if (
            !/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(payload.phone)
        ) {
            toast.error("Vui lòng nhập đúng đúng định dạng số điện thoại");
        } else {
            try {
                const clientId = userInfo.userID;
                axios
                    .put(`/api/v1/ClientUpdateApi/update/${clientId}`, payload)
                    .then(() => {
                        toast.success("Chỉnh sửa thông tin thành công");
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500);
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error(
                            "Chỉnh sửa thông tin thất bại. Vui lòng thử lại!"
                        );
                    });
            } catch (error) {
                console.error("Error updating client", error);
            }
        }
    };

    return (
        <>
            <MDBBtn onClick={toggleOpen}>Chỉnh sửa thông tin</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Chỉnh sửa thông tin</MDBModalTitle>
                            <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={toggleOpen}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody
                            className="d-flex flex-column"
                            style={{ gap: "1rem" }}
                        >
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Tên Người Dùng"
                                id="name"
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Số điện thoại"
                                id="phone"
                                type="text"
                                value={phone}
                                onChange={(event) =>
                                    setPhone(event.target.value)
                                }
                            />
                            <MDBInput
                                wrapperClass="mb-4"
                                label="Địa chỉ"
                                id="address"
                                type="text"
                                value={address}
                                onChange={(event) =>
                                    setAddress(event.target.value)
                                }
                            />
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={onSubmit}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            email: "",
            name: "",
            phone: "",
            address: "",
            basicModal: false,
            historyBuying: [],
            historyBooking: [],
        };
    }

    componentDidMount() {
        if (this.props.userInfo.userID) {
            axios
                .get(`/api/v1/ClientLogin/user/${this.props.userInfo.userID}`)
                .then((response) => {
                    this.setState({
                        userData: response.data,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    toggleShow = () => {};
    render() {
        let userData = this.state.userData;
        const { isLoggedIn } = this.props;
        if (!isLoggedIn) {
            return <Navigate to="/dang-nhap" />;
        }
        return (
            <div className="profile-container">
                <Header />
                <Toaster />
                <section style={{ backgroundColor: "#eee" }} className="mt-0">
                    <MDBContainer className="py-5">
                        <MDBRow>
                            <MDBCol lg="4">
                                <MDBCard className="mb-4">
                                    <MDBCardBody className="profile-avatar-container text-center ps-4">
                                        <p
                                            className="text-muted mb-4 mt-4"
                                            style={{ fontSize: "20px" }}
                                        >
                                            {userData.name}
                                        </p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <ModalProfile userData={userData} />
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                            <MDBCol lg="8">
                                <MDBCard className="mb-4">
                                    <MDBCardBody className="profile-information-container">
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Email</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">
                                                    {userData.email}
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
                                                    {userData.phone}
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
                                                    {userData.address}
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>

                        <PaginatedItemsBooking itemsPerPage={5} />
                        <PaginatedItemsBuying itemsPerPage={5} />
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
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
