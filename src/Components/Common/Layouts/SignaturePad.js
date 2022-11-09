import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SignaturePad from "react-signature-canvas";
import { setMessage } from "../../../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../../../Utilities/Enums";
import { Base64toFile } from "../../../Utilities/Functions";

function Signature({ label, icon, className, onChange, value }) {
  const signatureRef = useRef({});
  const [open, setOpen] = useState(false);

  const saveSignature = () => {
    try {
      const dataUrl = signatureRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      var file = Base64toFile(dataUrl, "signature.png");
      onChange(file);
      setOpen(false);
    } catch (error) {
      setMessage({
        text: "Somthing went wrong!",
        type: AlertEnum.Error,
      });
      setOpen(false);
    }
  };
  return (
    <>
      <button
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        {icon && <img alt="myImg" src={icon} className="attach_icon"></img>}
        {label}
      </button>

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        className="generate-prescription-modal"
        centered
      >
        <Modal.Header className="prescription-modal-header">
          <h3>Draw Signature</h3>
          <button
            type="button"
            style={{ border: "none", opacity: 1 }}
            class="btn-close btn-close-white"
            aria-label="Close"
            onClick={() => setOpen(false)}
          ></button>
        </Modal.Header>
        <Modal.Body className="prescription-modal-body-text">
          <SignaturePad
            ref={signatureRef}
            canvasProps={{
              className: "signature-canvas",
            }}
          />
        </Modal.Body>
        <Modal.Footer className="signature-btn-modal-footer">
          <div className="d-flex">
            <Button
              className="close_btn"
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                signatureRef.current?.clear();
              }}
            >
              Clear
            </Button>

            <Button
              className="verify_btn"
              variant="primary"
              onClick={() => {
                saveSignature();
              }}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Signature;
