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
                                    <input type="checkbox" />
                                    <div className="cart-item-box">
                                        <img  src={`https://localhost:7109${item.productImage}`}/>
                                        <div>
                                            <p className="mb-0">
                                                {item.productName}
                                            </p>
                                            <p className="mb-0 cart-item-price">
                                                {item.totalAmount}
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
                        ))}
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
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryShop);
