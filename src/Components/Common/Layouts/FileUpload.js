import { Field } from "formik";
import React, { useRef } from "react";

function FileUpload({ label, icon, isPdf, className, ...rest }) {
  const fileRef = useRef();
  return (
    <>
      <button
        className={className}
        onClick={(e) => {
  
          e.preventDefault();
          fileRef?.current?.click();
        }}
      >
        {icon && <img alt="myImg" src={icon} class="attach_icon"></img>}
        {label}
      </button>
      <Field name={rest?.name} validate={rest?.validate} hidden />
      <input
        ref={fileRef}
        type="file"
        accept={`image/png, image/gif, image/jpeg, ${
          isPdf && "application/pdf"
        }`}
        hidden
        {...rest}
      />
    </>
  );
}

export default FileUpload;
