import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import FormControl from "../../Common/Forms/FormControl";
import { SignInEnum } from "../../../Utilities/Enums";
import { SignInSchema } from "../../../Utilities/Schema";
import { SignIn } from "../../../Store/Reducers/AuthSlice";
function SignInComponent() {
  const dispatch = useDispatch();
  return (
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
                    <Formik
                      initialValues={SignInEnum}
                      validationSchema={SignInSchema}
                      onSubmit={(values) => {
                        dispatch(SignIn(values));
                      }}
                    >
                      {({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <div className="row">
                            <div class="col-md-12">
                              <FormControl
                                control="input"
                                type="email"
                                name="email"
                                id="email"
                                label="Mobile / Email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                              />
                            </div>
                            <div class="col-md-12">
                              <FormControl
                                control="input"
                                type="password"
                                name="password"
                                id="password"
                                labelclass="mt_30"
                                label="Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                              />
                            </div>
                            <div class="col-md-12">
                              <button type="submit" class="login_btn">
                                Login
                              </button>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                    <div className="row mt_30">
                      <div className="col-md-6 col-6">
                        <a href="#" className="login_with_otp">
                          Login with OTP
                        </a>
                      </div>
                      <div className="col-md-6 col-6">
                        <a href="#" className="forgot_password">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                    <div className="row mt_50">
                      <div className="col-md-12">
                        <center>
                          <h3 className="dont_have_account">
                            Don’t have an account?{" "}
                            <Link to="/signup" className="sign_up">
                              Sign Up
                            </Link>
                          </h3>
                        </center>
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

export default SignInComponent;
