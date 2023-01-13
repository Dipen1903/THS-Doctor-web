import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
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
export const FirebaseDB = getFirestore(FirebaseApp);
const messaging = getMessaging(FirebaseApp);

export const GetFirbaseToken = async () => {
  return await getToken(messaging, {
    vapidKey: `BJbEZL3uHsKTBM6_d-3hR3bepIKfIjLWpFQ1IIs-U33ouIRe0sn4qryjPtzAWQHuLX29M7mLMVF6qwqTVHCuIls`,
  })
    .then((currentToken) => {
      debugger;
      if (currentToken) {
        return currentToken;
      }
    })
    .catch((err) => {
      console.log(err);
      return { error: err };
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
