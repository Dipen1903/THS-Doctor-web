import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PersonalProfile from "./PersonalProfile";
import WorkProfile from "./WorkProfile";
import { Icon } from "../../../Utilities/Icons";
import {
  CityList,
  DocumentList,
  LanguageList,
  QualificationList,
  SpecialityList,
  StateList,
} from "../../../Store/Reducers/CommonReducer";
import { useDispatch } from "react-redux";
function MyProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(StateList());
    dispatch(CityList());
    dispatch(SpecialityList());
    dispatch(LanguageList());
    dispatch(QualificationList());
    dispatch(DocumentList());
    return () => {};
  }, []);

  return (
    <Container fluid className="profile_container">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <h2 className="profile_title mt_10">Profile</h2>
        <div className="row profile_cards_box">
          <div className="col-md-3">
            <div className="profile_tab_card">
              <ul className="profile_ul">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link
                      className="profile_tab_option_bg"
                      eventKey="first"
                    >
                      <span>
                        <img
                          alt="myImg"
                          src={Icon.UserGrey}
                          className="tab-title"
                        />
                        <img
                          alt="myImg"
                          src={Icon.UserBlue}
                          className="tab-title active"
                        />
                        <span className="profile_option_text">
                          Personal Profile
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
                      <span>
                        <img
                          alt="myImg"
                          src={Icon.FirstAidGrey}
                          className="tab-title"
                        />
                        <img
                          alt="myImg"
                          src={Icon.FirstAidBlue}
                          className="tab-title active"
                        />
                        <span className="profile_option_text">
                          Work Profile
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
                <PersonalProfile />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <WorkProfile />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </Container>
  );
}

export default MyProfile;
