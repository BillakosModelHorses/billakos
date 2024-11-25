// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

// Modal elements
const gameModal = document.getElementById("gameModal");
const closeButton = document.querySelector(".close");

// Game variables
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const bagWidth = 80;
const bagHeight = 20;
let bagX = (canvasWidth - bagWidth) / 2;
const bagY = canvasHeight - bagHeight - 50;

let score = 0;
let missedItems = 0;
const maxMisses = 5;

const items = []; // Falling items array
const itemWidth = 60;
const itemHeight = 60;
let itemSpeed = 3;

let isGameRunning = false;

// Images for items
const itemImages = [
  "https://i.postimg.cc/fbKqSZjJ/4087-C893-8-D2-D-4197-BADD-392-F80-C0-CEF4.png?v=1731691552?text=A",
  "https://i.postimg.cc/W3NK5tbG/4-B1107-CA-21-CA-4-B9-E-8647-74967-C040-F14.png?v=1730294222?text=B",
  "https://i.postimg.cc/fLqH5KPs/6-C4-DE37-F-8047-4-D83-A111-1-CC8-C558-BC1-C.png?v=1563825462?v=1722012553?v=1730294222?text=C",
  "https://i.postimg.cc/BQrVdmnQ/7-F1999-A8-E275-4-DF2-A29-A-AE74663-D0-B78.png?v=1722263282?text=D",
  "https://i.postimg.cc/J4DF6fm2/8-C6600-A9-B3-C4-4-E8-A-9-A15-6-D00-C6-A7-CE37.png?v=1563826973?v=1730294222?text=E",
  "https://i.postimg.cc/7hbRyczb/AA96080-B-BD6-C-45-D5-A28-E-277-E25-DE0-E6-E.png?v=1563825640?v=1563826973?v=1730294222?text=F",

  "https://i.postimg.cc/0NxHNrST/AEA17193-29-C1-4-FC8-A2-E4-03-BC015-C02-F8.png?v=1731691552?text=G",
  "https://i.postimg.cc/xC6ZhYcW/B9-F0835-B-DD2-B-4-BFC-8073-6-DC5-D596-E33-E.png?text=H",
  "https://i.postimg.cc/YSfZNQk2/D1-A6564-C-C325-4-A19-8-B75-EA8-C72-C37-FEF.png?v=1563825462?v=1722012553?v=1730294222?text=I",
  "https://i.postimg.cc/NMjJ1Vpb/F399-E083-BC3-E-4-E54-AB7-D-BBA7-B9601934.png?v=1722263282?text=J",
  "https://i.postimg.cc/DfYDcvVG/F930-C266-993-E-4-CBD-9731-3766016-C8400.png?v=1730294222?text=K",
  "https://i.postimg.cc/904Lk937/FABB6-A5-C-8-DA3-46-F6-BB8-F-7-C82588-A47-E8.png?v=1563825640?v=1563826973?v=1730294222?text=L",
  "https://i.postimg.cc/WzKHpnm8/FADCD8-B3-F4-E9-4-CC3-AB19-BD85934-A6-E84.png?v=1563825640?v=1563826973?v=1730294222?text=M",
];

// Controls
let rightPressed = false;
let leftPressed = false;

// Event listeners for keyboard input
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    e.preventDefault(); // Prevent default scrolling
    if (e.key === "ArrowRight") rightPressed = true;
    if (e.key === "ArrowLeft") leftPressed = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    if (e.key === "ArrowRight") rightPressed = false;
    if (e.key === "ArrowLeft") leftPressed = false;
  }
});

// Touch controls for mobile with enhanced movement
let touchOffsetX = 0;

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevent default scrolling behavior

  // Record the initial touch offset relative to the bag's position
  const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
  touchOffsetX = touchX - bagX;
}, false);

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault(); // Prevent default scrolling behavior

  // Get the new touch position
  const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;

  // Update the bag position based on the touch offset
  bagX = touchX - touchOffsetX;

  // Ensure the bag stays within canvas bounds
  if (bagX < 0) bagX = 0;
  if (bagX > canvasWidth - bagWidth) bagX = canvasWidth - bagWidth;
}, false);

