import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
import { useDispatch, useSelector } from "react-redux";
import { HelpsSupports } from "../../../Store/Reducers/ProfileReducer";

function HelpAndSupport() {
  const dispatch = useDispatch();

  const [helpData, setHelpData] = useState([]);

  const helpsApiCall = (values) => {
    dispatch(HelpsSupports({})).then((res) => {
      if (res.payload.status_code === 200) {
        setHelpData(res.payload.data);
      }
    });
  };

  useEffect(() => {
    helpsApiCall();
  }, []);

  return (
    <>
      <Container fluid className="support_container">
        <h2 className="support_title mb_10 mt_20">Supports</h2>
        <div className="support_card_box mt_20">
          <div className="support_content">
            <div className="support_top_heading_card d-flex justify-content-between align-items-center flex-wrap">
              <h5>
                <img src={Icon.supportline} className="logo ml_10 mr_10"></img>
                Supports
              </h5>
              <div className="search support-search">
                <form className="form-inline d-flex justify-content-start align-items-center">
                  <img src={Icon.Search} className="payout_search"></img>
                  <input
                    className="form-control mr-sm-2 border-0 ml_5 pl_35"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>
              </div>
            </div>
            <hr></hr>
            <h1 className="faq-text">frequently asked questions (FAQs)</h1>
            <div className="support-paragraph pt_20">
              <Accordion defaultActiveKey="0">
                {helpData.length > 0 &&
                  helpData.map((item, i) => {
                    return (
                      <Accordion.Item eventKey={i}>
                        <Accordion.Header className="support-accordion-header">
                          <span className="bullets mr_20"></span>
                          {item.title}
                        </Accordion.Header>
                        <Accordion.Body className="support-accordion-body-text">
                          {item.description}
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })}
              </Accordion>
            </div>
            <div className="support_bootom_card d-flex justify-content-start align-items-center flex-wrap">
              <div className="col-md-3">
                <p className="support_result_text">
                  Cant find what you are looking for?
                </p>
              </div>
              <div className="mr_10 ml_10">
                <h6>Call us</h6>
                <h5 className="">91231231112</h5>
              </div>
              <div className="mr_10 ml_10">
                <h6>Email us</h6>
                <h5 className="">ths@gmail.com</h5>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default HelpAndSupport;
