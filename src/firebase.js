import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAHhz7mK5hrdW9d0Y4Xtyum8M_9BSwi200",
  authDomain: "reatc-slack.firebaseapp.com",
  databaseURL: "https://reatc-slack.firebaseio.com",
  projectId: "reatc-slack",
  storageBucket: "reatc-slack.appspot.com",
  messagingSenderId: "130302717017",
  appId: "1:130302717017:web:9f45bb652f58eaf0069548"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
