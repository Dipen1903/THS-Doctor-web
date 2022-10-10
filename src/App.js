import React from "react";
import RootRoute from "./Routes/RootRoute";
import LayoutProvider from "./Components/Common/Layouts/LayoutProvider";
import ErrorBoundary from "./Components/Common/Layouts/ErrorBoundry";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "react-datepicker/dist/react-datepicker.css";
import "agora-react-uikit/dist/index.css";
import "./Assets/css/responsive.css";
import "./Assets/css/style.css";
import "./Components/Common/style.css";

function App() {
  return (
    <ErrorBoundary>
      <LayoutProvider>
        <RootRoute />
      </LayoutProvider>
    </ErrorBoundary>
  );
}
export default App;
