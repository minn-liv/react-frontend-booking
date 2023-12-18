import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import "./Cart.scss";
import Header from "../header/Header";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import FooterMini from "../../booking/footer/FooterMini";
import axios from "../../../axios";

class CategoryShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCart: [],
            arrCheck: [],
            allChecked: false,
        };
    }
    componentDidMount(prevProps, prevState, snapshot) {
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
        // if (prevProps.cart !== this.props.cart) {
        //     this.setState({
        //         arrCart: this.props.cart,
        //     });
        // }
        // console.log(this.props.cart);
    }

    TamTinhTien = () => {
        return this.state.arrCart.reduce(
            (total, item) => total + item.totalAmount,
            0
        );
    };

    tongSoLuongSP = () => {
        return this.state.arrCart.reduce(
            (totalQuantity, item) => totalQuantity + item.quantity,
            0
        );
    };

    XoaTungSanPham = (productId, quantity) => {
        const { userID } = this.props.userInfo;
        axios
            .delete(
                `/api/v1/ClientBuyProductApi/RemoveFromCart/${userID}/${productId}/${quantity}`
            )
            .then(() => {
                console.log("xoa ok");
            })
            .catch((error) => {
                console.error("Error removing item from cart:", error);
            });
    };

    buyAllInCart = () => {
        const { userID } = this.props.userInfo;

        axios
            .post(`/api/v1/ClientBuyProductApi/BuyAllInCart/${userID}`)
            .then((response) => {
                console.log("Purchase successful:", response.data);

                window.location.reload();
            })
            .catch((error) => {
                console.error("Error purchasing items:", error);
            });
    };

    IncreaseAnDecrease = (productId, operation) => {
        const { userID } = this.props.userInfo;

        let axiosRequest;

        if (operation === "increase") {
            axiosRequest = axios.put(
                `/api/v1/ClientBuyProductApi/UpdateCartIncrease/${userID}/${productId}`
            );
        } else if (operation === "decrease") {
            axiosRequest = axios.put(
                `/api/v1/ClientBuyProductApi/UpdateCartDecrease/${userID}/${productId}`
            );
        }

        if (axiosRequest) {
            axiosRequest
                .then((response) => {
                    console.log(
                        `Quantity ${operation}d successfully`,
                        response
                    );
                    this.fetchCartData();
                    window.location.reload();
                })
                .catch((error) => {
                    console.error(`Error ${operation}ing quantity:`, error);
                    window.location.reload();
                });
        }
    };

    handleCheckboxChange = () => {
        this.setState((prevState) => ({
            allChecked: !prevState.allChecked,
        }));
    };

    onCheckBoxChange = (productId) => {
        let { arrCheck } = this.state;

        // const index = arrCheck.indexOf(productId);
        arrCheck.push(productId);

        this.setState({ arrCheck: arrCheck });
    };

    onCheckBoxAll = () => {
        const { arrCheck, allChecked } = this.state;

        if (allChecked) {
            // Nếu đã chọn "Check All", xóa toàn bộ sản phẩm khỏi arrCheck
            this.setState({ arrCheck: [] });
        } else {
            // Nếu chưa chọn "Check All", thêm tất cả sản phẩm vào arrCheck
            const allProductIds = this.state.arrCart.map(
                (item) => item.productId
            );
            this.setState({ arrCheck: allProductIds });
        }

        this.setState((prevState) => ({ allChecked: !prevState.allChecked }));
    };

    XoaTatCaSanPham = () => {
        const { userID } = this.props.userInfo;
        const productsToDelete = this.state.arrCart
            .filter((item) => item.isChecked)
            .map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            }));
        console.log(this.state.arrCheck);
        // this.props.deleteAllCart(userID, productsToDelete);

        axios
            .delete(`/api/v1/ClientBuyProductApi/removeAll/${userID}`, {
                products: this.state.arrCheck,
            })

            .then(() => {
                console.log("Xóa tất cả sản phẩm thành công");
                this.fetchCartData();
                window.location.reload();
            })
            .catch((error) => {
                console.error(
                    "Lỗi khi xóa tất cả sản phẩm từ giỏ hàng:",
                    error
                );
                window.location.reload();
            });
    };
    onDeleteItem = (productId, quantity) => {
        const { userID } = this.props.userInfo;
        this.props.deleteAItemCart(userID, productId, quantity);
        window.location.reload();
    };
    currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "₫";
    }

    increaseQuantity = () => {};

    render() {
        const { isLoggedIn } = this.props;

        if (!isLoggedIn) {
            return <Navigate to="/dang-nhap" />;
        }
        let arrCart = this.state.arrCart;
        return (
            <React.Fragment>
                <Header />
                <div className="cart-container">
                    <p className="cart-title container">GIỎ HÀNG</p>
                    <div className="cart-main container">
                        {this.state.arrCart.map((item, key) => (
                            <ul className="cart-list mb-0 " key={key}>
                                <li className="cart-item">
                                    <div className="cart-item-box">
                                        <img
                                            src={`https://localhost:7109${item.productImage}`}
                                        />
                                        <div>
                                            <p className="mb-0 cart-item-price">
                                                Mã Sản Phẩm: {item.productId}
                                            </p>
                                            <p className="mb-0">
                                                {item.productName}
                                            </p>
                                            <p className="mb-0 cart-item-price">
                                                Giá tiền tạm tính theo từng sản
                                                phẩm:{" "}
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
                            </ul>
                        ))}
                        <div className="cart-checkout-box">
                            <div className="cart-checkout-select-all">
                                <input
                                    type="checkbox"
                                    checked={this.state.allChecked}
                                    onChange={() => this.onCheckBoxAll()}
                                />
                                <p className="mb-0">Tất cả</p>
                            </div>
                            <div className="cart-checkout-button">
                                <div>
                                    <p className="mb-0">
                                        Tạm tính:{" "}
                                        {this.currencyFormat(
                                            this.TamTinhTien()
                                        )}
                                    </p>
                                    <p className="mb-0">
                                        ({this.tongSoLuongSP()} sản phẩm)
                                    </p>
                                </div>
                                <button onClick={this.XoaTatCaSanPham}>
                                    Xóa sản phẩm đã chọn
                                </button>
                                <button onClick={this.buyAllInCart}>
                                    ĐẶT HÀNG
                                </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryShop);
