import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./Checkout.scss";

class Checkout extends Component {
    render() {
        return (
            <div className="checkout-container container">
                <div class="iphone">
                    <header class="header">
                        <h1>Thanh Toán</h1>
                    </header>

                    <form
                        action="https://httpbin.org/post"
                        class="form"
                        method="POST"
                    >
                        <div>
                            <h2>Địa chỉ</h2>

                            <div class="card">
                                <address>
                                    Adam Johnson
                                    <br />
                                    403 Oakland Ave Street, A city, Florida,
                                    32104,
                                </address>
                            </div>
                        </div>

                        <div>
                            <h2>Hóa đơn</h2>

                            <table>
                                <tbody>
                                    <tr>
                                        <td>Shipping fee</td>
                                        <td align="right">$5.43</td>
                                    </tr>
                                    <tr>
                                        <td>Discount 10%</td>
                                        <td align="right">-$1.89</td>
                                    </tr>
                                    <tr>
                                        <td>Price Total</td>
                                        <td align="right">$84.82</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>Tổng thanh toán</td>
                                        <td align="right">$88.36</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div>
                            <button class="button button--full" type="submit">
                                Mua ngay
                            </button>
                        </div>
                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
