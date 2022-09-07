import React from "react";
import { Container, Button, Tab, Nav } from "react-bootstrap";
import { Icon } from "../../../Utilities/Icons";
import { Link, useNavigate } from "react-router-dom";
import Medicine from "./Tabs/Medicine";
import LabTest from "./Tabs/LabTest";
import ReferDoctor from "./Tabs/ReferDoctor";
import DoctorNotes from "./Tabs/DoctorNotes";
function PrescriptionIndex() {
  const navigate = useNavigate();
  const Tabs = [
    {
      name: "Medicine",
      key: "medicine",
      iconGrey: Icon.MedicineGrey,
      iconBlue: Icon.MedicineBlue,
      component: () => <Medicine />,
    },
    {
      name: "Lab Test",
      key: "lab_test",
      iconGrey: Icon.TestTubeGrey,
      iconBlue: Icon.TestTubeBlue,
      component: () => <LabTest />,
    },
    {
      name: "Refer a Doctor",
      key: "refer_a_doctor",
      iconGrey: Icon.StethoScopeGrey,
      iconBlue: Icon.StethoScopeBlue,
      component: () => <ReferDoctor />,
    },
    {
      name: "Doctor Notes",
      key: "doctor_notes",
      iconGrey: Icon.NoteGrey,
      iconBlue: Icon.NoteBlue,
      component: () => <DoctorNotes />,
    },
  ];
  return (
    <div style={{ background: "#f8fbff" }}>
      <div className="prescription_heading">
        <Button
          variant="primary"
          onClick={() => navigate(-1)}
          className="payout_back_btn"
        >
          <img src={Icon.Back} className="back_btn_icon"></img> Back
        </Button>

        <h2 className="payout_title mt_10">Create Prescription</h2>
      </div>
      <Container
        fluid
        style={{
          background: "#f8fbff",
          padding: "0px 100px",
          paddingBottom: "50px",
        }}
        className="nav_container"
      >
        <Tab.Container
          id="left-tabs-example"
          className="nav_container"
          defaultActiveKey="medicine"
        >
          <div className="col-md-12 row">
            <div className="col-md-3">
              <div className="profile_tab_card">
                <ul className="profile_ul">
                  <Nav variant="pills" className="flex-column">
                    {Tabs?.map((item, index) => (
                      <Nav.Item key={index}>
                        <Nav.Link
                          key={index}
                          className="profile_tab_option_bg"
                          eventKey={item?.key}
                        >
                          <span>
                            <img src={item?.iconGrey} className="tab-title" />
                            <img
                              src={item?.iconBlue}
                              className="tab-title active"
                            />
                            <span className="profile_option_text">
                              {item?.name}
                            </span>
                          </span>

                          <span>
                            <img
                              src={Icon.CiverRightBlue}
                              className="tab-title active"
                            />
                            <img
                              src={Icon.CiverRightGrey}
                              className="tab-title"
                            />
                          </span>
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <Tab.Content>
                {Tabs?.map((Item, index) => (
                  <Tab.Pane key={index} eventKey={Item?.key}>
                    <div className="medicine_card_box">
                      <h4 className="medicine_header row">
                        <span className={`title-bar ${Item?.key.charAt(0)}`} />
                        {Item?.name}
                      </h4>
                      <Item.component />
                      <div className="prescription_table_bottom_card mt_15">
                        <div className="prescription_left_align">
                          <div className="col-md-3 mr_5">
                            <h5 class="prescription_result_text">
                              3{" "}
                              <span className="result_declared_text">
                                Medicines
                              </span>
                            </h5>
                          </div>
                          <div className="col-md-3 mr_5">
                            <h5 class="prescription_result_text">
                              0{" "}
                              <span className="result_declared_text">
                                Lab Tests
                              </span>
                            </h5>
                          </div>
                          <div className="col-md-4 mr_5">
                            <h5 class="prescription_result_text">
                              0{" "}
                              <span className="result_declared_text">
                                Refer a doctor
                              </span>
                            </h5>
                          </div>
                          <div className="col-md-4 mr_5">
                            <h5 class="prescription_result_text">
                              None{" "}
                              <span className="result_declared_text">
                                Instructions
                              </span>
                            </h5>
                          </div>
                        </div>
                        <div className="">
                          <Link to="/prescription/searchlabtest">
                            <button className="table_next_btn">Next</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default PrescriptionIndex;
