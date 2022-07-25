import React from "react";
import RootRoute from "./Routes/RootRoute";
import { Provider } from "react-redux";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Assets/css/responsive.css";
import "./Assets/css/style.css";
import "./Components/Common/style.css";
import { store } from "./Store/Store";
import LayoutProvider from "./Components/Common/Layouts/LayoutProvider";

function App() {
  return (
    <Provider store={store}>
      <LayoutProvider>
        <RootRoute />
      </LayoutProvider>
    </Provider>
  );
}

export default App;
