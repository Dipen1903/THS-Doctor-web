import moment from "moment";
import React, { useEffect, useState } from "react";
// import { useState } from "react";
import { Icon } from "../../../Utilities/Icons";
import { Modal, Button } from "react-bootstrap";
import Table from "../../Common/Layouts/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  CancelConsult,
  CancelReasons,
  DelayConsult,
  toggleCancel,
} from "../../../Store/Reducers/ConsultationsReducer";
import { ErrorMessage, Field, Formik, useFormik } from "formik";
import { CancelConsultSchema } from "../../../Utilities/Schema";
import FormControl from "../../Common/Forms/FormControl";
import { ConvertHMS } from "../../../Utilities/Functions";

function NewConsultation({ upcomingConsults = [] }) {
  const dispatch = useDispatch();
  const [appointmentId, setAppointMentId] = useState();
  const columns = [
    {
      Header: "Appointment ID",
      accessor: "appointment_id",
    },
    {
      Header: "Patient",
      accessor: "name",
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
        var duration = moment.duration(
          moment(original?.appointment_date_time).diff(moment.now())
        );
        var seconds = parseInt(duration.asSeconds());
        return <span class="failed_tag">{`${ConvertHMS(seconds)} Left`}</span>;
      },
    },
    {
      Header: "Mark Delay",
      accessor: "delay_time",
      Cell: ({
        cell: {
          value,
          row: { original },
        },
      }) => {
        return (
          <select
            className="custom-select"
            value={value}
            onChange={(e) => {
              e.preventDefault();
              let delay_time = e?.target?.value;
              dispatch(
                DelayConsult({ appointment_id: original?.id, delay_time })
              );
            }}
          >
            <option value="0 min">No delay</option>
            <option value="5 min">5 min</option>
            <option value="10 min">10 min</option>
            <option value="15 min">15 min</option>
          </select>
        );
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
  const { isCancel, cancelReasons } = useSelector(
    ({ ConsultSlice }) => ConsultSlice
  );

  const cancelSubmit = (values, { resetForm }) => {
    debugger;
    let tempValues = { ...values };
    if (values?.reason_type !== "others") {
      tempValues.reason = values.reason_type;
    }
    dispatch(CancelConsult(tempValues));
    resetForm();
  };

  useEffect(() => {
    dispatch(CancelReasons());
  }, [appointment_id]);
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
        initialValues={{
          appointment_id,
          reason: "",
          reason_type: "",
          other: false,
        }}
        enableReinitialize={true}
        // validationSchema={CancelConsultSchema}
        onSubmit={cancelSubmit}
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
