import React, { memo, useEffect } from "react";
import { Container, Button, Tab, Nav, Modal } from "react-bootstrap";
import { Icon, Logo } from "../../../Utilities/Icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import Medicine from "./Tabs/Medicine";
import LabTest from "./Tabs/LabTest";
import ReferDoctor from "./Tabs/ReferDoctor";
import DoctorNotes from "./Tabs/DoctorNotes";
import { Formik } from "formik";
import { PrescriptionEnum } from "../../../Utilities/Enums";
import { useDispatch, useSelector } from "react-redux";
import { GetConsultDetails } from "../../../Store/Reducers/ConsultationsReducer";

function PrescriptionIndex() {
  const { booking_id } = useParams();
  const { consultDetails } = useSelector(({ ConsultSlice }) => ConsultSlice);
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(GetConsultDetails({ appointment_id: booking_id }));

    return () => {};
  }, []);

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
              <Formik
                initialValues={{
                  booking_id: booking_id,
                  user_id: consultDetails?.consultation_member_id,
                  ...PrescriptionEnum,
                }}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ values, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Tab.Content>
                      <PrescriptionReview values={values} />
                      {Tabs?.map((Item, index) => (
                        <Tab.Pane key={index} eventKey={Item?.key}>
                          <div className="medicine_card_box">
                            <div>
                              <h4 className="medicine_header row">
                                <span
                                  className={`title-bar ${Item?.key.charAt(0)}`}
                                />
                                {Item?.name}
                              </h4>
                              <Item.component />
                            </div>
                            <PrescriptionFooter values={values} />
                          </div>
                        </Tab.Pane>
                      ))}
                    </Tab.Content>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </Tab.Container>
      </Container>
    </div>
  );
}
const Footer = ({ values }) => {
  return (
    <div className="prescription_table_bottom_card mt_15">
      <div className="col-md-6 prescription_left_align">
        <div className="col-md-4 mr_10">
          <h5 class="prescription_result_text">
            0 <span className="result_declared_text">Medicines</span>
          </h5>
        </div>
        <div className="col-md-4 mr_10">
          <h5 class="prescription_result_text">
            0 <span className="result_declared_text">Lab Tests</span>
          </h5>
        </div>
        <div className="col-md-4 mr_10">
          <h5 class="prescription_result_text">
            {values?.refer_speciality?.length}{" "}
            <span className="result_declared_text">Refer a doctor</span>
          </h5>
        </div>
      </div>
      <div className="">
        <button className="table_next_btn">Next</button>
      </div>
    </div>
  );
};
const Review = ({ values }) => {
  return (
    <Modal
      show={false}
      onHide={() => {}}
      className="generate-prescription-modal"
      centered
    >
      <Modal.Header className="prescription-modal-header">
        <img src={Logo.THS} class="logo ml_10"></img>
        <div>
          <h4>Dr John doe</h4>
          <p>MD - Dermatology</p>
          <p>Vadodara, Gujarat</p>
          <p>Medical Registration Number: 31312112311</p>
        </div>
      </Modal.Header>
      <Modal.Body className="prescription-modal-body-text">
        <div className="prescription_appoinment_input">
          <div>
            {" "}
            <p className="prescription-left-text">Kevin</p>
            <span>23 | F (THS Id: kev221990)</span>
          </div>
          <div>
            {" "}
            <p className="prescription-right-text">11 Feb, 2022</p>
            <span>Prescription Id: 1231213</span>
          </div>
        </div>

        <hr />

        <div className="prescription_appoinment_input">
          <div>
            {" "}
            <span className="text-uppercase">Diagnosis</span>
            <p className="prescription-left-text mt_5">Viral Infection</p>
          </div>
          <div>
            {" "}
            <span className="text-uppercase">Chef Complaints</span>
            <p className="prescription-right-text mt_5">Feel headache, Cold</p>
          </div>
        </div>
        <hr />

        <div className="prescription_table_appoinment_input">
          <div class="table-responsive">
            <span className="text-uppercase">Mecdicine</span>
            <table class="table prescription_table">
              <thead>
                <tr className="prescription_table_head">
                  <th className="prescription_table_head_text">Name</th>
                  <th className="prescription_table_head_text">Mor</th>
                  <th className="prescription_table_head_text">Aft</th>
                  <th className="prescription_table_head_text">Eve</th>
                  <th className="prescription_table_head_text">Ngt</th>
                  <th className="prescription_table_head_text">Condition</th>
                  <th className="prescription_table_head_text">
                    <center>Days</center>
                  </th>
                  <th className="prescription_table_head_text">
                    <center>Qty</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="prescription_table_body_row">
                  <td className="prescription_table_body_text">Dolo 400mg</td>
                  <td className="prescription_table_body_text">1</td>
                  <td className="prescription_table_body_text">---</td>
                  <td className="prescription_table_body_text">---</td>
                  <td className="prescription_table_body_text">1</td>
                  <td className="prescription_table_body_text">After Food</td>
                  <td className="prescription_table_body_text">5</td>

                  <td className="prescription_table_body_text">10</td>
                </tr>
                <tr className="prescription_table_body_row">
                  <td className="prescription_table_body_text">Zocon 500</td>
                  <td className="prescription_table_body_text">1</td>
                  <td className="prescription_table_body_text">---</td>
                  <td className="prescription_table_body_text">---</td>
                  <td className="prescription_table_body_text">1</td>
                  <td className="prescription_table_body_text">Before Food</td>
                  <td className="prescription_table_body_text">5</td>

                  <td className="prescription_table_body_text">10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="prescription_appoinment_input">
          <div>
            {" "}
            <span className="text-uppercase">Lab Test</span>
            <p className="prescription-left-text mt_5">Viral Infection</p>
          </div>
          <div>
            {" "}
            <span className="text-uppercase">Chef Complaints</span>
            <p className="prescription-right-text mt_5">Feel headache, Cold</p>
          </div>
        </div>
        <hr />
        <div className="prescription_appoinment_input">
          <div>
            {" "}
            <span className="text-uppercase">instructions</span>
            <p className="prescription-left-text mt_5">
              Avoid cold water, take rest
            </p>
          </div>
          <div>
            {" "}
            <span className="text-uppercase">Follow up after</span>
            <p className="prescription-right-text mt_5">5 days</p>
          </div>
        </div>

        <div className="prescription_sign_appoinment_input d-flex justify-content-end">
          <div>
            {" "}
            <img
              // src={require("../../Assets/img/png/work_sign.png")}
              className="work_profile_certificate "
            ></img>
            <br />
            <h6>Dr John doe</h6>
            <p className="prescription-right-text mt_5">MD - Dermatology</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="prescription-btn-modal-footer">
        <div className="d-flex">
          <Button className="close_btn" onClick={() => {}}>
            Edit
          </Button>
          <Link to="/chatscreen">
            <Button className="verify_btn" variant="primary" onClick={() => {}}>
              Send Prescription
            </Button>
          </Link>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
const PrescriptionFooter = memo(Footer);
const PrescriptionReview = memo(Review);

export default PrescriptionIndex;
