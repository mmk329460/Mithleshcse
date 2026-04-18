import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXTadTnavg_wzkvRtCvAdJjCFpMfrIt_w",
  authDomain: "mithleshportfolio-996d6.firebaseapp.com",
  projectId: "mithleshportfolio-996d6",
  storageBucket: "mithleshportfolio-996d6.appspot.com",
  messagingSenderId: "659814471853",
  appId: "1:659814471853:web:7ae67f62d8238f4c5a0e24",
  measurementId: "G-9DYB6695LT"
};

const app = initializeApp(firebaseConfig);

// MOST COMPATIBLE INITIALIZATION
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false,
});

export const storage = getStorage(app);

export default app;
