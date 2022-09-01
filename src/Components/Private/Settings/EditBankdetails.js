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
import SettingHeader from "./SettingHeaders";
import { BackGround, Icon, Logo } from "../Utilities/Icons";
import Header from "../Dashboard/Header";
import { Link } from "react-router-dom";

function EditBankdetails() {
  return (
    <>
      {/* <Header/> */}
      <Container fluid className="profile_container">
        <h2 className="settings_title mt_10">Settings</h2>
        <div className="row settingscards_box">
          {/* <div className="col-md-3">
					<div className="settings_tab_card">
						<ul className="setting_ul">
						<Link to="/timeslotfees" style={{textDecoration:"none"}}>
						<li className="profile_tab_option_bg">
							<span>
								<svg className="profile_option_icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9993 2.75033C6.443 2.75033 2.74935 6.44398 2.74935 11.0003C2.74935 15.5567 6.443 19.2503 10.9993 19.2503C15.5557 19.2503 19.2494 15.5567 19.2494 11.0003C19.2494 6.44398 15.5557 2.75033 10.9993 2.75033ZM0.916016 11.0003C0.916016 5.43145 5.43048 0.916992 10.9993 0.916992C16.5682 0.916992 21.0827 5.43145 21.0827 11.0003C21.0827 16.5692 16.5682 21.0837 10.9993 21.0837C5.43048 21.0837 0.916016 16.5692 0.916016 11.0003Z" fill="#9393AA"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9154 10.7631V4.58398H10.082V11.0007C10.082 11.1564 10.1217 11.3096 10.1974 11.4458L12.4891 15.5708L14.0917 14.6805L11.9154 10.7631Z" fill="#9393AA"/>
								</svg>
							</span>
							<span className="profile_option_text">
								Time Slot & Fees
							</span>
							<span>
								<svg className="profile_option_icon" width="8" height="14" class="setting_arrow" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1.25 12.5L6.75 7L1.25 1.5" stroke="#9393AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</span>
						</li>
						</Link>
						<Link to="/bankdetails" style={{textDecoration:"none"}}>
						<li className="profile_tab_option_active_bg">
							<span>
								<svg className="profile_option_icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M0.916016 17.4167C0.916016 16.9104 1.32642 16.5 1.83268 16.5H20.166C20.6723 16.5 21.0827 16.9104 21.0827 17.4167V20.1667C21.0827 20.6729 20.6723 21.0833 20.166 21.0833H1.83268C1.32642 21.0833 0.916016 20.6729 0.916016 20.1667V17.4167ZM2.74935 18.3333V19.25H19.2494V18.3333H2.74935Z" fill="#3093BB"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M14.666 7.33366C14.666 6.8274 15.0764 6.41699 15.5827 6.41699H18.3327C18.8389 6.41699 19.2493 6.8274 19.2493 7.33366V17.417C19.2493 17.9233 18.8389 18.3337 18.3327 18.3337H15.5827C15.0764 18.3337 14.666 17.9233 14.666 17.417V7.33366ZM16.4993 8.25033V16.5003H17.416V8.25033H16.4993Z" fill="#3093BB"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M8.70703 7.33366C8.70703 6.8274 9.11744 6.41699 9.6237 6.41699H12.3737C12.88 6.41699 13.2904 6.8274 13.2904 7.33366V17.417C13.2904 17.9233 12.88 18.3337 12.3737 18.3337H9.6237C9.11744 18.3337 8.70703 17.9233 8.70703 17.417V7.33366ZM10.5404 8.25033V16.5003H11.457V8.25033H10.5404Z" fill="#3093BB"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M2.75 7.33366C2.75 6.8274 3.16041 6.41699 3.66667 6.41699H6.41667C6.92293 6.41699 7.33333 6.8274 7.33333 7.33366V17.417C7.33333 17.9233 6.92293 18.3337 6.41667 18.3337H3.66667C3.16041 18.3337 2.75 17.9233 2.75 17.417V7.33366ZM4.58333 8.25033V16.5003H5.5V8.25033H4.58333Z" fill="#3093BB"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M10.6589 0.982555C10.8775 0.895138 11.1212 0.895138 11.3398 0.982555L20.5065 4.64922C20.8545 4.78843 21.0827 5.1255 21.0827 5.50033V7.33366C21.0827 7.83992 20.6723 8.25033 20.166 8.25033H1.83268C1.32642 8.25033 0.916016 7.83992 0.916016 7.33366V5.50033C0.916016 5.1255 1.14422 4.78843 1.49224 4.64922L10.6589 0.982555ZM2.74935 6.12094V6.41699H19.2494V6.12094L10.9993 2.82094L2.74935 6.12094Z" fill="#3093BB"/>
								</svg>
							</span>
							<span className="settings_option_text_active">
								Bank Details
							</span>
							<span>
								<svg className="profile_option_icon"  width="8" height="14" class="setting_arrow" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1.25 12.5L6.75 7L1.25 1.5" stroke="#3093BB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</span>
						</li>
						</Link>
						<Link to="/changepassword" style={{textDecoration:"none"}}>
						<li className="profile_tab_option_bg">
							<span>
								<svg className="profile_option_icon" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M8.08398 16.9587V14.667H9.91732V16.9587H8.08398Z" fill="#9393AA"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M9.00065 12.8333C8.74752 12.8333 8.54232 13.0385 8.54232 13.2917C8.54232 13.5448 8.74752 13.75 9.00065 13.75C9.25378 13.75 9.45898 13.5448 9.45898 13.2917C9.45898 13.0385 9.25378 12.8333 9.00065 12.8333ZM6.70898 13.2917C6.70898 12.026 7.735 11 9.00065 11C10.2663 11 11.2923 12.026 11.2923 13.2917C11.2923 14.5573 10.2663 15.5833 9.00065 15.5833C7.735 15.5833 6.70898 14.5573 6.70898 13.2917Z" fill="#9393AA"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 11.459C0.75 9.9402 1.98122 8.70898 3.5 8.70898H14.5C16.0188 8.70898 17.25 9.9402 17.25 11.459V17.4173C17.25 18.9361 16.0188 20.1673 14.5 20.1673H3.5C1.98122 20.1673 0.75 18.9361 0.75 17.4173V11.459ZM3.5 10.5423C2.99374 10.5423 2.58333 10.9527 2.58333 11.459V17.4173C2.58333 17.9236 2.99374 18.334 3.5 18.334H14.5C15.0063 18.334 15.4167 17.9236 15.4167 17.4173V11.459C15.4167 10.9527 15.0063 10.5423 14.5 10.5423H3.5Z" fill="#9393AA"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 5.50033C3.5 2.96902 5.55203 0.916992 8.08333 0.916992H9.91667C12.448 0.916992 14.5 2.96902 14.5 5.50033V9.62533C14.5 10.1316 14.0896 10.542 13.5833 10.542H4.41667C3.91041 10.542 3.5 10.1316 3.5 9.62533V5.50033ZM8.08333 2.75033C6.56455 2.75033 5.33333 3.98154 5.33333 5.50033V8.70866H12.6667V5.50033C12.6667 3.98154 11.4354 2.75033 9.91667 2.75033H8.08333Z" fill="#9393AA"/>
								</svg>
							</span>
							<span className="profile_option_text">
								Change Password
							</span>
							<span>
								<svg width="8" height="14" class="setting_arrow" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1.25 12.5L6.75 7L1.25 1.5" stroke="#9393AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</span>
						</li>
						</Link>
						<Link to="/changemobilenumber" style={{textDecoration:"none"}}>
						<li className="profile_tab_option_bg">
							<span>
								<svg className="profile_option_icon" width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M0.583984 3.66699C0.583984 2.14821 1.8152 0.916992 3.33398 0.916992H10.6673C12.1861 0.916992 13.4173 2.14821 13.4173 3.66699V18.3337C13.4173 19.8524 12.1861 21.0837 10.6673 21.0837H3.33398C1.8152 21.0837 0.583984 19.8524 0.583984 18.3337V3.66699ZM3.33398 2.75033C2.82772 2.75033 2.41732 3.16073 2.41732 3.66699V18.3337C2.41732 18.8399 2.82772 19.2503 3.33398 19.2503H10.6673C11.1736 19.2503 11.584 18.8399 11.584 18.3337V3.66699C11.584 3.16073 11.1736 2.75033 10.6673 2.75033H3.33398Z" fill="#9393AA"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M8.375 18.7923H5.625V16.959H8.375V18.7923Z" fill="#9393AA"/>
									<path fill-rule="evenodd" clip-rule="evenodd" d="M3.33398 1.83366C3.33398 1.3274 3.74439 0.916992 4.25065 0.916992H9.75065C10.2569 0.916992 10.6673 1.3274 10.6673 1.83366V2.29199C10.6673 3.81078 9.4361 5.04199 7.91732 5.04199H6.08398C4.5652 5.04199 3.33398 3.81078 3.33398 2.29199V1.83366ZM5.28995 2.75033C5.44845 3.02432 5.74469 3.20866 6.08398 3.20866H7.91732C8.25661 3.20866 8.55286 3.02432 8.71135 2.75033H5.28995Z" fill="#9393AA"/>
								</svg>
							</span>
							<span className="profile_option_text">
								Change Mobile no.
							</span>
							<span>
								<svg width="8" height="14" class="setting_arrow" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M1.25 12.5L6.75 7L1.25 1.5" stroke="#9393AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</span>
						</li>
						</Link>
						</ul>
					</div>
				</div> */}
          <div className="col-md-9">
            <div className="setting_profile_card_head">
              <div className="row">
                <div className="col-md-6">
                  <h3 className="setting_bank_title">Bank Details</h3>
                </div>
                <div className="col-md-6"></div>
              </div>
            </div>
            <div className="setting_profile_card_body">
              <div className="row">
                <Formik
                  initialValues={{}}
                  onSubmit={(values) => {
                    console.log("values", values);
                  }}
                >
                  {({ values, setFieldValue, handleSubmit }) => (
                    <form onSubmit={handleSubmit} id="myForm">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-12 mt_20">
                            <label className="sign_title">
                              {" "}
                              Account Holder Name{" "}
                            </label>
                            <div className="input_box">
                              <div className="form_group">
                                <input
                                  type="text"
                                  name="account_name"
                                  placeholder=""
                                  value="John doe"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt_20">
                          <div className="col-md-12">
                            <label className="sign_title">
                              {" "}
                              Account Number{" "}
                            </label>
                            <div className="input_box">
                              <div className="form_group">
                                <input
                                  type="text"
                                  name="account_number"
                                  placeholder=""
                                  value="3132131131311"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt_20">
                          <div className="col-md-12 ">
                            <label className="sign_title"> IFSC Code </label>
                            <div className="input_box">
                              <div className="form_group">
                                <input
                                  type="text"
                                  name="ifc_code"
                                  placeholder=""
                                  value="BARB012112"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="bottom_border mt_30 mb_30" />
                        <div className="row">
                          <div className="col-md-12">
                            <h3 className="upi_title">UPI</h3>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 mt_20">
                            <label className="sign_title"> UPI ID </label>
                            <div className="input_box">
                              <div className="form_group">
                                <input
                                  type="text"
                                  name="upi_id"
                                  placeholder=""
                                  value="9183121322@upi"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt_50">
                          <div className="col-md-4">
                            <Link to="/bankdetails">
                              <button
                                className="continue_btn"
                                variant="primary"
                              >
                                Save
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default EditBankdetails;
