import React from "react";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Formik } from "formik";
import { Button } from "react-bootstrap";
import FormControl from "../../Common/Forms/FormControl";
import { useDispatch, useSelector } from "react-redux";
import {
  EditBankDetails,
  ValidateBank,
} from "../../../Store/Reducers/ProfileReducer";
import { Icon } from "../../../Utilities/Icons";

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
                <div className="col-md-6 d-flex align-items-center">
                  <h3 className="setting_bank_title">Bank Details</h3>
                  {bankDetails?.is_validated ? (
                    <span className="paid_tag bank-verify">Verified</span>
                  ) : (
                    <span
                      className="failed_tag bank-verify"
                      onClick={() => {
                        dispatch(ValidateBank());
                      }}
                    >
                      Not Verified
                    </span>
                  )}
                </div>
                <div className="col-md-6 ml_10">
                  {!edit && (
                    <Button
                      onClick={() => setEdit(true)}
                      variant="primary"
                      className="setting_profile_btn float_right"
                    >
                      <img src={Icon.Pencil} alt="edit" />
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
                  {({ values, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit} id="myForm">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-12 mt_20">
                            <FormControl
                              control="input"
                              type="text"
                              name="account_holder_name"
                              id="account_holder_name"
                              label="Account Holder Name"
                              disabled={!edit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values?.account_holder_name}
                            />
                          </div>
                        </div>
                        <div className="row mt_20">
                          <div className="col-md-12">
                            <FormControl
                              control="input"
                              type="text"
                              name="account_number"
                              id="account_number"
                              label="Account_Number"
                              disabled={!edit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values?.account_number}
                            />
                          </div>
                        </div>

                        <div className="row mt_20">
                          <div className="col-md-12 ">
                            <FormControl
                              control="input"
                              type="text"
                              name="ifsc_code"
                              id="ifsc_code"
                              label="IFSC Code"
                              disabled={!edit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values?.ifsc_code}
                            />
                          </div>
                        </div>
                        <hr className="bottom_border mt_30 mb_30" />
                        <div className="row">
                          <div className="col-md-12">
                            <h3 className="upi_title">UPI</h3>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 mt_20">
                            <FormControl
                              control="input"
                              type="text"
                              name="upi_id"
                              id="upi_id"
                              label=" UPI ID"
                              disabled={!edit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values?.upi_id}
                            />
                          </div>
                        </div>

                        <div className="row mt_50">
                          {edit && (
                            <div className="col-md-4">
                              <button
                                type="submit"
                                className="continue_btn"
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
