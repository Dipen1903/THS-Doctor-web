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
import { BackGround, Icon, Logo } from "../Utilities/Icons";
import Header from "../Dashboard/Header";
import { Link } from "react-router-dom"

function EditTimeslotfees() {


	const [value, setValue] = React.useState(2);
	const [chkValue, setChkValue] = useState(false);

	return (
		<>
			{/* <Header/> */}
			<Container
				fluid
				className="profile_container"
			>
				<h2 className="settings_title mt_10">Settings</h2>
				<div className="row settingscards_box">
					{/* <div className="col-md-3">
    			<div className="settings_tab_card">
    				<ul className="setting_ul">
    				<Link to="/timeslotfees" style={{textDecoration:"none"}}>
								<li className="profile_tab_option_active_bg">
									<span>
										<svg className="profile_option_icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9993 2.75033C6.443 2.75033 2.74935 6.44398 2.74935 11.0003C2.74935 15.5567 6.443 19.2503 10.9993 19.2503C15.5557 19.2503 19.2494 15.5567 19.2494 11.0003C19.2494 6.44398 15.5557 2.75033 10.9993 2.75033ZM0.916016 11.0003C0.916016 5.43145 5.43048 0.916992 10.9993 0.916992C16.5682 0.916992 21.0827 5.43145 21.0827 11.0003C21.0827 16.5692 16.5682 21.0837 10.9993 21.0837C5.43048 21.0837 0.916016 16.5692 0.916016 11.0003Z" fill="#3093BB"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9154 10.7631V4.58398H10.082V11.0007C10.082 11.1564 10.1217 11.3096 10.1974 11.4458L12.4891 15.5708L14.0917 14.6805L11.9154 10.7631Z" fill="#3093BB"/>
										</svg>
									</span>
									<span className="settings_option_text_active">
										Time Slot & Fees
									</span>
									<span>
										<svg className="profile_option_icon" width="8" height="14" class="setting_arrow" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1.25 12.5L6.75 7L1.25 1.5" stroke="#3093BB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									</span>
								</li>
								</Link>
								<Link to="/bankdetails" style={{textDecoration:"none"}}>
								<li className="profile_tab_option_bg">
									<span>
										<svg className="profile_option_icon" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fill-rule="evenodd" clip-rule="evenodd" d="M0.916016 17.4167C0.916016 16.9104 1.32642 16.5 1.83268 16.5H20.166C20.6723 16.5 21.0827 16.9104 21.0827 17.4167V20.1667C21.0827 20.6729 20.6723 21.0833 20.166 21.0833H1.83268C1.32642 21.0833 0.916016 20.6729 0.916016 20.1667V17.4167ZM2.74935 18.3333V19.25H19.2494V18.3333H2.74935Z" fill="#9393AA"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M14.666 7.33366C14.666 6.8274 15.0764 6.41699 15.5827 6.41699H18.3327C18.8389 6.41699 19.2493 6.8274 19.2493 7.33366V17.417C19.2493 17.9233 18.8389 18.3337 18.3327 18.3337H15.5827C15.0764 18.3337 14.666 17.9233 14.666 17.417V7.33366ZM16.4993 8.25033V16.5003H17.416V8.25033H16.4993Z" fill="#9393AA"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M8.70703 7.33366C8.70703 6.8274 9.11744 6.41699 9.6237 6.41699H12.3737C12.88 6.41699 13.2904 6.8274 13.2904 7.33366V17.417C13.2904 17.9233 12.88 18.3337 12.3737 18.3337H9.6237C9.11744 18.3337 8.70703 17.9233 8.70703 17.417V7.33366ZM10.5404 8.25033V16.5003H11.457V8.25033H10.5404Z" fill="#9393AA"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M2.75 7.33366C2.75 6.8274 3.16041 6.41699 3.66667 6.41699H6.41667C6.92293 6.41699 7.33333 6.8274 7.33333 7.33366V17.417C7.33333 17.9233 6.92293 18.3337 6.41667 18.3337H3.66667C3.16041 18.3337 2.75 17.9233 2.75 17.417V7.33366ZM4.58333 8.25033V16.5003H5.5V8.25033H4.58333Z" fill="#9393AA"/>
											<path fill-rule="evenodd" clip-rule="evenodd" d="M10.6589 0.982555C10.8775 0.895138 11.1212 0.895138 11.3398 0.982555L20.5065 4.64922C20.8545 4.78843 21.0827 5.1255 21.0827 5.50033V7.33366C21.0827 7.83992 20.6723 8.25033 20.166 8.25033H1.83268C1.32642 8.25033 0.916016 7.83992 0.916016 7.33366V5.50033C0.916016 5.1255 1.14422 4.78843 1.49224 4.64922L10.6589 0.982555ZM2.74935 6.12094V6.41699H19.2494V6.12094L10.9993 2.82094L2.74935 6.12094Z" fill="#9393AA"/>
										</svg>
									</span>
									<span className="profile_option_text">
										Bank Details
									</span>
									<span>
										<svg className="profile_option_icon"  width="8" height="14" class="setting_arrow" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1.25 12.5L6.75 7L1.25 1.5" stroke="#9393AA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
																			<Link to="/timeslotfees">
																				<button className="continue_btn" variant="primary">Save</button></Link>
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
																			<button className="continue_btn" variant="primary">Save</button>
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
				</div>

			</Container>
		</>
	);
}

export default EditTimeslotfees;