import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Icon } from "../../../Utilities/Icons";
import { useDispatch } from "react-redux";
import { PrivacyAndPolicy } from "../../../Store/Reducers/CommonReducer";

function PrivacyPolicy() {
  const dispatch = useDispatch();
  const [policyData, setPolicyData] = useState({});
  const [updatedDate, setupdatedDate] = useState();
  const [finalDate, setFinalDate] = useState("");

  const privacyApiCall = (values) => {
    dispatch(PrivacyAndPolicy({})).then((res) => {
      if (res.payload.status_code === 200) {
        setPolicyData(res.payload.data);
        setupdatedDate(res?.payload?.data?.updated_at);
      }
    });
  };
  useEffect(() => {
    privacyApiCall();
  }, []);

  useEffect(() => {
    const dateForm = new Date(updatedDate);
    var Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = dateForm.getDate();
    const month = Months[dateForm.getMonth()];
    const year = dateForm.getFullYear();
    setFinalDate(`${date} ${month}, ${year}`);
  }, [updatedDate]);

  return (
    <>
      <Container fluid className="privacypolicy_container">
        <h2 className="privacy_policy_title mb_10 mt_20">Privacy Policy</h2>
        <div className="privacypolicy_card_box mt_20">
          <div className="privacy_policy_content">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <h5>
                <img src={Icon.Line} className="logo ml_10 mr_10"></img>Privacy
                Policy
              </h5>
              <div>
                <h6>last updated</h6>
                <h5 className="date">{finalDate}</h5>
              </div>
            </div>
            <hr></hr>
            <div className="privacypolicy-paragraph">
              <p className="privacy-policy-text">{policyData?.description}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PrivacyPolicy;
