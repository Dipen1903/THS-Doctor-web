import React from "react";
import SideBanner from "../Components/Common/Layouts/SideBanner";

function PublicRoutes({ isHeader, children }) {
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
