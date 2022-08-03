import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Common/Layouts/Header";
import SideBanner from "../Components/Common/Layouts/SideBanner";
import { removeSession, VerifySession } from "../Store/Reducers/AuthSlice";
import { GetUserProfile } from "../Store/Reducers/ProfileReducer";

function PrivateRoutes({ children, isHeader, isBanner }) {
  const { token } = useSelector(({ AuthSlice }) => AuthSlice);
  const { userProfile } = useSelector(({ ProfileSlice }) => ProfileSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(VerifySession()).then((res) => {
        if (res?.payload?.success) {
          if (!userProfile) dispatch(GetUserProfile());
        } else {
          dispatch(removeSession());
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
    return () => {};
  }, [token]);
  return (
    token && (
      <>
        {isHeader && <Header />}
        {isBanner && <SideBanner />}
        {children}
      </>
    )
  );
}

export default PrivateRoutes;
