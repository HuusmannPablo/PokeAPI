import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCEYYujd5F6f5CsZ-4SVGumzW_JqUXM6M8",
  authDomain: "pokemon-api-fetch.firebaseapp.com",
  projectId: "pokemon-api-fetch",
  storageBucket: "pokemon-api-fetch.appspot.com",
  messagingSenderId: "660879665643",
  appId: "1:660879665643:web:941d5ec677088a8f9fd1ae",
  measurementId: "G-80NLP9HFX9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
