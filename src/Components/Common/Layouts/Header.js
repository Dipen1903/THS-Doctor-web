import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
import { removeSession } from "../../../Store/Reducers/AuthSlice";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { GetUserProfile } from "../../../Store/Reducers/ProfileReducer";

function Header() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(({ ProfileSlice }) => ProfileSlice);
  useEffect(() => {
    if (!userProfile) dispatch(GetUserProfile());
    return () => {};
  }, [userProfile]);

  return (
    <Navbar className="headerNav pt_10 pb_15  " expand="lg">
      <Container fluid>
        <img src={Logo.THS} class="logo ml_10"></img>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          className="d-flex justify-content-between"
          style={{ margin: "0px 100px" }}
          id="navbarScroll"
        >
          <Nav
            className="nav-link me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="active" href="#action1">
              <i class="fa fa-tachometer" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;Dashboard
            </Nav.Link>
            <Nav.Link href="#action2">
              <i class="fa fa-phone" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;Consultations
            </Nav.Link>
            <Nav.Link href="#action2">
              {" "}
              <i class="fa fa-usd" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;Payouts
            </Nav.Link>
            <Nav.Link href="#action2">
              <i class="fa fa-commenting-o" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;Chats
            </Nav.Link>
          </Nav>
          <div className="d-flex justify-content-between align-items-center">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
            <span className="go_online ml_10 mt_5">Go online</span>
            <img
              src={BackGround.Profile}
              alt="Avatar"
              class="avatar ml_40"
            ></img>

            <NavDropdown
              title={<span className="profile_name ml_10">Dr John Doe</span>}
              id="navbarScrollingDropdown"
            >
              <NavLink to="/details/personal-work">
                <img src={Icon.User} alt="Avatar" class=" mr_10 "></img>My
                Profle
              </NavLink>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                <img src={Icon.Setting} alt="Avatar" class=" mr_10"></img>
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                <img src={Icon.Share} alt="Avatar" class=" mr_10"></img>
                Share Yor Link
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                <img src={Icon.Notes} alt="Avatar" class="mr_10"></img>
                Privacy Policy
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                <img src={Icon.Document} alt="Avatar" class=" mr_10"></img>
                Terms and Conditions
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                <img src={Icon.Help} alt="Avatar" class="mr_10"></img>
                Help and Support
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(removeSession());
                }}
              >
                <img src={Icon.Logout} alt="Avatar" class="mr_10"></img>
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
