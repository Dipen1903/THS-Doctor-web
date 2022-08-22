import { Field } from "formik";
import React, { useRef } from "react";

function FileUpload({ label, icon, className, ...rest }) {
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
        {icon && <img src={icon} class="attach_icon"></img>}
        {label}
      </button>
      <Field name={rest?.name} validate={rest?.validate} hidden />
      <input
        ref={fileRef}
        type="file"
        accept="image/png, image/gif, image/jpeg"
        hidden
        {...rest}
      />
    </>
  );
}

export default FileUpload;
