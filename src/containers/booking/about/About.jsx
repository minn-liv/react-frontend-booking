import React from "react";
import "./About.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";

import aboutBanner from "../../../assets/banner/about-banner.jpg";
import aboutBanner2 from "../../../assets/banner/about-banner2.jpg";
import aboutBanner3 from "../../../assets/banner/about-banner3.jpg";
import aboutBanner4 from "../../../assets/banner/about-banner4.jpg";
import BlogSlide from "../../shop/section/BlogSlide";

function About() {
    return (
        <React.Fragment>
            <Header />
            <div className="about-container container mb-5">
                <div className="about-banner mt-5">
                    <img src={aboutBanner} />
                </div>
                <div className="about-introduce">
                    <h2 className="mt-5">GIỚI THIỆU VỀ 30SHINE</h2>
                    <p>
                        Công ty cổ phần thương mại & dịch vụ 30Shine là nền tảng
                        (lifestyle platform) phục vụ nhu cầu cắt tóc, gội đầu
                        (relax), spa và cung cấp đa dạng sản phẩm chất lượng cao
                        dành riêng cho nam giới.
                    </p>
                    <p>
                        30Shine đầu tư mạnh mẽ vào nền tảng công nghệ giúp nâng
                        cao trải nghiệm dịch vụ, hiệu suất vận hành, đồng thời
                        liên tục nghiên cứu và phát triển các dịch vụ và trải
                        nghiệm mới phù hợp với nhu cầu khách hàng nam giới hiện
                        đại.
                    </p>
                    <div className="row">
                        <div className="col-8">
                            <img src={aboutBanner2} />
                        </div>
                        <div
                            className="col-4 d-flex flex-column justify-content-between
"
                        >
                            <img src={aboutBanner3} />
                            <img src={aboutBanner4} />
                        </div>
                    </div>
                </div>
                <div className="about-mission">
                    <h2 className="mt-5">SỨ MỆNH</h2>
                    <p>
                        30Shine không ngừng quan tâm và lan tỏa niềm tin tới mọi
                        người để cùng đổi mới và có cuộc sống ý nghĩa hơn.
                    </p>
                </div>
                <div className="about-vision">
                    <h2 className="mt-5">TẦM NHÌN</h2>
                    <p>
                        Với Khách hàng: 30Shine là một nền tảng cho nam giới
                        hiện đại (LifeStyle Platform for Men) thỏa mãn đa dạng
                        nhu cầu của hàng triệu khách hàng.
                    </p>
                    <p>
                        Với Anh em: 30shine là một môi trường năng động, nơi anh
                        em có thể tự hào, thỏa sức học hỏi, cống hiến để vươn
                        tới cuộc sống sung túc và hạnh phúc.
                    </p>
                </div>
            </div>

            <FooterMini />
        </React.Fragment>
    );
}

export default About;
