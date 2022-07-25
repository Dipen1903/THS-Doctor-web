import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Button, Modal, Form, Dropdown, DropdownButton } from "react-bootstrap";
import Header from "./Header";
import Datatableone from "./Datatableone"
import Datatabletwo from "./Datatabletwo"

function Consultationtable() {

  const [activeTab, setActiveTab] = useState("tab1");
  //  Functions to handle Tab Switching
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <>
      <Header />

      <Container
        fluid
        style={{ background: "#f8fbff", padding: "0px 100px" }}
        className="consultation"
      >
        <h4 style={{ padding: "40px 0px" }}>Consultations</h4>
        <div className="d-flex justify-content-between consultation-header">
        <div className="Tabs">
        <ul className="nav">
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
          <div className="d-flex justify-content-between button-spaces">
            <div className="search ">
              <form class="form-inline d-flex justify-content-start align-items-center">
                <i class="fa fa-search ml_20" aria-hidden="true"></i>
                <input
                  class="form-control mr-sm-2 border-0 ml_5"
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
            <div>
              <Button variant="" className="cancel-button">
                Cancel all
              </Button>
            </div>
          </div>
        </div>

        {activeTab === "tab1" ? <Datatableone /> : <Datatabletwo />}
      </Container>
    </>
  );
}

export default Consultationtable;
