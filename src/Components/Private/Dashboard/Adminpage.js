import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { BackGround, Icon } from "../../../Utilities/Icons";
import DoctorStatus from "./DoctorStatus";

function Adminpage() {
  return (
    <>
      <Container
        fluid
        style={{ background: "#f8fbff", padding: "0px 100px" }}
        className="dashboard"
      >
        <h4 className="pt_30 mb_20">Dashboard</h4>
        <Card className="cards-layout" style={{ background: "#f8fbff" }}>
          <Card.Body className="card-body">
            <i
              class="fa fa-question-circle-o float-right consult"
              style={{ color: "#ABB7C9" }}
              aria-hidden="true"
            ></i>
            <img src={Icon.Face} alt="Avatar" class="ml_15 mt_15 mb_5 "></img>
            <Card.Title className="card_dynamicnum pt_10">0</Card.Title>
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
            <Card.Title className="card_dynamicnum pt_10">0</Card.Title>
            <Card.Text className="texts">Cancelled Consultations</Card.Text>
          </Card.Body>
          <Card.Body className="card-body">
            <i
              class="fa fa-question-circle-o float-right"
              style={{ color: "#ABB7C9" }}
              aria-hidden="true"
            ></i>
            <img src={Icon.Dollor} alt="Avatar" class="ml_15 mt_15 mb_5"></img>
            <Card.Title className="card_dynamicnum pt_10">0</Card.Title>
            <Card.Text className="texts">Total Revenue</Card.Text>
          </Card.Body>
          <Card.Body className="card-body">
            <i
              class="fa fa-question-circle-o float-right"
              style={{ color: "#ABB7C9" }}
              aria-hidden="true"
            ></i>
            <img src={Icon.Dollor} alt="Avatar" class="ml_15 mt_15 mb_5"></img>
            <Card.Title className="card_dynamicnum pt_10">0</Card.Title>
            <Card.Text className="texts">Current Month Revenue</Card.Text>
          </Card.Body>
        </Card>

        <DoctorStatus />
      </Container>
    </>
  );
}

export default Adminpage;
