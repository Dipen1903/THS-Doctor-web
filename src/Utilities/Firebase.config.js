// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyAJh9bSIe-gZ74qFYxfWzsOmkr_z1FviyA",
//   authDomain: "thsmedical-3333e.firebaseapp.com",
//   projectId: "thsmedical-3333e",
//   storageBucket: "thsmedical-3333e.appspot.com",
//   messagingSenderId: "850749344600",
//   appId: "1:850749344600:web:64d72f1207caea2af3332d",
//   measurementId: "G-41PQEPW141",
// };
// const FirebaseApp = initializeApp(firebaseConfig);
// export const FirebaseDB = getFirestore(FirebaseApp);
// const messaging = getMessaging(FirebaseApp);



// export const GetFirbaseToken = async () => {
//   return await getToken(messaging, {
//     vapidKey: `BJbEZL3uHsKTBM6_d-3hR3bepIKfIjLWpFQ1IIs-U33ouIRe0sn4qryjPtzAWQHuLX29M7mLMVF6qwqTVHCuIls`,
//   })
//     .then((currentToken) => {
//       console.log("currentTokencurrentTokencurrentTokencurrentToken",currentToken);
//       if (currentToken) {
//         return currentToken;
//       }
//     })
//     .catch((err) => {
//       console.log("ggggggggg");
//       return { error: err };
//     });
// };

// // export const GetFirbaseToken = async () => {
// //   try {

// //     navigator.serviceWorker.register('./firebase-messaging-sw')
// //       .then((registration) => {
// //         messaging.useServiceWorker(registration);
// //         // Request permission and get token.....
// //       });

// //     console.log("gggggggggggggggggggggggg");
// //     const currentToken = await getToken(messaging, {
// //       vapidKey: `BJbEZL3uHsKTBM6_d-3hR3bepIKfIjLWpFQ1IIs-U33ouIRe0sn4qryjPtzAWQHuLX29M7mLMVF6qwqTVHCuIls`,
// //     });
// //     console.log("currrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", messaging);
// //   } catch (error) {
// //     console.error("Error getting FCM token:", error);
// //     return { error: error.message };
// //   }
// // };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log("payloda",payload);
//       resolve(payload);
//     });
//   });
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

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
export const messaging = getMessaging(FirebaseApp);
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/doctor/firebase-messaging-sw.js") // Adjust the path as needed
    .then((registration) => {

    }) 
    .catch((error) => {
      console.error("Service worker registration failed:", error);
    });
}
export const FirebaseDB = getFirestore(FirebaseApp);


export const GetFirbaseToken = async () => {
  try {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
     
        return null;
      }else{
   
      }
    }
  
    const currentToken = await getToken(messaging, {
      vapidKey: "BJbEZL3uHsKTBM6_d-3hR3bepIKfIjLWpFQ1IIs-U33ouIRe0sn4qryjPtzAWQHuLX29M7mLMVF6qwqTVHCuIls",
    });
   

    if (currentToken) {
      return currentToken;
    } else {
     
      return null;
    }
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
     
      resolve(payload);
    });
  });