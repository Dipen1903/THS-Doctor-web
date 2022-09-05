import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
import { TermsConditions } from "../../../Store/Reducers/ProfileReducer";

function TermsAndConditions() {
  const dispatch = useDispatch();

  const [termsData, setTermsData] = useState({});
  const [updatedDate, setupdatedDate] = useState();
  const [finalDate, setFinalDate] = useState("");

  const termsAndConditionsApiCall = (values) => {
    dispatch(TermsConditions({})).then((res) => {
      if (res.payload.status_code === 200) {
        setTermsData(res.payload.data);
        setupdatedDate(res?.payload?.data?.updated_at);
      }
    });
  };

  useEffect(() => {
    termsAndConditionsApiCall();
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
      <Container fluid className="termscondition_container">
        <h2 className="terms_condition_title mb_10 mt_20">
          Terms & Conditions
        </h2>
        <div className="termscondition_card_box mt_20">
          <div className="terms_condition_content">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <h5>
                <img
                  src={Icon.Termsconditionline}
                  className="logo ml_10 mr_10"
                ></img>
                Terms & Conditions
              </h5>
              <div>
                <h6>last updated</h6>
                <h5 className="date">{finalDate}</h5>
              </div>
            </div>
            <hr></hr>
            <div className="termscondition-paragraph">
              <p className="terms-condition-text">{termsData?.description}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default TermsAndConditions;
