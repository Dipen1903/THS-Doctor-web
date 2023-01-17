import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { BackGround, Icon } from "../../../Utilities/Icons";
import DoctorStatus from "./DoctorStatus";
import { useDispatch, useSelector } from "react-redux";
import LatestConsultation from "./LatestConsultation";
import { GetAnalytics } from "../../../Store/Reducers/CommonReducer";
import { Link } from "react-router-dom";
import TotalConsultation from "./AnalyticsDetails/TotalConsultation";
import CanceledConsultation from "./AnalyticsDetails/CanceledConsultation";
import TotalRevenue from "./AnalyticsDetails/TotalRevenue";
import MonthlyRevenue from "./AnalyticsDetails/MonthlyRevenue";

function Home() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(({ ProfileSlice }) => ProfileSlice);
  const { analytics } = useSelector(({ CommonSlice }) => CommonSlice);
  useEffect(() => {
    !analytics && dispatch(GetAnalytics());
    return () => {};
  }, [analytics]);
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
        <DashboardCounts analytics={analytics} />

        {userProfile?.is_active === 1 ? (
          <LatestConsultation />
        ) : (
          <DoctorStatus />
        )}
      </Container>
    </>
  );
}

const DashboardCounts = ({ analytics }) => {
  const [totalConsultModal, setTotalConsultmodal] = useState(false);
  const [cancelConsultModal, setCanelConsultmodal] = useState(false);
  const [totalRevenueModal, setTotalRevenueModal] = useState(false);
  const [monthlyRevenueModal, setMonthlyRevenueModal] = useState(false);
  return (
    <Card className="cards-layout" style={{ background: "#f8fbff" }}>
      <TotalConsultation
        show={totalConsultModal}
        onHide={() => setTotalConsultmodal(false)}
      />
      <Card.Body
        className="card-body"
        onClick={() => {
          setTotalConsultmodal(true);
        }}
      >
        <img src={Icon.Face} alt="Avatar" className=" mt_15 mb_5"></img>
        <Card.Title className="card_dynamicnum pt_10">
          {analytics?.total_consultations}
        </Card.Title>
        <Card.Text className="texts">Total Consultations</Card.Text>
      </Card.Body>
      <CanceledConsultation
        show={cancelConsultModal}
        onHide={() => setCanelConsultmodal(false)}
      />
      <Card.Body
        className="card-body"
        onClick={() => {
          setCanelConsultmodal(true);
        }}
      >
        <img
          src={Icon.CalenderCross}
          alt="Avatar"
          className=" mt_15 mb_5"
        ></img>
        <Card.Title className="card_dynamicnum pt_10">
          {analytics?.total_canceled_consultations}
        </Card.Title>
        <Card.Text className="texts">Cancelled Consultations</Card.Text>
      </Card.Body>
      <TotalRevenue
        show={totalRevenueModal}
        onHide={() => setTotalRevenueModal(false)}
      />
      <Card.Body
        className="card-body"
        onClick={() => setTotalRevenueModal(true)}
      >
        <img src={Icon.ChartRound} alt="Avatar" className="mt_15 mb_5"></img>
        <Card.Title className="card_dynamicnum pt_10">
          {analytics?.total_revenue}
        </Card.Title>
        <Card.Text className="texts">Total Revenue</Card.Text>
      </Card.Body>
      <MonthlyRevenue
        show={monthlyRevenueModal}
        onHide={() => setMonthlyRevenueModal(false)}
      />
      <Card.Body
        className="card-body"
        onClick={() => setMonthlyRevenueModal(true)}
      >
        <img src={Icon.ChartRound} alt="Avatar" className="mt_15 mb_5"></img>
        <Card.Title className="card_dynamicnum pt_10">
          {analytics?.current_month_revenue}
        </Card.Title>
        <Card.Text className="texts">Current Month Revenue</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Home;
