import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDY0ajH_c7lmNfPLMQp5H_7Awub4Uncd5o",
  authDomain: "budget-management-system-d5e62.firebaseapp.com",
  projectId: "budget-management-system-d5e62",
  storageBucket: "budget-management-system-d5e62.appspot.com",
  messagingSenderId: "846000558589",
  appId: "1:846000558589:web:8706e23e692a87f7fd4994",
  measurementId: "G-32PL1R7KSM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = new getFirestore(app);
export const storage = new getStorage(app);