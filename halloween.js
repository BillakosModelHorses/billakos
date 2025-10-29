document.addEventListener("DOMContentLoaded", () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // ---- 1. Fog layer (simplified for mobile) ----
  const fog = document.createElement("div");
  fog.style.position = "fixed";
  fog.style.top = 0;
  fog.style.left = 0;
  fog.style.width = "100%";
  fog.style.height = "100%";
  fog.style.pointerEvents = "none";
  fog.style.background = "rgba(255,255,255,0.03)";
  fog.style.zIndex = 9997;
  fog.style.animation = isMobile
    ? "fogMobile 40s linear infinite"
    : "fogDesktop 60s linear infinite";
  document.body.appendChild(fog);

  const fogStyle = document.createElement("style");
  fogStyle.textContent = `
    @keyframes fogDesktop {
      0% { background-position: 0 0; }
      50% { background-position: 100px 0; }
      100% { background-position: 0 0; }
    }
    @keyframes fogMobile {
      0% { opacity: 0.05; }
      50% { opacity: 0.15; }
      100% { opacity: 0.05; }
    }
  `;
  document.head.appendChild(fogStyle);

  // ---- 2. Floating emojis (lighter on mobile) ----
  const emojis = ["🦇", "🎃", "👻"];
  const count = isMobile ? 8 : 15;

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.position = "fixed";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = Math.random() * 100 + "vh";
    el.style.fontSize = Math.random() * 20 + 20 + "px";
    el.style.opacity = 0.9;
    el.style.pointerEvents = "none";
    el.style.zIndex = 9999;
    el.style.transition = "transform 10s ease-in-out, top 10s ease-in-out, left 10s ease-in-out";
    document.body.appendChild(el);

    setInterval(() => {
      el.style.transform = `translate(${Math.random() * 30 - 15}px, ${
        Math.random() * 30 - 15
      }px) rotate(${Math.random() * 360}deg)`;
      el.style.left = Math.random() * 100 + "vw";
      el.style.top = Math.random() * 100 + "vh";
    }, 9000);
  }

  // ---- 3. Mouse / Touch glow trail ----
  const glowHandler = (x, y) => {
    const glow = document.createElement("div");
    glow.style.position = "fixed";
    glow.style.left = x - 10 + "px";
    glow.style.top = y - 10 + "px";
    glow.style.width = "20px";
    glow.style.height = "20px";
    glow.style.borderRadius = "50%";
    glow.style.background = "rgba(255,140,0,0.4)";
    glow.style.pointerEvents = "none";
    glow.style.zIndex = 9999;
    glow.style.transition = "opacity 0.5s ease-out";
    document.body.appendChild(glow);
    setTimeout(() => (glow.style.opacity = 0), 100);
    setTimeout(() => glow.remove(), 500);
  };

  document.addEventListener("mousemove", (e) => glowHandler(e.clientX, e.clientY));
  document.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    if (t) glowHandler(t.clientX, t.clientY);
  });

  // ---- 4. “Happy Halloween” Popup ----
  setTimeout(() => {
    const popup = document.createElement("div");
    popup.innerHTML = `
      <h1>🎃 Happy Halloween! 👻</h1>
      <p>Wishing you a spooky, fun filled season!</p>
      <button>Close</button>
    `;
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.background = "rgba(0,0,0,0.85)";
    popup.style.color = "#ffa500";
    popup.style.padding = "25px 30px";
    popup.style.borderRadius = "15px";
    popup.style.textAlign = "center";
    popup.style.zIndex = 10000;
    popup.style.fontFamily = "cursive";
    popup.style.boxShadow = "0 0 20px orange";
    popup.style.opacity = 0;
    popup.style.transition = "opacity 1s ease-in-out";
    document.body.appendChild(popup);
    setTimeout(() => (popup.style.opacity = 1), 50);
    const btn = popup.querySelector("button");
    btn.style.marginTop = "10px";
    btn.style.background = "orange";
    btn.style.color = "black";
    btn.style.border = "none";
    btn.style.padding = "8px 20px";
    btn.style.borderRadius = "10px";
    btn.style.cursor = "pointer";
    btn.addEventListener("click", () => {
      popup.style.opacity = 0;
      setTimeout(() => popup.remove(), 1000);
    });
  }, 2000);
});