import React, { useEffect, useState } from "react";
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
import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
// import Header from "../Dashboard/Header";
import { useDispatch, useSelector } from "react-redux";
import FormControl from "../../Common/Forms/FormControl";
import { ChangePassword } from "../../../Store/Reducers/ProfileReducer";
import { ChangePasswordSchema } from "../../../Utilities/Schema";

import { Link } from "react-router-dom"

function Changepassword() {

	// const [confirmpassword, setConfirmpassword] = useState("");

	const dispatch = useDispatch();

	const [passwordData, setPasswordData] = useState({
		old_password: "",
		new_password: ""
	})

	return (
		<>
			<Container fluid >
				<div className="row settingscards_box">
					<div className="col-md-12">
						<div className="setting_profile_card_head">
							<div className="row">
								<div className="col-md-6">
									<h3 className="setting_change_password">
										Change Password
									</h3>
								</div>
								<div className="col-md-6">
								</div>
							</div>
						</div>
						<div className="setting_profile_card_body">
							<div className="row">
								<Formik
									initialValues={passwordData}
									validationSchema={ChangePasswordSchema}
									onSubmit={(values) =>
										dispatch(ChangePassword(values)).then((res) => {
											if (res.payload.success) {
												// console.log("change Password::::: ", res.payload)
											}
											console.log("change Password::::: ", res.payload)
											console.log("Password change: ", values);
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
													<div className="col-md-12 mt_20">
														<label className="sign_title">Current Password</label>
														<div className="input_box">
															<div className="form_group">
																{/* <input type="text" name="current_password" placeholder="" value="" /> */}

																<FormControl
																	control="input"
																	type="text"
																	name="old_password"
																	id="old_password"
																	onChange={handleChange}
																	value={values?.old_password}
																/>
															
															</div>
														</div>
													</div>
												</div>
												<div className="row mt_20">
													<div className="col-md-12">
														<label className="sign_title"> New Password </label>
														<div className="input_box">
															<div className="form_group">
																{/* <input type="text" name="new_password" placeholder="" value="" /> */}

																<FormControl
																	control="input"
																	type="text"
																	name="new_password"
																	id="new_password"
																	onChange={handleChange}
																	value={values.new_password}
																/>

															</div>
														</div>
													</div>
												</div>
												<div className="row mt_20">
													<div className="col-md-12 ">
														<label className="sign_title"> Confirm New Password</label>
														<div className="input_box">
															<div className="form_group">
																{/* <input onChange={e => setConfirmpassword(e.target.value)} value={confirmpassword} type="text" name="confirm_password" placeholder="" /> */}

																<FormControl
																	control="input"
																	type="text"
																	name="confirm_password"
																	id="confirm_password"
																	// label="First Name"
																	// disabled={!isEdit}
																	onChange={handleChange}
																	// onBlur={handleBlur}
																	value={values.confirm_password}
																/> 

															</div>
														</div>
													</div>
												</div>
												<div className="row mt_50">
													<div className="col-md-4">
														<button type="submit" className="continue_btn" variant="primary">Save</button>
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


export default Changepassword;