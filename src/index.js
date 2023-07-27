import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { store } from "./Store/Store";
import { Provider } from "react-redux";
// import { serviceWorkerRegistration } from "./serviceWorkerRegistration"; 
import { initializeApp } from "firebase/app";
import serviceWorkerRegistration from '../src/Components/serviceWorkerRegistration.js'
const firebaseConfig = {
  apiKey: "AIzaSyAJh9bSIe-gZ74qFYxfWzsOmkr_z1FviyA",
  authDomain: "thsmedical-3333e.firebaseapp.com",
  projectId: "thsmedical-3333e",
  storageBucket: "thsmedical-3333e.appspot.com",
  messagingSenderId: "850749344600",
  appId: "1:850749344600:web:64d72f1207caea2af3332d",
  measurementId: "G-41PQEPW141",
};
const FirebaseApp = initializeApp(firebaseConfig);
// const messaging = firebase.messaging();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="doctor">
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

serviceWorkerRegistration.register();
reportWebVitals();
