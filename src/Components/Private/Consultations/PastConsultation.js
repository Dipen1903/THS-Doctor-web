import React from "react";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
function PastConsultation() {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="consultation_card_box mt_20">
        <div class="table-responsive">
          <table class="table consultation_table">
            <thead>
              <tr className="consultation_table_head">
                <th className="consultation_table_head_text">
                  Appointement ID 1231
                </th>
                <th className="consultation_table_head_text">Patient 123</th>
                <th className="consultation_table_head_text">Age 123</th>
                <th className="consultation_table_head_text">Gender 1235 </th>
                <th className="consultation_table_head_text">Date-Time </th>
                <th className="consultation_table_head_text">Type</th>
                <th className="consultation_table_head_text">Status</th>
                <th className="consultation_table_head_text">View</th>
              </tr>
            </thead>
            <tbody>
              <tr className="consultation_table_body_row">
                <td className="consultation_table_body_text">13215841</td>
                <td className="consultation_table_body_text">John Doe</td>
                <td className="consultation_table_body_text">23</td>
                <td className="consultation_table_body_text">M</td>
                <td className="consultation_table_body_text">11 Apr 1:15pm</td>
                <td className="consultation_table_body_text">New Cases</td>
                <td className="consultation_table_body_text">
                  <span class="failed_tag">Cancelled</span>
                </td>
                <td className="consultation_table_body_text">
                  <svg
                    width="18"
                    height="12"
                    viewBox="0 0 18 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleShow}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.4993 5.99967C17.1085 5.43104 17.1084 5.43091 17.1083 5.43076L17.1079 5.43038L17.1069 5.4293L17.1037 5.42591L17.0927 5.41423L17.0526 5.37207C17.018 5.33589 16.9678 5.2839 16.9033 5.21835C16.7744 5.08732 16.5882 4.9018 16.3551 4.67991C15.8898 4.23708 15.2331 3.64478 14.4693 3.05037C13.7081 2.45793 12.8241 1.8505 11.9049 1.38805C10.9953 0.930453 9.98902 0.583008 8.99935 0.583008C8.00968 0.583008 7.00344 0.930453 6.09383 1.38805C5.17456 1.8505 4.29064 2.45793 3.52941 3.05037C2.76564 3.64478 2.10889 4.23708 1.64364 4.67991C1.41053 4.9018 1.22428 5.08732 1.09539 5.21835C1.03091 5.2839 0.980713 5.33589 0.946091 5.37207L0.905981 5.41423L0.89498 5.42591L0.891795 5.4293L0.890788 5.43038L0.890431 5.43076C0.890294 5.43091 0.890173 5.43104 1.49935 5.99967L0.890173 5.43104C0.591296 5.75122 0.591296 6.24813 0.890173 6.56831L1.49935 5.99967C0.890173 6.56831 0.890294 6.56844 0.890431 6.56859L0.890788 6.56897L0.891795 6.57005L0.89498 6.57344L0.905981 6.58512L0.946091 6.62728C0.980713 6.66346 1.03091 6.71545 1.09539 6.781C1.22428 6.91203 1.41053 7.09755 1.64364 7.31943C2.10889 7.76227 2.76564 8.35457 3.52941 8.94898C4.29064 9.54141 5.17456 10.1489 6.09383 10.6113C7.00344 11.0689 8.00968 11.4163 8.99935 11.4163C9.98902 11.4163 10.9953 11.0689 11.9049 10.6113C12.8241 10.1489 13.7081 9.54141 14.4693 8.94898C15.2331 8.35457 15.8898 7.76227 16.3551 7.31943C16.5882 7.09755 16.7744 6.91203 16.9033 6.781C16.9678 6.71545 17.018 6.66346 17.0526 6.62728L17.0927 6.58512L17.1037 6.57344L17.1069 6.57005L17.1079 6.56897L17.1083 6.56859C17.1084 6.56844 17.1085 6.56831 16.4993 5.99967ZM16.4993 5.99967L17.1085 6.56831C17.4074 6.24813 17.4074 5.75122 17.1085 5.43104L16.4993 5.99967ZM6.08268 5.99967C6.08268 4.38884 7.38852 3.08301 8.99935 3.08301C10.6102 3.08301 11.916 4.38884 11.916 5.99967C11.916 7.61051 10.6102 8.91634 8.99935 8.91634C7.38852 8.91634 6.08268 7.61051 6.08268 5.99967Z"
                      fill="#24B2B2"
                    />
                  </svg>
                </td>
              </tr>

              <tr className="consultation_table_body_row">
                <td className="consultation_table_body_text">13215841</td>
                <td className="consultation_table_body_text">John Doe</td>
                <td className="consultation_table_body_text">23</td>
                <td className="consultation_table_body_text">M</td>
                <td className="consultation_table_body_text">11 Apr 1:15pm</td>
                <td className="consultation_table_body_text">New Cases</td>
                <td className="consultation_table_body_text">
                  <span class="failed_tag">Cancelled</span>
                </td>
                <td className="consultation_table_body_text">
                  <svg
                    width="18"
                    height="12"
                    viewBox="0 0 18 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleShow}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.4993 5.99967C17.1085 5.43104 17.1084 5.43091 17.1083 5.43076L17.1079 5.43038L17.1069 5.4293L17.1037 5.42591L17.0927 5.41423L17.0526 5.37207C17.018 5.33589 16.9678 5.2839 16.9033 5.21835C16.7744 5.08732 16.5882 4.9018 16.3551 4.67991C15.8898 4.23708 15.2331 3.64478 14.4693 3.05037C13.7081 2.45793 12.8241 1.8505 11.9049 1.38805C10.9953 0.930453 9.98902 0.583008 8.99935 0.583008C8.00968 0.583008 7.00344 0.930453 6.09383 1.38805C5.17456 1.8505 4.29064 2.45793 3.52941 3.05037C2.76564 3.64478 2.10889 4.23708 1.64364 4.67991C1.41053 4.9018 1.22428 5.08732 1.09539 5.21835C1.03091 5.2839 0.980713 5.33589 0.946091 5.37207L0.905981 5.41423L0.89498 5.42591L0.891795 5.4293L0.890788 5.43038L0.890431 5.43076C0.890294 5.43091 0.890173 5.43104 1.49935 5.99967L0.890173 5.43104C0.591296 5.75122 0.591296 6.24813 0.890173 6.56831L1.49935 5.99967C0.890173 6.56831 0.890294 6.56844 0.890431 6.56859L0.890788 6.56897L0.891795 6.57005L0.89498 6.57344L0.905981 6.58512L0.946091 6.62728C0.980713 6.66346 1.03091 6.71545 1.09539 6.781C1.22428 6.91203 1.41053 7.09755 1.64364 7.31943C2.10889 7.76227 2.76564 8.35457 3.52941 8.94898C4.29064 9.54141 5.17456 10.1489 6.09383 10.6113C7.00344 11.0689 8.00968 11.4163 8.99935 11.4163C9.98902 11.4163 10.9953 11.0689 11.9049 10.6113C12.8241 10.1489 13.7081 9.54141 14.4693 8.94898C15.2331 8.35457 15.8898 7.76227 16.3551 7.31943C16.5882 7.09755 16.7744 6.91203 16.9033 6.781C16.9678 6.71545 17.018 6.66346 17.0526 6.62728L17.0927 6.58512L17.1037 6.57344L17.1069 6.57005L17.1079 6.56897L17.1083 6.56859C17.1084 6.56844 17.1085 6.56831 16.4993 5.99967ZM16.4993 5.99967L17.1085 6.56831C17.4074 6.24813 17.4074 5.75122 17.1085 5.43104L16.4993 5.99967ZM6.08268 5.99967C6.08268 4.38884 7.38852 3.08301 8.99935 3.08301C10.6102 3.08301 11.916 4.38884 11.916 5.99967C11.916 7.61051 10.6102 8.91634 8.99935 8.91634C7.38852 8.91634 6.08268 7.61051 6.08268 5.99967Z"
                      fill="#24B2B2"
                    />
                  </svg>
                </td>
              </tr>

              <tr className="consultation_table_body_row">
                <td className="consultation_table_body_text">13215841</td>
                <td className="consultation_table_body_text">John Doe</td>
                <td className="consultation_table_body_text">23</td>
                <td className="consultation_table_body_text">M</td>
                <td className="consultation_table_body_text">11 Apr 1:15pm</td>
                <td className="consultation_table_body_text">New Cases</td>
                <td className="consultation_table_body_text">
                  <span class="paid_tag">Completed</span>
                </td>
                <td className="consultation_table_body_text">
                  <svg
                    width="18"
                    height="12"
                    viewBox="0 0 18 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleShow}
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.4993 5.99967C17.1085 5.43104 17.1084 5.43091 17.1083 5.43076L17.1079 5.43038L17.1069 5.4293L17.1037 5.42591L17.0927 5.41423L17.0526 5.37207C17.018 5.33589 16.9678 5.2839 16.9033 5.21835C16.7744 5.08732 16.5882 4.9018 16.3551 4.67991C15.8898 4.23708 15.2331 3.64478 14.4693 3.05037C13.7081 2.45793 12.8241 1.8505 11.9049 1.38805C10.9953 0.930453 9.98902 0.583008 8.99935 0.583008C8.00968 0.583008 7.00344 0.930453 6.09383 1.38805C5.17456 1.8505 4.29064 2.45793 3.52941 3.05037C2.76564 3.64478 2.10889 4.23708 1.64364 4.67991C1.41053 4.9018 1.22428 5.08732 1.09539 5.21835C1.03091 5.2839 0.980713 5.33589 0.946091 5.37207L0.905981 5.41423L0.89498 5.42591L0.891795 5.4293L0.890788 5.43038L0.890431 5.43076C0.890294 5.43091 0.890173 5.43104 1.49935 5.99967L0.890173 5.43104C0.591296 5.75122 0.591296 6.24813 0.890173 6.56831L1.49935 5.99967C0.890173 6.56831 0.890294 6.56844 0.890431 6.56859L0.890788 6.56897L0.891795 6.57005L0.89498 6.57344L0.905981 6.58512L0.946091 6.62728C0.980713 6.66346 1.03091 6.71545 1.09539 6.781C1.22428 6.91203 1.41053 7.09755 1.64364 7.31943C2.10889 7.76227 2.76564 8.35457 3.52941 8.94898C4.29064 9.54141 5.17456 10.1489 6.09383 10.6113C7.00344 11.0689 8.00968 11.4163 8.99935 11.4163C9.98902 11.4163 10.9953 11.0689 11.9049 10.6113C12.8241 10.1489 13.7081 9.54141 14.4693 8.94898C15.2331 8.35457 15.8898 7.76227 16.3551 7.31943C16.5882 7.09755 16.7744 6.91203 16.9033 6.781C16.9678 6.71545 17.018 6.66346 17.0526 6.62728L17.0927 6.58512L17.1037 6.57344L17.1069 6.57005L17.1079 6.56897L17.1083 6.56859C17.1084 6.56844 17.1085 6.56831 16.4993 5.99967ZM16.4993 5.99967L17.1085 6.56831C17.4074 6.24813 17.4074 5.75122 17.1085 5.43104L16.4993 5.99967ZM6.08268 5.99967C6.08268 4.38884 7.38852 3.08301 8.99935 3.08301C10.6102 3.08301 11.916 4.38884 11.916 5.99967C11.916 7.61051 10.6102 8.91634 8.99935 8.91634C7.38852 8.91634 6.08268 7.61051 6.08268 5.99967Z"
                      fill="#24B2B2"
                    />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        className="consultation-modal-body-two"
        centered
      >
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
            <Button className="close_btn" onClick={handleClose}>
              Close
            </Button>
            <Button className="verify_btn" variant="primary">
              <img className="mr_10" src={Icon.Comment}></img>Open Chat
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PastConsultation;
