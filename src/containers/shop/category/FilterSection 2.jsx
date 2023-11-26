import "./FilterSection.scss";
import sanpham1 from "../../../assets/shop/product/sanpham1.jpg";

function FilterSection() {
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
            <div className="filter-info">
                <p className="mb-0 filter-info-text">Khum tìm thấy gì đâu</p>
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
                    <a className="shop-main-item" href="#">
                        <img src={sanpham1} />
                        <h3>
                            Kem ngày Dưỡng trắng Kiềm dầu 5 trong 1 UNO UV
                            Perfection Gel
                        </h3>
                        <p>199.999 đ</p>
                    </a>
                    <a className="shop-main-item" href="#">
                        <img src={sanpham1} />
                        <h3>
                            Kem ngày Dưỡng trắng Kiềm dầu 5 trong 1 UNO UV
                            Perfection Gel
                        </h3>
                        <p>199.999 đ</p>
                    </a>
                    <a className="shop-main-item" href="#">
                        <img src={sanpham1} />
                        <h3>
                            Kem ngày Dưỡng trắng Kiềm dầu 5 trong 1 UNO UV
                            Perfection Gel
                        </h3>
                        <p>199.999 đ</p>
                    </a>
                    <a className="shop-main-item" href="#">
                        <img src={sanpham1} />
                        <h3>
                            Kem ngày Dưỡng trắng Kiềm dầu 5 trong 1 UNO UV
                            Perfection Gel
                        </h3>
                        <p>199.999 đ</p>
                    </a>
                    <a className="shop-main-item" href="#">
                        <img src={sanpham1} />
                        <h3>
                            Kem ngày Dưỡng trắng Kiềm dầu 5 trong 1 UNO UV
                            Perfection Gel
                        </h3>
                        <p>199.999 đ</p>
                    </a>
                    <a className="shop-main-item" href="#">
                        <img src={sanpham1} />
                        <h3>
                            Kem ngày Dưỡng trắng Kiềm dầu 5 trong 1 UNO UV
                            Perfection Gel
                        </h3>
                        <p>199.999 đ</p>
                    </a>
                    <a className="shop-main-item" href="#">
                        <img src={sanpham1} />
                        <h3>
                            Kem ngày Dưỡng trắng Kiềm dầu 5 trong 1 UNO UV
                            Perfection Gel
                        </h3>
                        <p>199.999 đ</p>
                    </a>
                    <a className="shop-main-item" href="#">
                        <img src={sanpham1} />
                        <h3>
                            Kem ngày Dưỡng trắng Kiềm dầu 5 trong 1 UNO UV
                            Perfection Gel
                        </h3>
                        <p>199.999 đ</p>
                    </a>
                </div>
                <div className="shop-main-show-more">
                    <button className="text-center">Xem thêm</button>
                </div>
            </div>
        </div>
    );
}

export default FilterSection;
