// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhz2WgjfHoz_8pSXo43a1nPqH01QwFk4o",
  authDomain: "fir-rtc-930b8.firebaseapp.com",
  databaseURL: "https://fir-rtc-930b8-default-rtdb.firebaseio.com",
  projectId: "fir-rtc-930b8",
  storageBucket: "fir-rtc-930b8.appspot.com",
  messagingSenderId: "596073221942",
  appId: "1:596073221942:web:da0e1f00a5fa4727bfad97",
  measurementId: "G-8CLV1Y1H47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export default app;
