import React from "react";

function Error({ message }) {
  return message ? <div className="error">{message}</div> : null;
}

export default Error;
