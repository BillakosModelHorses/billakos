import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// PUT YOUR REAL FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyAJUJbeZ9ceRwaQOCboy79LEwbN-I7R9ro",
          authDomain: "billakosmodelhorses.firebaseapp.com",
          projectId: "billakosmodelhorses",
};


// init firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


let lastRelapseTime = Date.now();


// LOAD DATA
async function loadData() {

  console.log("Loading data...");

  const ref = doc(db, "tracker", "main");

  const snap = await getDoc(ref);

  if (snap.exists()) {

    const data = snap.data();

    lastRelapseTime = data.lastRelapse;

    document.getElementById("longestStreak").textContent =
      data.longestStreak || 0;

  } else {

    await setDoc(ref, {

      lastRelapse: Date.now(),
      longestStreak: 0

    });

  }

}


// TIMER
function startTimer() {

  setInterval(() => {

    const diff = Date.now() - lastRelapseTime;

    const days = Math.floor(diff / 86400000);

    document.getElementById("timer").textContent =
      days + " days";

    document.getElementById("currentStreak").textContent =
      days;

  }, 1000);

}


// RELAPSE BUTTON
async function relapse() {

  console.log("BUTTON CLICKED");

  const ref = doc(db, "tracker", "main");

  const snap = await getDoc(ref);

  const now = Date.now();

  let longest = 0;

  if (snap.exists()) {

    const data = snap.data();

    const days =
      Math.floor((now - data.lastRelapse) / 86400000);

    longest = data.longestStreak || 0;

    if (days > longest)
      longest = days;

  }

  await setDoc(ref, {

    lastRelapse: now,
    longestStreak: longest

  });

  lastRelapseTime = now;

  document.getElementById("longestStreak").textContent =
    longest;

}


// SAVE NOTE BUTTON
async function saveNote() {

  console.log("SAVE CLICKED");

  const date =
    document.getElementById("dateInput").value;

  const note =
    document.getElementById("noteInput").value;

  if (!date) {

    alert("Select date");

    return;

  }

  await setDoc(doc(db, "notes", date), {

    text: note

  });

  alert("Saved");

}


// CONNECT BUTTONS
document
  .getElementById("relapseBtn")
  .addEventListener("click", relapse);

document
  .getElementById("saveNoteBtn")
  .addEventListener("click", saveNote);



// START
await loadData();

startTimer();

console.log("APP STARTED");
