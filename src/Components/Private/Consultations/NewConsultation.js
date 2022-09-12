import moment from "moment";
import React, { useEffect, useState } from "react";
// import { useState } from "react";
import { Icon } from "../../../Utilities/Icons";
import { Modal, Button } from "react-bootstrap";
import Table from "../../Common/Layouts/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  CancelConsult,
  toggleCancel,
} from "../../../Store/Reducers/ConsultationsReducer";
import { ErrorMessage, Formik, useFormik } from "formik";
import { CancelConsultSchema } from "../../../Utilities/Schema";
import FormControl from "../../Common/Forms/FormControl";
import { ConvertHMS } from "../../../Utilities/Functions";

function NewConsultation({ upcomingConsults = [] }) {
  const dispatch = useDispatch();
  const [appointmentId, setAppointMentId] = useState();
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
            {ConvertHMS(
              moment().diff(original?.appointment_date_time, "seconds")
            )}
            {/* {moment(original?.appointment_date_time).fromNow(true)}  */}
            Left
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
      Cell: () => {
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
          onClick={() => {
            setAppointMentId(original?.id);
            dispatch(toggleCancel(true));
          }}
        ></img>
      ),
    },
  ];
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <CancelModal appointment_id={appointmentId} />
      <Table data={upcomingConsults} columns={columns} pagination={true} />
    </>
  );
}

export default NewConsultation;
const CancelModal = ({ appointment_id }) => {
  const dispatch = useDispatch();
  const { isCancel } = useSelector(({ ConsultSlice }) => ConsultSlice);
  useEffect(() => {}, [appointment_id]);
  return (
    <Modal
      show={isCancel}
      onHide={() => dispatch(toggleCancel(false))}
      className="consultation-popup-body"
      centered
    >
      <Modal.Header className="consultation-modal-header">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="consultation-modal-text"
        >
          <label className="sign_title mt_30">
            Enter the reason for cancelation appointment
          </label>
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ appointment_id, reason: "" }}
        enableReinitialize={true}
        validationSchema={CancelConsultSchema}
        onSubmit={(values) => dispatch(CancelConsult(values))}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Body className="consultation-modal-body-text">
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
            </Modal.Body>
            <Modal.Footer className="consultation-modal-footer">
              <div>
                <Button
                  className="close_btn"
                  type="button"
                  onClick={() => dispatch(toggleCancel(false))}
                >
                  Close
                </Button>
                <Button className="verify_btn" type="submit">
                  Done
                </Button>
              </div>
            </Modal.Footer>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
