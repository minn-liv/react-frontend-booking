import "./FilterSection.scss";
import axios from "../../../axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function FilterSection() {
    const [products, setProducts] = useState([]);
    const [basicActive, setBasicActive] = useState("tab1");

    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }

        setBasicActive(value);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/ProductApi");
                console.log("API Response:", response.data);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const replaceIfOverflow = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + "...";
        }
        return str;
    };
    return (
        <div className="filter-container container-custom">
            <p className="filter-title mb-0">GÔM DỮ NẾP</p>
            <ul className="filter-menu">
                <li className="filter-menu-selected">Tất cả</li>
                <li>Tạo màu cho tóc</li>
                <li>Máy sấy tóc</li>
                <li>Sáp vuốt tóc</li>
                <li>Gôm giữ nếp</li>
            </ul>
            <div className="filter-tab-pane">
                <MDBTabs className="mb-3">
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleBasicClick("tab1")}
                            active={basicActive === "tab1"}
                        >
                            Tab 1
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleBasicClick("tab2")}
                            active={basicActive === "tab2"}
                        >
                            Tab 2
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleBasicClick("tab3")}
                            active={basicActive === "tab3"}
                        >
                            Tab 3
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                    <MDBTabsPane open={basicActive === "tab1"}>
                        Tab 1 content
                    </MDBTabsPane>
                    <MDBTabsPane open={basicActive === "tab2"}>
                        Tab 2 content
                    </MDBTabsPane>
                    <MDBTabsPane open={basicActive === "tab3"}>
                        Tab 3 content
                    </MDBTabsPane>
                </MDBTabsContent>
            </div>
            <div className="filter-info">
                <p className="mb-0 filter-info-text">
                    10 sản phẩm được tìm thấy theo *Combo tiết kiệm*
                </p>
                <div className="filter-button">
                    <p className="mb-0">Sắp xếp theo</p>
                    <select>
                        <option defaultChecked>Mặc định</option>
                        <option>A dến Á</option>
                        <option>Kimochi</option>
                    </select>
                </div>
            </div>
            <div className="shop-main-content container mt-3">
                <div className="shop-main-card">
                    {products.map((product) => (
                        <Link
                            key={product.productId}
                            to={`/product/${product.productId}`}
                        >
                            <div
                                key={product.productId}
                                className="shop-main-item"
                            >
                                <div>
                                    <img
                                        src={`https://localhost:7109${product.image}`}
                                        alt={product.name}
                                    />
                                </div>
                                <h3 className="shop-main-item-name">
                                    {replaceIfOverflow(product.name, 55)}
                                </h3>
                                <h3>Mã Sản phảm: {product.productId}</h3>
                                <p>{product.price} đ</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="shop-main-show-more">
                    <button className="text-center">Xem thêm</button>
                </div>
            </div>
        </div>
    );
}

export default FilterSection;
