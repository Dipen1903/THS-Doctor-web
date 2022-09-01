import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { Icon } from "../../../Utilities/Icons";
import { Icon } from "../../../Utilities/Icons";

import Timeslotfees from "./TimeSlotFees";
import Bankdetails from "./BankDetails";
import Changepassword from "./change_password";
import Changemobilenum from "./ChangeMobileNumber";


function Settings() {
    return (
        <Container fluid className="profile_container">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <h2 className="profile_title mt_10">Settings</h2>
                <div className="row profile_cards_box">
                    <div className="col-md-3">
                        <div className="profile_tab_card">
                            <ul className="profile_ul">
                                <Nav defaultActiveKey="first" variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link
                                            className="profile_tab_option_bg"
                                            eventKey="first"
                                        >
                                            <span className="d-flex align-items-center">
                                                {/* <img src={Icon.UserGrey} className="tab-title" />
                                                <img src={Icon.UserBlue} className="tab-title active" /> */}


                                                {/* <span>
                                                    <svg className="profile_option_icon tab-title" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9993 2.75033C6.443 2.75033 2.74935 6.44398 2.74935 11.0003C2.74935 15.5567 6.443 19.2503 10.9993 19.2503C15.5557 19.2503 19.2494 15.5567 19.2494 11.0003C19.2494 6.44398 15.5557 2.75033 10.9993 2.75033ZM0.916016 11.0003C0.916016 5.43145 5.43048 0.916992 10.9993 0.916992C16.5682 0.916992 21.0827 5.43145 21.0827 11.0003C21.0827 16.5692 16.5682 21.0837 10.9993 21.0837C5.43048 21.0837 0.916016 16.5692 0.916016 11.0003Z" fill="#9393aa" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9154 10.7631V4.58398H10.082V11.0007C10.082 11.1564 10.1217 11.3096 10.1974 11.4458L12.4891 15.5708L14.0917 14.6805L11.9154 10.7631Z" fill="#9393aa" />
                                                    </svg>
                                                    <svg className="profile_option_icon tab-title active" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9993 2.75033C6.443 2.75033 2.74935 6.44398 2.74935 11.0003C2.74935 15.5567 6.443 19.2503 10.9993 19.2503C15.5557 19.2503 19.2494 15.5567 19.2494 11.0003C19.2494 6.44398 15.5557 2.75033 10.9993 2.75033ZM0.916016 11.0003C0.916016 5.43145 5.43048 0.916992 10.9993 0.916992C16.5682 0.916992 21.0827 5.43145 21.0827 11.0003C21.0827 16.5692 16.5682 21.0837 10.9993 21.0837C5.43048 21.0837 0.916016 16.5692 0.916016 11.0003Z" fill="#3093BB" />
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9154 10.7631V4.58398H10.082V11.0007C10.082 11.1564 10.1217 11.3096 10.1974 11.4458L12.4891 15.5708L14.0917 14.6805L11.9154 10.7631Z" fill="#3093BB" />
                                                    </svg>
                                                </span> */}

                                                <span className="tab-title">
                                                    <img src={Icon.ClockGrey} />
                                                </span>
                                                <span className="tab-title active">
                                                    <img src={Icon.ClockBlue} />
                                                </span>


                                                <span className="profile_option_text">
                                                    Time Slot & Fees
                                                </span>
                                            </span>

                                            <span>
                                                <img
                                                    src={Icon.CiverRightBlue}
                                                    className="tab-title active"
                                                />
                                                <img src={Icon.CiverRightGrey} className="tab-title" />
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>


                                    <Nav.Item>
                                        <Nav.Link
                                            className="profile_tab_option_bg"
                                            eventKey="second"
                                        >
                                            <span className="d-flex align-items-center">
                                                {/* <img src={Icon.FirstAidGrey} className="tab-title" />
                                                <img
                                                    src={Icon.FirstAidBlue}
                                                    className="tab-title active"
                                                /> */}

                                                <span className="tab-title">
                                                    <img src={Icon.BankGrey} />
                                                </span>
                                                <span className="tab-title active">
                                                    <img src={Icon.BankBlue} />
                                                </span>

                                                <span className="profile_option_text">
                                                    Bank Details
                                                </span>
                                            </span>

                                            <span>
                                                <img
                                                    src={Icon.CiverRightBlue}
                                                    className="tab-title active"
                                                />
                                                <img src={Icon.CiverRightGrey} className="tab-title" />
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link
                                            className="profile_tab_option_bg"
                                            eventKey="third"
                                        >
                                            <span className="d-flex align-items-center">
                                                {/* <img src={Icon.FirstAidGrey} className="tab-title" />
                                                <img
                                                    src={Icon.FirstAidBlue}
                                                    className="tab-title active"
                                                /> */}

                                                <span className="tab-title">
                                                    <img src={Icon.LockGrey} />
                                                </span>
                                                <span className="tab-title active">
                                                    <img src={Icon.LockBlue} />
                                                </span>

                                                <span className="profile_option_text">
                                                    Change Password
                                                </span>
                                            </span>
                                            <span>
                                                <img
                                                    src={Icon.CiverRightBlue}
                                                    className="tab-title active"
                                                />
                                                <img src={Icon.CiverRightGrey} className="tab-title" />



                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link
                                            className="profile_tab_option_bg"
                                            eventKey="forth"
                                        >                                            <span className="d-flex align-items-center">
                                                <span className="tab-title">
                                                    <img src={Icon.MobileGrey} />
                                                </span>
                                                <span className="tab-title active">
                                                    <img src={Icon.MobileBlue} />
                                                </span>

                                                <span className="profile_option_text">
                                                    Change Mobile no.
                                                </span>
                                            </span>

                                            <span>
                                                <img
                                                    src={Icon.CiverRightBlue}
                                                    className="tab-title active"
                                                />
                                                <img src={Icon.CiverRightGrey} className="tab-title" />
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
