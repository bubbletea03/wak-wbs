import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXOGEmqalPX6YMe26x_SKSCPQaogaZ_yE",
  authDomain: "wak-wbs.firebaseapp.com",
  projectId: "wak-wbs",
  storageBucket: "wak-wbs.appspot.com",
  messagingSenderId: "759115117825",
  appId: "1:759115117825:web:5c823df0ce2c30ad125700",
  measurementId: "G-KRDVS72JDH",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
