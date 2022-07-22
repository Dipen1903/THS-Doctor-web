import React from "react";
import { Button, Modal, Form, Dropdown, DropdownButton } from "react-bootstrap";

function Datatableone() {

    return (
        <>
        <div className="crud-datatable mt_20">
        <div class="row">
          <div class="table-responsive ">
            <table class="table">
              <thead className="tablehead">
                <tr>
                  <th>Appointement ID 1231</th>
                  <th>Patient 123</th>
                  <th>Age 123</th>
                  <th>Gender 1235 </th>
                  <th>Date-Time </th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>View</th>
                 
                </tr>
              </thead>
              <tbody className="tablebody">
                <tr>
                  <td>13215841</td>
                  <td>John Doe</td>
                  <td>23</td>
                  <td>M</td>
                  <td>11 Apr 1:15pm</td>
                  <td>New Cases</td>
                  <td>New Cases</td>
                  <td><i class="fa fa-eye eye" aria-hidden="true" color="blue"></i></td>
                </tr>
                <tr>
                <td>13215841</td>
                  <td>John Doe</td>
                  <td>23</td>
                  <td>M</td>
                  <td>11 Apr 1:15pm</td>
                  <td>New Cases</td>
                  <td>New Cases</td>
                  <td><i class="fa fa-eye eye" aria-hidden="true" color="blue"></i></td>
              </tr>
              <tr>
              <td>13215841</td>
              <td>John Doe</td>
              <td>23</td>
              <td>M</td>
              <td>11 Apr 1:15pm</td>
              <td>New Cases</td>
              <td>New Cases</td>
              <td><i class="fa fa-eye eye" aria-hidden="true" color="blue"></i></td>
            </tr>
            <tr>
            <td>13215841</td>
            <td>John Doe</td>
            <td>23</td>
            <td>M</td>
            <td>11 Apr 1:15pm</td>
            <td>New Cases</td>
            <td>New Cases</td>
            <td><i class="fa fa-eye eye" aria-hidden="true" color="blue"></i></td>
        </tr>
        <tr>
        <td>13215841</td>
        <td>John Doe</td>
        <td>23</td>
        <td>M</td>
        <td>11 Apr 1:15pm</td>
        <td>New Cases</td>
        <td>New Cases</td>
        <td><i class="fa fa-eye eye" aria-hidden="true" color="blue"></i></td>
      </tr>    
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--- Model Box ---> */}
        <div className="model_box">
        {/*  <Modal
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
        </>
        
    );

}
export default Datatableone;