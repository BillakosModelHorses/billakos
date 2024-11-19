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
const itemHeight = 36;
let itemSpeed = 3;

let isGameRunning = false;

// Images for items
const itemImages = [
  "https://cdn.shopify.com/s/files/1/0015/8898/5892/files/1847G_Marc_of_Charm_R_1024x1024.png?v=1731691552?text=A",
  "https://cdn.shopify.com/s/files/1/0015/8898/5892/files/B-EV-10427_Tight_Lines_in_blanket_Rev_1024x1024.png?v=1730294222?text=B",
"https://cdn.shopify.com/s/files/1/0015/8898/5892/files/Natash_Alt_1024x1024.png?v=1563825462?v=1722012553?v=1730294222?text=C",
"https://cdn.shopify.com/s/files/1/0015/8898/5892/files/B-BF-10098_Wild_Things_Green_L_480x480.png?v=1722263282?text=D",
"https://cdn.shopify.com/s/files/1/0015/8898/5892/files/Quill_Gloss_1024x1024.png?v=1563826973?v=1730294222?text=E",
"https://cdn.shopify.com/s/files/1/0015/8898/5892/files/Diana_Alt_1024x1024.png?v=1563825640?v=1563826973?v=1730294222?text=F",

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

// Touch controls for mobile
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevent default scrolling
  moveBagWithTouch(e);
}, false);

//canvas.addEventListener("touchmove", (e) => {
  //e.preventDefault(); // Prevent default scrolling
  //moveBagWithTouch(e);
//}, false);

canvas.addEventListener('touchmove', function (e) {
  e.preventDefault(); // Prevent scrolling on touch

  const touch = e.touches[0];
  const touchX = touch.clientX;

  // Set the basket's position directly, centered under the finger
  basket.x = touchX - basket.width / 2;

  // Ensure the basket stays within the canvas bounds
  basket.x = Math.max(0, Math.min(basket.x, canvas.width - basket.width));
});



function moveBagWithTouch(e) {
  const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
  bagX = touchX - bagWidth / 2;

  if (bagX < 0) bagX = 0;
  if (bagX > canvasWidth - bagWidth) bagX = canvasWidth - bagWidth;
}

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
bagImage.src = "https://i.postimg.cc/L6tyN9Yn/E21ECC5D-CB7F-44DF-B1DE-4A4C60A72F25.png"; // Replace with the actual path to your bag image

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
backgroundImage.src = "https://i.postimg.cc/Kv0ymNzx/26A44A23-C089-472B-8F0B-1692F127D924.png"; // Replace with the actual path to your background image

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
