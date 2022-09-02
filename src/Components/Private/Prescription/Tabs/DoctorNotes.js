import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BackGround, Icon, Logo } from "../../../../Utilities/Icons";

function DoctorNotes() {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="medicine_card_box">
        <h4 className="medicine_header">
          <img src={Icon.termsconditionline} class="logo mr_10"></img>Doctor
          Note
        </h4>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="referdoctor_label">
              Chef Complaints
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Feel headache and cold"
              className="Textarea"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="referdoctor_label">Diagnosis</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Feel headache and cold"
              className="Textarea"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="referdoctor_label">
              Medical History
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Feel headache and cold"
              className="Textarea"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="referdoctor_label">
              Wrtire a instructions for Patient
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Feel headache and cold"
              className="Textarea"
            />
          </Form.Group>
          <label for="followafter" className="referdoctor_label">
            Follow up after
          </label>
          <br />
          <select className="follow_up">
            <option value="0">Before Food</option>
            <option value="1">Audi</option>
            <option value="2">BMW</option>
            <option value="3">Citroen</option>
            <option value="4">Ford</option>
          </select>
        </Form>
        <div className="prescription_table_bottom_card mt_15">
          <div className="prescription_left_align">
            <div className="col-md-4">
              <h5 class="prescription_result_text">
                3 <span className="result_declared_text">Medicines</span>
              </h5>
            </div>
            <div className="col-md-4">
              <h5 class="prescription_result_text">
                2 <span className="result_declared_text">Lab Tests</span>
              </h5>
            </div>
            <div className="col-md-5">
              <h5 class="prescription_result_text">
                1 <span className="result_declared_text">Refer a doctor</span>
              </h5>
            </div>
          </div>
          <div className="">
            <button onClick={handleShow} className="table_next_btn">
              Generate Prescription
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        className="generate-prescription-modal"
        centered
      >
        <Modal.Header className="prescription-modal-header">
          <img src={Logo.THS} class="logo ml_10"></img>
          <div>
            <h4>Dr John doe</h4>
            <p>MD - Dermatology</p>
            <p>Vadodara, Gujarat</p>
            <p>Medical Registration Number: 31312112311</p>
          </div>
        </Modal.Header>
        <Modal.Body className="prescription-modal-body-text">
          <div className="prescription_appoinment_input">
            <div>
              {" "}
              <p className="prescription-left-text">Kevin</p>
              <span>23 | F (THS Id: kev221990)</span>
            </div>
            <div>
              {" "}
              <p className="prescription-right-text">11 Feb, 2022</p>
              <span>Prescription Id: 1231213</span>
            </div>
          </div>

          <hr />

          <div className="prescription_appoinment_input">
            <div>
              {" "}
              <span className="text-uppercase">Diagnosis</span>
              <p className="prescription-left-text mt_5">Viral Infection</p>
            </div>
            <div>
              {" "}
              <span className="text-uppercase">Chef Complaints</span>
              <p className="prescription-right-text mt_5">
                Feel headache, Cold
              </p>
            </div>
          </div>
          <hr />

          <div className="prescription_table_appoinment_input">
            <div class="table-responsive">
              <span className="text-uppercase">Mecdicine</span>
              <table class="table prescription_table">
                <thead>
                  <tr className="prescription_table_head">
                    <th className="prescription_table_head_text">Name</th>
                    <th className="prescription_table_head_text">Mor</th>
                    <th className="prescription_table_head_text">Aft</th>
                    <th className="prescription_table_head_text">Eve</th>
                    <th className="prescription_table_head_text">Ngt</th>
                    <th className="prescription_table_head_text">Condition</th>
                    <th className="prescription_table_head_text">
                      <center>Days</center>
                    </th>
                    <th className="prescription_table_head_text">
                      <center>Qty</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="prescription_table_body_row">
                    <td className="prescription_table_body_text">Dolo 400mg</td>
                    <td className="prescription_table_body_text">1</td>
                    <td className="prescription_table_body_text">---</td>
                    <td className="prescription_table_body_text">---</td>
                    <td className="prescription_table_body_text">1</td>
                    <td className="prescription_table_body_text">After Food</td>
                    <td className="prescription_table_body_text">5</td>

                    <td className="prescription_table_body_text">10</td>
                  </tr>
                  <tr className="prescription_table_body_row">
                    <td className="prescription_table_body_text">Zocon 500</td>
                    <td className="prescription_table_body_text">1</td>
                    <td className="prescription_table_body_text">---</td>
                    <td className="prescription_table_body_text">---</td>
                    <td className="prescription_table_body_text">1</td>
                    <td className="prescription_table_body_text">
                      Before Food
                    </td>
                    <td className="prescription_table_body_text">5</td>

                    <td className="prescription_table_body_text">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="prescription_appoinment_input">
            <div>
              {" "}
              <span className="text-uppercase">Lab Test</span>
              <p className="prescription-left-text mt_5">Viral Infection</p>
            </div>
            <div>
              {" "}
              <span className="text-uppercase">Chef Complaints</span>
              <p className="prescription-right-text mt_5">
                Feel headache, Cold
              </p>
            </div>
          </div>
          <hr />
          <div className="prescription_appoinment_input">
            <div>
              {" "}
              <span className="text-uppercase">instructions</span>
              <p className="prescription-left-text mt_5">
                Avoid cold water, take rest
              </p>
            </div>
            <div>
              {" "}
              <span className="text-uppercase">Follow up after</span>
              <p className="prescription-right-text mt_5">5 days</p>
            </div>
          </div>

          <div className="prescription_sign_appoinment_input d-flex justify-content-end">
            <div>
              {" "}
              <img
                // src={require("../../Assets/img/png/work_sign.png")}
                className="work_profile_certificate "
              ></img>
              <br />
              <h6>Dr John doe</h6>
              <p className="prescription-right-text mt_5">MD - Dermatology</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="prescription-btn-modal-footer">
          <div className="d-flex">
            <Button className="close_btn" onClick={handleClose}>
              Edit
            </Button>
            <Link to="/chatscreen">
              <Button
                className="verify_btn"
                variant="primary"
                onClick={handleClose}
              >
                Send Prescription
              </Button>
            </Link>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DoctorNotes;
