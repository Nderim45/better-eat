// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCexBgputQzxGV4cYm0Fo_RHQf1TpQE62U",
  authDomain: "better-eat-c49ee.firebaseapp.com",
  projectId: "better-eat-c49ee",
  storageBucket: "better-eat-c49ee.appspot.com",
  messagingSenderId: "423370319055",
  appId: "1:423370319055:web:bf3fefbce8289bffe703ba",
  measurementId: "G-1W88SWTDT3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
