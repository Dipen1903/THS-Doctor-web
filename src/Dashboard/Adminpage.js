import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Adminpage() {
  return (
    <>
      <Container fluid style={{ background: "#f8fbff", padding: "0px 100px" }} className="dashboard">
        <h4 className="mt_30 mb_20">Dashboard</h4>
        <Card className="cards-layout" style={{ background: "#f8fbff" }}>
          <Card.Body className="card-body">
          <i class="fa fa-question-circle-o float-right consult" style={{color:"#ABB7C9"}} aria-hidden="true" ></i>
          <img src={require('../Assets/img/totalconsultations.png')} alt="Avatar" class="ml_15 mt_15 mb_5 "></img>
            <Card.Title className="card_dynamicnum pt_10">0</Card.Title>
            <Card.Text className="texts">Total Consultations</Card.Text>
          </Card.Body>
          <Card.Body className="card-body">
          <i class="fa fa-question-circle-o float-right" style={{color:"#ABB7C9"}} aria-hidden="true" ></i>
          <img src={require('../Assets/img/cancelconsultaion.png')} alt="Avatar" class="ml_15 mt_15 mb_5"></img>
            <Card.Title className="card_dynamicnum pt_10">0</Card.Title>
            <Card.Text className="texts">Cancelled Consultations</Card.Text>
          </Card.Body>
          <Card.Body className="card-body">
          <i class="fa fa-question-circle-o float-right" style={{color:"#ABB7C9"}} aria-hidden="true" ></i>
          <img src={require('../Assets/img/totalrevenue.png')} alt="Avatar" class="ml_15 mt_15 mb_5"></img>
            <Card.Title className="card_dynamicnum pt_10">0</Card.Title>
            <Card.Text className="texts">Total Revenue</Card.Text>
          </Card.Body>
          <Card.Body className="card-body">
          <i class="fa fa-question-circle-o float-right" style={{color:"#ABB7C9"}} aria-hidden="true" ></i>
          <img src={require('../Assets/img/cureentmonthrevenue.png')} alt="Avatar" class="ml_15 mt_15 mb_5"></img>
            <Card.Title className="card_dynamicnum pt_10">0</Card.Title>
            <Card.Text className="texts">Current Month Revenue</Card.Text>
          </Card.Body>
        </Card>

        <div className="admin-bottom-content">
          <div class="d-block justify-content-center text-center">
            <img src={require('../Assets/img/messageicon.png')} alt="Avatar" class="avatar2 mt_100 mb_5"></img>
              <h4 class="welcome-text mt_20">
                  Welcome to <br/>
                  THS’s growing Doctors Community
              </h4>
          </div>
          <div className="row mt_20"> 
            <div className="col-md-12">
              <center>
                <h3 className="medical-text mt_21">
                  Our Medical Expert will check and confirm
                  <br />
                  about your profile within 2-3 business days.
                </h3>
                <h3 className="profile-bottom-text mt_15">
                  Once profile verificatin completed, you will get online
                  consultaion requests.
                </h3>
              </center>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Adminpage;
