document.addEventListener("DOMContentLoaded", () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  /* =========================
     ❄️ 1. Falling Snow
     ========================= */
  const snowCount = isMobile ? 40 : 80;

  for (let i = 0; i < snowCount; i++) {
    const snow = document.createElement("div");
    snow.innerHTML = "❄️";
    snow.style.position = "fixed";
    snow.style.left = Math.random() * 100 + "vw";
    snow.style.top = Math.random() * -100 + "px";
    snow.style.fontSize = Math.random() * 18 + 12 + "px";
    snow.style.opacity = Math.random();
    snow.style.pointerEvents = "none";
    snow.style.zIndex = 9998;
    snow.style.transition = "top linear";
    document.body.appendChild(snow);

    const duration = Math.random() * 10 + 10;

    snow.animate(
      [
        { transform: "translateY(0)" },
        { transform: `translateY(${window.innerHeight + 100}px)` }
      ],
      {
        duration: duration * 1000,
        iterations: Infinity
      }
    );
  }

  /* =========================
     🎅 2. Floating Christmas Images
     ========================= */
  const images = [
    "santa.png",
    "tree.png",
    "gift.png",
    "snowman.png"
  ];

  const count = isMobile ? 6 : 12;

  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    img.src = images[Math.floor(Math.random() * images.length)];
    img.style.position = "fixed";
    img.style.left = Math.random() * 100 + "vw";
    img.style.top = Math.random() * 100 + "vh";
    img.style.width = Math.random() * 50 + 40 + "px";
    img.style.opacity = 0.95;
    img.style.pointerEvents = "none";
    img.style.zIndex = 9999;
    img.style.transition =
      "transform 12s ease-in-out, top 12s ease-in-out, left 12s ease-in-out";
    document.body.appendChild(img);

    setInterval(() => {
      img.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
      img.style.left = Math.random() * 100 + "vw";
      img.style.top = Math.random() * 100 + "vh";
    }, 12000);
  }

  /* =========================
     🌫️ 3. Soft Winter Glow / Mist
     ========================= */
  const glow = document.createElement("div");
  glow.style.position = "fixed";
  glow.style.top = 0;
  glow.style.left = 0;
  glow.style.width = "100%";
  glow.style.height = "100%";
  glow.style.pointerEvents = "none";
  glow.style.background =
    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 70%)";
  glow.style.animation = "winterGlow 20s ease-in-out infinite";
  glow.style.zIndex = 9997;
  document.body.appendChild(glow);

  const style = document.createElement("style");
  style.textContent = `
    @keyframes winterGlow {
      0% { opacity: 0.4; }
      50% { opacity: 0.8; }
      100% { opacity: 0.4; }
    }
  `;
  document.head.appendChild(style);

  /* =========================
     🧤 4. Touch / Mouse Sparkle
     ========================= */
  const sparkle = (x, y) => {
    const s = document.createElement("div");
    s.innerHTML = "✨";
    s.style.position = "fixed";
    s.style.left = x + "px";
    s.style.top = y + "px";
    s.style.pointerEvents = "none";
    s.style.zIndex = 10000;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 600);
  };

  document.addEventListener("mousemove", e => sparkle(e.clientX, e.clientY));
  document.addEventListener("touchmove", e => {
    if (e.touches[0]) sparkle(e.touches[0].clientX, e.touches[0].clientY);
  });

  /* =========================
     🎁 5. Merry Christmas Popup
     ========================= */
  setTimeout(() => {
    const popup = document.createElement("div");
    popup.innerHTML = `
      <h1>🎄 Merry Christmas! 🎅</h1>
      <p>Wishing you warmth, joy, and happiness.</p>
      <button>Close</button>
    `;
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "rgba(0,0,0,0.85)";
    popup.style.color = "#ffffff";
    popup.style.padding = "25px 35px";
    popup.style.borderRadius = "18px";
    popup.style.textAlign = "center";
    popup.style.zIndex = 10001;
    popup.style.fontFamily = "serif";
    popup.style.boxShadow = "0 0 25px rgba(255,255,255,0.6)";
    popup.style.opacity = 0;
    popup.style.transition = "opacity 1s ease";
    document.body.appendChild(popup);
    setTimeout(() => popup.style.opacity = 1, 50);

    const btn = popup.querySelector("button");
    btn.style.marginTop = "12px";
    btn.style.padding = "8px 22px";
    btn.style.borderRadius = "10px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.addEventListener("click", () => {
      popup.style.opacity = 0;
      setTimeout(() => popup.remove(), 1000);
    });
  }, 2000);
});
