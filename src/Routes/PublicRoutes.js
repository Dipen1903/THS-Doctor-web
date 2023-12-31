import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SideBanner from "../Components/Common/Layouts/SideBanner";
import { VerifySession } from "../Store/Reducers/AuthSlice";

function PublicRoutes({ children }) {
  const { token } = useSelector(({ AuthSlice }) => AuthSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      dispatch(VerifySession()).then((res) => {
        if (res?.payload?.success) {
          navigate("/dashboard");
        }
      });
    }

    return () => { };
  }, []);

  

  return (
    <div className="section_1_bg">
      <div className="section_1_container" >
        <div>
          <SideBanner />
        </div>
        <div>
          {children}
        </div>

      </div>
    </div>
  );
}

export default PublicRoutes;
