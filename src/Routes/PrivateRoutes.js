import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Common/Layouts/Header";
import SideBanner from "../Components/Common/Layouts/SideBanner";
import { setMessage } from "../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../Utilities/Enums";

function PrivateRoutes({ children, isHeader, isBanner }) {
  const { token } = useSelector(({ AuthSlice }) => AuthSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(
        setMessage({
          type: AlertEnum.Info,
          text: "Logged in",
        })
      );
      navigate("/dashboard");
    } else {
      navigate("/");
      dispatch(
        setMessage({
          type: AlertEnum.Error,
          text: "Logged Out",
        })
      );
    }
    return () => {};
  }, [token]);
  return (
    <>
      {isHeader && <Header />}
      {isBanner && <SideBanner />}
      {children}
    </>
  );
}

export default PrivateRoutes;
