import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Header from "./Header";
import Button from 'react-bootstrap/Button';
function Setuppayment() {
  return (
    <>
    <Header/>
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
     <img src="" alt="" />
     <div class="row text-center">
       <div class="col-md-12">
      <center> <img src={require('../Assets/img/img_skip.png')} alt="Avatar" class="avatar3 mt_60"></img></center>
         <h4 class="welcome-text mt_20 joincommnity">
         Join THS's Growing Doctors Community
         </h4>
       </div>
     </div>
     <div className="row mt_10">
       <div className="col-md-12">
         <center>
           <h3 className="medical-text text-danger pleasefill">
           Please fill out your profile and verify your
           identity before starting. Thanks!
           </h3>
           <h3 className="profile-bottom-text mt_10">
             Once profile verificatin completed, you will get online
             consultaion requests.
           </h3>
           <button class="profile_btn mt_10 mb_100">Set up Schedule & Payment</button>
         </center>
       </div>
     </div>
   </div>
 </Container>
    </>
  )
}

export default Setuppayment