import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyAJUJbeZ9ceRwaQOCboy79LEwbN-I7R9ro",
          authDomain: "billakosmodelhorses.firebaseapp.com",
          projectId: "billakosmodelhorses",
          storageBucket: "billakosmodelhorses.appspot.com",
          messagingSenderId: "988607299628",
          appId: "1:988607299628:web:b7c2139b095a0afba8d189",
          measurementId: "G-RWHNVMHN2P"
};


// INIT FIREBASE
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


let lastRelapseTime = Date.now();


// LOAD DATA
async function loadData() {

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

  }

}


// TIMER
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


// RELAPSE BUTTON
async function relapse() {

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

  document.getElementById("currentStreak").textContent =
    0;

}


// SAVE NOTE
async function saveNote() {

  const date =
    document.getElementById("dateInput").value;

  const note =
    document.getElementById("noteInput").value;

  if (!date) {

    alert("Select date first");
    return;

  }

  await setDoc(doc(db, "notes", date), {

    text: note,
    time: Date.now()

  });

  alert("Note saved");

}


// BUTTON EVENTS
document
  .getElementById("relapseBtn")
  .addEventListener("click", relapse);

document
  .getElementById("saveNoteBtn")
  .addEventListener("click", saveNote);



// START
await loadData();

startTimer();
