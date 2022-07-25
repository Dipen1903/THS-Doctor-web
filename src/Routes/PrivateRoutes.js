import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Common/Layouts/Header";

function PrivateRoutes({ children }) {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default PrivateRoutes;
