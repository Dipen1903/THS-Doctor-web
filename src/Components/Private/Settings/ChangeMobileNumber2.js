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
import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
// import Header from "../Dashboard/Header";
import { Link } from "react-router-dom";

function Changemobilenum2() {
	const [modalShow, setModalShow] = useState(false);

	currentNumbersOtp;

	return (
		<>
			<MyModal show={modalShow} onHide={() => setModalShow(false)} />

			<Container fluid className="profile_container">
				
				<div className="row settingscards_box">					
					<div className="col-md-12 border">
						<div className="setting_profile_card_head">
							<div className="row">
								<div class="col-md-6">
									<h3 className="setting_change_mobile">
										Change Mobile Number
									</h3>
								</div>
								<div class="col-md-6"></div>
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
												<div class="row">
													<div class="col-md-12">
														<label className="sign_title">
															New Mobile Number
														</label>
														<div class="input_box">
															<div class="form_group">
																<input
																	type="text"
																	name="current_mobilenumber"
																	placeholder=""
																	value=""
																/>
																<span className="send_otp">Send OTP</span>
															</div>
														</div>
													</div>
												</div>
												<div class="row mt_20">
													<div class="col-md-12">
														<label className="sign_title"> Enter OTP </label>
														<div class="input_box">
															<div class="form_group">
																<input
																	type="text"
																	name="enter_otp"
																	placeholder=""
																	value=""
																/>
															</div>
														</div>
													</div>
												</div>
												<div className="row mt_30">
													<div className="col-md-4">
														<Button
															className="continue_btn"
															variant="primary"
															onClick={() => setModalShow(true)}
														>
															Verify
														</Button>
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

const MyModal = (props) => {
	return (
		<Modal
			{...props}
			dialogClassName="modal_350"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton style={{ border: "none" }}></Modal.Header>
			<Modal.Body>
				<center>
					<img src={BackGround.Succcess}></img>
					<h3 className="skip_registration_title">Done</h3>
					<p className="update_number">
						Your mobile number is updated to 993817317
					</p>
				</center>
			</Modal.Body>
			<Modal.Footer style={{ display: "block", border: "none" }}>
				<Link to="/changemobilenumber">
					<Button className="ok_btn" variant="primary" onClick={props.onHide}>
						OK
					</Button>
				</Link>
			</Modal.Footer>
		</Modal>
	);
};

export default Changemobilenum2;
