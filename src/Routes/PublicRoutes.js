import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setMessage } from "../Store/Reducers/LayoutSlice";
import { AlertEnum } from "../Utilities/Enums";
import SideBanner from "../Components/Common/Layouts/SideBanner";
import { GetUserProfile } from "../Store/Reducers/ProfileReducer";

function PublicRoutes({ children }) {
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
