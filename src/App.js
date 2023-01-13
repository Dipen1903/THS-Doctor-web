import React from "react";
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
LocalServiceWorkerRegister();
function App() {
  onMessageListener()
    .then((payload) => {
      setMessage({ text: payload?.notification?.title, type: AlertEnum.Info });
    })
    .catch((err) => console.log("failed: ", err));
  return (
    <ErrorBoundary>
      <LayoutProvider>
        <RootRoute />
      </LayoutProvider>
    </ErrorBoundary>
  );
}
export default App;
