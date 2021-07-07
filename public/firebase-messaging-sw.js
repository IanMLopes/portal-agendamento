importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAyZhY9fA5rhFHuemdrXIhQ0W-jymPgFlU",
    authDomain: "appsamelv2-88114.firebaseapp.com",
    databaseURL: "https://appsamelv2-88114.firebaseio.com",
    projectId: "appsamelv2-88114",
    storageBucket: "appsamelv2-88114.appspot.com",
    messagingSenderId: "624377792513",
    appId: "1:624377792513:web:963020e9f8b15a7ec3d800"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();
  
