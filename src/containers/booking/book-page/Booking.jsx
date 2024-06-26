import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import toast from "react-hot-toast";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";

import axios from "../../../axios";
import "./Booking.scss";
import Header from "../header/Header";
import FooterMini from "../footer/FooterMini";
import moment from "moment";

const DateTimePicker = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(getFormattedNow());

  useEffect(() => {
    const formattedNow = getFormattedNow();
    setSelectedDateTime(formattedNow);
  }, []);

  function getFormattedNow() {
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16);
    return formattedNow;
  }

  function isPastDateTime(value) {
    // Lấy ngày và giờ hiện tại
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 16);

    // So sánh giá trị mới chỉ theo giờ và phút
    return value.slice(0, 16) < formattedNow;
  }

  function handleDateTimeChange(value) {
    // Kiểm tra nếu giá trị mới không phải là giờ đã qua
    if (!isPastDateTime(value)) {
      setSelectedDateTime(value);
    }
  }

  return (
    <input
      type="datetime-local"
      className="input-date"
      style={{
        background: "none",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
      value={selectedDateTime}
      onChange={(e) => handleDateTimeChange(e.target.value)}
      min={getFormattedNow()}
    />
  );
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errMessage: "",
      branches: [],
      staffList: [],
      services: [],
      staffSchedule: [],
      selectedBranchId: null,
      staffListByBranch: [],
      selectedStaffId: null,
      selectedServiceId: null,
      selectedServicePrice: 0,
      dateTime: "",
      dateSelected: null
    };
  }

  componentDidMount() {
    //branch nè
    axios
      .get("/api/v1/Booking/branches")
      .then((response) => {
        const branches = response.data;
        this.setState({ branches });
      })
      .catch((error) => {
        console.error("Error fetching branch data:", error);
      });

    //Staff nè
    axios
      .get("api/AdminApi")
      .then((staffResponse) => {
        const staffList = staffResponse.data;
        this.setState({ staffList });
      })
      .catch((staffError) => {
        console.error("Error fetching staff data:", staffError);
      });
    //Combo nè
    axios
      .get("api/ComboApi")
      .then((servicesResponse) => {
        const services = servicesResponse.data;

        this.setState({ services });
      })
      .catch((servicesError) => {
        console.error("Error fetching services data:", servicesError);
      });
    if (this.state.branches.length > 0) {
      this.setState({
        selectedBranchId: this.state.branches[0].branchId,
      });
    }
  }

  handleStaffChange = (event) => {
    const selectedStaffId = parseInt(event.target.value);

    this.setState(
      {
        selectedStaffId: selectedStaffId,
      },
      () => {
        this.getStaffSchedule(selectedStaffId);
      }
    );
  };

  getStaffSchedule = (staffId) => {
    axios
      .get(`/api/v1/BookingDate/${staffId}`)
      .then((response) => {
        const { staff, schedule } = response.data.value;
        if (staff && schedule) {
          const staffSchedule = {
            staffId: staff.staffId,
            name: staff.name,
            schedule: schedule.map((item) => ({
              scheduleId: item.scheduleId,
              time: item.time,
              date: item.date,
            })),
          };
          this.setState({ staffSchedule });
        } else {
          console.error("Staff data or schedule data is undefined");
        }
      })
      .catch((error) => {
        console.error("Error fetching staff schedule:", error);
      });
  };

  getStaffByBranch = (branchId) => {
    const staffList = this.state.staffList;
    const filteredStaffList = staffList.filter(
      (staff) => staff.branch && staff.branch.branchId === branchId
    );
    // console.log("filteredStaffList", filteredStaffList);
    return filteredStaffList;
  };

  handleBranchChange = (event) => {
    const selectedBranchId = parseInt(event.target.value);
    const staffListByBranch = this.getStaffByBranch(selectedBranchId);

    this.setState({
      selectedBranchId: selectedBranchId,
      staffListByBranch: staffListByBranch,
      selectedStaffId: null,
    });
  };

  handleComboChange = (event) => {
    const selectedComboId = parseInt(event.target.value);

    this.setState(
      {
        selectedComboId: selectedComboId,
        selectedServicePrice:
          this.state.services.find(
            (service) => service.comboId === selectedComboId
          )?.price || 0,
      },
      () => {
        console.log("Updated State:", this.state);
      }
    );
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  onSubmit = (ev) => {
    ev.preventDefault();

    const phone = document.getElementById("phone").value;
    const name = document.getElementById("password").value;
    const selectedStaffId = document.querySelector(".select-staff").value;
    const selectedComboId = document.querySelector(".select-combo").value;
    const selectedBranchId = document
      .querySelector('input[name="branch"]:checked')
      .id.split("-")[1];
    // const selectedDate = document.querySelector(".input-date").value;
    const note = document.getElementById("textAreaExample").value;

    let idUser;
    if (this.props.userInfo && this.props.userInfo.userID) {
      idUser = this.props.userInfo.userID;
    } else {
      idUser = null;
    }
    const clientId = idUser ? parseInt(idUser) : null;
    let responseMessage;
    if (clientId) {
      responseMessage = "Đặt lịch thành công. Vui lòng kiểm tra Email!";
    } else {
      responseMessage =
        "Đặt lịch thành công. Nhân viên sẽ liên hệ với bạn thông qua điện thoại";
    }

    const payload = {
      phone: phone,
      name: name,
      staffId: parseInt(selectedStaffId),
      comboId: parseInt(selectedComboId),
      branchId: parseInt(selectedBranchId),
      dateTime: this.state.dateTime,
      note: note,
      status: true,
      clientId: clientId,
      isBooking: true,
    };

    console.log(payload);

    if (!payload.phone) {
      this.setState({
        errMessage: "Vui lòng nhập số điện thoại !",
      });
      this.scrollToTop();
    } else if (
      !/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(payload.phone)
    ) {
      this.setState({
        errMessage: "Vui lòng nhập số điện thoại hợp lệ!",
      });
      this.scrollToTop();
    } else if (!payload.name) {
      this.setState({
        errMessage: "Vui lòng nhập tên của bạn !",
      });
      this.scrollToTop();
    } else if (!payload.branchId) {
      this.setState({
        errMessage: "Vui lòng chọn chi nhánh !",
      });
      this.scrollToTop();
    } else if (!payload.staffId) {
      this.setState({
        errMessage: "Vui lòng chọn nhân viên !",
      });
      this.scrollToTop();
    } else if (!payload.comboId) {
      this.setState({
        errMessage: "Vui lòng chọn dịch vụ !",
      });
      this.scrollToTop();
    } else if (!payload.dateTime) {
      this.setState({
        errMessage: "Vui lòng chọn ngày đặt lịch cắt !",
      });
      this.scrollToTop();
    } else {
      toast.loading("Waiting.....", {
        duration: 1000,
      });
      axios
        .post("/api/v1/Booking/create", payload)
        .then((response) => {
          setTimeout(() => {
            toast.success(responseMessage);
          }, 500);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        })
        .catch((error) => {
          setTimeout(() => {
            toast.error("Đặt lịch thất bại. Vui lòng thử lại!");
          }, 500);
          console.log(error);
        });
    }
  };

  currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "₫";
  }
  selectTime = (time) => {
    const dateString = moment(time.date).format("YYYY-MM-DD");
    const dateTime = moment(dateString +  'T' +time.time).format('YYYY-MM-DD[T]HH:mm:ss');
    console.log(dateTime);
    this.setState({
        dateTime: dateTime,
        dateSelected: time.scheduleId 
    });

  }
  render() {
    const { branches, staffList, services, staffSchedule } = this.state;

    return (
      <div className="booking-container">
        <Header />
        <div
          className=""
          style={{ background: "#f5f5f5", paddingBottom: "1rem" }}
        >
          <form onSubmit={this.onSubmit}>
            <MDBContainer
              fluid
              className=" overflow-hidden"
              style={{ width: "50%" }}
            >
              <MDBCard
                className=" p-5 shadow-5 background-radial-gradient"
                style={{
                  background: "hsla(0, 0%, 100%, 0.😎",
                  backdropFilter: "blur(30px)",
                  marginTop: "1rem",
                  backgroundImage:
                    "linear-gradient(0deg, rgba(233, 235, 242, 0), #e8edf4)",
                }}
              >
                <MDBCardBody className="p-5 text-center">
                  {this.state.errMessage && (
                    <div className="alert_message failed">
                      {this.state.errMessage}
                    </div>
                  )}
                  <h2 className="fw-bold mb-5" style={{ fontSize: "2rem" }}>
                    ĐẶT LỊCH NGAY
                  </h2>
                  <h3 className="text-start fw-bold">
                    Quý khách vui lòng cho biết thông tin
                  </h3>
                  <h4 className="text-start mb-3">
                    (*) Vui lòng nhập thông tin bắt buộc
                  </h4>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Số điện thoại"
                    id="phone"
                    type="text"
                    size="lg"
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Họ và tên"
                    id="password"
                    type="text"
                    size="lg"
                  />
                  <h3 className="text-start fw-bold">Thông tin dịch vụ</h3>
                  <h3 className="text-start">Chọn chi nhánh *</h3>
                  <div className="select-branch">
                    {branches &&
                      branches.map((branch, index) => (
                        <div key={index} className="mb-3">
                          <input
                            type="radio"
                            id={`branch-${branch.branchId}`}
                            name="branch"
                            value={branch.branchId}
                            onChange={this.handleBranchChange}
                          />

                          <label htmlFor={`branch-${branch.branchId}`}>
                            {branch.address} - {branch.hotline}
                          </label>
                        </div>
                      ))}
                    {branches ? (
                      <input
                        type="radio"
                        id={`branch-${branches.branchId}`}
                        name="branch"
                        value={branches.branchId}
                        defaultChecked
                        onChange={this.handleBranchChange}
                        hidden
                      />
                    ) : (
                      ""
                    )}
                  </div>

                  <h3 className="text-start mt-2">Chọn nhân viên *</h3>
                  <select
                    className="form-control select-staff"
                    value={this.state.selectedStaffId}
                    onChange={this.handleStaffChange}
                    style={{ background: "none" }}
                  >
                    <option defaultChecked>Chọn nhân viên</option>
                    {this.state.staffListByBranch.map((staff) => (
                      <option key={staff.staffId} value={staff.staffId}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                  <h3 className="text-start mt-3">
                    Lịch làm việc của nhân viên
                  </h3>
                  {Object.keys(staffSchedule).length > 0 ? (
                    <ul className="schedule-staff-container">
                      {staffSchedule.schedule.map((item, index) => {
                        const newDateString = moment(item.date).format("MM-DD");
                        const isSelected = item.scheduleId === this.state.dateSelected;
                        const liClass = isSelected ? "schedule-staff-box active" : "schedule-staff-box";
                        return (
                          <li
                            key={item.scheduleId}
                            className={liClass}
                            onClick={() => this.selectTime(item)}
                          >
                            <span className="schedule-date">
                              {newDateString}{" "}
                            </span>
                            <span className="schedule-time">{item.time}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p>No schedule found</p>
                  )}

                  <h3 className="text-start">Chọn dịch vụ *</h3>
                  <select
                    className="form-control select-combo"
                    value={this.state.selectedComboId}
                    onChange={this.handleComboChange}
                    style={{ background: "none" }}
                  >
                    <option value="" defaultChecked>
                      Chọn dịch vụ
                    </option>
                    {services.map((service) => (
                      <option key={service.comboId} value={service.comboId}>
                        {service.name}
                      </option>
                    ))}
                  </select>

                  <h3 className="text-start mt-3 fw-bold">
                    Tổng thanh toán:{" "}
                    {this.currencyFormat(this.state.selectedServicePrice)}
                  </h3>
                  {/* <h3 className="text-start">Ngày đặt lịch *</h3>
                  <DateTimePicker /> */}
                  {/* <input
                                        type="datetime-local"
                                        className="input-date"
                                        style={{
                                            background: "none",
                                            border: "1px solid #ddd",
                                            borderRadius: "5px",
                                        }}
                                    /> */}
                  <h3 className="text-start">Chọn khung giờ dịch vụ *</h3>
                  <MDBTextArea
                    label="Ghi Chú"
                    id="textAreaExample"
                    rows={4}
                    className="mb-4"
                  />
                  <MDBBtn
                    className="w-100 mb-4 btn-register"
                    size="lg"
                    type="submit"
                  >
                    ĐẶT LỊCH
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </form>
        </div>

        <FooterMini />
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
