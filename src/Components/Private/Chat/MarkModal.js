import moment from "moment";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CompleteConsult } from "../../../Store/Reducers/ConsultationsReducer"; // Import your action here

const MarkModal = ({ props, room }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleMarkComplete = () => {
    dispatch(CompleteConsult({
      appointment_id: room?.lastBookingId || room?.id,
    })).then((res) => {
      window.location.reload();
    });
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal_455"
      backdrop="static"
      style={{ maxWidth: "300px" }}
    >
      <Modal.Header
        className="modal_bg popup_modal_head"
        style={{ marginBottom: "none", border: "none" }}
      >
      </Modal.Header>
      <Modal.Body className="modal_bg payment_modal_body">
        <div className="payment_done_card_box mb_10">
          <h4>
            Are you sure you want to mark this as complete?
          </h4>
          <button variant="secondary" onClick={handleCloseModal}>
            No
          </button>
          <button variant="primary" onClick={handleMarkComplete}>
            Yes
          </button>
        </div>
        <center>
          <Button
            className="payment_ok_btn"
            onClick={() => {
              props.onHide();
              navigate("/");
            }}
          >
            OK
          </Button>
        </center>
      </Modal.Body>
      <Modal.Footer className="modal_bg"></Modal.Footer>
    </Modal>
  );
};

export default MarkModal;

