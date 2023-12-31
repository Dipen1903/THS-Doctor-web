import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
import {
  DeleteAccount,
  removeSession,
} from "../../../Store/Reducers/AuthSlice";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  reset,
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

  const [showLink, setShowLink] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const handleClose = () => setShowLink(false);
  const handleShow = () => setShowLink(true);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Navbar className="headerNav pt_10 pb_15  " expand="lg">
      <Container fluid>
        <img alt="myImg" src={Logo.THS_SHORT} className="logo ml_10"></img>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          className="justify-content-between"
          style={{ margin: "0px 100px" }}
          id="navbarScroll"
        >
          <Nav
            className="nav-link me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/dashboard">
              <i className="fa fa-tachometer" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;Dashboard
            </NavLink>

            <NavLink className="nav-link" to="/consultation">
              <i className="fa fa-phone" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;Consultations
            </NavLink>

            <NavLink className="nav-link" to="/payouts">
              {" "}
              <i className="fa fa-inr" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;Payouts
            </NavLink>

            <NavLink className="nav-link" to="/chat">
              <i className="fa fa-commenting-o" aria-hidden="true"></i>
              &nbsp;&nbsp;&nbsp;Chats
            </NavLink>
          </Nav>
          <div className="d-flex  align-items-center">
            <label className="switch">
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
              <span className="slider round"></span>
            </label>
            {userProfile?.is_online ? (
              <span className="go_online ml_10 mt_5">Online</span>
            ) : (
              <span className="go_offline ml_10 mt_5">Offline</span>
            )}
            <img
              src={userProfile?.image || BackGround.Profile}
              alt="Avatar"
              className="avatar ml_40"
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
                  <img src={Icon.User} alt="Avatar" className=" mr_10 "></img>
                  My Profile
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
                  <img src={Icon.Setting} alt="Avatar" className=" mr_10"></img>
                  Settings
                </NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink className="dropdown-item-link"
                to={userProfile?.is_active !== 1 ? "#!" : "/sharelink"}
              >
                <NavDropdown.Item
                  disabled={userProfile?.is_active !== 1}
                  href="/sharelink"
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   handleShow();
                  // }}
                >
                  <img src={Icon.Share} alt="Avatar" className=" mr_10"></img>
                  Share Your Link
                </NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink className="dropdown-item-link" to="/privacy">
                <NavDropdown.Item href="/privacy">
                  <img src={Icon.Notes} alt="Avatar" className="mr_10"></img>
                  Privacy Policy
                </NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink className="dropdown-item-link" to="/terms">
                <NavDropdown.Item href="/terms">
                  <img
                    src={Icon.Document}
                    alt="Avatar"
                    className=" mr_10"
                  ></img>
                  Terms and Conditions
                </NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink className="dropdown-item-link" to="/help">
                <NavDropdown.Item href="/help">
                  <img src={Icon.Help} alt="Avatar" className="mr_10"></img>
                  Help and Support
                </NavDropdown.Item>
              </NavLink>
              <NavDropdown.Divider />
              <NavLink className="dropdown-item-link" to="#!">
                <NavDropdown.Item
                  disabled={userProfile?.is_active !== 1}
                  onClick={() => setIsConfirm(true)}
                >
                  <img src={Icon.Logout} alt="Avatar" className="mr_10"></img>
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
                  dispatch(reset());
                }}
              >
                <NavDropdown.Item>
                  <img src={Icon.Logout} alt="Avatar" className="mr_10"></img>
                  Logout
                </NavDropdown.Item>
              </NavLink>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
      {showLink && <ShareYourLink show={showLink} onHide={handleClose} />}
      {isConfirm && (
        <Confirm
          show={isConfirm}
          onHide={() => setIsConfirm(false)}
          onConfirm={() => {
            dispatch(DeleteAccount());
          }}
        />
      )}
    </Navbar>
  );
}

const Confirm = (props) => {
  return (
    <Modal {...props} className="sharelink-popup-body" centered>
      <Modal.Header className="sharelink-modal-header">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="sharelink-modal-text"
        >
          Are you sure?
          <p className="consultationlink error-message mt-3">
            You will not able to re-gain any data after deletion!
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer className="consultation-modal-footer">
        <div className="d-flex">
          <Button className="close_btn" onClick={props.onHide}>
            No
          </Button>
          <Button
            className="verify_btn"
            type="button"
            onClick={() => props?.onConfirm()}
            variant="primary"
          >
            Yes
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
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
          link: "https://thsindia.in/patient/",
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
                    <img alt="myImg" src={Icon.Link} />
                    Copy Link
                  </Button>
                )}
              </InputGroup>
              <ErrorMessage
                render={(childern) => <div className="error">{childern}</div>}
                name="link"
              />
              <div className="row">
                <div className="col-md-12 mt_30">
                  <label className="share_label">Enter Mobile Number</label>
                  <InputGroup className="share-your-sec mb-2">
                    {" "}
                    <Form.Control
                      type="text"
                      name="mobile_number"
                      id="mobile_number"
                      min={0}
                      maxLength={10}
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
