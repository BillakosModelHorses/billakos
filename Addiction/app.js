import { db } from "./firebase.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let lastRelapseTime = Date.now();


// LOAD DATA FROM FIREBASE
async function loadData() {

  const docRef = doc(db, "tracker", "main");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {

    const data = docSnap.data();

    lastRelapseTime = data.lastRelapse || Date.now();

    document.getElementById("longestStreak").innerText =
      data.longestStreak || 0;

  } else {

    await setDoc(docRef, {

      lastRelapse: Date.now(),
      longestStreak: 0

    });

    lastRelapseTime = Date.now();

  }

}


// TIMER
function startTimer() {

  setInterval(() => {

    const now = Date.now();

    const diff = now - lastRelapseTime;

    const days =
      Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours =
      Math.floor(diff / (1000 * 60 * 60)) % 24;

    const minutes =
      Math.floor(diff / (1000 * 60)) % 60;

    const seconds =
      Math.floor(diff / 1000) % 60;


    document.getElementById("timer").innerText =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;


    document.getElementById("currentStreak").innerText =
      days;

  }, 1000);

}


// RELAPSE BUTTON
window.resetTimer = async function () {

  const docRef = doc(db, "tracker", "main");

  const docSnap = await getDoc(docRef);

  const now = Date.now();

  let longestStreak = 0;
  let lastRelapse = now;

  if (docSnap.exists()) {

    const data = docSnap.data();

    lastRelapse = data.lastRelapse || now;

    longestStreak = data.longestStreak || 0;

    const streakDays =
      Math.floor((now - lastRelapse) / (1000 * 60 * 60 * 24));

    if (streakDays > longestStreak) {

      longestStreak = streakDays;

    }

  }

  await setDoc(docRef, {

    lastRelapse: now,
    longestStreak: longestStreak

  });

  lastRelapseTime = now;

  document.getElementById("longestStreak").innerText =
    longestStreak;

  document.getElementById("currentStreak").innerText = 0;

};


// SAVE NOTE
window.saveNote = async function () {

  const date =
    document.getElementById("dateInput").value;

  const note =
    document.getElementById("noteInput").value;

  if (!date) {

    alert("Select a date");
    return;

  }

  await setDoc(doc(db, "notes", date), {

    note: note,
    timestamp: Date.now()

  });

  alert("Note saved");

};


// INIT
async function init() {

  await loadData();

  startTimer();

}

init();
