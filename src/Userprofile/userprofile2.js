import React from "react";
import "../Assets/css/style.css";
<<<<<<< Updated upstream
=======
import "../Assets/css/responsive.css";
>>>>>>> Stashed changes
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
import Modal from 'react-bootstrap/Modal';
import ReactTagInput from "@pathofdev/react-tag-input";
import { WithContext as ReactTags } from 'react-tag-input';

export default function UserProfile2(){

	return(
		<div class="section_1_bg">
			<div class="section_1_container">
				<div class="sub_section_1 js-fullheight">
					<div class="row">
						<div class="col-md-12">
							<div class="display_t">
								<img src={require('../Assets/img/logo.png')} class="logo_box"></img>
								<div class="slider_1">
									<OwlCarousel className='owl-theme' loop margin={10} items={1}>
										<div class="item">
											<center>
												<img src={require('../Assets/img/slider_1.png')} class="logo_box"></img>
												<h3 class="slider_text">Help millions of people everywhere, <br/> everytime</h3>
											</center>
										</div>
										<div class="item">
											<center>
												<img src={require('../Assets/img/slider_1.png')} class="logo_box"></img>
												<h3 class="slider_text">Help millions of people everywhere, <br/> everytime</h3>
											</center>
										</div>
										<div class="item">
											<center>
												<img src={require('../Assets/img/slider_1.png')} class="logo_box"></img>
												<h3 class="slider_text">Help millions of people everywhere, <br/> everytime</h3>
											</center>
										</div>
									</OwlCarousel>;
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
											<h5 class="steps mt_50">Setps 2 of 3</h5>
											<h3 class="info_title">Basic Information</h3>
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
                        <Form id="myForm" className="width_100">
                          <div class="row mt_20">
                            <div class="col-md-12">
                              <Form.Group className="mb-3">
                                <Form.Label className="sign_title">Your Speciality*</Form.Label>
                                <Form.Select>
                                  <option>Select</option>
                                </Form.Select>
                              </Form.Group>
                            </div>
                          </div>
                          <div class="row mt_20">
                            <div class="col-md-12">
                              <Form.Group className="mb-3">
                                <Form.Label className="sign_title">Sub Speciality*</Form.Label>
                                <Form.Select>
                                  <option>Select</option>
                                </Form.Select>
                              </Form.Group>
                            </div>
                          </div>
                          <div class="row mt_20">
                          	<div class="col-md-12">
                              <label className="sign_title">Year Experience*</label>
                              <div class="input_box">
                                <div class="form_group">
                                  <input type="text" name="" placeholder="" required />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="row mt_20">
                          	<div class="col-md-12">
                          		<label className="sign_title">Registration Number</label>
                          		<div class="input_box">
                          			<div class="form_group">
                          				<input type="text" name="" placeholder="" required />
                          			</div>
                          		</div>
                          	</div>
                          </div>
                          <div class="row mt_20">
                        		<div class="col-md-12">
                        			<label className="sign_title">Language</label>
                        			<div class="input_box">
                        				<div class="form_group form_bottom">
                        					<input type="text" name="" placeholder="Search" required />
                      						<svg class="language_search_icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path fill-rule="evenodd" clip-rule="evenodd" d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="#3093BB"/>
																		<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 8C11.5 6.067 9.933 4.5 8 4.5V2.5C11.0376 2.5 13.5 4.96243 13.5 8H11.5Z" fill="#3093BB"/>
																		<path fill-rule="evenodd" clip-rule="evenodd" d="M13.7072 12.293L19.7072 18.293L18.293 19.7072L12.293 13.7072L13.7072 12.293Z" fill="#3093BB"/>
																	</svg>
                        				</div>
                        				<span className="tag_name_box mr_10">English <img src={require('../Assets/img/cross.png')} class="close_icon"></img></span>
                        				<span className="tag_name_box">Hindi <img src={require('../Assets/img/cross.png')} class="close_icon"></img></span>
                        			</div>
                          	</div>
                          </div>
                          <div class="row mt_80">
                          	<div className="display_inline">
                            	<button class="back_btn" variant="primary">Back</button>
                            	<button class="continue_btn" variant="primary">Continue</button>
                            </div>
                          </div>
                        </Form>
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