import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavLink from "react-bootstrap/NavLink";
import "../../../Assets/css/responsive.css";

import { BackGround, Icon, Logo } from "../../../Utilities/Icons";

function SettingHeader() {
  return (
    <Navbar className="headerNav pt_10 pb_15" expand="lg">
      <Container fluid>
        <img alt="myImg" src={Logo.THS} className="logo ml_10"></img>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          className="d-flex justify-content-between"
          style={{ margin: "0px 100px" }}
          id="navbarScroll"
        >
          <Nav
            className="nav-link nav_options my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="active" href="#action1">
              <svg
                width="22"
                height="22"
                className="nav_links_icon"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.39648 2.70602C1.39648 2.22387 1.78735 1.83301 2.2695 1.83301H9.69014C10.1723 1.83301 10.5632 2.22387 10.5632 2.70602V9.69015C10.5632 10.1723 10.1723 10.5632 9.69014 10.5632H2.2695C1.78735 10.5632 1.39648 10.1723 1.39648 9.69015V2.70602ZM3.14252 3.57904V8.81713H8.81712V3.57904H3.14252Z"
                  fill="#9393AA"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.39648 12.3095C1.39648 11.8274 1.78735 11.4365 2.2695 11.4365H9.69014C10.1723 11.4365 10.5632 11.8274 10.5632 12.3095V19.2937C10.5632 19.7758 10.1723 20.1667 9.69014 20.1667H2.2695C1.78735 20.1667 1.39648 19.7758 1.39648 19.2937V12.3095ZM3.14252 13.1826V18.4206H8.81712V13.1826H3.14252Z"
                  fill="#9393AA"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.4355 2.70602C11.4355 2.22387 11.8264 1.83301 12.3086 1.83301H19.7292C20.2114 1.83301 20.6022 2.22387 20.6022 2.70602V9.69015C20.6022 10.1723 20.2114 10.5632 19.7292 10.5632H12.3086C11.8264 10.5632 11.4355 10.1723 11.4355 9.69015V2.70602ZM13.1816 3.57904V8.81713H18.8562V3.57904H13.1816Z"
                  fill="#9393AA"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.4355 12.3095C11.4355 11.8274 11.8264 11.4365 12.3086 11.4365H19.7292C20.2114 11.4365 20.6022 11.8274 20.6022 12.3095V19.2937C20.6022 19.7758 20.2114 20.1667 19.7292 20.1667H12.3086C11.8264 20.1667 11.4355 19.7758 11.4355 19.2937V12.3095ZM13.1816 13.1826V18.4206H18.8562V13.1826H13.1816Z"
                  fill="#9393AA"
                />
              </svg>{" "}
              <span className="nav_links">Dashboard</span>
            </Nav.Link>
            <Nav.Link href="#action2">
              <svg
                width="18"
                height="18"
                className="nav_links_icon"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.83637 2.6266C4.77868 2.56891 4.68514 2.56891 4.62744 2.6266L3.35222 3.90182C2.57858 4.67547 2.36598 5.84786 2.81872 6.84389C4.49857 10.5396 7.46048 13.5015 11.1561 15.1813C12.1522 15.634 13.3246 15.4214 14.0982 14.6478L15.3734 13.3726C15.4311 13.3149 15.4311 13.2213 15.3734 13.1637L13.658 11.4482C13.613 11.4032 13.5443 11.3921 13.4874 11.4205L12.5354 11.8965C11.3629 12.4828 9.94687 12.253 9.01994 11.3261L6.67397 8.98008C5.74705 8.05316 5.51726 6.6371 6.10349 5.46463L6.57951 4.5126C6.60795 4.45573 6.5968 4.38703 6.55184 4.34207L4.83637 2.6266ZM3.33108 1.33024C4.10474 0.556586 5.35908 0.556586 6.13274 1.33024L7.8482 3.0457C8.45116 3.64866 8.60064 4.5698 8.21929 5.33249L7.74328 6.28452C7.50995 6.75118 7.60141 7.31479 7.97034 7.68372L10.3163 10.0297C10.6852 10.3986 11.2488 10.4901 11.7155 10.2567L12.6675 9.78073C13.4302 9.39939 14.3514 9.54887 14.9543 10.1518L16.6698 11.8673C17.4434 12.6409 17.4434 13.8953 16.6698 14.6689L15.3946 15.9442C14.0805 17.2582 12.0892 17.6193 10.3975 16.8503C6.29831 14.987 3.01299 11.7017 1.14972 7.60253C0.380744 5.91078 0.741836 3.91949 2.05586 2.60546L3.33108 1.33024Z"
                  fill="#9393AA"
                />
              </svg>{" "}
              <span className="nav_links">Consultations</span>
            </Nav.Link>
            <Nav.Link href="#action2">
              <svg
                width="22"
                height="22"
                className="nav_links_icon"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.79102 9.62565C7.79102 8.36 8.81703 7.33398 10.0827 7.33398H13.291V9.16732H10.0827C9.82955 9.16732 9.62435 9.37252 9.62435 9.62565C9.62435 9.87878 9.82955 10.084 10.0827 10.084H11.916C13.1817 10.084 14.2077 11.11 14.2077 12.3757C14.2077 13.6413 13.1817 14.6673 11.916 14.6673H8.70768V12.834H11.916C12.1691 12.834 12.3743 12.6288 12.3743 12.3757C12.3743 12.1225 12.1691 11.9173 11.916 11.9173H10.0827C8.81703 11.9173 7.79102 10.8913 7.79102 9.62565Z"
                  fill="#3093BB"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.082 16.0417V13.75H11.9154V16.0417H10.082Z"
                  fill="#3093BB"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.082 8.25065V5.95898H11.9154V8.25065H10.082Z"
                  fill="#3093BB"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.9993 2.75033C6.443 2.75033 2.74935 6.44398 2.74935 11.0003C2.74935 15.5567 6.443 19.2503 10.9993 19.2503C15.5557 19.2503 19.2494 15.5567 19.2494 11.0003C19.2494 6.44398 15.5557 2.75033 10.9993 2.75033ZM0.916016 11.0003C0.916016 5.43145 5.43048 0.916992 10.9993 0.916992C16.5682 0.916992 21.0827 5.43145 21.0827 11.0003C21.0827 16.5692 16.5682 21.0837 10.9993 21.0837C5.43048 21.0837 0.916016 16.5692 0.916016 11.0003Z"
                  fill="#3093BB"
                />
              </svg>{" "}
              <span className="nav_links_active">Payouts</span>
            </Nav.Link>
            <Nav.Link href="#action2">
              <svg
                width="20"
                height="18"
                className="nav_links_icon"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.833984 3.5C0.833984 1.98122 2.0652 0.75 3.58398 0.75H16.4173C17.9361 0.75 19.1673 1.98122 19.1673 3.5V16.3333C19.1673 16.6714 18.9812 16.982 18.6832 17.1415C18.3851 17.3011 18.0235 17.2836 17.7422 17.096L13.8481 14.5H3.58398C2.0652 14.5 0.833984 13.2688 0.833984 11.75V3.5ZM3.58398 2.58333C3.07772 2.58333 2.66732 2.99374 2.66732 3.5V11.75C2.66732 12.2563 3.07772 12.6667 3.58398 12.6667H14.1257C14.3066 12.6667 14.4835 12.7202 14.6341 12.8206L17.334 14.6205V3.5C17.334 2.99374 16.9236 2.58333 16.4173 2.58333H3.58398Z"
                  fill="#9393AA"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.58398 7.62533C3.58398 6.6128 4.4048 5.79199 5.41732 5.79199C6.42984 5.79199 7.25065 6.6128 7.25065 7.62533C7.25065 8.63785 6.42984 9.45866 5.41732 9.45866C4.4048 9.45866 3.58398 8.63785 3.58398 7.62533Z"
                  fill="#9393AA"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.16797 7.62533C8.16797 6.6128 8.98878 5.79199 10.0013 5.79199C11.0138 5.79199 11.8346 6.6128 11.8346 7.62533C11.8346 8.63785 11.0138 9.45866 10.0013 9.45866C8.98878 9.45866 8.16797 8.63785 8.16797 7.62533Z"
                  fill="#9393AA"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.75 7.62533C12.75 6.6128 13.5708 5.79199 14.5833 5.79199C15.5959 5.79199 16.4167 6.6128 16.4167 7.62533C16.4167 8.63785 15.5959 9.45866 14.5833 9.45866C13.5708 9.45866 12.75 8.63785 12.75 7.62533Z"
                  fill="#9393AA"
                />
              </svg>{" "}
              <span className="nav_links">Chat</span>
            </Nav.Link>
          </Nav>
          <div className="d-flex justify-content-between align-items-center">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
            <span className="online_toggle_text">Go online</span>
            <img
              src={BackGround.ProfileImg}
              alt="Avatar"
              className="avatar ml_40"
            ></img>
            <span className="profile_name ml_10">
              Dr John Doe <br />
              <span className="userprofile_subtext">123121</span>
            </span>
            <NavDropdown title="" id="navbarScrollingDropdown">
              <NavLink to="">
                <img
                  src={BackGround.Profile}
                  alt="Avatar"
                  className="dropdown_icon mr_10"
                ></img>
                My Profle
              </NavLink>
              <NavDropdown.Divider />
              <NavLink to="">
                <img
                  src={Icon.Setting}
                  alt="Avatar"
                  className="dropdown_icon mr_10"
                ></img>
                Settings
              </NavLink>
              <NavDropdown.Divider />
              <NavLink to="">
                <img
                  src={Icon.Share}
                  alt="Avatar"
                  className="dropdown_icon mr_10"
                ></img>
                Share Yor Link
              </NavLink>
              <NavDropdown.Divider />
              <NavLink to="">
                <img
                  src={Icon.Notes}
                  alt="Avatar"
                  className="dropdown_icon mr_10"
                ></img>
                Privacy Policy
              </NavLink>
              <NavDropdown.Divider />
              <NavLink to="">
                <img
                  src={Icon.Document}
                  alt="Avatar"
                  className="dropdown_icon mr_10"
                ></img>
                Terms and Conditions
              </NavLink>
              <NavDropdown.Divider />
              <NavLink to="">
                <img
                  src={Icon.Help}
                  alt="Avatar"
                  className="dropdown_icon mr_10"
                ></img>
                Help and Support
              </NavLink>
              <NavDropdown.Divider />
              <NavLink to="">
                <img
                  src={Icon.Logout}
                  alt="Avatar"
                  className="dropdown_icon mr_10"
                ></img>
                Logout
              </NavLink>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SettingHeader;
