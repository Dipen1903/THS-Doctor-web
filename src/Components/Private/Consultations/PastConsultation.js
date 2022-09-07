import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { GetConsultDetails } from "../../../Store/Reducers/ConsultationsReducer";
// import { Button, Form } from "react-bootstrap";
// import Modal from "react-bootstrap/Modal";
// import { useDispatch, useSelector } from "react-redux";

import { BackGround, Icon } from "../../../Utilities/Icons";
import Table from "../../Common/Layouts/Table";
function PastConsultation({ pastConsults = [] }) {
  const dispatch = useDispatch();
  const [show, hide] = useState(false);
  const columns = [
    {
      Header: "Appointment ID",
      accessor: "appointment_id", // accessor is the "key" in the data
    },
    {
      Header: "Patient",
      accessor: "name", // accessor is the "key" in the data
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Gender",
      accessor: "gender",
      Cell: ({ cell: { value } }) => {
        return <>{value.toUpperCase() === "MALE" ? "M" : "F"}</>;
      },
    },
    {
      Header: "Date-Time",
      accessor: "appointment_date_time",
      Cell: ({ cell: { value } }) => {
        return <>{moment(value).format("DD MMM hh:mm A")}</>;
      },
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({
        cell: {
          value,
          row: { original },
        },
      }) => {
        return value ? (
          <span class="failed_tag">Cancelled</span>
        ) : (
          <span class="paid_tag">Completed</span>
        );
      },
    },
    {
      Header: "View",
      accessor: "action",
      Cell: ({ row: { original } }) => (
        <React.Fragment key={original?.appointment_id}>
          <img
            src={Icon.Eye}
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch(
                GetConsultDetails({ appointment_id: original?.appointment_id })
              );
              hide(true);
            }}
            alt="view"
          />
        </React.Fragment>
      ),
    },
  ];
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <ConsultDetails
        show={show}
        onHide={(e) => {
          hide(false);
        }}
      />
      <Table data={pastConsults} columns={columns} pagination={true} />
    </>
  );
}

export default PastConsultation;
const ConsultDetails = (props) => {
  const { values, ...rest } = props;
  return (
    <Modal {...rest} className="consultation-modal-body-two" centered>
      <Modal.Header className="consultation-modal-header" closeButton>
        <img className="mr_15" src={BackGround.Appointment}></img>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="consultation-modal-text"
        >
          Appointment Details
          <div>
            <span className="appointment_id">Id #123113131</span>
            <span class="completed_paid_tag">Completed</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="appoinment_input">
          <p className="left_text">Patient</p>
          <div>
            {" "}
            <p className="right-text">John Doe</p>
            <span>23 | F</span>
          </div>
        </div>

        <div className="appoinment_input">
          <p className="left_text">Consultation for</p>
          <div>
            {" "}
            <p className="right-text">Bones & joints</p>
          </div>
        </div>

        <div className="appoinment_input">
          <p className="left_text">Date & Time</p>
          <div>
            {" "}
            <p className="right-text">11 April, 2022 - 11:00 am</p>
          </div>
        </div>

        <div className="appoinment_input">
          <p className="left_text">Fee</p>
          <div>
            {" "}
            <p className="right-text">500 Rs.</p>
            <span>23 | F</span>
          </div>
        </div>

        <div className="appoinment_input">
          <p className="left_text">Prescription</p>
        </div>

        <div className="appoinment_input">
          <p className="left_text">Lab Test</p>
          <div>
            {" "}
            <p className="right-text">CBC</p>
            <span>Test name</span>
          </div>
        </div>

        <div className="appoinment_input">
          <p className="left_text">Recommended Doctor</p>
          <div>
            {" "}
            <p className="right-text">Neurologist</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="consultation-modal-footer">
        <div className="d-flex">
          <Button className="close_btn" onClick={props?.onClose}>
            Close
          </Button>
          <Button className="verify_btn" variant="primary">
            <img className="mr_10" src={Icon.Comment}></img>Open Chat
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
