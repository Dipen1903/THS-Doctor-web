import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setMessage } from "../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../Utilities/Enums";
import SideBanner from "../Components/Common/Layouts/SideBanner";

function PublicRoutes({ children }) {
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
    <div class="section_1_bg">
      <div class="section_1_container">
        <SideBanner />
        {children}
      </div>
    </div>
  );
}

export default PublicRoutes;
