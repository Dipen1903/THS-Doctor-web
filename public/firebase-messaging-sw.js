

importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

//the Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyAJh9bSIe-gZ74qFYxfWzsOmkr_z1FviyA",
  authDomain: "thsmedical-3333e.firebaseapp.com",
  projectId: "thsmedical-3333e",
  storageBucket: "thsmedical-3333e.appspot.com",
  messagingSenderId: "850749344600",
  appId: "1:850749344600:web:64d72f1207caea2af3332d",
  measurementId: "G-41PQEPW141",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload?.notification?.title;
  const notificationOptions = {
    body: payload?.notification?.body,
    icon: payload?.notification?.icon,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );

});