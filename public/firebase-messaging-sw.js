// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
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

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
