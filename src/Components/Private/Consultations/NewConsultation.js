import React from "react";
import { Form, Pagination } from "react-bootstrap";
import { useState } from "react";
import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
import { Modal, Button } from "react-bootstrap";
function NewConsultation() {
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
                  Appointement ID
                </th>
                <th className="consultation_table_head_text">Patient </th>
                <th className="consultation_table_head_text">Age</th>
                <th className="consultation_table_head_text">Gender </th>
                <th className="consultation_table_head_text">Date-Time </th>
                <th className="consultation_table_head_text">Time Left</th>
                <th className="consultation_table_head_text">Type</th>
                <th className="consultation_table_head_text">Mark Delay</th>
                <th className="consultation_table_head_text">Chat</th>
                <th className="consultation_table_head_text">Cancel</th>
              </tr>
            </thead>
            <tbody>
              <tr className="consultation_table_body_row">
                <td className="consultation_table_body_text">13215841</td>
                <td className="consultation_table_body_text">John Doe</td>
                <td className="consultation_table_body_text">23</td>
                <td className="consultation_table_body_text">M</td>
                <td className="consultation_table_body_text">11 Apr 1:15pm</td>
                <td className="consultation_table_body_text">
                  <span class="failed_tag">10 mint left</span>
                </td>
                <td className="consultation_table_body_text">New Cases</td>
                <td className="consultation_table_body_text">
                  <select className="custom-select">
                    <option value="0">No delay</option>
                    <option value="1">5 min</option>
                    <option value="2">10 min</option>
                    <option value="3">15 min</option>
                  </select>
                </td>
                <td className="consultation_table_body_text">
                  <img
                    src={BackGround.ChatImg}
                    alt="Avatar"
                    className="chat-icon"
                  ></img>
                </td>
                <td className="consultation_table_body_text">
                  <img
                    src={BackGround.CrossImg}
                    alt="Avatar"
                    className="cross-icon"
                    onClick={handleShow}
                  ></img>
                </td>
              </tr>

              <tr className="consultation_table_body_row">
                <td className="consultation_table_body_text">13215841</td>
                <td className="consultation_table_body_text">John Doe</td>
                <td className="consultation_table_body_text">23</td>
                <td className="consultation_table_body_text">M</td>
                <td className="consultation_table_body_text">11 Apr 1:15pm</td>
                <td className="consultation_table_body_text">
                  <span class="failed_tag">10 mint left</span>
                </td>
                <td className="consultation_table_body_text">New Cases</td>
                <td className="consultation_table_body_text">
                  <select className="custom-select">
                    <option value="0">No delay</option>
                    <option value="1">5 min</option>
                    <option value="2">10 min</option>
                    <option value="3">15 min</option>
                  </select>
                </td>
                <td className="consultation_table_body_text">
                  <img
                    src={BackGround.ChatImg}
                    alt="Avatar"
                    className="chat-icon"
                  ></img>
                </td>
                <td className="consultation_table_body_text">
                  <img
                    src={BackGround.CrossImg}
                    alt="Avatar"
                    className="cross-icon"
                  ></img>
                </td>
              </tr>

              <tr className="consultation_table_body_row">
                <td className="consultation_table_body_text">13215841</td>
                <td className="consultation_table_body_text">John Doe</td>
                <td className="consultation_table_body_text">23</td>
                <td className="consultation_table_body_text">M</td>
                <td className="consultation_table_body_text">11 Apr 1:15pm</td>
                <td className="consultation_table_body_text">
                  <span class="failed_tag">10 mint left</span>
                </td>
                <td className="consultation_table_body_text">New Cases</td>
                <td className="consultation_table_body_text">
                  <select className="custom-select">
                    <option value="0">No delay</option>
                    <option value="1">5 min</option>
                    <option value="2">10 min</option>
                    <option value="3">15 min</option>
                  </select>
                </td>
                <td className="consultation_table_body_text">
                  <img
                    src={BackGround.ChatImg}
                    alt="Avatar"
                    className="chat-icon"
                  ></img>
                </td>
                <td className="consultation_table_body_text">
                  <img
                    src={BackGround.CrossImg}
                    alt="Avatar"
                    className="cross-icon"
                  ></img>
                </td>
              </tr>

              <tr className="consultation_table_body_row">
                <td className="consultation_table_body_text">13215841</td>
                <td className="consultation_table_body_text">John Doe</td>
                <td className="consultation_table_body_text">23</td>
                <td className="consultation_table_body_text">M</td>
                <td className="consultation_table_body_text">11 Apr 1:15pm</td>
                <td className="consultation_table_body_text">
                  <span class="failed_tag">10 mint left</span>
                </td>
                <td className="consultation_table_body_text">New Cases</td>
                <td className="consultation_table_body_text">
                  <select className="custom-select">
                    <option value="0">No delay</option>
                    <option value="1">5 min</option>
                    <option value="2">10 min</option>
                    <option value="3">15 min</option>
                  </select>
                </td>
                <td className="consultation_table_body_text">
                  <img
                    src={BackGround.ChatImg}
                    alt="Avatar"
                    className="chat-icon"
                  ></img>
                </td>
                <td className="consultation_table_body_text">
                  <img
                    src={BackGround.CrossImg}
                    alt="Avatar"
                    className="cross-icon"
                  ></img>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="pagination_card">
        <div className="row">
          <div className="col-md-3">
            <h5 class="pagination_result_text">Showing 1 - 10 of 50 results</h5>
          </div>
          <div className="col-md-6">
            <center>
              <Pagination className="pagination_content">
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </center>
          </div>
          <div className="col-md-3">
            <div className="display_inline float_right item_list_box ">
              <h6 class="page_item_list">Items per page</h6>
              <Form.Group className="mb-3 item_drop_box">
                <Form.Select>
                  <option>10</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>

      <Modal
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
      </Modal>
    </>
  );
}

export default NewConsultation;
