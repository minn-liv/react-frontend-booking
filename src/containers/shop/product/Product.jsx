import "./Product.scss";
import React, { Component } from "react";
import Header from "../header/Header";
import FooterMini from "../../booking/footer/FooterMini";
import sanpham1 from "../../../assets/shop/product/sanpham1.jpg";
import Banner from "../../shop/trending/Trending";
class Product extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="product-container container">
                    <div className="product-info-main">
                        <img src={sanpham1} />
                        <p className="mb-0 product-price">1.000.000.000 đ</p>
                        <p className="mb-0 product-name">
                            Sáp vuốt tóc Tạo kiểu Giữ nếp tự nhiên UNO Hybrid
                            Hard
                        </p>
                    </div>
                    <div className="product-policy">
                        <ul className="ps-0 mb-0">
                            <li className="product-policy-item">
                                <div>
                                    <p className="mb-0">
                                        Cam kết 7 ngày hiệu quả
                                    </p>
                                </div>
                            </li>
                            <li className="product-policy-item">
                                <div>
                                    <p className="mb-0">
                                        Mua 1 hưởng 5 đặc quyền
                                    </p>
                                </div>
                            </li>
                            <li className="product-policy-item">
                                <div>
                                    <p className="mb-0">
                                        Chính sách hoàn tiền 120%
                                    </p>
                                </div>
                            </li>
                            <li className="product-policy-item">
                                <div>
                                    <p className="mb-0">
                                        Chất lượng sản phẩm cao cấp
                                    </p>
                                </div>
                            </li>
                            <li className="product-policy-item">
                                <div>
                                    <p className="mb-0">
                                        Giao hàng siêu tốc 2h
                                    </p>
                                </div>
                            </li>
                            <li className="product-policy-item">
                                <div>
                                    <p className="mb-0">
                                        Đổi trả tận nơi trong 24h
                                    </p>
                                </div>
                            </li>
                            <li className="product-policy-item">
                                <div>
                                    <p className="mb-0">
                                        Tổng đài tư vấn mọi lúc mọi nơi
                                    </p>
                                </div>
                            </li>
                            <li className="product-policy-item last-child">
                                <div>
                                    <p className="mb-0">
                                        An toàn chuẩn giao vận quốc tế
                                    </p>
                                </div>
                            </li>
                        </ul>

                        <div className="product-hotline mt-5">
                            <p className="mb-0">Hotline đặt hàng</p>
                            <p className="mb-0 hotline">1900.27.27.30</p>
                        </div>
                        <div className="product-info mt-5 ">
                            <ul className="product-info-list ps-0 mb-0 ">
                                <li className="product-info-first selected">
                                    Thông tin sản phẩm
                                </li>
                                <li className="product-info-second">
                                    Thành phần
                                </li>
                                <li className="product-info-third">
                                    Hướng dẫn sử dụng
                                </li>
                            </ul>
                            <div className="product-info-text">
                                <p className="mb-0">
                                    Nếu bạn đang không có quá nhiều tiền để mua
                                    sáp vuốt tóc nhưng vẫn muốn có được một kiểu
                                    tóc đẹp thì sáp vuốt tóc Uno Hybrid Hard
                                    chắc chắn sẽ là sản phẩm đáp ứng được những
                                    nhu cầu trên của bạn. Cùng 30Shine Shop khám
                                    phá sản phẩm chỉ với mức giá chưa đến 150
                                    “cành” qua bài viết dưới đây!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-category">
                    <Banner />
                </div>
                <div className="product-checkout">
                    <button>THÊM VÀO GIỎ HÀNG</button>
                    <button className="product-checkout-buy">MUA NGAY</button>
                </div>

                <FooterMini />
            </React.Fragment>
        );
    }
}

export default Product;
