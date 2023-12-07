import "./Product.scss";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import FooterMini from "../../booking/footer/FooterMini";
import Banner from "../../shop/trending/Trending";
import axios from "../../../axios";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { MDBModal, MDBModalDialog, MDBModalContent } from "mdb-react-ui-kit";

import icon1 from "../../../assets/shop/product/cam-ket.png";
import icon2 from "../../../assets/shop/product/mua-1-duoc-5.png";
import icon3 from "../../../assets/shop/product/chinh-sach-hoan-tien.png";
import icon4 from "../../../assets/shop/product/chat-luong-san-pham-cao.png";
import icon5 from "../../../assets/shop/product/giao-hang-trong-24h.png";
import icon6 from "../../../assets/shop/product/doi-tra-24h.png";
import icon7 from "../../../assets/shop/product/tong-dai-tu-van.png";
import icon8 from "../../../assets/shop/product/an-toan-chuan-quoc-te.png";

function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [basicModal, setBasicModal] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        toast.loading("Waiting.....", {
            duration: 1500,
        });
        await axios
            .post("/api/v1/ClientBuyProductApi/AddToCart", {
                UserId: userInfo.userID,
                ProductId: product.productId,
                Quantity: quantity,
                User: {},
                Product: {},
            })
            .then((response) => {
                setTimeout(() => {
                    toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
                }, 2000);
                console.log(response);
            })
            .catch((error) => {
                setTimeout(() => {
                    toast.error(
                        "Thêm sản phẩm vào giỏ hàng thất bại, sản phẩm đã hết hàng!"
                    );
                }, 2000);
                console.log(error);
            });
    };
    const handleBuyNow = async () => {
        toast.loading("Waiting.....", {
            duration: 1500,
        });
        const response = await axios
            .post("/api/v1/ClientBuyProductApi/BuyNow", {
                UserId: userInfo.userID,
                ProductId: product.productId,
                Quantity: quantity,
                User: {},
                Product: {},
            })
            .then((response) => {
                setTimeout(() => {
                    toast.success(
                        "Đặt hàng thành công, Vui lòng kiểm tra Email!"
                    );
                }, 2000);

                setTimeout(() => {
                    navigate("/shop");
                }, 4000);
            })
            .catch((error) => {
                setTimeout(() => {
                    toast.error("Đặt hàng thất bại, sản phẩm đã hết hàng!");
                }, 2000);
            });
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (productId) {
                    const response = await axios.get(
                        `/api/ProductApi/${productId}`
                    );
                    const productData = response.data;
                    setProduct(productData);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchData();
    }, [productId]);

    if (!product) {
        return <p>Loading...</p>;
    }

    const toggleShow = () => {
        setBasicModal(!basicModal);
    };

    function currencyFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "₫";
    }
    return (
        <div className="product-wrapper">
            <Header />
            <Toaster />
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <div>
                    <MDBModalDialog>
                        <MDBModalContent>
                            <div className="checkout-container">
                                <div className="checkout-close">
                                    <span onClick={toggleShow}>X</span>
                                </div>
                                <div class="iphone">
                                    <header class="header">
                                        <h1>Thanh Toán</h1>
                                    </header>

                                    <div>
                                        <div>
                                            <h2>Địa chỉ</h2>

                                            <div class="card">
                                                <address>
                                                    Adam Johnson
                                                    <br />
                                                    {userInfo.address}
                                                </address>
                                            </div>
                                        </div>

                                        <div>
                                            <h2>Hóa đơn</h2>

                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Shipping fee</td>
                                                        <td align="right">
                                                            $5.43
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Discount 10%</td>
                                                        <td align="right">
                                                            -$1.89
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Price Total</td>
                                                        <td align="right">
                                                            $84.82
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td>Tổng thanh toán</td>
                                                        <td align="right">
                                                            {currencyFormat(
                                                                product.price
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>

                                        <div>
                                            <button
                                                class="button button--full"
                                                onClick={handleBuyNow}
                                            >
                                                Mua ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MDBModalContent>
                    </MDBModalDialog>
                </div>
            </MDBModal>

            <div className="product-container container">
                <div className="product-info-main">
                    <img
                        alt="alt"
                        src={`https://localhost:7109${product.image}`}
                    />
                    <p className="mb-0 product-price">
                        {currencyFormat(product.price)}
                    </p>
                    <p className="mb-0 product-name">{product.name}</p>
                </div>
                <div className="product-policy">
                    <ul className="ps-0 mb-0">
                        <li className="product-policy-item">
                            <div>
                                <img alt="alt" src={icon1} />
                                <p className="mb-0">Cam kết 7 ngày hiệu quả</p>
                            </div>
                        </li>
                        <li className="product-policy-item">
                            <div>
                                <img alt="alt" src={icon2} />

                                <p className="mb-0">Mua 1 hưởng 5 đặc quyền</p>
                            </div>
                        </li>
                        <li className="product-policy-item">
                            <div>
                                <img alt="alt" src={icon3} />

                                <p className="mb-0">
                                    Chính sách hoàn tiền 120%
                                </p>
                            </div>
                        </li>
                        <li className="product-policy-item">
                            <div>
                                <img alt="alt" src={icon4} />
                                <p className="mb-0">
                                    Chất lượng sản phẩm cao cấp
                                </p>
                            </div>
                        </li>
                        <li className="product-policy-item">
                            <div>
                                <img alt="alt" src={icon5} />
                                <p className="mb-0">Giao hàng siêu tốc 2h</p>
                            </div>
                        </li>
                        <li className="product-policy-item">
                            <div>
                                <img alt="alt" src={icon6} />
                                <p className="mb-0">
                                    Đổi trả tận nơi trong 24h
                                </p>
                            </div>
                        </li>
                        <li className="product-policy-item">
                            <div>
                                <img alt="alt" src={icon7} />
                                <p className="mb-0">
                                    Tổng đài tư vấn mọi lúc mọi nơi
                                </p>
                            </div>
                        </li>
                        <li className="product-policy-item last-child">
                            <div>
                                <img alt="alt" src={icon8} />
                                <p className="mb-0">
                                    An toàn chuẩn giao vận quốc tế
                                </p>
                            </div>
                        </li>
                    </ul>

                    <div className="product-hotline mt-5">
                        <div className="product-hotline-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                id="phone"
                            >
                                <path d="M23.45 20.93a3 3 0 0 0-4.25 0l-1.45 1.45a26.14 26.14 0 0 1-4.51-3.62 26.62 26.62 0 0 1-3.62-4.51l1.45-1.45a3 3 0 0 0 0-4.25L8.24 5.73a2.93 2.93 0 0 0-2.11-.88h0A3 3 0 0 0 4 5.73L2.64 7.08A6.37 6.37 0 0 0 1 12.33c.32 3.75 2.78 8.26 6.57 12.06S15.92 30.64 19.67 31a7.87 7.87 0 0 0 .84 0 6.07 6.07 0 0 0 4.41-1.64L26.27 28a3 3 0 0 0 .88-2.13 2.93 2.93 0 0 0-.88-2.11zm1.41 5.66L23.5 27.94a4.57 4.57 0 0 1-3.66 1c-3.25-.28-7.39-2.58-10.81-6S3.31 15.41 3 12.16a4.53 4.53 0 0 1 1-3.66L5.41 7.14a1 1 0 0 1 .71-.29h0a1 1 0 0 1 .71.29L9.66 10a1 1 0 0 1 0 1.41l-2 2a1 1 0 0 0-.16 1.21 27.49 27.49 0 0 0 4.33 5.58 27.49 27.49 0 0 0 5.58 4.33 1 1 0 0 0 1.21-.16l2-2a1 1 0 0 1 1.41 0l2.83 2.83h0a1 1 0 0 1 .29.71A1 1 0 0 1 24.86 26.59zM26.6 5.39A14.92 14.92 0 0 0 16 1a1 1 0 1 0 0 2A13 13 0 0 1 29 16.11a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1A14.91 14.91 0 0 0 26.6 5.39z"></path>
                                <path d="M20.91,11.11a6,6,0,0,1,1.77,4.31,1,1,0,0,0,1,1h0a1,1,0,0,0,1-1,8,8,0,0,0-8-8.1,1,1,0,1,0,0,2A6,6,0,0,1,20.91,11.11Z"></path>
                            </svg>
                        </div>
                        <div>
                            <p className="mb-0">Hotline đặt hàng</p>
                            <p className="mb-0 hotline">1900.27.27.30</p>
                        </div>
                    </div>
                    <div className="product-info mt-5 ">
                        <ul className="product-info-list ps-0 mb-0 ">
                            <li className="product-info-first selected">
                                Thông tin sản phẩm
                            </li>
                            <li className="product-info-second">Thành phần</li>
                            <li className="product-info-third">
                                Hướng dẫn sử dụng
                            </li>
                        </ul>
                        <div className="product-info-text">
                            <p className="mb-0">
                                Nếu bạn đang không có quá nhiều tiền để mua sáp
                                vuốt tóc nhưng vẫn muốn có được một kiểu tóc đẹp
                                thì sáp vuốt tóc Uno Hybrid Hard chắc chắn sẽ là
                                sản phẩm đáp ứng được những nhu cầu trên của
                                bạn. Cùng 30Shine Shop khám phá sản phẩm chỉ với
                                mức giá chưa đến 150 “cành” qua bài viết dưới
                                đây!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-category">
                <Banner />
            </div>
            <div className="product-checkout">
                <button onClick={handleAddToCart}>THÊM VÀO GIỎ HÀNG</button>
                <button className="product-checkout-buy" onClick={toggleShow}>
                    MUA NGAY
                </button>
            </div>

            <FooterMini />
        </div>
    );
}

export default Product;
