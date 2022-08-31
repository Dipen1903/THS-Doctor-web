import moment from "moment";
import React, { useEffect } from "react";
// import { Form, Pagination } from "react-bootstrap";
// import { useState } from "react";
import { Icon } from "../../../Utilities/Icons";
// import { Modal, Button } from "react-bootstrap";
import Table from "../../Common/Layouts/Table";
// import { useDispatch, useSelector } from "react-redux";

function NewConsultation({ upcomingConsults = [] }) {
  // const dispatch = useDispatch();
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
        return <>{value === "male" ? "M" : "F"}</>;
      },
    },
    {
      Header: "Date-Time",
      accessor: "appointment_date_time",
      Cell: ({ cell: { value } }) => {
        return <>{moment(value).format("DD mmm hh:mm A")}</>;
      },
    },
    {
      Header: "Time Left",
      accessor: "appointment_time",
      Cell: ({
        cell: {
          value,
          row: { original },
        },
      }) => {
        return (
          <span class="failed_tag">
            {moment(original?.appointment_date_time).fromNow(true)} Left
          </span>
        );
      },
    },
    {
      Header: "Mark Delay",
      accessor: "delay",
      Cell: ({
        cell: {
          value = 0,
          row: { original },
        },
      }) => {
        return (
          <select className="custom-select">
            <option value="0">No delay</option>
            <option value="1">5 min</option>
            <option value="2">10 min</option>
            <option value="3">15 min</option>
          </select>
        );
      },
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Chat",
      accessor: "chat",
      Cell: ({
        cell: {
          value,
          row: { original },
        },
      }) => {
        return <img src={Icon.Chat} alt="Avatar" className="chat-icon"></img>;
      },
    },
    {
      Header: "Cancel",
      accessor: "action",
      Cell: ({
        cell: {
          row: { original },
        },
      }) => (
        <img
          src={Icon.CrossRed}
          alt="Avatar"
          className="cross-icon"
          // onClick={handleShow}
        ></img>
      ),
    },
  ];
  useEffect(() => {
    return () => {};
  }, []);

  return <Table data={upcomingConsults} columns={columns} pagination={true} />;
}

export default NewConsultation;

{
  /* <Modal
show={showModal}
onHide={handleClose}
className="consultation-popup-body"
centered
>
<Modal.Header className="consultation-modal-header">
  <Modal.Title
    id="contained-modal-title-vcenter"
    className="consultation-modal-text"
  >
    <label className="sign_title mt_30">
      {" "}
      Enter the reason for cancelation appointment
    </label>
  </Modal.Title>
</Modal.Header>
<Modal.Body className="consultation-modal-body-text">
  <textarea
    className="optional-note-text"
    style={{ border: "1px solid #80808080" }}
  >
    Hello there, this is some text in a text area
  </textarea>
</Modal.Body>
<Modal.Footer className="consultation-modal-footer">
  <div>
    <Button className="close_btn" onClick={handleClose}>
      Close
    </Button>
  </div>
</Modal.Footer>
</Modal> */
}
