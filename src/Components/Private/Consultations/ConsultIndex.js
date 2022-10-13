import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Modal, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "../../../Utilities/Icons";
import NewConsultation from "./NewConsultation";
import PastConsultation from "./PastConsultation";
import {
  CancelAllConsult,
  CancelReasons,
  GetNewConsults,
  GetPastConsults,
  toggleCancelAll,
} from "../../../Store/Reducers/ConsultationsReducer";
import moment from "moment";
import { setMessage } from "../../../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../../../Utilities/Enums";
import { Field, Formik } from "formik";
import FormControl from "../../Common/Forms/FormControl";
function ConsultIndex() {
  const dispatch = useDispatch();
  const { upcomingConsults, pastConsults, isCancelAll, cancelReasons } =
    useSelector(({ ConsultSlice }) => ConsultSlice);
  const [filteredData, setFilteredData] = useState({
    upcomingConsults: [],
    pastConsults: [],
  });
  const [date, setDate] = useState(moment());
  const [activeTab, setActiveTab] = useState("upcoming");

  const handleFilter = (text) => {
    try {
      let tempNew;
      let tempPast;
      if (typeof text === "string") {
        tempNew = upcomingConsults.filter(
          (item) => item?.name?.toUpperCase().includes(text?.toUpperCase()) == 1
        );
        tempPast = pastConsults.filter(
          (item) => item?.name?.toUpperCase().includes(text?.toUpperCase()) == 1
        );
      } else {
        setFilteredData((state) => ({ ...state, upcomingConsults: [] }));
        tempNew = upcomingConsults.filter(
          (item) =>
            moment(item?.appointment_date).format("DD/MM/YYYY") ==
            text?.format("DD/MM/YYYY")
        );
      }
      if (tempNew?.length && activeTab === "upcoming") {
        setFilteredData((state) => ({ ...state, upcomingConsults: tempNew }));
      }
      if (tempPast?.length && activeTab === "past") {
        setFilteredData((state) => ({ ...state, pastConsults: tempPast }));
      }
      if (
        (!tempNew?.length && activeTab === "upcoming") ||
        (!tempPast?.length && activeTab === "past")
      ) {
        dispatch(
          setMessage({
            type: AlertEnum.Info,
            text: `No consultation found for ${
              typeof text === "string"
                ? text
                : moment(text).format("DD/MM/YYYY").toString()
            }`,
          })
        );
      }
    } catch (error) {}
  };
  const cancelAllSubmit = (values, { resetForm }) => {
    let tempValues = { ...values };
    if (values?.reason_type !== "others") {
      tempValues.reason = values.reason_type;
    }
    dispatch(CancelAllConsult(tempValues));
    resetForm();
  };
  useEffect(() => {
    if (upcomingConsults?.length) {
      handleFilter(moment(Date.now()));
    }
    return () => {};
  }, [upcomingConsults]);

  useEffect(() => {
    dispatch(GetNewConsults());
    dispatch(GetPastConsults());
    dispatch(CancelReasons());
    return () => {};
  }, []);

  return (
    <>
      <Container
        fluid
        style={{
          background: "#f8fbff",
          padding: "0px 100px",
          paddingBottom: "50px",
        }}
        className="consultation"
      >
        <h2 style={{ padding: "20px 0px" }} className="consultation-heading">
          Consultations
        </h2>

        <Tab.Container
          id="controlled-tab-example"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="Tabs"
        >
          <div className="d-flex justify-content-between button-spaces">
            <Nav className="Tabs">
              <Nav.Item>
                <Nav.Link eventKey="upcoming">Upcoming</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="past">Past</Nav.Link>
              </Nav.Item>
            </Nav>

            <div className="d-flex justify-content-between button-spaces">
              <div className="search ">
                <form class="form-inline d-flex justify-content-start align-items-center">
                  <img
                    alt="myImg"
                    src={Icon.Search}
                    className="payout_search"
                  ></img>
                  <input
                    class="form-control mr-sm-2 border-0 ml_5 pl_35"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => {
                      handleFilter(e.target.value);
                    }}
                  />
                </form>
              </div>

              <div
                className={
                  activeTab === "past" ? "datepicker active" : "datepicker"
                }
              >
                <Form.Select
                  className="date-filter border-0 p-0"
                  name="dob"
                  placeholder="Today"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    handleFilter(moment(e.target.value, "DD/MM/YYYY"));
                  }}
                >
                  <option value={moment().format("DD/MM/YYYY")}>Today</option>
                  <option value={moment().add(1, "days").format("DD/MM/YYYY")}>
                    {moment().add(1, "day").format("DD/MM/YYYY")}
                  </option>
                  <option value={moment().add(2, "days").format("DD/MM/YYYY")}>
                    {moment().add(2, "day").format("DD/MM/YYYY")}
                  </option>
                  <option value={moment().add(3, "days").format("DD/MM/YYYY")}>
                    {moment().add(3, "day").format("DD/MM/YYYY")}
                  </option>
                  <option value={moment().add(4, "days").format("DD/MM/YYYY")}>
                    {moment().add(4, "day").format("DD/MM/YYYY")}
                  </option>
                </Form.Select>
              </div>

              <div className="cancel-button">
                <Button
                  variant=""
                  className={activeTab === "past" ? "active" : ""}
                  onClick={() => {
                    dispatch(toggleCancelAll(true));
                  }}
                >
                  Cancel all
                </Button>
              </div>
            </div>
          </div>
          <Tab.Content>
            <Tab.Pane eventKey="upcoming" title="Upcoming">
              <NewConsultation
                upcomingConsults={
                  filteredData.upcomingConsults?.length
                    ? filteredData?.upcomingConsults
                    : []
                }
              />
            </Tab.Pane>
            <Tab.Pane eventKey="past" title="Past">
              <PastConsultation
                pastConsults={
                  filteredData?.pastConsults?.length
                    ? filteredData?.pastConsults
                    : pastConsults
                }
              />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>

      <Modal
        show={isCancelAll}
        onHide={() => {
          dispatch(toggleCancelAll(false));
        }}
        className="consultation-modal-body"
        centered
      >
        <Modal.Header className="consultation-modal-header">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="consultation-modal-text"
          >
            Tell us The Reasons
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            date: date,
            reason: "",
            reason_type: "",
            other: false,
          }}
          onSubmit={cancelAllSubmit}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body className="consultation-modal-body-text">
                <div role="group" aria-labelledby="my-radio-group">
                  {cancelReasons?.map((item) => (
                    <label className="checkbox_input">
                      <Field
                        type="radio"
                        id="reason_type"
                        name="reason_type"
                        value={item?.name}
                      />
                      <span>{item?.name}</span>
                    </label>
                  ))}
                  <label className="checkbox_input">
                    <Field
                      type="radio"
                      id="reason_type"
                      name="reason_type"
                      value="others"
                    />
                    <span>Others</span>
                  </label>
                </div>
                {values?.reason_type === "others" && (
                  <div className="optional-note">
                    <p>Optional Note</p>
                    <FormControl
                      control="textArea"
                      className="optional-note-text m-0 w-100"
                      style={{ border: "1px solid #80808080" }}
                      value={values?.reason}
                      name="reason"
                      id="reason"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer className="consultation-modal-footer">
                <div className="d-flex">
                  <Button
                    className="close_btn"
                    onClick={() => dispatch(toggleCancelAll(false))}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="verify_btn"
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </div>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default ConsultIndex;
