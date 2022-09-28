import React from "react";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import { Icon } from "../../../Utilities/Icons";

import Timeslotfees from "./TimeSlotFees";
import Bankdetails from "./BankDetails";
import Changepassword from "./ChangePassword";
import Changemobilenum from "./ChangeMobileNumber";

function Settings() {
  return (
    <Container fluid className="profile_container">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <h2 className="profile_title mt_10">Settings</h2>
        <div className="row profile_cards_box">
          <div className="col-md-3">
            <div className="profile_tab_card">
              <ul className="profile_ul">
                <Nav
                  defaultActiveKey="first"
                  variant="pills"
                  className="flex-column"
                >
                  <Nav.Item>
                    <Nav.Link
                      className="profile_tab_option_bg"
                      eventKey="first"
                    >
                      <span className="d-flex align-items-center">
                        <span className="tab-title">
                          <img alt="myImg" src={Icon.ClockGrey} />
                        </span>
                        <span className="tab-title active">
                          <img alt="myImg" src={Icon.ClockBlue} />
                        </span>

                        <span className="profile_option_text">
                          Time Slot & Fees
                        </span>
                      </span>

                      <span>
                        <img
                          alt="myImg"
                          src={Icon.CiverRightBlue}
                          className="tab-title active"
                        />
                        <img
                          alt="myImg"
                          src={Icon.CiverRightGrey}
                          className="tab-title"
                        />
                      </span>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      className="profile_tab_option_bg"
                      eventKey="second"
                    >
                      <span className="d-flex align-items-center">
                        {/* <img alt="myImg" src={Icon.FirstAidGrey} className="tab-title" />
                                                <img alt="myImg"
                                                    src={Icon.FirstAidBlue}
                                                    className="tab-title active"
                                                /> */}

                        <span className="tab-title">
                          <img alt="myImg" src={Icon.BankGrey} />
                        </span>
                        <span className="tab-title active">
                          <img alt="myImg" src={Icon.BankBlue} />
                        </span>

                        <span className="profile_option_text">
                          Bank Details
                        </span>
                      </span>

                      <span>
                        <img
                          alt="myImg"
                          src={Icon.CiverRightBlue}
                          className="tab-title active"
                        />
                        <img
                          alt="myImg"
                          src={Icon.CiverRightGrey}
                          className="tab-title"
                        />
                      </span>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      className="profile_tab_option_bg"
                      eventKey="third"
                    >
                      <span className="d-flex align-items-center">
                        {/* <img alt="myImg" src={Icon.FirstAidGrey} className="tab-title" />
                                                <img alt="myImg"
                                                    src={Icon.FirstAidBlue}
                                                    className="tab-title active"
                                                /> */}

                        <span className="tab-title">
                          <img alt="myImg" src={Icon.LockGrey} />
                        </span>
                        <span className="tab-title active">
                          <img alt="myImg" src={Icon.LockBlue} />
                        </span>

                        <span className="profile_option_text">
                          Change Password
                        </span>
                      </span>
                      <span>
                        <img
                          alt="myImg"
                          src={Icon.CiverRightBlue}
                          className="tab-title active"
                        />
                        <img
                          alt="myImg"
                          src={Icon.CiverRightGrey}
                          className="tab-title"
                        />
                      </span>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      className="profile_tab_option_bg"
                      eventKey="forth"
                    >
                      {" "}
                      <span className="d-flex align-items-center">
                        <span className="tab-title">
                          <img alt="myImg" src={Icon.MobileGrey} />
                        </span>
                        <span className="tab-title active">
                          <img alt="myImg" src={Icon.MobileBlue} />
                        </span>

                        <span className="profile_option_text">
                          Change Mobile no.
                        </span>
                      </span>
                      <span>
                        <img
                          alt="myImg"
                          src={Icon.CiverRightBlue}
                          className="tab-title active"
                        />
                        <img
                          alt="myImg"
                          src={Icon.CiverRightGrey}
                          className="tab-title"
                        />
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Timeslotfees />
              </Tab.Pane>

              <Tab.Pane eventKey="second">
                <Bankdetails />
              </Tab.Pane>

              <Tab.Pane eventKey="third">
                <Changepassword />
              </Tab.Pane>

              <Tab.Pane eventKey="forth">
                <Changemobilenum />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </Container>
  );
}

export default Settings;
