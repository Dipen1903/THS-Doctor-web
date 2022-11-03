import React, { memo, useEffect, useState } from "react";
import { Container, Button, Tab, Nav } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import PrescriptionReview from "./PresciptionDetails";
import { Icon } from "../../../Utilities/Icons";
import Medicine from "./Tabs/Medicine";
import LabTest from "./Tabs/LabTest";
import ReferDoctor from "./Tabs/ReferDoctor";
import DoctorNotes from "./Tabs/DoctorNotes";

import { PrescriptionEnum } from "../../../Utilities/Enums";
import { useDispatch, useSelector } from "react-redux";
import {
  CreatePrescription,
  GetConsultDetails,
  GetPrescDetails,
} from "../../../Store/Reducers/ConsultationsReducer";
import { isEmpty } from "../../../Utilities/Functions";
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
function PrescriptionIndex() {
  const { booking_id } = useParams();
  const { consultDetails, prescDetails } = useSelector(
    ({ ConsultSlice }) => ConsultSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [prescriptionData, setPrescriptionData] = useState({
    ...PrescriptionEnum,
  });
  const [activeKey, setActiveKey] = useState("medicine");
  const intialLoad = () => {
    let tempValues = { ...prescriptionData };
    try {
      if (prescDetails?.lab_test?.length) {
        tempValues.lab_test = prescDetails?.lab_test;
      }
      if (prescDetails?.medicines?.length) {
        tempValues.medicines = prescDetails?.medicines;
      }
      if (prescDetails?.refer_doctors?.length) {
        tempValues.refer_speciality = prescDetails?.refer_doctors;
      }
      if (prescDetails?.doctor_notes) {
        tempValues.doctor_notes = prescDetails?.doctor_notes;
      }
      tempValues.user_id =
        prescDetails?.patient_details?.id ||
        consultDetails?.consultation_member_id;
      setPrescriptionData({ ...tempValues });
    } catch (error) {}
  };
  useEffect(() => {
    intialLoad();
    return () => {};
  }, [prescDetails]);

  useEffect(() => {
    dispatch(GetPrescDetails({ booking_id }));
    dispatch(GetConsultDetails({ appointment_id: booking_id }));
    return () => {};
  }, [booking_id]);

  return (
    <div style={{ background: "#f8fbff" }}>
      <div className="prescription_heading">
        <Button
          variant="primary"
          onClick={() => navigate(-1)}
          className="payout_back_btn"
        >
          <img alt="myImg" src={Icon.Back} className="back_btn_icon"></img> Back
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
          activeKey={activeKey}
        >
          <div className="col-md-12 row">
            <div className="col-md-3">
              <div className="profile_tab_card">
                <ul className="profile_ul">
                  <Nav variant="pills" className="flex-column">
                    {Tabs?.map((item, index) => (
                      <Nav.Item
                        key={index}
                        onClick={() => setActiveKey(item?.key)}
                      >
                        <Nav.Link
                          key={index}
                          className="profile_tab_option_bg"
                          eventKey={item?.key}
                        >
                          <span>
                            <img
                              alt="myImg"
                              src={item?.iconGrey}
                              className="tab-title"
                            />
                            <img
                              alt="myImg"
                              src={item?.iconBlue}
                              className="tab-title active"
                            />
                            <span className="profile_option_text">
                              {item?.name}
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
                    ))}
                  </Nav>
                </ul>
              </div>
            </div>
            <div className="col-md-9">
              <Formik
                initialValues={{
                  ...prescriptionData,
                  booking_id: parseInt(booking_id),
                  user_id:
                    consultDetails?.consultation_member_id ||
                    prescDetails?.patient_details?.id,
                }}
                enableReinitialize
                onSubmit={(values) => {
                  let tempValues = { ...values };
                  Object.keys(values).map((key) => {
                    if (!isEmpty(values[key])) {
                      tempValues[key] = JSON.stringify(values[key]);
                    }
                  });
                  dispatch(CreatePrescription(tempValues));
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
                            <PrescriptionFooter
                              values={values}
                              mapProps={{ item: Item, index }}
                              setActiveKey={setActiveKey}
                            />
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
const Footer = ({ values, mapProps, setActiveKey }) => {
  const { index } = mapProps;
  // const dispatch = useDispatch();
  return (
    <div className="prescription_table_bottom_card mt_15">
      <div className="col-md-6 prescription_left_align">
        <div className="col-md-4 mr_10">
          <h5 class="prescription_result_text">
            {values?.medicines?.length}{" "}
            <span className="result_declared_text">Medicines</span>
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
        {index > 2 ? (
          <button
            className="table_next_btn"
            type="submit"
            // onClick={() => dispatch(toggleReview(true))}
          >
            Generate Prescription
          </button>
        ) : (
          <button
            className="table_next_btn"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setActiveKey(Tabs[index + 1].key);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
const PrescriptionFooter = memo(Footer);

export default PrescriptionIndex;
