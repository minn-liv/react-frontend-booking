import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import "./Cart.scss";
import Header from "../header/Header";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import FooterMini from "../../booking/footer/FooterMini";
import sanpham1 from "../../../assets/shop/product/sanpham1.jpg";
import axios from "../../../axios";

class CategoryShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCart: [],
            allChecked: false,
        };
    }
    componentDidMount() {
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
    handleCheckboxChange = () => {
        this.setState((prevState) => ({
            allChecked: !prevState.allChecked,
        }));
    };

    ChechBox = (productId) => {
        const updatedCart = this.state.arrCart.map((item) => {
            if (item.productId === productId) {
                return {
                    ...item,
                    isChecked: !item.isChecked,
                };
            }
            return item;
        });

        this.setState({
            arrCart: updatedCart,
        });
    };

    XoaTatCaSanPham = () => {
        const { userID } = this.props.userInfo;
        const productsToDelete = this.state.arrCart
            .filter((item) => item.isChecked)
            .map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            }));

        axios
            .delete(`/api/v1/ClientBuyProductApi/removeAll/${userID}`, {
                products: productsToDelete,
            })
            .then(() => {
                console.log("Xóa tất cả sản phẩm thành công");
                this.fetchCartData();
            })
            .catch((error) => {
                console.error(
                    "Lỗi khi xóa tất cả sản phẩm từ giỏ hàng:",
                    error
                );
            });
    };

    render() {
        const { isLoggedIn } = this.props;

        if (!isLoggedIn) {
            return <Navigate to="/login" />;
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
                                    <input
                                        type="checkbox"
                                        checked={
                                            item.isChecked ||
                                            this.state.allChecked
                                        }
                                        onChange={() =>
                                            this.toggleProductCheckbox(
                                                item.productId
                                            )
                                        }
                                    />
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
                                                phẩm: {item.totalAmount}
                                            </p>
                                            <p className="mb-0 cart-item-price">
                                                số Lượng: {item.quantity}
                                            </p>
                                            <div className="cart-item-button">
                                                <button>
                                                    Cộng trừ nhân chia sản phẩm
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        this.XoaTungSanPham(
                                                            item.productId,
                                                            item.quantity
                                                        )
                                                    }
                                                >
                                                    Xóa sản phẩm
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        ))}
                        <div className="cart-checkout-box">
                            <div className="cart-checkout-select-all">
                                <input
                                    type="checkbox"
                                    checked={this.state.allChecked}
                                    onChange={this.handleCheckboxChange}
                                />
                                <p className="mb-0">Tất cả</p>
                            </div>
                            <div className="cart-checkout-button">
                                <div>
                                    <p className="mb-0">
                                        Tạm tính: {this.TamTinhTien()}{" "}
                                    </p>
                                    <p className="mb-0">
                                        ({this.tongSoLuongSP()} sản phẩm)
                                    </p>
                                </div>
                                <button onClick={this.XoaTatCaSanPham}>
                                    Xóa sản phẩm đã chọn
                                </button>
                                <button>ĐẶT HÀNG</button>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryShop);
