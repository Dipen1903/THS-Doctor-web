import React, { useEffect } from "react";
import RootRoute from "./Routes/RootRoute";
import LayoutProvider from "./Components/Common/Layouts/LayoutProvider";
import ErrorBoundary from "./Components/Common/Layouts/ErrorBoundry";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "react-datepicker/dist/react-datepicker.css";
import "agora-react-uikit/dist/index.css";
import "./Assets/css/style.css";
import "./Assets/css/responsive.css";
import "./Components/Common/style.css";
import { onMessageListener } from "./Utilities/Firebase.config";
import { setMessage } from "./Store/Reducers/LayoutSlice";
import { AlertEnum } from "./Utilities/Enums";
import { LocalServiceWorkerRegister } from "./Utilities/Functions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  onMessageListener()
    .then((payload) => {
      let messageBody;
      if (payload?.data?.incomming_call_type == 0) {
        messageBody = {
          text: `${payload?.notification?.title} started audio call.`,
          subText: payload?.notification?.body,
          metaData: payload?.data,
          type: AlertEnum.Call,
        };
      }
      if (payload?.data?.incomming_call_type == 1) {
        messageBody = {
          text: `${payload?.notification?.title} started video call.`,
          subText: payload?.notification?.body,
          metaData: payload?.data,
          type: AlertEnum.Call,
        };
      }
      if (payload?.data?.incomming_call_type == 3) {
        messageBody = {
          text: `${payload?.notification?.title} booked a consultation.`,
          subText: payload?.notification?.body,
          type: AlertEnum.Booking,
        };
      }
      if (payload?.data?.incomming_call_type == 4) {
        messageBody = {
          text: `${payload?.notification?.title} sent you a message.`,
          subText: payload?.notification?.body,
          type: AlertEnum.Message,
        };
      }

      dispatch(setMessage(messageBody));
    })
    .catch((err) => console.log("failed: ", err));
    // useEffect(() => {
    //   console.log("jj");
    //   LocalServiceWorkerRegister();
    // },[])
  return (
    <ErrorBoundary>
      <LayoutProvider>
        <RootRoute />
      </LayoutProvider>
    </ErrorBoundary>
  );
}
export default App;
