// 👻 Halloween Effects Script — spooky, foggy, and interactive
document.addEventListener("DOMContentLoaded", () => {
  // ---- 1. Add fog layer ----
  const fog = document.createElement("div");
  fog.style.position = "fixed";
  fog.style.top = 0;
  fog.style.left = 0;
  fog.style.width = "100vw";
  fog.style.height = "100vh";
  fog.style.pointerEvents = "none";
  fog.style.background = `
    radial-gradient(circle at 30% 50%, rgba(255,255,255,0.05), transparent 70%),
    radial-gradient(circle at 70% 50%, rgba(255,255,255,0.07), transparent 70%)
  `;
  fog.style.animation = "fogMove 60s linear infinite";
  fog.style.zIndex = 9998;
  document.body.appendChild(fog);

  const fogStyle = document.createElement("style");
  fogStyle.textContent = `
    @keyframes fogMove {
      0% { background-position: 0 0, 0 0; }
      50% { background-position: 100px 0, -100px 0; }
      100% { background-position: 0 0, 0 0; }
    }
  `;
  document.head.appendChild(fogStyle);

  // ---- 2. Floating spooky emojis (bats, ghosts, pumpkins) ----
  const emojis = ["🦇", "🎃", "👻", "🕸️", "🕷️"];
  for (let i = 0; i < 15; i++) {
    const el = document.createElement("div");
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.position = "fixed";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = Math.random() * 100 + "vh";
    el.style.fontSize = Math.random() * 24 + 24 + "px";
    el.style.opacity = 0.8;
    el.style.pointerEvents = "none";
    el.style.zIndex = 9999;
    el.style.transition = "transform 8s ease-in-out, top 8s ease-in-out, left 8s ease-in-out";
    document.body.appendChild(el);

    setInterval(() => {
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      el.style.left = Math.random() * 100 + "vw";
      el.style.top = Math.random() * 100 + "vh";
    }, 8000);
  }

  // ---- 3. Floating fog mist (canvas animation) ----
  const fogCanvas = document.createElement("canvas");
  fogCanvas.width = window.innerWidth;
  fogCanvas.height = window.innerHeight;
  fogCanvas.style.position = "fixed";
  fogCanvas.style.top = 0;
  fogCanvas.style.left = 0;
  fogCanvas.style.pointerEvents = "none";
  fogCanvas.style.zIndex = 9997;
  document.body.appendChild(fogCanvas);
  const ctx = fogCanvas.getContext("2d");

  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * fogCanvas.width,
    y: Math.random() * fogCanvas.height,
    r: Math.random() * 60 + 40,
    dx: Math.random() * 0.3 - 0.15,
    dy: Math.random() * 0.3 - 0.15,
  }));

  function animateFog() {
    ctx.clearRect(0, 0, fogCanvas.width, fogCanvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      gradient.addColorStop(0, "rgba(255,255,255,0.05)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      if (p.x < -p.r) p.x = fogCanvas.width + p.r;
      if (p.y < -p.r) p.y = fogCanvas.height + p.r;
      if (p.x > fogCanvas.width + p.r) p.x = -p.r;
      if (p.y > fogCanvas.height + p.r) p.y = -p.r;
    });
    requestAnimationFrame(animateFog);
  }
  animateFog();

  // ---- 4. Spooky hover interaction ----
  document.addEventListener("mousemove", (e) => {
    const glow = document.createElement("div");
    glow.style.position = "fixed";
    glow.style.left = e.clientX - 10 + "px";
    glow.style.top = e.clientY - 10 + "px";
    glow.style.width = "20px";
    glow.style.height = "20px";
    glow.style.borderRadius = "50%";
    glow.style.background = "rgba(255,140,0,0.3)";
    glow.style.pointerEvents = "none";
    glow.style.zIndex = 9999;
    document.body.appendChild(glow);

    setTimeout(() => glow.remove(), 500);
  });

  // ---- 5. Spooky sound (optional, uncomment to use) ----
  /*
  const audio = new Audio("spooky.mp3");
  audio.loop = true;
  audio.volume = 0.2;
  audio.play();
  */
});
