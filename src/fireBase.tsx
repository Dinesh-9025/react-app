import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyDbD5pfc25AEBZJ_w6Emk_muIDjKvZ9Elk",
  authDomain: "web-cam-41322.firebaseapp.com",
  databaseURL: "https://web-cam-41322-default-rtdb.firebaseio.com",
  projectId: "web-cam-41322",
  storageBucket: "web-cam-41322.appspot.com",
  messagingSenderId: "463136215985",
  appId: "1:463136215985:web:8fbb540bf4e82527392390",
  measurementId: "G-3XZLY95YYK"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);