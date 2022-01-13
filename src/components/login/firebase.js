import {initializeApp} from "firebase/app";
import { getAuth } from 'firebase/auth';

//firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAnkuEYVVYs11lIkM9NkfKY5XT3wYYE_Pc",
    authDomain: "eshoppers-a19e7.firebaseapp.com",
    projectId: "eshoppers-a19e7",
    storageBucket: "eshoppers-a19e7.appspot.com",
    messagingSenderId: "819623954868",
    appId: "1:819623954868:web:09fdeba908dd58024fcae1",
    measurementId: "G-YJYQ7PKDSK"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export {auth};

