import React from "react";
import "../Assets/css/style.css";
import "../Assets/css/responsive.css";
import "../Assets/js/main.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "../Components/Progress bar/Progress_bar.js";
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProgressBar from '../Components/Progress bar/Progress_bar';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';
import {Formik} from "formik";

export default function Appointment1(){

  const [value, setValue] = React.useState(2);


	return(
		<div class="section_1_bg">
			<div class="section_1_container">
				<div class="sub_section_1 js-fullheight">
					<div class="row">
						<div class="col-md-12">
							<div class="display_t">
								<img src={require('../Assets/img/logo.png')} class="logo_box"></img>
								<div class="slider_1">
									<OwlCarousel className='owl-them' loop margin={10} items={1}>
										<div class="item">
											<center>
												<img src={require('../Assets/img/slider_1.png')} class="logo_box"></img>
												<h3 class="slider_text">Help million of people everywhere, <br/> everytime</h3>
											</center>
										</div>
										<div class="itme">
											<center>
												<img src={require('../Assets/img/slider_1.png')} class="logo_box"></img>
												<h3 class="slider_text">Help millions of people everywhere, <br/> everytime</h3>
											</center>
										</div>
										<div class="itme">
											<center>
												<img src={require('../Assets/img/slider_1.png')} class="logo_box"></img>
												<h3 class="slider_text">Help millions of people everywhere, <br/> everytime</h3>
											</center>
										</div>
									</OwlCarousel>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="sub_section_2">
					<div class="row">
						<div class="col-md-12">
							<div class="display_t js-fullheight">
								<div class="row">
									<div class="col-md-12">
										<div class="basic_info_box">
											<div class="row">
												<div class="col-md-6"></div>
												<div class="col-md-6">
													<span className="skip">SKIP</span>
												</div>
											</div>
											<h5 class="steps mt_50">Steps 1 of 2</h5>
											<h3 class="doc_appointment_head">Basic Information</h3>
											<div class="progress_box">
												<div class="row">
													<div class="col-md-3">
														<h5 class="profile_milestone">Profile Milestone</h5>
													</div>
													<div class="col-md-8">
														<ProgressBar isLoading={false} percent={10} size={"large"} showInfo={true}/>
														<h6 class="progress_bar_subtext">Complete your profile for connect with patients</h6>
													</div>
												</div>
											</div>
											<div class="basic_info_form_box">
											<Formik 
	                      initialValues={{
	                        Day:"",
	                        // date:Date.now()
	                      }}
	                      onSubmit={values=>{console.log("values",values)}}
	                      >
	                      {({values,setFieldValue,handleSubmit})=>(
												<form id="myForm" className="width_100">
													<div class="row mt_20">
														<div class="col-md-9 col-sm-8">
															<label className="doc_appointment_form_title">Consultation Fee (Rs)</label>
															<div class="input_box">
                          			<div class="form_group">
                          				<input type="text" name="" placeholder="" required />
                          			</div>
                          		</div>
														</div>
														<div class="col-md-3 col-sm-4">
															<button class="fee_card">Fee Card</button>
														</div>
													</div>
													<div class="row mt_10">
														<div class="col-md-12">
															<span class="consult_fee_subtext">You will get 70% of the consultation fees and 30% is THS Platform Fees. </span>
														</div>
													</div>
													<hr className="bottom_border mt_30 mb_30" />
													<div class="row">
														<div class="col-md-12">
															<h3 class="time_slot">Online Time Slot Managment</h3>
														</div>
													</div>
													<div class="row mt_20">
														<div class="col-md-12">
														 	<Tabs defaultActiveKey="first">
												        <Tab eventKey="first" title="Weekdays" className="tab_inner_box">
												         	<div class="row">
												         		<div class="col-md-12">												         			
                                			{console.log(values)}
                                			<div class="day_box">
                                				<label>
                                					<label className="days_bg">
                                						<center>
                                							<svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																								<path d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z" fill="#9393AA"/>
																							</svg>
																							</center>
                                					</label>
                                				</label>
                                				<label  htmlFor={"Monday"}>
		                                			{values?.day=="Monday"? 
		                                				<label className="days_bg_3">
		                                						<center>
		                                							<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
																										<path d="M0.037422 15V0.899999H1.85742L7.29742 13.16H6.69742L12.1374 0.899999H13.9374V15H12.0574V3.72H12.7174L7.63742 15H6.33742L1.25742 3.72H1.93742V15H0.037422Z" fill="white"/>
																									</svg>
																								</center>
																						</label>
		                                			:
		                                				<label className="days_bg_2">
		                                					<center>
		                                						<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
																									<path d="M0.037422 15V0.899999H1.85742L7.29742 13.16H6.69742L12.1374 0.899999H13.9374V15H12.0574V3.72H12.7174L7.63742 15H6.33742L1.25742 3.72H1.93742V15H0.037422Z" fill="white"/>
																								</svg>
																							</center>
																						</label>
																					}
																					<input type="radio" name="day" className="hide_radio_btn" onChange={e=>setFieldValue("day",e.target.value)} id="Monday" value="Monday" checked={values?.day==="Monday"} placeholder=""  />
                                				</label>

                                				<label htmlFor={"Tuesday"}>
                                					{values?.day=="Tuesday"? 
                                						<label className="days_bg_3" >
	                                						<center>
	                                							<svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
																									<path d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z" fill="white"/>
																								</svg>
																							</center>
	                                					</label>
                                					:
	                                					<label className="days_bg_2" >
	                                						<center>
	                                							<svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
																									<path d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z" fill="white"/>
																								</svg>
																							</center>
	                                					</label>
																					}
																					<input type="radio" name="day" className="hide_radio_btn" onChange={e=>setFieldValue("day",e.target.value)} id="Tuesday" value="Tuesday" checked={values?.day==="Tuesday"} placeholder=""  />
                                				</label>

                                				<label htmlFor={"Wednesday"}>
	                                				{values?.day=="Wednesday"? 
	                                					<label className="days_bg_3">
	                                						<center>
	                                							<svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
																									<path d="M5.87789 15L0.937891 0.899999H3.09789L7.19789 13.08H6.45789L10.7979 0.899999H12.3779L16.4579 13.08H15.7779L20.0179 0.899999H22.0579L17.0779 15H15.2979L11.3379 3.4H11.7579L7.63789 15H5.87789Z" fill="white"/>
																								</svg>
																							</center>
	                                					</label>
	                                				:
	                                					<label className="days_bg_2">
	                                						<center>
	                                							<svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
																									<path d="M5.87789 15L0.937891 0.899999H3.09789L7.19789 13.08H6.45789L10.7979 0.899999H12.3779L16.4579 13.08H15.7779L20.0179 0.899999H22.0579L17.0779 15H15.2979L11.3379 3.4H11.7579L7.63789 15H5.87789Z" fill="white"/>
																								</svg>
																							</center>
	                                					</label>
																					}
																					<input type="radio" name="day" className="hide_radio_btn" onChange={e=>setFieldValue("day",e.target.value)} id="Wednesday" value="Wednesday" checked={values?.day==="Wednesday"} placeholder=""  />
                                				</label>

                                				<label htmlFor={"Thursday"}>
	                                				{values?.day=="Thursday"? 
	                                					<label className="days_bg_3">
	                                						<center>                                							
																								<svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
																									<path d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z" fill="white"/>
																								</svg>
																							</center>
                                						</label>
	                                				:
	                                					<label className="days_bg_2">
	                                						<center>                                							
																								<svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
																									<path d="M5.42672 15V2.64H0.606719V0.899999H12.3267V2.64H7.50672V15H5.42672Z" fill="white"/>
																								</svg>
																							</center>
                                						</label>
																					}
																					<input type="radio" name="day" className="hide_radio_btn" onChange={e=>setFieldValue("day",e.target.value)} id="Thursday" value="Thursday" checked={values?.day==="Thursday"} placeholder=""  />
                                				</label>

                                				<label htmlFor={"Friday"}>
	                                				{values?.day=="Friday"? 
	                                					<label className="days_bg_3">
	                                						<center>
	                                							<svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
																									<path d="M0.986172 15V0.899999H10.0262V2.56H3.06617V7.08H9.56617V8.74H3.06617V15H0.986172Z" fill="white"/>
																								</svg>
																							</center>
																						</label>
	                                				:
	                                					<label className="days_bg_2">
	                                						<center>
	                                							<svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
																									<path d="M0.986172 15V0.899999H10.0262V2.56H3.06617V7.08H9.56617V8.74H3.06617V15H0.986172Z" fill="white"/>
																								</svg>
																							</center>
																						</label>
																					}
																					<input type="radio" name="day" className="hide_radio_btn" onChange={e=>setFieldValue("day",e.target.value)} id="Friday" value="Friday" checked={values?.day==="Friday"} placeholder=""  />
                                				</label>

                                				<label>
                                					<label className="days_bg">
                                						<center>
                                							<svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																								<path d="M5.59188 15.18C4.45854 15.18 3.43188 15.04 2.51188 14.76C1.59188 14.4667 0.791875 14.0533 0.111875 13.52L0.811875 11.88C1.26521 12.2267 1.73188 12.5133 2.21188 12.74C2.70521 12.9667 3.22521 13.14 3.77188 13.26C4.33188 13.3667 4.93854 13.42 5.59188 13.42C6.71188 13.42 7.53188 13.22 8.05188 12.82C8.58521 12.42 8.85188 11.8933 8.85188 11.24C8.85188 10.68 8.66521 10.2467 8.29188 9.94C7.93188 9.63333 7.29188 9.38667 6.37188 9.2L4.19188 8.76C2.89854 8.49333 1.93188 8.06 1.29188 7.46C0.665208 6.84667 0.351875 6.01333 0.351875 4.96C0.351875 4.10667 0.578542 3.36 1.03188 2.72C1.48521 2.08 2.11188 1.58667 2.91188 1.24C3.72521 0.893333 4.67188 0.719999 5.75188 0.719999C6.75188 0.719999 7.67188 0.866666 8.51188 1.16C9.35188 1.44 10.0585 1.86 10.6319 2.42L9.95188 4C9.35188 3.48 8.71188 3.1 8.03188 2.86C7.35188 2.60667 6.57854 2.48 5.71188 2.48C4.68521 2.48 3.87854 2.69333 3.29188 3.12C2.71854 3.54667 2.43188 4.12667 2.43188 4.86C2.43188 5.44667 2.61188 5.90667 2.97188 6.24C3.34521 6.57333 3.95854 6.82667 4.81188 7L6.99188 7.42C8.33854 7.7 9.33188 8.13333 9.97188 8.72C10.6119 9.29333 10.9319 10.0867 10.9319 11.1C10.9319 11.9133 10.7119 12.6267 10.2719 13.24C9.84521 13.8533 9.23188 14.3333 8.43188 14.68C7.63188 15.0133 6.68521 15.18 5.59188 15.18Z" fill="#9393AA"/>
																							</svg>
																						</center>
                                					</label>
                                				</label>
                                			</div>
												         		</div>
												         	</div>
												        </Tab>
												        <Tab eventKey="second" title="Weekends" className="tab_inner_box">
												        </Tab>
												        
												      </Tabs>
														</div>
													</div>
													<Accordion defaultActiveKey={['0']} alwaysOpen>
											      <Accordion.Item eventKey="0">
											        <Accordion.Header>Morning</Accordion.Header>
											        <Accordion.Body>
											        	<div class="row">
											        		<div class="col-md-4">
											        			<h5 class="start_at">Start at</h5>
											        				<Form.Group className="mb-3">
				                                <Form.Select>
				                                  <option></option>
				                                  <option>15 mints</option>
				                                  <option>20 mints</option>
				                                  <option>25 mints</option>
				                                  <option>30 mints</option>
				                                  <option>35 mints</option>
				                                </Form.Select>
				                              </Form.Group>
											        		</div>
											        		<div class="col-md-4">
											        			<h5 class="start_at">End at</h5>

											        		</div>
											        		<div class="col-md-4">
											        			<h5 class="start_at">Slot Duration</h5>
											        			<Form.Group className="mb-3">
			                                <Form.Select>
			                                  <option>10 mints</option>
			                                  <option>15 mints</option>
			                                  <option>20 mints</option>
			                                  <option>25 mints</option>
			                                  <option>30 mints</option>
			                                  <option>35 mints</option>
			                                </Form.Select>
			                              </Form.Group>
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
												</form>
                        )}
                      </Formik>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}