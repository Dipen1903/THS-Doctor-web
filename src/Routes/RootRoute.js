import React from "react";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { Route, Routes } from "react-router-dom";
import SignIn from "../Components/Public/SignIn/SignIn";
import SignUp from "../Components/Public/Signup/SignUp";
import Homepage from "../Components/Private/Dashboard/Homepage";
import {
  SetUpProfile,
  SetUpSetting,
} from "../Components/Private/SetupProfile/SetUpProfile";
import MyProfile from "../Components/Private/MyProfile/MyProfile";
import ConsultIndex from "../Components/Private/Consultations/ConsultIndex";
import Settings from "../Components/Private/Settings/Settings";

// import UserProfile from "../Components/Public/Userprofile/userprofile";
// import UserProfile2 from "../Components/Public/Userprofile/userprofile2";
// import Homepage from "../Components/Private/Dashboard/Homepage";
// import Filloutmyworkprofile from "../Components/Private/Dashboard/Filloutmyworkprofile";
// import Setuppayment from "../Components/Private/Dashboard/Setuppayment";
// import Consultationtable from "../Components/Private/Dashboard/Consultationtable";
// import UserProfile3 from "../Components/Public/Userprofile/userprofile3";
// import Appointment1 from "../Appointment/appointment1";

function RootRoute() {
  return (
    <Routes>
      <Route
        path=""
        index
        element={
          <PublicRoutes>
            <SignIn />
          </PublicRoutes>
        }
      />
      <Route
        path="signup"
        element={
          <PublicRoutes>
            <SignUp />
          </PublicRoutes>
        }
      />
      {/*//* Profile Details fill */}
      <Route path="details">
        <Route
          path="personal-work"
          element={
            <PrivateRoutes isBanner={true}>
              <SetUpProfile />
            </PrivateRoutes>
          }
        />
        <Route
          path="schedule-payment"
          element={
            <PrivateRoutes isBanner={true}>
              <SetUpSetting />
            </PrivateRoutes>
          }
        />
      </Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoutes isHeader={true}>
            <Homepage />
          </PrivateRoutes>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoutes isHeader={true}>
            <MyProfile />
          </PrivateRoutes>
        }
      />
      <Route
        path="/consultation"
        element={
          <PrivateRoutes isHeader={true}>
            <ConsultIndex />
          </PrivateRoutes>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoutes isHeader={true}>
            <Settings />
          </PrivateRoutes>
        }
      />
      {/* 
      <Route
        path="/userprofile"
        element={
          <PublicRoutes>
            <UserProfile />
          </PublicRoutes>
        }
      />
      <Route
        path="/userprofile2"
        element={
          <PublicRoutes>
            <UserProfile2 />
          </PublicRoutes>
        }
      />
      <Route
        path="/userprofile3"
        element={
          <PublicRoutes>
            <UserProfile3 />
          </PublicRoutes>
        }
      />
      <Route path="/home" element={<Homepage />} />
      <Route path="/filloutmyworkprofile" element={<Filloutmyworkprofile />} />
      <Route path="/setuppayment" element={<Setuppayment />} />
      <Route path="/consultation" element={<Consultationtable />} />
      <Route path="/appointment1" element={<Appointment1 />} /> */}
    </Routes>
  );
}

export default RootRoute;
