// app.js

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔥 YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAJUJbeZ9ceRwaQOCboy79LEwbN-I7R9ro",
          authDomain: "billakosmodelhorses.firebaseapp.com",
          projectId: "billakosmodelhorses",
          storageBucket: "billakosmodelhorses.appspot.com",
          messagingSenderId: "988607299628",
          appId: "1:988607299628:web:b7c2139b095a0afba8d189",
          measurementId: "G-RWHNVMHN2P"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Global variable
let lastRelapseTime = Date.now();


// LOAD DATA FROM FIREBASE
async function loadData() {

  try {

    const ref = doc(db, "tracker", "main");

    const snap = await getDoc(ref);

    if (snap.exists()) {

      const data = snap.data();

      lastRelapseTime = data.lastRelapse || Date.now();

      document.getElementById("longestStreak").textContent =
        data.longestStreak || 0;

    } else {

      await setDoc(ref, {
        lastRelapse: Date.now(),
        longestStreak: 0
      });

      lastRelapseTime = Date.now();

    }

  } catch (error) {

    console.error("Error loading data:", error);

  }

}


// TIMER FUNCTION
function startTimer() {

  setInterval(() => {

    const now = Date.now();

    const diff = now - lastRelapseTime;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    document.getElementById("timer").textContent =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;

    document.getElementById("currentStreak").textContent =
      days;

  }, 1000);

}


// RELAPSE FUNCTION
async function relapse() {

  try {

    console.log("Relapse button clicked");

    const ref = doc(db, "tracker", "main");

    const snap = await getDoc(ref);

    const now = Date.now();

    let longest = 0;
    let last = now;

    if (snap.exists()) {

      const data = snap.data();

      last = data.lastRelapse || now;

      longest = data.longestStreak || 0;

      const days =
        Math.floor((now - last) / 86400000);

      if (days > longest) {

        longest = days;

      }

    }

    // Save to Firebase
    await setDoc(ref, {
      lastRelapse: now,
      longestStreak: longest
    });

    // Update local variable
    lastRelapseTime = now;

    // Update UI
    document.getElementById("longestStreak").textContent =
      longest;

    document.getElementById("currentStreak").textContent =
      0;

    console.log("Relapse saved");

  } catch (error) {

    console.error("Error saving relapse:", error);

  }

}


// SAVE NOTE FUNCTION
async function saveNote() {

  try {

    const date =
      document.getElementById("dateInput").value;

    const note =
      document.getElementById("noteInput").value;

    if (!date) {

      alert("Please select a date");
      return;

    }

    await setDoc(doc(db, "notes", date), {

      text: note,
      timestamp: Date.now()

    });

    alert("Note saved successfully");

  } catch (error) {

    console.error("Error saving note:", error);

  }

}


// CONNECT BUTTONS
function setupButtons() {

  const relapseBtn =
    document.getElementById("relapseBtn");

  const saveNoteBtn =
    document.getElementById("saveNoteBtn");

  relapseBtn.addEventListener("click", relapse);

  saveNoteBtn.addEventListener("click", saveNote);

}


// INITIALIZE APP
async function init() {

  await loadData();

  setupButtons();

  startTimer();

  console.log("App started");

}


// START
init();
