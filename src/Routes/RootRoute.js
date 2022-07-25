import React from "react";
// import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { Route, Routes } from "react-router-dom";
import SignIn from "../Components/Public/SignIn/SignIn";

function RootRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoutes>
            <SignIn />
          </PublicRoutes>
        }
      />
    </Routes>
  );
}

export default RootRoute;
{
  /* <Routes>
<Route path="/" element={<SignIn />} />
<Route path="/signup" element={<SignUp />} />
<Route path="/userprofile" element={<UserProfile />} />
<Route path="/userprofile2" element={<UserProfile2 />} />
<Route path="/home" element={<Homepage />} />
<Route
  path="/filloutmyworkprofile"
  element={<Filloutmyworkprofile />}
/>
<Route path="/setuppayment" element={<Setuppayment />} />
<Route path="/consultation" element={<Consultationtable />} />
<Route path="/" element={<SignIn />} />
<Route path="/signup" element={<SignUp />} />
<Route path="/userprofile" element={<UserProfile />} />
<Route path="/userprofile2" element={<UserProfile2 />} />
<Route path="/userprofile3" element={<UserProfile3 />} />
<Route path="/appointment1" element={<Appointment1 />} />
</Routes> */
}
