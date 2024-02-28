
import { initializeApp } from "firebase/app";
import { GetDatabase, getDatabase } from "firebase/database";

function FirebaseConfig(){

    const firebaseConfig = {
        apiKey: "AIzaSyAAovm5Fc-6V3fSMuspzNqhftFJ_sHElTU",
        authDomain: "fir-usingreacthooks.firebaseapp.com",
        projectId: "fir-usingreacthooks",
        storageBucket: "fir-usingreacthooks.appspot.com",
        messagingSenderId: "87731298504",
        appId: "1:87731298504:web:f14b2d1a142c6581db05fd"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      return getDatabase(app);

}

export default FirebaseConfig;

