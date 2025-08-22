import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "verdant-vista-50nyx",
  "appId": "1:812020071811:web:bd2a3441eaa7c5cda08ab6",
  "storageBucket": "verdant-vista-50nyx.firebasestorage.app",
  "apiKey": "AIzaSyAeGGvdyP6nDwQqy_5xE4ap9mM2OLzglwQ",
  "authDomain": "verdant-vista-50nyx.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "812020071811"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}
export const auth = getAuth(app);