// Create new item
function createItem() {
  const x = Math.random() * (canvasWidth - itemWidth); // Random x position
  const imageSrc = itemImages[Math.floor(Math.random() * itemImages.length)]; // Random image
  items.push({ x, y: -itemHeight, image: imageSrc });
}

// Move items
function moveItems() {
  for (let i = 0; i < items.length; i++) {
    items[i].y += itemSpeed;

    // Check if item is caught
    if (
      items[i].y + itemHeight >= bagY &&
      items[i].x < bagX + bagWidth &&
      items[i].x + itemWidth > bagX
    ) {
      items.splice(i, 1); // Remove item
      score++; // Increase score
      i--; // Adjust index
    }
    // Remove item if it falls off the screen
    else if (items[i].y > canvasHeight) {
      items.splice(i, 1);
      missedItems++;
      i--; // Adjust index
    }
  }
}

// Load bag image
const bagImage = new Image();
bagImage.src =
  "https://i.postimg.cc/L6tyN9Yn/E21ECC5D-CB7F-44DF-B1DE-4A4C60A72F25.png"; // Replace with the actual path to your bag image

// Draw bag
function drawBag() {
  ctx.drawImage(bagImage, bagX, bagY, 111, 83);
}

// Draw items
function drawItems() {
  items.forEach((item) => {
    const img = new Image();
    img.src = item.image;
    ctx.drawImage(img, item.x, item.y, itemWidth, itemHeight);
  });
}

// Draw score and missed items
function drawHUD() {
  ctx.font = "17px Oswald";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText(`Missed: ${missedItems}/${maxMisses}`, 10, 40);
}

// Move the bag
function moveBag() {
  if (rightPressed && bagX < canvasWidth - bagWidth) {
    bagX += 7;
  }
  if (leftPressed && bagX > 0) {
    bagX -= 7;
  }
}

// Check for game over
function checkGameOver() {
  if (missedItems >= maxMisses) {
    isGameRunning = false;
    alert(`Some Ponies got away! You collected ${score} models :)`);
    location.reload(); // Refresh the page to reset the game
  }
}

// Reset game variables
function resetGame() {
  score = 0;
  missedItems = 0;
  items.length = 0; // Clear all items
  itemSpeed = 3;
  bagX = (canvasWidth - bagWidth) / 2;
}

// Load background image
const backgroundImage = new Image();
backgroundImage.src =
  "https://i.postimg.cc/Kv0ymNzx/26A44A23-C089-472B-8F0B-1692F127D924.png"; // Replace with the actual path to your background image

function drawBackground() {
  ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight); // Match canvas size
}

let itemCreationInterval; // To track item creation interval
let speedIncreaseInterval; // To track speed increase interval

// Main game loop
function gameLoop() {
  if (!isGameRunning) return;

  // Draw the background
  drawBackground();

  // Draw all game elements
  drawBag();
  drawItems();
  drawHUD();

  // Update positions
  moveBag();
  moveItems();
  checkGameOver();

  // Request the next frame
  requestAnimationFrame(gameLoop);
}

// Start game
function startGame() {
  isGameRunning = true;

  // Clear any existing intervals
  clearInterval(itemCreationInterval);
  clearInterval(speedIncreaseInterval);

  // Start new intervals
  itemCreationInterval = setInterval(createItem, 1000); // Create new item every second
  speedIncreaseInterval = setInterval(() => {
    itemSpeed += 0.4; // Gradually increase speed
  }, 5000);

  // Reset speed
  itemSpeed = 3;

  // Start game loop
  gameLoop();
}

// Modal handling
function openGameModal() {
  gameModal.style.display = "block"; // Show modal
  startGame(); // Start the game
}

function closeGameModal() {
  gameModal.style.display = "none"; // Hide modal
  location.reload(); // Refresh the page to reset the game
}

// Event listeners for modal open and close
startButton.addEventListener("click", openGameModal);
closeButton.addEventListener("click", closeGameModal);

//Optional: Close modal on outside click
window.addEventListener("click", (e) => {
  if (e.target === gameModal) {
    closeGameModal();
  }
});
