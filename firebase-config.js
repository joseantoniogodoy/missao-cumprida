
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC6WrJV0Cj4fxbTc7ishhBp7EXPeEN1Hdc",
    authDomain: "missao-cumprida-944e4.firebaseapp.com",
    projectId: "missao-cumprida-944e4",
    storageBucket: "missao-cumprida-944e4.firebasestorage.app",
    messagingSenderId: "595023423576",
    appId: "1:595023423576:web:3ada3f0c8df234fe25422d",
    measurementId: "G-1C365XWCQY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export { app };
