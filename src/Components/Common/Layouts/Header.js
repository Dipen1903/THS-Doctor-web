import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
import { removeSession } from "../../../Store/Reducers/AuthSlice";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  GetUserProfile,
  ToggleLiveStatus,
} from "../../../Store/Reducers/ProfileReducer";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { setMessage } from "../../../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../../../Utilities/Enums";
import { ErrorMessage, Formik } from "formik";
import { ShareLinkSchema } from "../../../Utilities/Schema";
import { ShareLink } from "../../../Store/Reducers/CommonReducer";

function Header() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(({ ProfileSlice }) => ProfileSlice);

  const [showModal2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

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
            <NavLink className="nav-link" to="/dashboard">
              <i class="fa fa-tachometer" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;Dashboard
            </NavLink>

            <NavLink className="nav-link" to="/consultation">
              <i class="fa fa-phone" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;Consultations
            </NavLink>

            <NavLink className="nav-link" to="/payouts">
              {" "}
              <i class="fa fa-usd" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;Payouts
            </NavLink>

            <NavLink className="nav-link" to="/chat">
              <i class="fa fa-commenting-o" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;Chats
            </NavLink>
          </Nav>
          <div className="d-flex justify-content-between align-items-center">
            <label class="switch">
              <input
                type="checkbox"
                checked={userProfile?.is_online}
                onChange={() =>
                  dispatch(
                    ToggleLiveStatus({
                      is_online: userProfile?.is_online ? 0 : 1,
                    })
                  )
                }
              />
              <span class="slider round"></span>
            </label>
            <span className="go_online ml_10 mt_5">
              {userProfile?.is_online ? "online" : "offline"}
            </span>
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
              <NavLink
                className="dropdown-item-link"
                to={userProfile?.is_active !== 1 ? "#!" : "/profile"}
              >
                <NavDropdown.Item
                  disabled={userProfile?.is_active !== 1}
                  href="/profile"
                >
                  <img src={Icon.User} alt="Avatar" class=" mr_10 "></img>My
                  Profle
                </NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink
                className="dropdown-item-link"
                to={userProfile?.is_active !== 1 ? "#!" : "/settings"}
              >
                <NavDropdown.Item
                  disabled={userProfile?.is_active !== 1}
                  href="/settings"
                >
                  <img src={Icon.Setting} alt="Avatar" class=" mr_10"></img>
                  Settings
                </NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink className="dropdown-item-link" to="#!">
                <NavDropdown.Item
                  disabled={userProfile?.is_active !== 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handleShow2();
                  }}
                >
                  <img src={Icon.Share} alt="Avatar" class=" mr_10"></img>
                  Share Your Link
                </NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink className="dropdown-item-link" to="/privacy">
                <NavDropdown.Item href="/privacy">
                  <img src={Icon.Notes} alt="Avatar" class="mr_10"></img>
                  Privacy Policy
                </NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink className="dropdown-item-link" to="/terms">
                <NavDropdown.Item href="/terms">
                  <img src={Icon.Document} alt="Avatar" class=" mr_10"></img>
                  Terms and Conditions
                </NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink className="dropdown-item-link" to="/help">
                <NavDropdown.Item href="/help">
                  <img src={Icon.Help} alt="Avatar" class="mr_10"></img>
                  Help and Support
                </NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink className="dropdown-item-link" to="#!">
                <NavDropdown.Item disabled={userProfile?.is_active !== 1}>
                  <img src={Icon.Logout} alt="Avatar" class="mr_10"></img>
                  Delete My Account
                </NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink
                className="dropdown-item-link"
                to="logout"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(removeSession());
                }}
              >
                <NavDropdown.Item>
                  <img src={Icon.Logout} alt="Avatar" class="mr_10"></img>
                  Logout
                </NavDropdown.Item>
              </NavLink>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
      {showModal2 && <ShareYourLink show={showModal2} onHide={handleClose2} />}
    </Navbar>
  );
}

const ShareYourLink = (props) => {
  const dispatch = useDispatch();
  async function copyToClipboard(copyMe) {
    try {
      await navigator.clipboard.writeText(copyMe);
      dispatch(setMessage({ text: "Link Copied!", type: AlertEnum.Success }));
    } catch (err) {
      dispatch(setMessage({ text: "Failed to copy!", type: AlertEnum.Error }));
    }
  }
  return (
    <Modal {...props} className="sharelink-popup-body" centered>
      <Modal.Header className="sharelink-modal-header">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="sharelink-modal-text"
        >
          Share Your Consultation link
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          link: "",
          mobile_number: "",
        }}
        validationSchema={ShareLinkSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(ShareLink(values)).then((res) => {
            if (res?.payload?.success) {
              props.onHide();
              resetForm();
            }
          });
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form className="share-form" onSubmit={handleSubmit}>
            <Modal.Body className="sharelink-modal-body-text">
              <label className="share_label">Link</label>
              <InputGroup className="share-your-sec mb-2">
                <Form.Control
                  name="link"
                  id="link"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.link}
                />
                {values?.link && (
                  <Button
                    onClick={() => {
                      copyToClipboard(values?.link);
                    }}
                    id="basic-addon2"
                  >
                    <img src={Icon.Link} />
                    Copy Link
                  </Button>
                )}
              </InputGroup>
              <ErrorMessage
                render={(childern) => <div className="error">{childern}</div>}
                name="link"
              />
              <div class="row">
                <div class="col-md-12 mt_30">
                  <label className="share_label">Enter Mobile Number</label>
                  <InputGroup className="share-your-sec mb-2">
                    {" "}
                    <Form.Control
                      name="mobile_number"
                      id="mobile_number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.mobile_number}
                    />
                  </InputGroup>
                  <ErrorMessage
                    render={(childern) => (
                      <div className="error">{childern}</div>
                    )}
                    name="mobile_number"
                  />
                </div>
              </div>
              <p className="consultationlink error-message mt-3">
                Consultation link will be send on above number.
              </p>
            </Modal.Body>
            <Modal.Footer className="consultation-modal-footer">
              <div className="d-flex">
                <Button className="close_btn" onClick={props.onHide}>
                  Cancel
                </Button>
                <Button className="verify_btn" type="submit" variant="primary">
                  Submit
                </Button>
              </div>
            </Modal.Footer>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default Header;
