import React from "react";
import { useFormikContext } from "formik";
import FormControl from "../../../Common/Forms/FormControl";

function BankInformation() {
  const { values, handleBlur, handleChange } = useFormikContext();
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
            type="text"
            label="Account Number*"
            name="account_number"
            id="account_number"
            value={values?.account_number}
            onChange={handleChange}
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