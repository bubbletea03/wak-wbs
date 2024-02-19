import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

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

const db = getFirestore(app);

export const testAddDoc = async () => {
  console.log("dd");
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const testGetDoc = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data());
  });
};
