import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <Navbar className="headerNav pt_10 pb_15  " expand="lg">
      <Container fluid>
      <img src={require('../Assets/img/header-logo.png')} class="logo ml_10"></img>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse className="d-flex justify-content-between"  style={{ margin: "0px 100px" }} id="navbarScroll">
          <Nav
            className="nav-link me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="active" href="#action1"><i class="fa fa-tachometer" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Dashboard</Nav.Link>
            <Nav.Link href="#action2"><i class="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Consultations</Nav.Link>
            <Nav.Link href="#action2">  <i class="fa fa-usd" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Payouts</Nav.Link>
            <Nav.Link href="#action2"><i class="fa fa-commenting-o" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Chats</Nav.Link>
          </Nav>
          <div className="d-flex justify-content-between align-items-center">
          <label class="switch">
          <input type="checkbox"/>
          <span class="slider round"></span>
        </label>
        <span className="go_online ml_10 mt_5">Go online</span>
      <img src={require('../Assets/img/profile.png')} alt="Avatar" class="avatar ml_40"></img>
      <span className="profile_name ml_10">Dr John Doe</span>
            <NavDropdown title="" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3"><img src={require('../Assets/img/My Profile.png')} alt="Avatar" class="avatar2 mr_10 "></img>My Profle</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#"><img src={require('../Assets/img/Settings.png')} alt="Avatar" class="avatar2 mr_10"></img>
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#"><img src={require('../Assets/img/Change Password.png')} alt="Avatar" class="avatar2 mr_10"></img>
              Share Yor Link
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#"><img src={require('../Assets/img/Privacy and Policy.png')} alt="Avatar" class="avatar2 mr_10"></img>
              Privacy Policy
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#"><img src={require('../Assets/img/Terms and Conditions.png')} alt="Avatar" class="avatar2 mr_10"></img>
            Terms and Conditions
          </NavDropdown.Item>
          <NavDropdown.Divider />
        <NavDropdown.Item href="#"><img src={require('../Assets/img/Help & Support.png')} alt="Avatar" class="avatar2 mr_10"></img>
          Help and Support
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#"><img src={require('../Assets/img/logout.png')} alt="Avatar" class="avatar2 mr_10"></img>
          Logout
        </NavDropdown.Item>

            </NavDropdown>
      </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
