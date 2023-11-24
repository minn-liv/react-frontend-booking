import React, { Component } from "react";
import { Navigate } from "react-router-dom";

import "./Cart.scss";
import Header from "../header/Header";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import FooterMini from "../../booking/footer/FooterMini";
import sanpham1 from "../../../assets/shop/product/sanpham1.jpg";
class CategoryShop extends Component {
    render() {
        return (
            <React.Fragment>
                {!this.props.isLoggedIn && <Navigate to="/login" />}
                <Header />
                <div className="cart-container">
                    <p className="cart-title container">
                        Giỏ hàng của thằng ngồi bên cạnh
                    </p>
                    <div className="cart-main container">
                        <ul className="cart-list mb-0 ">
                            <li className="cart-item">
                                <input type="checkbox" />
                                <div className="cart-item-box">
                                    <img src={sanpham1} />
                                    <div>
                                        <p className="mb-0">
                                            Kem ngày Dưỡng trắng Kiềm dầu 5
                                            trong 1 UNO UV Perfection Gel
                                        </p>
                                        <p className="mb-0 cart-item-price">
                                            199.000 ₫
                                        </p>
                                        <div className="cart-item-button">
                                            <button>
                                                Cộng trừ nhân chia sản phẩm
                                            </button>
                                            <button>Xóa sản phẩm</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="cart-item">
                                <input type="checkbox" />
                                <div className="cart-item-box">
                                    <img src={sanpham1} />
                                    <div>
                                        <p className="mb-0">
                                            Kem ngày Dưỡng trắng Kiềm dầu 5
                                            trong 1 UNO UV Perfection Gel
                                        </p>
                                        <p className="mb-0 cart-item-price">
                                            199.000 ₫
                                        </p>
                                        <div className="cart-item-button">
                                            <button>
                                                Cộng trừ nhân chia sản phẩm
                                            </button>
                                            <button>Xóa sản phẩm</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="cart-item">
                                <input type="checkbox" />
                                <div className="cart-item-box">
                                    <img src={sanpham1} />
                                    <div>
                                        <p className="mb-0">
                                            Kem ngày Dưỡng trắng Kiềm dầu 5
                                            trong 1 UNO UV Perfection Gel
                                        </p>
                                        <p className="mb-0 cart-item-price">
                                            199.000 ₫
                                        </p>
                                        <div className="cart-item-button">
                                            <button>
                                                Cộng trừ nhân chia sản phẩm
                                            </button>
                                            <button>Xóa sản phẩm</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="cart-item">
                                <input type="checkbox" />
                                <div className="cart-item-box">
                                    <img src={sanpham1} />
                                    <div>
                                        <p className="mb-0">
                                            Kem ngày Dưỡng trắng Kiềm dầu 5
                                            trong 1 UNO UV Perfection Gel
                                        </p>
                                        <p className="mb-0 cart-item-price">
                                            199.000 ₫
                                        </p>
                                        <div className="cart-item-button">
                                            <button>
                                                Cộng trừ nhân chia sản phẩm
                                            </button>
                                            <button>Xóa sản phẩm</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="cart-checkout-box">
                            <div className="cart-checkout-select-all">
                                <input type="checkbox" />
                                <p className="mb-0">Tất cả</p>
                            </div>
                            <div className="cart-checkout-button">
                                <div>
                                    <p className="mb-0">Tạm tính: 1 tỷ</p>
                                    <p className="mb-0">(0 sản phẩm)</p>
                                </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryShop);
