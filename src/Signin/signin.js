import React from "react";
import "../Assets/css/style.css";
import "../Assets/js/main.js";
import "../Assets/js/slider_js.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from "react-router-dom";

function SignIn() {	
	return(
		<div class="section_1_bg">
      <div class="section_1_container">
        <div class="sub_section_1 js-fullheight">
          <div className="row">
            <div class="col-md-12">
              <div class="display_t">
                <img src={require('../Assets/img/logo.png')} class="logo_box"></img>
                <div class="slider_1">
                  <OwlCarousel className='owl-theme' loop margin={10} items={1}>
                    <div class='item'>
                      <center>
                        <img src={require('../Assets/img/slider_1.png')} class="logo_box"></img>
                        <h3 class="slider_text">Help millions of people everywhere,<br/> everytime</h3>
                      </center>
                    </div>
                    <div class='item'>
                      <center>
                        <img src={require('../Assets/img/slider_1.png')} class="logo_box"></img>
                        <h3 class="slider_text">Help millions of people everywhere,<br/> everytime</h3>
                      </center>
                    </div>
                    <div class='item'>
                      <center>
                        <img src={require('../Assets/img/slider_1.png')} class="logo_box"></img>
                        <h3 class="slider_text">Help millions of people everywhere,<br/> everytime</h3>
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
                    <div class="login_box">
                      <h3 class="logo_title">THS Doctor’s Sign In</h3>
                      <h5 class="welcome_title">Welcome back to THS!</h5>
                      <div class="signin_box">
                        <Form>
                          <div className="row">
                            <div class="col-md-12">
                              <label className="sign_title"> Mobile / Email </label>
                              <div class="input_box">
                                <div class="form_group">
                                  <input type="text" name="firstname" placeholder="" required/>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12">                              
                              <label className="sign_title mt_30"> Password </label>
                              <div class="input_box ">
                                <div class="form_group">
                                  <input type="password" id="password" name="password" placeholder="" required />
                                  <i className="toggle-password fa fa-fw fa-eye-slash"></i>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <button class="login_btn">Login</button>
                            </div>
                          </div>
                        </Form>
                        <div className="row mt_30">
                          <div className="col-md-6">
                            <a href="#" className="login_with_otp">Login with OTP</a>
                          </div>
                          <div className="col-md-6">
                            <a href="#" className="forgot_password">Forgot Password?</a>
                          </div>
                        </div>
                        <div className="row mt_50">
                          <div className="col-md-12">
                            <center><h3 className="dont_have_account">Don’t have an account? <Link to="/signup" className="sign_up">Sign Up</Link></h3></center>
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
      </div>
    </div>
	);
}

export default SignIn;