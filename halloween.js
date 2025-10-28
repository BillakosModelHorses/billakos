// halloween.js
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 10; i++) {
    const bat = document.createElement("div");
    bat.textContent = "🦇";
    bat.style.position = "fixed";
    bat.style.left = Math.random() * 100 + "vw";
    bat.style.top = Math.random() * 100 + "vh";
    bat.style.fontSize = Math.random() * 30 + 20 + "px";
    bat.style.opacity = 0.8;
    bat.style.pointerEvents = "none";
    bat.style.transition = "transform 5s linear";
    document.body.appendChild(bat);

    setInterval(() => {
      bat.style.transform = `translate(${Math.random() * 50 - 25}px, ${
        Math.random() * 50 - 25
      }px) rotate(${Math.random() * 360}deg)`;
    }, 3000);
  }
});
