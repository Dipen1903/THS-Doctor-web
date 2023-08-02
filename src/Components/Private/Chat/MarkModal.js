import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CompleteConsult } from "../../../Store/Reducers/ConsultationsReducer"; // Import your action here

function MarkModal({ room }) {
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
    <>
      {/* <Button
        variant="primary"
        className="mark_complete"
        onClick={() => setShowModal(true)}
      >
        Mark Complete
      </Button> */}

      <Modal  onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Mark Complete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark this as complete?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="primary" onClick={handleMarkComplete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MarkModal;
