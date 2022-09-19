import moment from "moment";
import React, { memo, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleReview } from "../../../Store/Reducers/ConsultationsReducer";
import { Logo } from "../../../Utilities/Icons";
const Review = ({ values }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isReview, prescDetails } = useSelector(
    ({ ConsultSlice }) => ConsultSlice
  );
  useEffect(() => {}, [prescDetails]);
  return (
    <Modal
      show={isReview}
      onHide={() => dispatch(toggleReview(false))}
      className="generate-prescription-modal"
      centered
    >
      <Modal.Header className="prescription-modal-header">
        <div>
          <img
            height={"37px"}
            width={"67px"}
            src={Logo.THS_WHITE}
            class="logo ml_10"
          />
          <img
            height={"25px"}
            width={"185px"}
            src={Logo.THS_Title}
            class="logo ml_10"
          />
        </div>
        <div>
          <h4>Dr {prescDetails?.doctor_details?.name}</h4>

          <p>
            {prescDetails?.doctor_details?.qualifications} -{" "}
            {prescDetails?.doctor_details?.speciality}
          </p>
          <p>
            {prescDetails?.doctor_details?.city_name},
            {prescDetails?.doctor_details?.state_name}
          </p>
          <p>
            Medical Registration Number:{" "}
            {prescDetails?.doctor_details?.registration_number}
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className="prescription-modal-body-text">
        <div className="prescription_appoinment_input">
          <div>
            {" "}
            <p className="prescription-left-text">
              {prescDetails?.patient_details?.name}
            </p>
            <span>
              {prescDetails?.patient_details?.age} |{" "}
              {prescDetails?.patient_details?.gender?.toLowerCase() === "male"
                ? "M"
                : "F"}{" "}
              (THS Id: {prescDetails?.patient_details?.id})
            </span>
          </div>
          <div>
            {" "}
            <p className="prescription-right-text">
              {moment(prescDetails?.prescription_date).format("DD MMM,YYYY")}
            </p>
            <span>Prescription Id: {prescDetails?.prescription_id}</span>
          </div>
        </div>

        <hr />

        {prescDetails?.doctor_notes && (
          <>
            <div className="prescription_appoinment_input">
              <div>
                {" "}
                <span className="text-uppercase">Diagnosis</span>
                <p className="prescription-left-text mt_5">
                  {prescDetails?.doctor_notes?.diagnosis}
                </p>
              </div>
              <div>
                {" "}
                <span className="text-uppercase">Chef Complaints</span>
                <p className="prescription-right-text mt_5">
                  {prescDetails?.doctor_notes?.chef_complaints}
                </p>
              </div>
            </div>
            <hr />
          </>
        )}

        {prescDetails?.medicines?.length ? (
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
        ) : (
          <></>
        )}

        {prescDetails?.lab_test?.length ||
        prescDetails?.refer_doctors?.length ? (
          <>
            <div className="prescription_appoinment_input">
              {prescDetails?.lab_test?.length ? (
                <div>
                  {" "}
                  <span className="text-uppercase">Lab Test</span>
                  <p className="prescription-left-text mt_5">Viral Infection</p>
                </div>
              ) : (
                <></>
              )}
              {prescDetails?.refer_doctors?.length ? (
                <div>
                  {" "}
                  <span className="text-uppercase">Recommended Doctor</span>
                  <p className="prescription-right-text mt_5">
                    {prescDetails?.refer_doctors
                      ?.map((item) => item?.speciality_name)
                      .join(", ")}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
            <hr />
          </>
        ) : (
          <></>
        )}
        {prescDetails?.doctor_notes && (
          <div className="prescription_appoinment_input">
            <div>
              {" "}
              <span className="text-uppercase">instructions</span>
              <p className="prescription-left-text mt_5">
                {prescDetails?.doctor_notes?.instruction}
              </p>
            </div>
            <div>
              {" "}
              <span className="text-uppercase">Follow up after</span>
              <p className="prescription-right-text mt_5">
                {prescDetails?.doctor_notes?.follow_up_days} days
              </p>
            </div>
          </div>
        )}
        <div className="prescription_sign_appoinment_input d-flex justify-content-end text-end">
          <div>
            {" "}
            <img
              src={prescDetails?.doctor_details?.signature}
              className="work_profile_certificate "
            ></img>
            <br />
            <h6>{prescDetails?.doctor_details?.name}</h6>
            <p className="prescription-right-text mt_5">
              {prescDetails?.doctor_details?.qualifications} -{" "}
              {prescDetails?.doctor_details?.speciality}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="prescription-btn-modal-footer">
        <div className="d-flex">
          {/* <Link to={`/prescription/${prescDetails?.prescription_id}`} > */}
          <Button
            className="close_btn"
            onClick={() => {
              dispatch(toggleReview(false));
              navigate(`/prescription/${prescDetails?.prescription_id}`);
            }}
          >
            Edit
          </Button>
          {/* </Link> */}
          {location.pathname.includes("prescription") === 1 && (
            <Button className="verify_btn" variant="primary" onClick={() => {}}>
              Send Prescription
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default memo(Review);