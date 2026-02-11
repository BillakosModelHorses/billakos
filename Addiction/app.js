import { db } from "./firebase.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let lastRelapseTime = null;

// Load from Firebase
async function loadTimer() {

  const docRef = doc(db, "tracker", "main");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    lastRelapseTime = docSnap.data().lastRelapse;
  } else {
    lastRelapseTime = Date.now();
  }

  startTimer();
}

// Timer loop
function startTimer() {

  setInterval(() => {

    const now = Date.now();
    const diff = now - lastRelapseTime;

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor(diff / (1000*60*60)) % 24;
    const minutes = Math.floor(diff / (1000*60)) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    document.getElementById("timer").innerText =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;

  }, 1000);
}

// Reset relapse
window.resetTimer = async function() {

  lastRelapseTime = Date.now();

  await setDoc(doc(db, "tracker", "main"), {
    lastRelapse: lastRelapseTime
  });

};

// Save note
window.saveNote = async function() {

  const date = document.getElementById("dateInput").value;
  const note = document.getElementById("noteInput").value;

  await setDoc(doc(db, "notes", date), {
    note: note
  });

};

loadTimer();
