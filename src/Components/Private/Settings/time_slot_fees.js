import React from "react";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Accordion from "react-bootstrap/Accordion";
import { Button, Modal, Dropdown, DropdownButton } from "react-bootstrap";
import SettingHeader from "./setting_headers";
import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
// import Header from "../Dashboard/Header";
import { Link } from "react-router-dom";

function Timeslotfees() {
  const [value, setValue] = React.useState(2);
  const [chkValue, setChkValue] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <>
      <Container fluid >
        <div className="row timeslots_box">

          {
            !edit ? (<div className="col-md-12">
              <div className="setting_profile_card_head">
                <div className="d-flex">
                  <div className="col-md-6">
                    <h3 className="setting_profile_title">Time Slot & Fees</h3>
                  </div>
                  <div className="col-md-6">
                    {/* <Link to="/edittimeslotfees"> */}
                    <Button
                      onClick={() => setEdit(true)}
                      variant="primary"
                      className="setting_profile_btn float_right"
                    >
                      <svg
                        className="setting_profile_btn_icon"
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.7434 1.07709C12.0689 0.751649 12.5965 0.751649 12.922 1.07709L15.422 3.57709C15.7474 3.90252 15.7474 4.43016 15.422 4.7556L5.42196 14.7556C5.31516 14.8624 5.18134 14.9382 5.03481 14.9748L1.70148 15.8081C1.4175 15.8791 1.11709 15.7959 0.910111 15.5889C0.703127 15.3819 0.61992 15.0815 0.690915 14.7976L1.52425 11.4642C1.56088 11.3177 1.63665 11.1839 1.74344 11.0771L11.7434 1.07709ZM3.08517 12.0924L2.64467 13.8544L4.40666 13.4139L13.6542 4.16634L12.3327 2.84485L3.08517 12.0924Z"
                          fill="#3093BB"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.3327 18.3327H0.666016V16.666H17.3327V18.3327Z"
                          fill="#3093BB"
                        />
                      </svg>
                      Edit
                    </Button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>

              <div className="setting_profile_card_body">
                <div className="row">
                  <Formik
                    initialValues={{
                      gender: "",
                      // date:Date.now()
                    }}
                    onSubmit={(values) => {
                      console.log("values", values);
                    }}
                  >
                    {({ values, setFieldValue, handleSubmit }) => (
                      <form onSubmit={handleSubmit} id="myForm">
                        <div className="col-md-6">
                          <div className="row mt_20">
                            <div className="col-md-12 col-sm-12">
                              <label className="setting_form_title">
                                Consultation Fee (Rs)
                              </label>
                              <div className="input_box">
                                <div className="form_group">
                                  <input
                                    type="text"
                                    name=""
                                    placeholder=""
                                    value="500"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row mt_10">
                            <div className="col-md-12">
                              <span className="setting_consult_fee_subtext">
                                You will get net Rs. 400 after THS charge 10% +
                                GST 18% deduction.
                              </span>
                            </div>
                          </div>
                          <hr className="bottom_border mt_30 mb_30" />
                          <div className="row">
                            <div className="col-md-12">
                              <h3 className="setting_time_slot_title">
                                Online Time Slot Managment
                              </h3>
                            </div>
                          </div>
                          <div className="row mt_20">
                            <div className="col-md-12">
                              <Tabs defaultActiveKey="first">
                                <Tab
                                  eventKey="first"
                                  title="Weekdays"
                                  className="tab_inner_box"
                                >
                                  <div className="weekdays_box">
                                    <div className="row">
                                      <div className="col-md-12">
                                        {console.log(values)}
                                        <div className="day_box">
                                          <label>
                                            <label className="days_bg">
                                              <center>
                                                <svg
                                                  width="11"
                                                  height="16"
                                                  viewBox="0 0 11 16"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z"
                                                    fill="#9393AA"
                                                  />
                                                </svg>
                                              </center>
                                            </label>
                                          </label>
                                          <label
                                            className="day_label"
                                            htmlFor={"Monday"}
                                          >
                                            {values?.day == "Monday" ? (
                                              <label className="days_bg_3">
                                                <center>
                                                  <svg
                                                    width="14"
                                                    height="15"
                                                    viewBox="0 0 14 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M0.037422 15V0.899999H1.85742L7.29742 13.16H6.69742L12.1374 0.899999H13.9374V15H12.0574V3.72H12.7174L7.63742 15H6.33742L1.25742 3.72H1.93742V15H0.037422Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            ) : (
                                              <label className="days_bg_2">
                                                <center>
                                                  <svg
                                                    width="14"
                                                    height="15"
                                                    viewBox="0 0 14 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M0.037422 15V0.899999H1.85742L7.29742 13.16H6.69742L12.1374 0.899999H13.9374V15H12.0574V3.72H12.7174L7.63742 15H6.33742L1.25742 3.72H1.93742V15H0.037422Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            )}
                                            <input
                                              type="radio"
                                              name="day"
                                              className="hide_radio_btn"
                                              onChange={(e) =>
                                                setFieldValue(
                                                  "day",
                                                  e.target.value
                                                )
                                              }
                                              id="Monday"
                                              value="Monday"
                                              checked={values?.day === "Monday"}
                                              placeholder=""
                                            />
                                          </label>

                                          <label
                                            className="day_label"
                                            htmlFor={"Tuesday"}
                                          >
                                            {values?.day == "Tuesday" ? (
                                              <label className="days_bg_3">
                                                <center>
                                                  <svg
                                                    width="13"
                                                    height="15"
                                                    viewBox="0 0 13 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            ) : (
                                              <label className="days_bg_2">
                                                <center>
                                                  <svg
                                                    width="13"
                                                    height="15"
                                                    viewBox="0 0 13 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            )}
                                            <input
                                              type="radio"
                                              name="day"
                                              className="hide_radio_btn"
                                              onChange={(e) =>
                                                setFieldValue(
                                                  "day",
                                                  e.target.value
                                                )
                                              }
                                              id="Tuesday"
                                              value="Tuesday"
                                              checked={values?.day === "Tuesday"}
                                              placeholder=""
                                            />
                                          </label>

                                          <label
                                            className="day_label"
                                            htmlFor={"Wednesday"}
                                          >
                                            {values?.day == "Wednesday" ? (
                                              <label className="days_bg_3">
                                                <center>
                                                  <svg
                                                    width="23"
                                                    height="15"
                                                    viewBox="0 0 23 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M5.87789 15L0.937891 0.899999H3.09789L7.19789 13.08H6.45789L10.7979 0.899999H12.3779L16.4579 13.08H15.7779L20.0179 0.899999H22.0579L17.0779 15H15.2979L11.3379 3.4H11.7579L7.63789 15H5.87789Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            ) : (
                                              <label className="days_bg_2">
                                                <center>
                                                  <svg
                                                    width="23"
                                                    height="15"
                                                    viewBox="0 0 23 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M5.87789 15L0.937891 0.899999H3.09789L7.19789 13.08H6.45789L10.7979 0.899999H12.3779L16.4579 13.08H15.7779L20.0179 0.899999H22.0579L17.0779 15H15.2979L11.3379 3.4H11.7579L7.63789 15H5.87789Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            )}
                                            <input
                                              type="radio"
                                              name="day"
                                              className="hide_radio_btn"
                                              onChange={(e) =>
                                                setFieldValue(
                                                  "day",
                                                  e.target.value
                                                )
                                              }
                                              id="Wednesday"
                                              value="Wednesday"
                                              checked={
                                                values?.day === "Wednesday"
                                              }
                                              placeholder=""
                                            />
                                          </label>

                                          <label
                                            className="day_label"
                                            htmlFor={"Thursday"}
                                          >
                                            {values?.day == "Thursday" ? (
                                              <label className="days_bg_3">
                                                <center>
                                                  <svg
                                                    width="13"
                                                    height="15"
                                                    viewBox="0 0 13 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            ) : (
                                              <label className="days_bg_2">
                                                <center>
                                                  <svg
                                                    width="13"
                                                    height="15"
                                                    viewBox="0 0 13 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            )}
                                            <input
                                              type="radio"
                                              name="day"
                                              className="hide_radio_btn"
                                              onChange={(e) =>
                                                setFieldValue(
                                                  "day",
                                                  e.target.value
                                                )
                                              }
                                              id="Thursday"
                                              value="Thursday"
                                              checked={values?.day === "Thursday"}
                                              placeholder=""
                                            />
                                          </label>

                                          <label
                                            className="day_label"
                                            htmlFor={"Friday"}
                                          >
                                            {values?.day == "Friday" ? (
                                              <label className="days_bg_3">
                                                <center>
                                                  <svg
                                                    width="11"
                                                    height="15"
                                                    viewBox="0 0 11 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M0.986172 15V0.899999H10.0262V2.56H3.06617V7.08H9.56617V8.74H3.06617V15H0.986172Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            ) : (
                                              <label className="days_bg_2">
                                                <center>
                                                  <svg
                                                    width="11"
                                                    height="15"
                                                    viewBox="0 0 11 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M0.986172 15V0.899999H10.0262V2.56H3.06617V7.08H9.56617V8.74H3.06617V15H0.986172Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            )}
                                            <input
                                              type="radio"
                                              name="day"
                                              className="hide_radio_btn"
                                              onChange={(e) =>
                                                setFieldValue(
                                                  "day",
                                                  e.target.value
                                                )
                                              }
                                              id="Friday"
                                              value="Friday"
                                              checked={values?.day === "Friday"}
                                              placeholder=""
                                            />
                                          </label>

                                          <label>
                                            <label className="days_bg">
                                              <center>
                                                <svg
                                                  width="11"
                                                  height="16"
                                                  viewBox="0 0 11 16"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z"
                                                    fill="#9393AA"
                                                  />
                                                </svg>
                                              </center>
                                            </label>
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <div className="row" >
                                        <h3 className="setting_time_slot_day mb_30">
                                          Morning
                                        </h3>
                                        <div className="col-md-5">
                                          <h5 className="start_at">Start at</h5>
                                          <Form.Group className="mb-3">
                                            <Form.Select>
                                              <option>8:00 am</option>
                                              <option>8:30 am</option>
                                              <option>9:00 am</option>
                                              <option>9:30 am</option>
                                              <option>10:00 am</option>
                                              <option>10:30 am</option>
                                              <option>11:00 am</option>
                                              <option>11:30 am</option>
                                              <option>12:00 am</option>
                                              <option>12:30 am</option>
                                              <option>01:00 am</option>
                                              <option>01:30 am</option>
                                              <option>02:00 am</option>
                                              <option>02:30 am</option>
                                              <option>03:00 am</option>
                                              <option>03:30 am</option>
                                              <option>04:00 am</option>
                                              <option>04:30 am</option>
                                              <option>05:00 am</option>
                                              <option>05:30 am</option>
                                              <option>06:00 am</option>
                                              <option>06:30 am</option>
                                            </Form.Select>
                                          </Form.Group>
                                          <img
                                            src={Icon.Clock}
                                            className="setting_watch_icon"
                                          ></img>
                                        </div>
                                        <div className="col-md-5">
                                          <h5 className="end_at">End at</h5>
                                          <Form.Group className="mb-3">
                                            <Form.Select>
                                              <option>8:00 am</option>
                                              <option>8:30 am</option>
                                              <option>9:00 am</option>
                                              <option>9:30 am</option>
                                              <option>10:00 am</option>
                                              <option>10:30 am</option>
                                              <option selected>11:00 am</option>
                                              <option>11:30 am</option>
                                              <option>12:00 am</option>
                                              <option>12:30 am</option>
                                              <option>01:00 am</option>
                                              <option>01:30 am</option>
                                              <option>02:00 am</option>
                                              <option>02:30 am</option>
                                              <option>03:00 am</option>
                                              <option>03:30 am</option>
                                              <option>04:00 am</option>
                                              <option>04:30 am</option>
                                              <option>05:00 am</option>
                                              <option>05:30 am</option>
                                              <option>06:00 am</option>
                                              <option>06:30 am</option>
                                            </Form.Select>
                                          </Form.Group>
                                          <img
                                            src={Icon.Clock}
                                            className="setting_watch_icon_2"
                                          ></img>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Tab>
                                <Tab
                                  eventKey="second"
                                  title="Weekends"
                                  className="tab_inner_box"
                                >
                                  <div className="weekends_box">
                                    <div className="row">
                                      <div className="col-md-12">
                                        {console.log(values)}
                                        <div className="day_box">
                                          <label
                                            className="day_label"
                                            htmlFor={"Sunday"}
                                          >
                                            {values?.day == "Sunday" ? (
                                              <label className="days_bg_3">
                                                <center>
                                                  <svg
                                                    width="11"
                                                    height="16"
                                                    viewBox="0 0 11 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            ) : (
                                              <label className="days_bg_2">
                                                <center>
                                                  <svg
                                                    width="11"
                                                    height="16"
                                                    viewBox="0 0 11 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            )}
                                            <input
                                              type="radio"
                                              name="day"
                                              className="hide_radio_btn"
                                              onChange={(e) =>
                                                setFieldValue(
                                                  "day",
                                                  e.target.value
                                                )
                                              }
                                              id="Sunday"
                                              value="Sunday"
                                              checked={values?.day === "Sunday"}
                                              placeholder=""
                                            />
                                          </label>

                                          <label>
                                            <label className="days_bg">
                                              <center>
                                                <svg
                                                  width="14"
                                                  height="15"
                                                  viewBox="0 0 14 15"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M0.037422 15V0.899999H1.85742L7.29742 13.16H6.69742L12.1374 0.899999H13.9374V15H12.0574V3.72H12.7174L7.63742 15H6.33742L1.25742 3.72H1.93742V15H0.037422Z"
                                                    fill="#9393AA"
                                                  />
                                                </svg>
                                              </center>
                                            </label>
                                          </label>

                                          <label>
                                            <label className="days_bg">
                                              <center>
                                                <svg
                                                  width="13"
                                                  height="15"
                                                  viewBox="0 0 13 15"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z"
                                                    fill="#9393AA"
                                                  />
                                                </svg>
                                              </center>
                                            </label>
                                          </label>

                                          <label>
                                            <label className="days_bg">
                                              <center>
                                                <svg
                                                  width="23"
                                                  height="15"
                                                  viewBox="0 0 23 15"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M5.87789 15L0.937891 0.899999H3.09789L7.19789 13.08H6.45789L10.7979 0.899999H12.3779L16.4579 13.08H15.7779L20.0179 0.899999H22.0579L17.0779 15H15.2979L11.3379 3.4H11.7579L7.63789 15H5.87789Z"
                                                    fill="#9393AA"
                                                  />
                                                </svg>
                                              </center>
                                            </label>
                                          </label>

                                          <label>
                                            <label className="days_bg">
                                              <center>
                                                <svg
                                                  width="13"
                                                  height="15"
                                                  viewBox="0 0 13 15"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z"
                                                    fill="#9393AA"
                                                  />
                                                </svg>
                                              </center>
                                            </label>
                                          </label>

                                          <label>
                                            <label className="days_bg">
                                              <center>
                                                <svg
                                                  width="11"
                                                  height="15"
                                                  viewBox="0 0 11 15"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M0.986172 15V0.899999H10.0262V2.56H3.06617V7.08H9.56617V8.74H3.06617V15H0.986172Z"
                                                    fill="#9393AA"
                                                  />
                                                </svg>
                                              </center>
                                            </label>
                                          </label>

                                          <label
                                            className="day_label"
                                            htmlFor={"Saturday"}
                                          >
                                            {values?.day == "Saturday" ? (
                                              <label className="days_bg_3">
                                                <center>
                                                  <svg
                                                    width="11"
                                                    height="16"
                                                    viewBox="0 0 11 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            ) : (
                                              <label className="days_bg_2">
                                                <center>
                                                  <svg
                                                    width="11"
                                                    height="16"
                                                    viewBox="0 0 11 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z"
                                                      fill="white"
                                                    />
                                                  </svg>
                                                </center>
                                              </label>
                                            )}
                                            <input
                                              type="radio"
                                              name="day"
                                              className="hide_radio_btn"
                                              onChange={(e) =>
                                                setFieldValue(
                                                  "day",
                                                  e.target.value
                                                )
                                              }
                                              id="Saturday"
                                              value="Saturday"
                                              checked={values?.day === "Saturday"}
                                              placeholder=""
                                            />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <h3 className="setting_time_slot_day mb_30">
                                        Morning
                                      </h3>
                                      <div className="col-md-4">
                                        <h5 className="start_at">Start at</h5>
                                        <Form.Group className="mb-3">
                                          <Form.Select>
                                            <option>8:00 am</option>
                                            <option>8:30 am</option>
                                            <option>9:00 am</option>
                                            <option>9:30 am</option>
                                            <option>10:00 am</option>
                                            <option>10:30 am</option>
                                            <option>11:00 am</option>
                                            <option>11:30 am</option>
                                            <option>12:00 am</option>
                                            <option>12:30 am</option>
                                            <option>01:00 am</option>
                                            <option>01:30 am</option>
                                            <option>02:00 am</option>
                                            <option>02:30 am</option>
                                            <option>03:00 am</option>
                                            <option>03:30 am</option>
                                            <option>04:00 am</option>
                                            <option>04:30 am</option>
                                            <option>05:00 am</option>
                                            <option>05:30 am</option>
                                            <option>06:00 am</option>
                                            <option>06:30 am</option>
                                          </Form.Select>
                                        </Form.Group>
                                        <img
                                          src={Icon.Clock}
                                          className="setting_watch_icon"
                                        ></img>
                                      </div>
                                      <div className="col-md-4">
                                        <h5 className="end_at">End at</h5>
                                        <Form.Group className="mb-3">
                                          <Form.Select>
                                            <option>8:00 am</option>
                                            <option>8:30 am</option>
                                            <option>9:00 am</option>
                                            <option>9:30 am</option>
                                            <option>10:00 am</option>
                                            <option>10:30 am</option>
                                            <option selected>11:00 am</option>
                                            <option>11:30 am</option>
                                            <option>12:00 am</option>
                                            <option>12:30 am</option>
                                            <option>01:00 am</option>
                                            <option>01:30 am</option>
                                            <option>02:00 am</option>
                                            <option>02:30 am</option>
                                            <option>03:00 am</option>
                                            <option>03:30 am</option>
                                            <option>04:00 am</option>
                                            <option>04:30 am</option>
                                            <option>05:00 am</option>
                                            <option>05:30 am</option>
                                            <option>06:00 am</option>
                                            <option>06:30 am</option>
                                          </Form.Select>
                                        </Form.Group>
                                        <img
                                          src={Icon.Clock}
                                          className="setting_watch_icon_2"
                                        ></img>
                                      </div>
                                    </div>
                                  </div>
                                </Tab>
                              </Tabs>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>) : (
              <div className="col-md-12">
                <div className="setting_profile_card_head">
                  <div className="row">
                    <div className="col-md-6">
                      <h3 className="setting_profile_title">Time Slot & Fees</h3>
                    </div>
                    <div className="col-md-6">

                    </div>
                  </div>
                </div>
                <div className="setting_profile_card_body">
                  <div className="row">
                    <Formik
                      initialValues={{
                        gender: "",
                        // date:Date.now()
                      }}

                      onSubmit={values => { console.log("values", values) }}
                    >
                      {({ values, setFieldValue, handleSubmit }) => (
                        <form onSubmit={handleSubmit} id="myForm">
                          <div className="col-md-6">
                            <div className="row mt_20">
                              <div className="col-md-12 col-sm-12">
                                <label className="setting_form_title">Consultation Fee (Rs)</label>
                                <div className="input_box">
                                  <div className="form_group">
                                    <input type="text" name="" className="disable_value" placeholder="" value="500" disabled />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row mt_10">
                              <div className="col-md-12">
                                <span className="setting_consult_fee_subtext">You will get net Rs. 400 after THS charge 10% + GST 18% deduction.</span>
                              </div>
                            </div>
                            <hr className="bottom_border mt_30 mb_30" />
                            <div className="row">
                              <div className="col-md-12">
                                <h3 className="setting_time_slot_title">Online Time Slot Managment</h3>
                              </div>
                            </div>
                            <div className="row mt_20">
                              <div className="col-md-12">
                                <Tabs defaultActiveKey="first">
                                  <Tab eventKey="first" title="Weekdays" className="tab_inner_box">
                                    <div className="weekdays_box">
                                      <div className="row">
                                        <div className="col-md-12">
                                          {console.log(values)}
                                          <div className="day_box">
                                            <label>
                                              <label className="days_bg">
                                                <center>
                                                  <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z" fill="#9393AA" />
                                                  </svg>
                                                </center>
                                              </label>
                                            </label>
                                            <label className="day_label" htmlFor={"Monday"}>
                                              {values?.day == "Monday" ?
                                                <label className="days_bg_3">
                                                  <center>
                                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M0.037422 15V0.899999H1.85742L7.29742 13.16H6.69742L12.1374 0.899999H13.9374V15H12.0574V3.72H12.7174L7.63742 15H6.33742L1.25742 3.72H1.93742V15H0.037422Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                                :
                                                <label className="days_bg_2">
                                                  <center>
                                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M0.037422 15V0.899999H1.85742L7.29742 13.16H6.69742L12.1374 0.899999H13.9374V15H12.0574V3.72H12.7174L7.63742 15H6.33742L1.25742 3.72H1.93742V15H0.037422Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                              }
                                              <input type="radio" name="day" className="hide_radio_btn" onChange={e => setFieldValue("day", e.target.value)} id="Monday" value="Monday" checked={values?.day === "Monday"} placeholder="" />
                                            </label>

                                            <label className="day_label" htmlFor={"Tuesday"}>
                                              {values?.day == "Tuesday" ?
                                                <label className="days_bg_3" >
                                                  <center>
                                                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                                :
                                                <label className="days_bg_2" >
                                                  <center>
                                                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                              }
                                              <input type="radio" name="day" className="hide_radio_btn" onChange={e => setFieldValue("day", e.target.value)} id="Tuesday" value="Tuesday" checked={values?.day === "Tuesday"} placeholder="" />
                                            </label>

                                            <label className="day_label" htmlFor={"Wednesday"}>
                                              {values?.day == "Wednesday" ?
                                                <label className="days_bg_3">
                                                  <center>
                                                    <svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M5.87789 15L0.937891 0.899999H3.09789L7.19789 13.08H6.45789L10.7979 0.899999H12.3779L16.4579 13.08H15.7779L20.0179 0.899999H22.0579L17.0779 15H15.2979L11.3379 3.4H11.7579L7.63789 15H5.87789Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                                :
                                                <label className="days_bg_2">
                                                  <center>
                                                    <svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M5.87789 15L0.937891 0.899999H3.09789L7.19789 13.08H6.45789L10.7979 0.899999H12.3779L16.4579 13.08H15.7779L20.0179 0.899999H22.0579L17.0779 15H15.2979L11.3379 3.4H11.7579L7.63789 15H5.87789Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                              }
                                              <input type="radio" name="day" className="hide_radio_btn" onChange={e => setFieldValue("day", e.target.value)} id="Wednesday" value="Wednesday" checked={values?.day === "Wednesday"} placeholder="" />
                                            </label>

                                            <label className="day_label" htmlFor={"Thursday"}>
                                              {values?.day == "Thursday" ?
                                                <label className="days_bg_3">
                                                  <center>
                                                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                                :
                                                <label className="days_bg_2">
                                                  <center>
                                                    <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                              }
                                              <input type="radio" name="day" className="hide_radio_btn" onChange={e => setFieldValue("day", e.target.value)} id="Thursday" value="Thursday" checked={values?.day === "Thursday"} placeholder="" />
                                            </label>

                                            <label className="day_label" htmlFor={"Friday"}>
                                              {values?.day == "Friday" ?
                                                <label className="days_bg_3">
                                                  <center>
                                                    <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M0.986172 15V0.899999H10.0262V2.56H3.06617V7.08H9.56617V8.74H3.06617V15H0.986172Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                                :
                                                <label className="days_bg_2">
                                                  <center>
                                                    <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M0.986172 15V0.899999H10.0262V2.56H3.06617V7.08H9.56617V8.74H3.06617V15H0.986172Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                              }
                                              <input type="radio" name="day" className="hide_radio_btn" onChange={e => setFieldValue("day", e.target.value)} id="Friday" value="Friday" checked={values?.day === "Friday"} placeholder="" />
                                            </label>

                                            <label>
                                              <label className="days_bg">
                                                <center>
                                                  <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z" fill="#9393AA" />
                                                  </svg>
                                                </center>
                                              </label>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <Accordion defaultActiveKey={['0']} alwaysOpen>
                                        <Accordion.Item eventKey="0">
                                          <Accordion.Header>Morning</Accordion.Header>
                                          <Accordion.Body>
                                            <div className="row">
                                              <div className="col-md-5">
                                                <h5 className="start_at">Start at</h5>
                                                <Form.Group className="mb-3">
                                                  <Form.Select>
                                                    <option>8:00 am</option>
                                                    <option>8:30 am</option>
                                                    <option>9:00 am</option>
                                                    <option>9:30 am</option>
                                                    <option>10:00 am</option>
                                                    <option>10:30 am</option>
                                                    <option>11:00 am</option>
                                                    <option>11:30 am</option>
                                                    <option>12:00 am</option>
                                                    <option>12:30 am</option>
                                                    <option>01:00 am</option>
                                                    <option>01:30 am</option>
                                                    <option>02:00 am</option>
                                                    <option>02:30 am</option>
                                                    <option>03:00 am</option>
                                                    <option>03:30 am</option>
                                                    <option>04:00 am</option>
                                                    <option>04:30 am</option>
                                                    <option>05:00 am</option>
                                                    <option>05:30 am</option>
                                                    <option>06:00 am</option>
                                                    <option>06:30 am</option>
                                                  </Form.Select>
                                                </Form.Group>
                                                <img src={Icon.Clock} className="setting_watch_icon"></img>
                                              </div>
                                              <div className="col-md-5">
                                                <h5 className="end_at">End at</h5>
                                                <Form.Group className="mb-3">
                                                  <Form.Select>
                                                    <option>8:00 am</option>
                                                    <option>8:30 am</option>
                                                    <option>9:00 am</option>
                                                    <option>9:30 am</option>
                                                    <option>10:00 am</option>
                                                    <option>10:30 am</option>
                                                    <option selected>11:00 am</option>
                                                    <option>11:30 am</option>
                                                    <option>12:00 am</option>
                                                    <option>12:30 am</option>
                                                    <option>01:00 am</option>
                                                    <option>01:30 am</option>
                                                    <option>02:00 am</option>
                                                    <option>02:30 am</option>
                                                    <option>03:00 am</option>
                                                    <option>03:30 am</option>
                                                    <option>04:00 am</option>
                                                    <option>04:30 am</option>
                                                    <option>05:00 am</option>
                                                    <option>05:30 am</option>
                                                    <option>06:00 am</option>
                                                    <option>06:30 am</option>
                                                  </Form.Select>
                                                </Form.Group>
                                                <img src={Icon.Clock} className="setting_watch_icon_2"></img>
                                              </div>
                                            </div>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                          <Accordion.Header>Afternoon</Accordion.Header>
                                          <Accordion.Body>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                          <Accordion.Header>Evening</Accordion.Header>
                                          <Accordion.Body>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                          <Accordion.Header>Night</Accordion.Header>
                                          <Accordion.Body>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      </Accordion>
                                      <div className="row mt_20">
                                        <div className="col-md-12">
                                          <label className="ml_20" htmlFor={"emergency_calls"}>
                                            <input type="checkbox" name="emergency_calls" className="checkbox_icon" value="emergency_calls" checked={chkValue} />
                                            <span className="emergency_call_text" onClick={() => setChkValue(!chkValue)}>Emergency calls</span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="row mt_50">
                                        <div className="col-md-4">
                                          {/* <Link to="/timeslotfees"> */}
                                          <button onClick={() => setEdit(false)} className="continue_btn" variant="primary">Save</button>
                                          {/* </Link> */}
                                        </div>
                                      </div>
                                    </div>
                                  </Tab>
                                  <Tab eventKey="second" title="Weekends" className="tab_inner_box">
                                    <div className="weekends_box">
                                      <div className="row">
                                        <div className="col-md-12">
                                          {console.log(values)}
                                          <div className="day_box">
                                            <label className="day_label" htmlFor={"Sunday"}>
                                              {values?.day == "Sunday" ?
                                                <label className="days_bg_3">
                                                  <center>
                                                    <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                                :
                                                <label className="days_bg_2">
                                                  <center>
                                                    <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                              }
                                              <input type="radio" name="day" className="hide_radio_btn" onChange={e => setFieldValue("day", e.target.value)} id="Sunday" value="Sunday" checked={values?.day === "Sunday"} placeholder="" />
                                            </label>

                                            <label>
                                              <label className="days_bg">
                                                <center>
                                                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.037422 15V0.899999H1.85742L7.29742 13.16H6.69742L12.1374 0.899999H13.9374V15H12.0574V3.72H12.7174L7.63742 15H6.33742L1.25742 3.72H1.93742V15H0.037422Z" fill="#9393AA" />
                                                  </svg>
                                                </center>
                                              </label>
                                            </label>

                                            <label>
                                              <label className="days_bg">
                                                <center>
                                                  <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z" fill="#9393AA" />
                                                  </svg>
                                                </center>
                                              </label>
                                            </label>

                                            <label>
                                              <label className="days_bg">
                                                <center>
                                                  <svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.87789 15L0.937891 0.899999H3.09789L7.19789 13.08H6.45789L10.7979 0.899999H12.3779L16.4579 13.08H15.7779L20.0179 0.899999H22.0579L17.0779 15H15.2979L11.3379 3.4H11.7579L7.63789 15H5.87789Z" fill="#9393AA" />
                                                  </svg>
                                                </center>
                                              </label>
                                            </label>

                                            <label>
                                              <label className="days_bg">
                                                <center>
                                                  <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z" fill="#9393AA" />
                                                  </svg>
                                                </center>
                                              </label>
                                            </label>

                                            <label>
                                              <label className="days_bg">
                                                <center>
                                                  <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.986172 15V0.899999H10.0262V2.56H3.06617V7.08H9.56617V8.74H3.06617V15H0.986172Z" fill="#9393AA" />
                                                  </svg>
                                                </center>
                                              </label>
                                            </label>

                                            <label className="day_label" htmlFor={"Saturday"}>
                                              {values?.day == "Saturday" ?
                                                <label className="days_bg_3">
                                                  <center>
                                                    <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                                :
                                                <label className="days_bg_2">
                                                  <center>
                                                    <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z" fill="white" />
                                                    </svg>
                                                  </center>
                                                </label>
                                              }
                                              <input type="radio" name="day" className="hide_radio_btn" onChange={e => setFieldValue("day", e.target.value)} id="Saturday" value="Saturday" checked={values?.day === "Saturday"} placeholder="" />
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                      <Accordion defaultActiveKey={['0']} alwaysOpen>
                                        <Accordion.Item eventKey="0">
                                          <Accordion.Header>Morning</Accordion.Header>
                                          <Accordion.Body>
                                            <div className="row">
                                              <div className="col-md-5">
                                                <h5 className="start_at">Start at</h5>
                                                <Form.Group className="mb-3">
                                                  <Form.Select>
                                                    <option>8:00 am</option>
                                                    <option>8:30 am</option>
                                                    <option>9:00 am</option>
                                                    <option>9:30 am</option>
                                                    <option>10:00 am</option>
                                                    <option>10:30 am</option>
                                                    <option>11:00 am</option>
                                                    <option>11:30 am</option>
                                                    <option>12:00 am</option>
                                                    <option>12:30 am</option>
                                                    <option>01:00 am</option>
                                                    <option>01:30 am</option>
                                                    <option>02:00 am</option>
                                                    <option>02:30 am</option>
                                                    <option>03:00 am</option>
                                                    <option>03:30 am</option>
                                                    <option>04:00 am</option>
                                                    <option>04:30 am</option>
                                                    <option>05:00 am</option>
                                                    <option>05:30 am</option>
                                                    <option>06:00 am</option>
                                                    <option>06:30 am</option>
                                                  </Form.Select>
                                                </Form.Group>
                                                <img src={Icon.Clock} className="setting_watch_icon"></img>
                                              </div>
                                              <div className="col-md-5">
                                                <h5 className="end_at">End at</h5>
                                                <Form.Group className="mb-3">
                                                  <Form.Select>
                                                    <option>8:00 am</option>
                                                    <option>8:30 am</option>
                                                    <option>9:00 am</option>
                                                    <option>9:30 am</option>
                                                    <option>10:00 am</option>
                                                    <option>10:30 am</option>
                                                    <option selected>11:00 am</option>
                                                    <option>11:30 am</option>
                                                    <option>12:00 am</option>
                                                    <option>12:30 am</option>
                                                    <option>01:00 am</option>
                                                    <option>01:30 am</option>
                                                    <option>02:00 am</option>
                                                    <option>02:30 am</option>
                                                    <option>03:00 am</option>
                                                    <option>03:30 am</option>
                                                    <option>04:00 am</option>
                                                    <option>04:30 am</option>
                                                    <option>05:00 am</option>
                                                    <option>05:30 am</option>
                                                    <option>06:00 am</option>
                                                    <option>06:30 am</option>
                                                  </Form.Select>
                                                </Form.Group>
                                                <img src={Icon.Clock} className="setting_watch_icon_2"></img>
                                              </div>
                                            </div>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                          <Accordion.Header>Afternoon</Accordion.Header>
                                          <Accordion.Body>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                          <Accordion.Header>Evening</Accordion.Header>
                                          <Accordion.Body>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                          <Accordion.Header>Night</Accordion.Header>
                                          <Accordion.Body>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      </Accordion>
                                      <div className="row mt_20">
                                        <div className="col-md-12">
                                          <label className="ml_20" htmlFor={"emergency_calls"}>
                                            <input type="checkbox" name="emergency_calls" className="checkbox_icon" value="emergency_calls" checked={chkValue} />
                                            <span className="emergency_call_text" onClick={() => setChkValue(!chkValue)}>Emergency calls</span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="row mt_50">
                                        <div className="col-md-4">
                                          <button onClick={() => setEdit(false)} className="continue_btn" variant="primary">Save</button>
                                        </div>
                                      </div>
                                    </div>
                                  </Tab>
                                </Tabs>
                              </div>
                            </div>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </Container>
    </>
  );
}

export default Timeslotfees;
