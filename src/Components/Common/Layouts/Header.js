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
        <img src={Logo.THS_SHORT} class="logo ml_10"></img>
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
            <Nav.Link>
              <NavLink to="/dashboard">
                <i class="fa fa-tachometer" aria-hidden="true"></i>
                &nbsp;&nbsp;&nbsp;Dashboard
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/consultations">
                <i class="fa fa-phone" aria-hidden="true"></i>
                &nbsp;&nbsp;&nbsp;Consultations
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/payout">
                {" "}
                <i class="fa fa-usd" aria-hidden="true"></i>
                &nbsp;&nbsp;&nbsp;Payouts
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/chat">
                <i class="fa fa-commenting-o" aria-hidden="true"></i>
                &nbsp;&nbsp;&nbsp;Chats
              </NavLink>
            </Nav.Link>
          </Nav>
          <div className="d-flex justify-content-between align-items-center">
            <label class="switch">
              <input type="checkbox" />
              <span class="slider round"></span>
            </label>
            <span className="go_online ml_10 mt_5">Go online</span>
            <img
              src={userProfile?.image || BackGround.Profile}
              alt="Avatar"
              class="avatar ml_40"
            ></img>

            <NavDropdown
              title={
                <span className="profile_name ml_10">{userProfile?.name}</span>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item>
                <NavLink className="dropdown-item-link" to="/profile">
                  <img src={Icon.User} alt="Avatar" class=" mr_10 "></img>My
                  Profle
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <NavLink className="dropdown-item-link" to="settings">
                  <img src={Icon.Setting} alt="Avatar" class=" mr_10"></img>
                  Settings
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <NavLink className="dropdown-item-link" to="share">
                  <img src={Icon.Share} alt="Avatar" class=" mr_10"></img>
                  Share Yor Link
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <NavLink className="dropdown-item-link" to="privacy">
                  <img src={Icon.Notes} alt="Avatar" class="mr_10"></img>
                  Privacy Policy
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <NavLink className="dropdown-item-link" to="terms">
                  <img src={Icon.Document} alt="Avatar" class=" mr_10"></img>
                  Terms and Conditions
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <NavLink className="dropdown-item-link" to="help">
                  <img src={Icon.Help} alt="Avatar" class="mr_10"></img>
                  Help and Support
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <NavLink
                  className="dropdown-item-link"
                  to="logout"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeSession());
                  }}
                >
                  <img src={Icon.Logout} alt="Avatar" class="mr_10"></img>
                  Logout
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
