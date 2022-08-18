import React from "react";
import { useFormikContext } from "formik";
import FormControl from "../../../Common/Forms/FormControl";

function BankInformation() {
  const { values, handleBlur, handleChange } = useFormikContext();
  const validateIFSC = (value) => {
    let errorMessage;
    if (!/^(?=.*?[A-Z])(?=.*?[0-9]).{14,}$/i.test(value)) {
      errorMessage = "Please enter valid IFSC code";
    }
    return errorMessage;
  };
  const validateAcccountNumber = (value) => {
    let errorMessage;
    if (!/^\d{9,18}$/i.test(value)) {
      errorMessage = "Please enter valid account number";
    }
    return errorMessage;
  };
  const validateConfirmAcccountNumber = (value) => {
    let errorMessage;
    if (value !== values?.account_number) {
      errorMessage = "Account number not matched";
    }
    return errorMessage;
  };
  return (
    <div class="basic_info_form_box">
      <div class="row">
        <div class="col-md-12 mt_20">
          <FormControl
            control="input"
            type="text"
            label="Account Holder Name*"
            name="account_holder_name"
            id="account_holder_name"
            value={values?.account_holder_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div class="row mt_20">
        <div class="col-md-12 mt_20">
          <FormControl
            control="input"
            type="password"
            iconHide={true}
            label="Account Number*"
            name="account_number"
            id="account_number"
            value={values?.account_number}
            onChange={handleChange}
            validate={validateAcccountNumber}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div class="row mt_20">
        <div class="col-md-12 mt_20">
          <FormControl
            control="input"
            type="text"
            label="Confirm Account Number*"
            name="confirm_account_number"
            id="confirm_account_number"
            value={values?.confirm_account_number}
            onChange={handleChange}
            validate={validateConfirmAcccountNumber}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div class="row mt_20">
        <div class="col-md-12 mt_20">
          <FormControl
            control="input"
            type="text"
            label="IFSC Code*"
            name="ifsc_code"
            id="ifsc_code"
            value={values?.ifsc_code}
            validate={validateIFSC}
            onChange={handleChange}
            onBlur={handleBlur}
          />
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
          <FormControl
            control="input"
            type="text"
            label="UPI ID"
            name="upi_id"
            id="upi_id"
            value={values?.upi_id}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
}

export default BankInformation;
