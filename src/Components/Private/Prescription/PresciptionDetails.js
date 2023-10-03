import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React, { memo, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SendMessage } from "../../../Store/Reducers/ChatReducer";
import { toggleReview } from "../../../Store/Reducers/ConsultationsReducer";
import { MessageEnum } from "../../../Utilities/Enums";
import { Logo } from "../../../Utilities/Icons";
import { addDoc, collection } from 'firebase/firestore';
const Review = ({ values }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isReview, prescDetails, consultDetails } = useSelector(
    ({ ConsultSlice }) => ConsultSlice
  );
  // const send = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     let tempMessage = { ...MessageEnum };
  
  //     tempMessage.dateTime = Timestamp.now();
  //     tempMessage.documentType = 4;
  //     tempMessage.extension = "pdf";
  //     tempMessage.imageName = prescDetails?.prescription_id;
  //     tempMessage.imageUrl = prescDetails?.prescription_url || "";
  //     const docRef = await dispatch(SendMessage(tempMessage));
  //     dispatch(toggleReview(false));
  //     navigate(`/chat/${prescDetails?.prescription_id}`);
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };
  const send = (e) => {
    try {
      e.preventDefault();
      let tempMessage = { ...MessageEnum };
      tempMessage.dateTime = Timestamp.now();
      tempMessage.documentType = 4;
      tempMessage.extension = "pdf";
      tempMessage.imageName = prescDetails?.prescription_id;
      tempMessage.imageUrl = prescDetails?.prescription_url || "";
      dispatch(SendMessage(tempMessage)).then((res) => {
        dispatch(toggleReview(false));
        // navigate(`/chat/${prescDetails?.prescription_id}`);
        navigate(`/dashboard`);
      });
    } catch (error) {}
  };
  useEffect(() => {}, [prescDetails]);
  
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
            alt="myImg"
            height={"37px"}
            width={"67px"}
            src={Logo.THS_WHITE}
            className="logo ml_10"
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
                <span className="text-uppercase">Medical History</span>
                <p className="prescription-right-text mt_5">
                  {prescDetails?.doctor_notes?.medical_history}
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
            <div className="table-responsive">
              <span className="text-uppercase">Mecdicine</span>
              <table className="table prescription_table">
                <thead>
                  <tr className="prescription_table_head">
                    <th className="prescription_table_head_text">Name</th>
                    <th className="prescription_table_head_text">Mor</th>
                    <th className="prescription_table_head_text">Aft</th>
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
                  {prescDetails?.medicines?.map((item, index) => (
                    <tr
                      key={item?.medicine_id}
                      className="prescription_table_body_row"
                    >
                      <td className="prescription_table_body_text">
                        {item?.medicine_name}
                      </td>
                      <td className="prescription_table_body_text">
                        {item?.morning || "---"}
                      </td>
                      <td className="prescription_table_body_text">
                        {item?.afternoon || "---"}
                      </td>
                      <td className="prescription_table_body_text">
                        {item?.night || "---"}
                      </td>
                      <td className="prescription_table_body_text">
                        {item?.conditions === "after_food"
                          ? "After Food"
                          : item?.conditions === "before_food"
                          ? "Before Food"
                          : "---"}
                      </td>
                      <td className="prescription_table_body_text">
                        {item?.days}
                      </td>

                      <td className="prescription_table_body_text">
                        {(parseInt(item?.morning || 1) +
                          parseInt(item?.afternoon || 0) +
                          parseInt(item?.evening || 0) +
                          parseInt(item?.night || 0)) *
                          parseInt(item?.days)}
                      </td>
                    </tr>
                  ))}
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
                  {prescDetails?.lab_test?.map((item, index) => (
                    <p className="prescription-left-text mt_5" key={index}>
                      {item.lab_test_name}
                    </p>
                  ))}
                </div>
              ) : (
                <div></div>
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

        {prescDetails?.Radiological_test?.length ||
        prescDetails?.refer_doctors?.length ? (
          <>
            <div className="prescription_appoinment_input">
              {prescDetails?.Radiological_test?.length ? (
                <div>
                  {" "}
                  <span className="text-uppercase">Radiological Test</span>
                  {prescDetails?.Radiological_test?.map((item, index) => (
                    <p className="prescription-left-text mt_5" key={index}>
                      {item.lab_test_name}
                    </p>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
              {/* {prescDetails?.refer_doctors?.length ? (
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
              )} */}
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
              alt="myImg"
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
          {(!location.pathname.includes("chat") ||
            consultDetails?.status < 2) && (
            <Button
              className="close_btn"
              onClick={() => {
                dispatch(toggleReview(false));
                navigate(`/prescription/${prescDetails?.prescription_id}`);
              }}
            >
              Edit
            </Button>
          )}

          {location.pathname.includes("chat") ? (
            <Button
              className="verify_btn"
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                dispatch(toggleReview(false));
              }}
            >
              Close
            </Button>
          ) : location.pathname.includes("prescription") ? (
            <Button className="verify_btn" variant="primary" onClick={send}>
              Send Prescription
            </Button>
          ) : (
            <Button
              className="verify_btn"
              variant="primary"
              onClick={() => {
                dispatch(toggleReview(false));
                navigate(`/chat/${prescDetails?.prescription_id}`);
              }}
            >
              Open Chat
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default memo(Review);
