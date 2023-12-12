import "./Location.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faPhone,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
function Location() {
    return (
        <div className="location-container">
            <Header />
            <div className="location-box container mt-5 mb-8">
                <div className="location-info">
                    <h2>
                        <strong>
                            Chúng tôi trân trọng ý kiến của quý khách
                        </strong>
                    </h2>
                    <p className="location-text">
                        <strong>
                            {" "}
                            Nếu bạn có gì thắc mắc hãy liên hệ với chúng tôi qua
                            địa chỉ
                        </strong>
                    </p>
                    <div className="location-content">
                        <div>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <p className="mb-0">Bình Thạnh, TP. Hồ Chí Minh.</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faPhone} />
                            <p className="mb-0">0354147718</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <p className="mb-0">min@gmail.com</p>
                        </div>
                        <p className="mb-0 location-text mt-2">
                            <strong>Thời gian</strong>
                        </p>
                        <div>
                            <p>Tất cả các ngày trong tuần</p>
                        </div>
                    </div>
                </div>
                <div className="location-maps">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31351.87810278742!2d106.65192604064943!3d10.812477637019926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175295ad5d620a9%3A0x1987553f74c59f5e!2zMzBTaGluZSAzNTkgTMOqIFF1YW5nIMSQ4buLbmgsIFBoxrDhu51uZyA1LCBCw6xuaCBUaOG6oW5o!5e0!3m2!1sen!2s!4v1702193527413!5m2!1sen!2s"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            <FooterMini />
        </div>
    );
}

export default Location;
