import React from "react";
import { Container, Button, Tab, Nav } from "react-bootstrap";
import { Icon } from "../../../Utilities/Icons";
import { Link } from "react-router-dom";
function PrescriptionIndex() {
  const Tabs = [
    {
      name: "Medicine",
      key: "medicine",
      iconGrey: Icon.MedicineGrey,
      iconBlue: Icon.MedicineBlue,
      component: () => <>Medicine</>,
    },
    {
      name: "Lab Test",
      key: "lab_test",
      iconGrey: Icon.TestTubeGrey,
      iconBlue: Icon.TestTubeBlue,
      component: () => <>Lab Test</>,
    },
    {
      name: "Refer a Doctor",
      key: "refer_a_doctor",
      iconGrey: Icon.StethoScopeGrey,
      iconBlue: Icon.StethoScopeBlue,
      component: () => <>Refer a doctor</>,
    },
    {
      name: "Doctor Notes",
      key: "doctor_notes",
      iconGrey: Icon.NoteGrey,
      iconBlue: Icon.NoteBlue,
      component: () => <>Doctor Notes</>,
    },
  ];
  return (
    <Container fluid className="profile_container">
      <div className="prescription_heading">
        <Link to="/prescription/searchmedicine">
          <Button variant="primary" className="payout_back_btn">
            <img src={Icon.Back} className="back_btn_icon"></img> Back
          </Button>
        </Link>
        <h2 className="payout_title mt_10">Create Prescription</h2>
      </div>

      <Tab.Container
        id="left-tabs-example"
        className="nav_container"
        defaultActiveKey="first"
      >
        <div className="row profile_cards_box">
          <div className="col-md-3">
            <div className="profile_tab_card">
              <ul className="profile_ul">
                <Nav variant="pills" className="flex-column">
                  {Tabs?.map((item, index) => (
                    <Nav.Item>
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
                <Tab.Pane eventKey={Item?.key}>
                  <Item.component />
                </Tab.Pane>
              ))}
              <Tab.Pane eventKey="second">WorkProfile</Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </Container>
  );
}

export default PrescriptionIndex;
