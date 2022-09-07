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

import { Link } from "react-router-dom";

function Changepassword() {
  // const [confirmpassword, setConfirmpassword] = useState("");

  const dispatch = useDispatch();

  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
  });

  return (
    <>
      <Container fluid>
        <div className="row settingscards_box">
          <div className="col-md-12">
            <div className="setting_profile_card_head">
              <div className="row">
                <div className="col-md-6">
                  <h3 className="setting_change_password">Change Password</h3>
                </div>
                <div className="col-md-6"></div>
              </div>
            </div>
            <div className="setting_profile_card_body">
              <div className="row">
                <Formik
                  initialValues={passwordData}
                  validationSchema={ChangePasswordSchema}
                  onSubmit={(values) =>
                    dispatch(ChangePassword(values)).then((res) => {})
                  }
                >
                  {({ values, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit} id="myForm">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-12 mt_20">
                            <FormControl
                              control="input"
                              type="text"
                              name="old_password"
                              id="old_password"
                              label="Current Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values?.old_password}
                            />
                          </div>
                        </div>
                        <div className="row mt_20">
                          <div className="col-md-12">
                            <FormControl
                              control="input"
                              type="text"
                              name="new_password"
                              id="new_password"
                              label="New Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.new_password}
                            />
                          </div>
                        </div>
                        <div className="row mt_20">
                          <div className="col-md-12 ">
                            <FormControl
                              control="input"
                              type="text"
                              name="confirm_password"
                              id="confirm_password"
                              label="Confirm New Password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirm_password}
                            />
                          </div>
                        </div>
                        <div className="row mt_50">
                          <div className="col-md-4">
                            <button
                              type="submit"
                              className="continue_btn"
                              variant="primary"
                            >
                              Save
                            </button>
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
