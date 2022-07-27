import React from "react";
import Form from "react-bootstrap/Form";
import { Icon } from "../../../Utilities/Icons";
import FileUpload from "../../Common/Layouts/FileUpload";

export default function EducationalProfile() {
  return (
    <>
      <div class="basic_info_form_box">
        <div class="row mt_20">
          <div class="col-md-12">
            <label className="sign_title">Qualification</label>
            <div class="input_box">
              <div class="form_group form_bottom">
                <input type="text" name="" placeholder="Search" required />
                <svg
                  class="language_search_icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
                    fill="#3093BB"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.5 8C11.5 6.067 9.933 4.5 8 4.5V2.5C11.0376 2.5 13.5 4.96243 13.5 8H11.5Z"
                    fill="#3093BB"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.7072 12.293L19.7072 18.293L18.293 19.7072L12.293 13.7072L13.7072 12.293Z"
                    fill="#3093BB"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt_20">
          <h3 class="added_qualifications">Added Qualifications</h3>
        </div>
        <div class="row mt_20">
          <div class="col-md-6">
            <h5 class="qualification_text">MBBS</h5>
            <h5 class="remove_title">Remove</h5>
          </div>
          <div class="col-md-6">
            <FileUpload
              label="Attach File"
              icon={Icon.Attach}
              className="attach_certificate"
            />
            {/* <div class="row">
                <div class="col-md-3">
                  <img src={require("../Assets/img/certificate.png")}></img>
                </div>
                <div class="col-md-8">
                  <h5 class="certificate_name">Certifica.jpg</h5>
                  <h6 class="delete_photo">Delete Photo</h6>
                </div>
              </div> */}
          </div>
        </div>
        <div class="row mt_30">
          <div class="col-md-6">
            <h5 class="qualification_text">MD</h5>
            <h5 class="remove_title">Remove</h5>
          </div>
          <div class="col-md-6">
            <FileUpload
              label="Attach File"
              icon={Icon.Attach}
              className="attach_certificate"
            />
          </div>
        </div>
        <hr className="bottom_border mt_50 mb_50" />
        <div class="row">
          <div class="col-md-12">
            <h3 class="id_proof_doc">Upload ID Proof Document</h3>
          </div>
        </div>
        <div class="row mt_20">
          <div class="col-md-12">
            <Form.Group className="mb-3">
              <Form.Label className="sign_title">Select Document</Form.Label>
              <Form.Select>
                <option>Aadhar card</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>
        <div class="row mt_20">
          <div class="col-md-6">
            <h5 class="aadhar_text">Aadhar card (Front side)</h5>
          </div>
          <div class="col-md-6">
            <FileUpload
              label="Attach File"
              icon={Icon.Attach}
              className="attach_certificate"
            />
            {/* <div class="row">
                <div class="col-md-3">
                  <img src={require("../Assets/img/Aadhar_1.png")}></img>
                </div>
                <div class="col-md-8">
                  <h5 class="certificate_name">Aadhar1.jpg</h5>
                  <h6 class="delete_photo">Delete Photo</h6>
                </div>
              </div> */}
          </div>
        </div>
        <div class="row mt_40">
          <div class="col-md-6">
            <h5 class="aadhar_text">Aadhar card (Back side)</h5>
          </div>
          <div class="col-md-6">
            <FileUpload
              label="Attach File"
              icon={Icon.Attach}
              className="attach_certificate"
            />
          </div>
        </div>
        <hr className="bottom_border mt_50 mb_50" />
        <div class="row">
          <div class="col-md-6">
            <h5 class="upload_signature">Upload Signature</h5>
          </div>
          <div class="col-md-6">
            <FileUpload
              label="Attach File"
              icon={Icon.Attach}
              className="attach_certificate"
            />
          </div>
        </div>
      </div>
    </>
  );
}
