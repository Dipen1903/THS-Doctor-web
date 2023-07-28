// // serviceWorkerRegistration.js

// // Import the Workbox service worker script


// // Check if service workers are supported by the browser


// import React from 'react';
// import { Workbox } from "workbox-window";

// const serviceWorkerRegistration = () => {
//     if ("serviceWorker" in navigator) {
//         const wb = new Workbox("/firebase-messaging-sw.js");
      
//         // Add an event listener to track updates to the service worker
//         wb.addEventListener("waiting", (event) => {
//           if (window.confirm("A new version of the app is available. Reload?")) {
//             wb.addEventListener("controlling", (event) => {
//               window.location.reload();
//             });
      
//             // Skip waiting and become the active service worker
//             wb.messageSkipWaiting();
//           }
//         });
      
//         // Register the service worker
//         wb.register();
//       }
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default serviceWorkerRegistration

