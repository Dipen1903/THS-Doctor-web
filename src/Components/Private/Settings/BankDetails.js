import React from "react";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Accordion from "react-bootstrap/Accordion";
import { Button, Modal, Dropdown, DropdownButton } from "react-bootstrap";
import FormControl from "../../Common/Forms/FormControl";
import { BackGround, Icon, Logo } from "../../../Utilities/Icons";
// import Header from "../Dashboard/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditBankDetails } from "../../../Store/Reducers/ProfileReducer";

function Bankdetails() {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { userProfile } = useSelector(({ ProfileSlice }) => ProfileSlice);
  const [bankDetails, setBankDetails] = useState({
    account_holder_name: "",
    account_number: "",
    ifsc_code: "",
    upi_id: "",
  });

  const intialSetup = () => {
    try {
      let tempData = { ...bankDetails };
      tempData.account_holder_name =
        userProfile?.bank_details?.account_holder_name;
      tempData.account_number = userProfile?.bank_details?.account_number;
      tempData.ifsc_code = userProfile?.bank_details?.ifsc_code;
      tempData.upi_id = userProfile?.bank_details?.upi_id;
      setBankDetails(tempData);
    } catch (error) {}
  };

  useEffect(() => {
    intialSetup();
    return () => {};
  }, [userProfile]);

  return (
    <>
      <Container fluid>
        <div className="row settingscards_box">
          <div className="col-md-12">
            <div className="setting_profile_card_head">
              <div className="d-flex">
                <div className="col-md-6">
                  <h3 className="setting_bank_title">Bank Details</h3>
                </div>
                <div className="col-md-6 ml_10">
                  {!edit && (
                    <Button
                      onClick={() => setEdit(true)}
                      variant="primary"
                      className="setting_profile_btn float_right"
                    >
                      <svg
                        className="setting_profile_btn_icon"
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.7434 1.07709C12.0689 0.751649 12.5965 0.751649 12.922 1.07709L15.422 3.57709C15.7474 3.90252 15.7474 4.43016 15.422 4.7556L5.42196 14.7556C5.31516 14.8624 5.18134 14.9382 5.03481 14.9748L1.70148 15.8081C1.4175 15.8791 1.11709 15.7959 0.910111 15.5889C0.703127 15.3819 0.61992 15.0815 0.690915 14.7976L1.52425 11.4642C1.56088 11.3177 1.63665 11.1839 1.74344 11.0771L11.7434 1.07709ZM3.08517 12.0924L2.64467 13.8544L4.40666 13.4139L13.6542 4.16634L12.3327 2.84485L3.08517 12.0924Z"
                          fill="#3093BB"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.3327 18.3327H0.666016V16.666H17.3327V18.3327Z"
                          fill="#3093BB"
                        />
                      </svg>
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="setting_profile_card_body">
              <div className="row">
                <Formik
                  enableReinitialize
                  initialValues={bankDetails}
                  onSubmit={(values) =>
                    dispatch(EditBankDetails(values)).then((res) => {
                      if (res.payload.success) {
                        setEdit(false);
                      }
                    })
                  }
                >
                  {({ values, setFieldValue, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit} id="myForm">
                      <div className="col-md-6">
                        <div class="row">
                          <div class="col-md-12 mt_20">
                            <label className="sign_title">
                              {" "}
                              Account Holder Name{" "}
                            </label>
                            <div class="input_box">
                              <div class="form_group">
                                {/* <input type="text" name="account_name" placeholder="" value="John doe" /> */}
                                <FormControl
                                  control="input"
                                  type="text"
                                  name="account_holder_name"
                                  id="account_holder_name"
                                  // label="Account Holder Name"
                                  disabled={!edit}
                                  // onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values?.account_holder_name}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row mt_20">
                          <div class="col-md-12">
                            <label className="sign_title">
                              {" "}
                              Account Number{" "}
                            </label>
                            <div class="input_box">
                              <div class="form_group">
                                {/* <input type="text" name="account_number" placeholder="" value="3132131131311" /> */}

                                <FormControl
                                  control="input"
                                  type="text"
                                  name="account_number"
                                  id="account_number"
                                  // label="Account_Number"
                                  disabled={!edit}
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values?.account_number}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row mt_20">
                          <div class="col-md-12 ">
                            <label className="sign_title"> IFSC Code </label>
                            <div class="input_box">
                              <div class="form_group">
                                {/* <input type="text" name="ifc_code" placeholder="" value="BARB012112" /> */}

                                <FormControl
                                  control="input"
                                  type="text"
                                  name="ifsc_code"
                                  id="ifsc_code"
                                  // label="Account_Number"
                                  disabled={!edit}
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values?.ifsc_code}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="bottom_border mt_30 mb_30" />
                        <div class="row">
                          <div class="col-md-12">
                            <h3 class="upi_title">UPI</h3>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12 mt_20">
                            <label className="sign_title"> UPI ID </label>
                            <div class="input_box">
                              <div class="form_group">
                                {/* <input type="text" name="upi_id" placeholder="" value="9183121322@upi" /> */}

                                <FormControl
                                  control="input"
                                  type="text"
                                  name="upi_id"
                                  id="upi_id"
                                  // label="Account_Number"
                                  disabled={!edit}
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                  value={values?.upi_id}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mt_50">
                          {edit && (
                            <div className="col-md-4">
                              <button
                                type="submit"
                                class="continue_btn"
                                variant="primary"
                              >
                                Save
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Bankdetails;
