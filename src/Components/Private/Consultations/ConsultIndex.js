import React, { useState } from "react";
import { Button, Container, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { Icon } from "../../../Utilities/Icons";
import NewConsultation from "./NewConsultation";
import PastConsultation from "./PastConsultation";

function ConsultIndex() {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [activeTab, setActiveTab] = useState("upcoming");
  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  return (
    <>
      <Container
        fluid
        style={{
          background: "#f8fbff",
          padding: "0px 100px",
          paddingBottom: "50px",
        }}
        className="consultation"
      >
        <h2 style={{ padding: "20px 0px" }} className="consultation-heading">
          Consultations
        </h2>
        <Tabs
          id="controlled-tab-example"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="Tabs"
        >
          <Tab eventKey="upcoming" title="Upcoming">
            <NewConsultation />
          </Tab>
          <Tab eventKey="past" title="Past">
            <PastConsultation />
          </Tab>
          <div className="d-flex justify-content-between button-spaces">
            <div className="search ">
              <form class="form-inline d-flex justify-content-start align-items-center">
                <img src={Icon.Search} className="payout_search"></img>
                <input
                  class="form-control mr-sm-2 border-0 ml_5 pl_35"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </div>
            <div>
              <div className="datepicker">
                <div className="">
                  <Form.Group controlId="dob">
                    <Form.Control
                      className="border-0"
                      type="date"
                      name="dob"
                      placeholder="Today"
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="cancel-button">
              <Button
                variant=""
                className={activeTab === "tab2" ? "active" : ""}
                onClick={handleShow}
              >
                Cancel all
              </Button>
            </div>
          </div>
        </Tabs>

        {/* <div className="d-flex justify-content-between consultation-header">
          <div className="Tabs">
            <ul
              className="nav
        "
            >
              <li
                className={activeTab === "tab1" ? "active" : ""}
                onClick={handleTab1}
              >
                Upcoming
              </li>
              <li
                className={activeTab === "tab2" ? "active" : ""}
                onClick={handleTab2}
              >
                Past
              </li>
            </ul>
          </div>
          
        </div> */}

        {/* {activeTab === "tab1" ? <NewConsultation /> : <PastConsultation />} */}
      </Container>

      <Modal
        show={showModal}
        onHide={handleClose}
        className="consultation-modal-body"
        centered
      >
        <Modal.Header className="consultation-modal-header">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="consultation-modal-text"
          >
            Tell us The Reasons
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="consultation-modal-body-text">
          <form action="/action_page.php">
            <div className="checkbox_input">
              <input type="checkbox" id="" name="" value="" />
              <span> The question is'n my speciality</span>
            </div>
            <div className="checkbox_input">
              <input type="checkbox" id="" name="" value="" />
              <span> The question is'n my speciality</span>
            </div>
            <div className="checkbox_input">
              <input type="checkbox" id="" name="" value="" />
              <span> The question is'n my speciality</span>
            </div>
            <div className="checkbox_input">
              <input type="checkbox" id="" name="" value="" />
              <span> Others</span>
            </div>
          </form>

          <div className="optional-note">
            <p>Optional Note</p>
            <textarea className="optional-note-text">
              Hello there, this is some text in a text area
            </textarea>
          </div>
        </Modal.Body>
        <Modal.Footer className="consultation-modal-footer">
          <div className="d-flex">
            <Button className="close_btn" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="verify_btn" variant="primary">
              Submit
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConsultIndex;
