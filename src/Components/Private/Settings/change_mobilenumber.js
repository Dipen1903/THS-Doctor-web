import React, { Fragment } from "react";
import "../../../Assets/css/style.css";
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
import { Link } from "react-router-dom"
import FormControl from "../../Common/Forms/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { ChangeMobileNumber } from "../../../Store/Reducers/ProfileReducer";


function Changemobilenum() {

const dispatch = useDispatch();

const [mobileData, setMobileData] = useState({
		mobile_number: "",
		otp:""
	});

	return (
		<>
			<Container fluid >
				<div className="row settingscards">
					<div className="col-md-12">
						<div className="setting_profile_card_head">
							<div className="row">
								<div className="col-md-6">
									<h3 className="setting_change_mobile">Change Mobile Number</h3>
								</div>
								<div className="col-md-6">

								</div>
							</div>
						</div>
						<div className="setting_profile_card_body">
							<div className="row">
								<Formik
									initialValues={mobileData}
									onSubmit={(values) =>
										dispatch(ChangeMobileNumber(values)).then((res) => {
											if (res.payload.success) {												
											}
											console.log("Change Mobile Response::::: ", res);
											// console.log("Change Mobile Value::::: ", values);
										})
									}
									// onSubmit={values => { console.log("values", values) }}
								>
									{({
										values,
										setFieldValue,
										handleChange,
										handleSubmit
									}) => (
										<form onSubmit={handleSubmit} id="myForm">
											<div className="col-md-6">
												<div className="row">
													<div className="col-md-12">
														<label className="sign_title">Current Mobile Number</label>
														<div className="input_box">
															<div className="form_group">
																{/* <input type="text" name="current_mobilenumber" placeholder="" value="9318319131" /> */}

																<FormControl
																	control="input"
																	type="text"
																	name="mobile_number"
																	id="mobile_number"
																	// label="mobile_number"
																	// disabled={!edit}
																	onChange={handleChange}
																	// onBlur={handleBlur}
																	value={values?.mobile_number}
																/>															
																<span className="send_otp">Send OTP</span>
															</div>
														</div>
													</div>
												</div>
												<div className="row mt_20">
													<div className ="col-md-12">
														<label className="sign_title"> Enter OTP </label>
														<div className ="input_box">
															<div className ="form_group">
																{/* <input type="text" name="enter_otp" placeholder="" value="" /> */}

																<FormControl
																	control="input"
																	type="text"
																	name="otp"
																	id="otp"
																	// label="otp"
																	// disabled={!edit}
																	onChange={handleChange}
																	// onBlur={handleBlur}
																	value={values?.otp}
																/>																
															</div>
														</div>
													</div>
												</div>
												<div className="row mt_30">
													<div className="col-md-4">
														{/* <Link to="/changenewmobilenum"> */}
															<button type="submit" className="continue_btn" variant="primary">Verify</button>
															{/* </Link> */}
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

export default Changemobilenum;