import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PresciptionDetails from "../Prescription/PresciptionDetails";
import {
  GetConsultDetails,
  GetPrescDetails,
  toggleReview,
} from "../../../Store/Reducers/ConsultationsReducer";
// import { Button, Form } from "react-bootstrap";
// import Modal from "react-bootstrap/Modal";
// import { useDispatch, useSelector } from "react-redux";

import { BackGround, Icon } from "../../../Utilities/Icons";
import Table from "../../Common/Layouts/Table";
import { Link } from "react-router-dom";
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
      accessor: "booking_type",
      Cell: ({ cell: { value } }) => {
        return <span style={{ textTransform: "capitalize" }}>{value}</span>;
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ cell: { value } }) => {
        return (
          <>
            {value === 3 && <span class="failed_tag mx-2">Cancelled</span>}
            {value === 1 && <span class="paid_tag mx-2">Completed</span>}
          </>
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
              dispatch(GetConsultDetails({ appointment_id: original?.id }));
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
      <PresciptionDetails />
      <Table data={pastConsults} columns={columns} pagination={true} />
    </>
  );
}

export default PastConsultation;
export const ConsultDetails = (props) => {
  const { values, ...rest } = props;
  const dispatch = useDispatch();
  const { consultDetails } = useSelector(({ ConsultSlice }) => ConsultSlice);
  return (
    <Modal {...rest} className="consultation-modal-body-two" centered>
      <Modal.Header className="consultation-modal-header" closeButton>
        <img alt="myImg" className="mr_15" src={BackGround.Appointment}></img>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="consultation-modal-text"
        >
          Appointment Details
          <div>
            <span className="appointment_id">
              Id #{consultDetails?.appointment_id}
            </span>
            {consultDetails?.status === 3 && (
              <span class="failed_tag mx-2">Cancelled</span>
            )}
            {consultDetails?.status === 1 && (
              <span class="paid_tag mx-2">Completed</span>
            )}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="appoinment_input">
          <p className="left_text">Patient</p>
          <div>
            {" "}
            <p className="right-text">{consultDetails?.name}</p>
            <span>
              {consultDetails?.age} |{" "}
              {consultDetails?.gender?.toUpperCase() === "MALE" ? "M" : "F"}
            </span>
          </div>
        </div>

        <div className="appoinment_input">
          <p className="left_text">Consultation for</p>
          <div>
            {" "}
            <p className="right-text">{consultDetails?.health_problem}</p>
          </div>
        </div>

        <div className="appoinment_input">
          <p className="left_text">Date & Time</p>
          <div>
            {" "}
            <p className="right-text">
              {consultDetails?.appointment_date} -{" "}
              {consultDetails?.appointment_time}
            </p>
          </div>
        </div>

        <div className="appoinment_input">
          <p className="left_text">Fee</p>
          <div>
            {" "}
            <p className="right-text">{consultDetails?.consulting_fee} Rs.</p>
          </div>
        </div>

        <div className="appoinment_input">
          <p className="left_text">Prescription</p>{" "}
          <p className="right-text">
            <button
              className="view-btn"
              onClick={() => {
                dispatch(GetPrescDetails({ booking_id: consultDetails?.id }));
                dispatch(toggleReview(true));
                props.onHide();
              }}
            >
              View
            </button>
          </p>
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
          <Button className="close_btn" onClick={props.onClose}>
            Close
          </Button>
          <Link to={`/chat/${consultDetails?.id}`}>
            <Button className="verify_btn" variant="primary">
              <img alt="myImg" className="mr_10" src={Icon.Comment}></img>Open
              Chat
            </Button>
          </Link>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
