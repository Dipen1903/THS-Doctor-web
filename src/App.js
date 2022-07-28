import React from "react";
import RootRoute from "./Routes/RootRoute";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Assets/css/responsive.css";
import "./Assets/css/style.css";
import "./Components/Common/style.css";
import LayoutProvider from "./Components/Common/Layouts/LayoutProvider";

function App() {
  return (
    <LayoutProvider>
      <RootRoute />
    </LayoutProvider>
  );
}

export default App;
