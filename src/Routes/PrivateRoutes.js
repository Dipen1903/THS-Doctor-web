import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Common/Layouts/Header";

function PrivateRoutes({ children, isHeader }) {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      {isHeader && <Header />}
      {children}
    </>
  );
}

export default PrivateRoutes;
