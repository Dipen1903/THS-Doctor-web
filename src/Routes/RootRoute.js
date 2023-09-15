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
import PrescriptionIndex from "../Components/Private/Prescription/PrescriptionIndex";
import PrivacyPolicy from "../Components/Private/Others/PrivacyAndPolicy";
import TermsAndConditions from "../Components/Private/Others/TermsAndConditions";
import HelpAndSupport from "../Components/Private/Others/HelpAndSupport";
import Payouts from "../Components/Private/Payouts/Payouts";
import PayoutDetailed from "../Components/Private/Payouts/PayoutDetailed";
import ResetProfile from "../Components/Private/SetupProfile/ResetProfile";
import ChatIndex from "../Components/Private/Chat/ChatIndex";
import ShareLinkHome from "../Components/Private/SharLink/ShareLinkHome";
import SecondSharLink from "../Components/Private/SharLink/SecondSharLink";

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
          <PublicRoutes >
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
        path="reverify"
        element={
          <PrivateRoutes isBanner={false} isHeader={true}>
            <ResetProfile />
          </PrivateRoutes>
        }
      ></Route>

      <Route
        path="/dashboard"
        element={
          <PrivateRoutes isHeader={true}>
            <Homepage />
          </PrivateRoutes>
        }
      />
      
         <Route
        path="/sharelinkhome"
        element={
          <PrivateRoutes isHeader={true}>
            <SecondSharLink />
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
      <Route path="/chat">
        <Route
          path=""
          element={
            <PrivateRoutes isHeader={true}>
              <ChatIndex />
            </PrivateRoutes>
          }
        />
        <Route
          path=":booking_id"
          element={
            <PrivateRoutes isHeader={true}>
              <ChatIndex />
            </PrivateRoutes>
          }
        />
      </Route>
      <Route path="/prescription/:booking_id">
        <Route
          path=""
          element={
            <PrivateRoutes isHeader={true}>
              <PrescriptionIndex />
            </PrivateRoutes>
          }
        />
        <Route
          path=":id"
          element={
            <PrivateRoutes isHeader={true}>
              <PrescriptionIndex />
            </PrivateRoutes>
          }
        />
      </Route>

      <Route path="/payouts">
        <Route
          path=""
          element={
            <PrivateRoutes isHeader={true}>
              <Payouts />
            </PrivateRoutes>
          }
        />
        <Route
          path=":id"
          element={
            <PrivateRoutes isHeader={true}>
              <PayoutDetailed />
            </PrivateRoutes>
          }
        />
      </Route>
      <Route
        path="/settings"
        element={
          <PrivateRoutes isHeader={true}>
            <Settings />
          </PrivateRoutes>
        }
      />
        <Route
        path="/sharelink"
        element={
          <PrivateRoutes isHeader={true}>
            <ShareLinkHome />
          </PrivateRoutes>
        }
      />
      <Route
        path="/privacy"
        element={
          <PrivateRoutes isHeader={true}>
            <PrivacyPolicy />
          </PrivateRoutes>
        }
      />
      <Route
        path="/terms"
        element={
          <PrivateRoutes isHeader={true}>
            <TermsAndConditions />
          </PrivateRoutes>
        }
      />
      <Route
        path="/help"
        element={
          <PrivateRoutes isHeader={true}>
            <HelpAndSupport />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}

export default RootRoute;
