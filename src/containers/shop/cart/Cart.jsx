import React, { Component, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import { MDBModal, MDBModalDialog, MDBModalContent } from "mdb-react-ui-kit";
import "./Cart.scss";
import Header from "../header/Header";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import FooterMini from "../../booking/footer/FooterMini";
import axios from "../../../axios";
import cart_empty_banner from "../../../assets/shop/cart_empty_banner.jpg";
function CheckOut(arrCheckout) {
    const [basicModal, setBasicModal] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [userData, setUserData] = useState({});
    const toggleOpen = () => setBasicModal(!basicModal);
    const payload = arrCheckout.product.map((item) => ({
        UserId: userInfo.userID,
        ProductId: item.productId,
        Quantity: item.quantity,
        User: {},
        Product: {},
    }));

    useEffect(() => {
        if (userInfo.userID) {
            axios
                .get(`/api/v1/ClientLogin/user/${userInfo.userID}`)
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);
    console.log(userData.name);

    const onSubmit = (ev) => {
        ev.preventDefault();
        axios
            .post(
                "https://localhost:7109/api/v1/ClientBuyProductApi/BuyCartItems",
                payload
            )
            .then((response) => {
                setTimeout(() => {
                    toast.success(
                        "Đặt hàng thành công, Vui lòng kiểm tra Email!"
                    );
                }, 500);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch((error) => {
                setTimeout(() => {
                    toast.error("Đặt hàng thất bại, sản phẩm đã hết hàng!");
                }, 2000);
            });
    };
    const checkout = arrCheckout.product;
    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "₫";
    }
    let total = 0;
    for (let i = 0; i < checkout.length; i++) {
        total += checkout[i].totalAmount;
    }

    return (
        <>
            <button onClick={toggleOpen}>ĐẶT HÀNG</button>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <div>
                    <MDBModalDialog size="lg">
                        <MDBModalContent>
                            <div className="checkout-container">
                                <div className="checkout-close">
                                    <span onClick={toggleOpen}>X</span>
                                </div>

                                <div className="checkout-box">
                                    <div className="checkout-information ">
                                        <div className="checkout-information-top"></div>
                                        <div
                                            className="checkout-text fw-bold"
                                            style={{
                                                fontSize: "1.2rem",
                                                color: "black",
                                            }}
                                        >
                                            <svg
                                                height="16"
                                                viewBox="0 0 12 16"
                                                width="12"
                                                className="shopee-svg-icon icon-location-marker"
                                            >
                                                <path
                                                    d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                                                    fillRule="evenodd"
                                                ></path>
                                            </svg>
                                            Địa chỉ nhận hàng
                                        </div>
                                        <div
                                            className="d-flex"
                                            style={{
                                                gap: "0.5rem",
                                                padding: "0 2rem",
                                            }}
                                        >
                                            <p>
                                                {userData.name} {userData.phone}
                                            </p>
                                            <p className="fw-normal">
                                                {userData.address}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="checkout-information-top"></div>

                                    <div className="checkout-header container-fluid mt-4">
                                        <ul className="ps-0 row">
                                            <li className="col-6 fw-bold p-0">
                                                Sản phẩm
                                            </li>
                                            <li className="col-2 fw-bold p-0">
                                                Đơn giá
                                            </li>
                                            <li className="col-2 fw-bold p-0">
                                                Số lượng
                                            </li>
                                            <li className="col-2 fw-bold p-0">
                                                Thành tiền
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="checkout-body container-fluid">
                                        {checkout &&
                                            checkout.map((item, index) => {
                                                return (
                                                    <ul
                                                        className="checkout-item row"
                                                        key={index}
                                                    >
                                                        <li className="col-6 p-0">
                                                            {item.productName}
                                                        </li>
                                                        <li className="col-2 p-0">
                                                            {currencyFormat(
                                                                item.price
                                                            )}
                                                        </li>
                                                        <li className="col-2 p-0">
                                                            {item.quantity}
                                                        </li>
                                                        <li className="col-2 p-0">
                                                            {currencyFormat(
                                                                item.quantity *
                                                                    item.price
                                                            )}
                                                        </li>
                                                    </ul>
                                                );
                                            })}
                                    </div>
                                    <div className="checkout-total">
                                        <p>Tổng thanh toán:</p>
                                        <p>{currencyFormat(total)}</p>
                                    </div>
                                    <div className="checkout-button">
                                        <button onClick={onSubmit}>
                                            Đặt hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </MDBModalContent>
                    </MDBModalDialog>
                </div>
            </MDBModal>
        </>
    );
}

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basicModal: false,
            arrCart: [],
            arrCheck: [],
            arrCheckout: [],
        };
    }
    componentDidMount(prevProps, prevState, snapshot) {
        if (this.props.userInfo.userID) {
            axios
                .get(
                    `/api/v1/ClientBuyProductApi/GetCart/${this.props.userInfo.userID}`
                )
                .then((response) => {
                    this.setState({
                        arrCart: response.data,
                    });
                })
                .catch((error) => {
                    console.error("Error fetching branch data:", error);
                });
        }
    }

    totalPrice = () => {
        return this.state.arrCheckout.reduce(
            (total, item) => total + item.totalAmount,
            0
        );
    };

    totalQuantity = () => {
        return this.state.arrCheckout.reduce(
            (totalQuantity, item) => totalQuantity + item.quantity,
            0
        );
    };

    IncreaseAnDecrease = (productId, operation) => {
        const { userID } = this.props.userInfo;

        let axiosRequest;

        if (operation === "increase") {
            axiosRequest = axios
                .put(
                    `/api/v1/ClientBuyProductApi/UpdateCartIncrease/${userID}/${productId}`
                )
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    toast.error("Sản phẩm trong kho đã hết hàng");
                    console.log(error);
                });
        } else if (operation === "decrease") {
            axiosRequest = axios
                .put(
                    `/api/v1/ClientBuyProductApi/UpdateCartDecrease/${userID}/${productId}`
                )
                .then(() => {
                    window.location.reload();
                })
                .catch(() => {});
        }
    };

    // onCheckBoxAll = () => {
    //     const { arrCheck, allChecked } = this.state;

    //     if (allChecked) {
    //         this.setState({ arrCheck: [] });
    //     } else {
    //         const allProductIds = this.state.arrCart.map(
    //             (item) => item.productId
    //         );
    //         this.setState({ arrCheck: allProductIds });
    //     }

    //     this.setState((prevState) => ({ allChecked: !prevState.allChecked }));
    // };

    // XoaTatCaSanPham = () => {
    //     const { userID } = this.props.userInfo;
    //     const productsToDelete = this.state.arrCart
    //         .filter((item) => item.isChecked)
    //         .map((item) => ({
    //             productId: item.productId,
    //             quantity: item.quantity,
    //         }));
    //     console.log(this.state.arrCheck);
    //     // this.props.deleteAllCart(userID, productsToDelete);

    //     axios
    //         .delete(`/api/v1/ClientBuyProductApi/removeAll/${userID}`, {
    //             products: this.state.arrCheck,
    //         })

    //         .then(() => {
    //             console.log("Xóa tất cả sản phẩm thành công");
    //             this.fetchCartData();
    //             window.location.reload();
    //         })
    //         .catch((error) => {
    //             console.error(
    //                 "Lỗi khi xóa tất cả sản phẩm từ giỏ hàng:",
    //                 error
    //             );
    //             window.location.reload();
    //         });
    // };
    onDeleteItem = (productId, quantity) => {
        const { userID } = this.props.userInfo;
        this.props.deleteAItemCart(userID, productId, quantity);
        toast.success("Xóa sản phẩm thành công");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };
    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "₫";
    }

    increaseQuantity = () => {};

    handleCheckboxClick = (product) => {
        const { arrCheckout } = this.state;

        const isChecked = arrCheckout.some(
            (item) => item.productId === product.productId
        );

        if (isChecked) {
            this.setState((prevState) => ({
                arrCheckout: prevState.arrCheckout.filter(
                    (item) => item.productId !== product.productId
                ),
            }));
        } else {
            this.setState((prevState) => ({
                arrCheckout: [...prevState.arrCheckout, product],
            }));
        }
    };

    render() {
        const { isLoggedIn, userInfo } = this.props;
        let arrCheckout = this.state.arrCheckout;
        if (!isLoggedIn) {
            return <Navigate to="/dang-nhap" />;
        }
        let arrCart = this.state.arrCart;
        console.log(arrCheckout);
        return (
            <React.Fragment>
                <Header />
                <Toaster position="top-center" reverseOrder={false} />
                <div className="cart-container">
                    <p className="cart-title container fw-bold">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                            height="800px"
                            width="800px"
                            version="1.1"
                            id="Capa_1"
                            viewBox="0 0 483.1 483.1"
                            style={{ width: "30px", height: "30px" }}
                        >
                            <g>
                                <path d="M434.55,418.7l-27.8-313.3c-0.5-6.2-5.7-10.9-12-10.9h-58.6c-0.1-52.1-42.5-94.5-94.6-94.5s-94.5,42.4-94.6,94.5h-58.6   c-6.2,0-11.4,4.7-12,10.9l-27.8,313.3c0,0.4,0,0.7,0,1.1c0,34.9,32.1,63.3,71.5,63.3h243c39.4,0,71.5-28.4,71.5-63.3   C434.55,419.4,434.55,419.1,434.55,418.7z M241.55,24c38.9,0,70.5,31.6,70.6,70.5h-141.2C171.05,55.6,202.65,24,241.55,24z    M363.05,459h-243c-26,0-47.2-17.3-47.5-38.8l26.8-301.7h47.6v42.1c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h141.2v42.1   c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h47.6l26.8,301.8C410.25,441.7,389.05,459,363.05,459z" />
                            </g>
                        </svg>
                        GIỎ HÀNG
                    </p>
                    <div className="cart-main container">
                        {arrCart.length < 1 ? (
                            <div className="d-flex justify-content-center">
                                <img
                                    src={cart_empty_banner}
                                    alt=""
                                    style={{ width: "250px", height: "250px" }}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        {arrCart.map((item, key) => (
                            <ul className="cart-list mb-0" key={key}>
                                <div style={{ width: "2%", display: "grid" }}>
                                    <input
                                        type="checkbox"
                                        onClick={() => {
                                            this.handleCheckboxClick(item);
                                        }}
                                    />
                                </div>
                                <div
                                    className="d-flex justify-content-between cart-item-box border-bottom "
                                    style={{ borderBottom: "1px solid #ddd" }}
                                >
                                    <li className="cart-item">
                                        <div className="cart-item-box">
                                            <img
                                                src={`https://localhost:7109${item.productImage}`}
                                            />
                                            <div>
                                                <p className="mb-0 cart-item-price fw-normal">
                                                    Mã Sản Phẩm:{" "}
                                                    {item.productId}
                                                </p>
                                                <p className="mb-0 fw-normal">
                                                    {item.productName}
                                                </p>
                                                <p className="mb-0 cart-item-price fw-normal">
                                                    Giá tiền :{" "}
                                                    {this.currencyFormat(
                                                        item.totalAmount
                                                    )}
                                                </p>

                                                <div className="cart-item-button">
                                                    <div className="cart-item-button-box">
                                                        <span
                                                            className="button-decrease"
                                                            onClick={() =>
                                                                this.IncreaseAnDecrease(
                                                                    item.productId,
                                                                    "decrease"
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </span>
                                                        <span className="button-number">
                                                            {item.quantity}
                                                        </span>
                                                        <span
                                                            className="button-increase"
                                                            onClick={() =>
                                                                this.IncreaseAnDecrease(
                                                                    item.productId,
                                                                    "increase"
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <div className="cart-list-delete">
                                        <span
                                            onClick={() =>
                                                this.onDeleteItem(
                                                    item.productId,
                                                    item.quantity
                                                )
                                            }
                                        >
                                            Xóa
                                        </span>
                                    </div>
                                </div>
                            </ul>
                        ))}
                        <div className="cart-checkout-box">
                            <div className="cart-checkout-select-all">
                                {/* <input
                                    type="checkbox"
                                    checked={this.state.allChecked}
                                    onChange={() => this.onCheckBoxAll()}
                                />
                                <p className="mb-0">Tất cả</p> */}
                            </div>
                            <div className="cart-checkout-button">
                                <div>
                                    <p className="mb-0">
                                        Tạm tính:{" "}
                                        {this.currencyFormat(this.totalPrice())}
                                    </p>
                                    <p className="mb-0">
                                        ({this.totalQuantity()} sản phẩm)
                                    </p>
                                </div>
                                {/* <button onClick={this.XoaTatCaSanPham}>
                                    Xóa sản phẩm đã chọn
                                </button> */}

                                <CheckOut product={arrCheckout} />
                            </div>
                        </div>
                    </div>
                </div>
                <FooterMini />
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
        cart: state.user.cart,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCartItem: (userId) => dispatch(actions.getAllCartItem(userId)),
        deleteAllCart: (userId, product) =>
            dispatch(actions.deleteAllCart(userId, product)),
        deleteAItemCart: (userId, products, quantity) =>
            dispatch(actions.deleteAItemCart(userId, products, quantity)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
