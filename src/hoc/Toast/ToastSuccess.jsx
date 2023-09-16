import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../utils/Constants";
import { changeLanguageApp } from "../../store/actions/";

import "./ToastSuccess.css";

class ToastSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    showSuccessToast() {
        this.toast({
            title: "Thành công!",
            message: "Bạn đã đăng ký thành công tài khoản ",
            type: "success",
            duration: 3000,
        });
    }

    showErrorToast() {
        this.toast({
            title: "Thất bại!",
            message: "Có lỗi xảy ra, vui lòng thử lại",
            type: "error",
            duration: 3000,
        });
    }
    toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = document.getElementById("toast-custom");
        if (main) {
            const toast = document.createElement("div");
            // Auto remove toast
            const autoRemoveId = setTimeout(() => {
                main.removeChild(toast);
            }, duration + 1000);

            // Remove toast when clicked
            toast.onClick = function (e) {
                if (e.target.closest(".toast__close")) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            };

            const icons = {
                success: "fas fa-check-circle",
                info: "fas fa-info-circle",
                warning: "fas fa-exclamation-circle",
                error: "fas fa-exclamation-circle",
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);

            toast.classList.add("toast-custom", `toast-custom--${type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

            toast.innerHTML = `
                          <div class="toast__icon">
                              <i class="${icon}"></i>
                          </div>
                          <div class="toast__body">
                              <h3 class="toast__title">${title}</h3>
                              <p class="toast__msg">${message}</p>
                          </div>
                          <div class="toast__close">
                              <i class="fas fa-times"></i>
                          </div>
                      `;
            main.appendChild(toast);
        }
    }
    render() {
        return (
            <div className="toast_container">
                <div id="toast-custom"></div>

                <div>
                    <div
                        onClick={() => this.showSuccessToast()}
                        class="btn-custom btn--success"
                    >
                        Show success toast
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => {
            dispatch(changeLanguageApp(language));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastSuccess);
