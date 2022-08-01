import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SideBanner from "../Components/Common/Layouts/SideBanner";
import { GetUserProfile } from "../Store/Reducers/ProfileReducer";

function PublicRoutes({ children }) {
  const { token } = useSelector(({ AuthSlice }) => AuthSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      dispatch(GetUserProfile()).then((res) => {
        if (res?.payload) {
          navigate("/dashboard");
        }
      });
    }

    return () => {};
  }, []);

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
