import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Button, Modal, Form, Dropdown, DropdownButton } from "react-bootstrap";
import Header from "./Header";
import CloseIcon from "@material-ui/icons//Close";

function Consultationtable() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Header />

      <Container
        fluid
        style={{ background: "#f8fbff", padding: "0px 100px" }}
        className=""
      >
        <h4 style={{ padding: "40px 0px" }}>Consultations</h4>
        <div className="d-flex justify-content-between">
          <div>
            <span>Upcoming</span>
            <span>Past</span>
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

        <div className="crud-datatable mt_20">
          <div class="row">
            <div class="table-responsive ">
              <table class="table">
                <thead>
                  <tr>
                    <th>Appointement ID</th>
                    <th>Patient </th>
                    <th>Age</th>
                    <th>Gender </th>
                    <th>Date-Time </th>
                    <th>Time Left</th>
                    <th>Type</th>
                    <th>Mark Delay</th>
                    <th>Chat</th>
                    <th>Cancel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>13215841</td>
                    <td>John Doe</td>
                    <td>23</td>
                    <td>M</td>
                    <td>11 Apr 1:15pm</td>
                    <td>
                      <Button variant="" className="cancel-button">
                        Cancel all
                      </Button>
                    </td>
                    <td>New Cases</td>
                    <td>
                      <select className="custom-select">
                        <option value="0">Select car:</option>
                        <option value="1">Audi</option>
                        <option value="2">BMW</option>
                        <option value="3">Citroen</option>
                        <option value="4">Ford</option>
                        
                      </select>
                    </td>
                    <td>
                      <img
                        src={require("../Assets/img/chat_icon.png")}
                        alt="Avatar"
                        class="avatar2  "
                      ></img>
                    </td>
                    <td>
                      <img
                        src={require("../Assets/img/cross_icon.png")}
                        alt="Avatar"
                        class="avatar2  "
                      ></img>
                    </td>
                  </tr>
                  <tr>
                  <td>13215841</td>
                  <td>John Doe</td>
                  <td>23</td>
                  <td>M</td>
                  <td>11 Apr 1:15pm</td>
                  <td>
                    <Button variant="" className="cancel-button">
                      Cancel all
                    </Button>
                  </td>
                  <td>New Cases</td>
                  <td>
                    <select className="custom-select">
                      <option value="0">Select car:</option>
                      <option value="1">Audi</option>
                      <option value="2">BMW</option>
                      <option value="3">Citroen</option>
                      <option value="4">Ford</option>
                      
                    </select>
                  </td>
                  <td>
                    <img
                      src={require("../Assets/img/chat_icon.png")}
                      alt="Avatar"
                      class="avatar2  "
                    ></img>
                  </td>
                  <td>
                    <img
                      src={require("../Assets/img/cross_icon.png")}
                      alt="Avatar"
                      class="avatar2  "
                    ></img>
                  </td>
                </tr>
                <tr>
                <td>13215841</td>
                <td>John Doe</td>
                <td>23</td>
                <td>M</td>
                <td>11 Apr 1:15pm</td>
                <td>
                  <Button variant="" className="cancel-button">
                    Cancel all
                  </Button>
                </td>
                <td>New Cases</td>
                <td>
                  <select className="custom-select">
                    <option value="0">Select car:</option>
                    <option value="1">Audi</option>
                    <option value="2">BMW</option>
                    <option value="3">Citroen</option>
                    <option value="4">Ford</option>
                    
                  </select>
                </td>
                <td>
                  <img
                    src={require("../Assets/img/chat_icon.png")}
                    alt="Avatar"
                    class="avatar2  "
                  ></img>
                </td>
                <td>
                  <img
                    src={require("../Assets/img/cross_icon.png")}
                    alt="Avatar"
                    class="avatar2  "
                  ></img>
                </td>
              </tr>
              <tr>
              <td>13215841</td>
              <td>John Doe</td>
              <td>23</td>
              <td>M</td>
              <td>11 Apr 1:15pm</td>
              <td>
                <Button variant="" className="cancel-button">
                  Cancel all
                </Button>
              </td>
              <td>New Cases</td>
              <td>
                <select className="custom-select">
                  <option value="0">Select car:</option>
                  <option value="1">Audi</option>
                  <option value="2">BMW</option>
                  <option value="3">Citroen</option>
                  <option value="4">Ford</option>
                  
                </select>
              </td>
              <td>
                <img
                  src={require("../Assets/img/chat_icon.png")}
                  alt="Avatar"
                  class="avatar2  "
                ></img>
              </td>
              <td>
                <img
                  src={require("../Assets/img/cross_icon.png")}
                  alt="Avatar"
                  class="avatar2  "
                ></img>
              </td>
            </tr>
            <tr>
            <td>13215841</td>
            <td>John Doe</td>
            <td>23</td>
            <td>M</td>
            <td>11 Apr 1:15pm</td>
            <td>
              <Button variant="" className="cancel-button">
                Cancel all
              </Button>
            </td>
            <td>New Cases</td>
            <td>
              <select className="custom-select">
                <option value="0">Select car:</option>
                <option value="1">Audi</option>
                <option value="2">BMW</option>
                <option value="3">Citroen</option>
                <option value="4">Ford</option>
                
              </select>
            </td>
            <td>
              <img
                src={require("../Assets/img/chat_icon.png")}
                alt="Avatar"
                class="avatar2  "
              ></img>
            </td>
            <td>
              <img
                src={require("../Assets/img/cross_icon.png")}
                alt="Avatar"
                class="avatar2  "
              ></img>
            </td>
          </tr>
          <tr>
          <td>13215841</td>
          <td>John Doe</td>
          <td>23</td>
          <td>M</td>
          <td>11 Apr 1:15pm</td>
          <td>
            <Button variant="" className="cancel-button">
              Cancel all
            </Button>
          </td>
          <td>New Cases</td>
          <td>
            <select className="custom-select">
              <option value="0">Select car:</option>
              <option value="1">Audi</option>
              <option value="2">BMW</option>
              <option value="3">Citroen</option>
              <option value="4">Ford</option>
              
            </select>
          </td>
          <td>
            <img
              src={require("../Assets/img/chat_icon.png")}
              alt="Avatar"
              class="avatar2  "
            ></img>
          </td>
          <td>
            <img
              src={require("../Assets/img/cross_icon.png")}
              alt="Avatar"
              class="avatar2  "
            ></img>
          </td>
        </tr>
                

                  

                 

                  

                 
                </tbody>
              </table>
            </div>
          </div>

          {/* <!--- Model Box ---> */}
          <div className="model_box">
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Record</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div class="form-group mt-3">
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Country"
                    />
                  </div>
                  <div class="form-group mt-3">
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter City"
                    />
                  </div>
                  <div class="form-group mt-3">
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter Country"
                    />
                  </div>

                  <button type="submit" class="btn btn-success mt-4">
                    Add Record
                  </button>
                </form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Model Box Finsihs */}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Consultationtable;
