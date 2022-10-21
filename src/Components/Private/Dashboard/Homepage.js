import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { BackGround, Icon } from "../../../Utilities/Icons";
import DoctorStatus from "./DoctorStatus";
import { useDispatch, useSelector } from "react-redux";
import LatestConsultation from "./LatestConsultation";
import { GetAnalytics } from "../../../Store/Reducers/CommonReducer";

function Home() {
  const { userProfile } = useSelector(({ ProfileSlice }) => ProfileSlice);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Container
        fluid
        style={{
          background: "#f8fbff",
          padding: "0 100px 30px 100px",
          minHeight: "100vh",
        }}
        className="dashboard"
      >
        <h4 className="pt_30 mb_20">Dashboard</h4>
        <DashboardCounts />
        {userProfile?.is_active === 1 ? (
          <LatestConsultation />
        ) : (
          <DoctorStatus />
        )}
      </Container>
    </>
  );
}

const DashboardCounts = () => {
  const dispatch = useDispatch();
  const { analytics } = useSelector(({ CommonSlice }) => CommonSlice);
  useEffect(() => {
    dispatch(GetAnalytics());

    return () => {};
  }, []);

  return (
    <Card className="cards-layout" style={{ background: "#f8fbff" }}>
      <Card.Body className="card-body">
        <i
          class="fa fa-question-circle-o float-right consult"
          style={{ color: "#ABB7C9" }}
          aria-hidden="true"
        ></i>
        <img src={Icon.Face} alt="Avatar" class="ml_15 mt_15 mb_5 "></img>
        <Card.Title className="card_dynamicnum pt_10">
          {analytics?.total_consultations}
        </Card.Title>
        <Card.Text className="texts">Total Consultations</Card.Text>
      </Card.Body>
      <Card.Body className="card-body">
        <i
          class="fa fa-question-circle-o float-right"
          style={{ color: "#ABB7C9" }}
          aria-hidden="true"
        ></i>
        <img
          src={Icon.CalenderCross}
          alt="Avatar"
          class="ml_15 mt_15 mb_5"
        ></img>
        <Card.Title className="card_dynamicnum pt_10">
          {analytics?.total_canceled_consultations}
        </Card.Title>
        <Card.Text className="texts">Cancelled Consultations</Card.Text>
      </Card.Body>
      <Card.Body className="card-body">
        <i
          class="fa fa-question-circle-o float-right"
          style={{ color: "#ABB7C9" }}
          aria-hidden="true"
        ></i>
        <img src={Icon.Dollor} alt="Avatar" class="ml_15 mt_15 mb_5"></img>
        <Card.Title className="card_dynamicnum pt_10">
          {analytics?.total_revenue}
        </Card.Title>
        <Card.Text className="texts">Total Revenue</Card.Text>
      </Card.Body>
      <Card.Body className="card-body">
        <i
          class="fa fa-question-circle-o float-right"
          style={{ color: "#ABB7C9" }}
          aria-hidden="true"
        ></i>
        <img src={Icon.Dollor} alt="Avatar" class="ml_15 mt_15 mb_5"></img>
        <Card.Title className="card_dynamicnum pt_10">
          {analytics?.current_month_revenue}
        </Card.Title>
        <Card.Text className="texts">Current Month Revenue</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Home;
