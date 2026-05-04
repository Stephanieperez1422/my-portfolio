// ── Captions for each photo ──
let captions = [
  "NYC sticker wall 🎨",
  "Queensboro Bridge, New York City 🌆",
  "Waterfront at dusk 🌅",
  "Hudson River sunset 🌇",
  "White flowers in the garden 🌼",
  "Sunrise on the beach, Puerto Rico 🌅",
  "Crystal clear water, Puerto Rico 🏝️",
  "Sailboat on the ocean at golden hour ⛵"
];

// ── State ──
let currentIndex = 0;
let autoPlayTimer;
let slides = document.querySelectorAll(".slide");
let totalSlides = slides.length;

// ── Build dots using a for loop ──
function buildDots() {
  let dotsContainer = document.getElementById("dots");
  dotsContainer.innerHTML = "";

  for (let i = 0; i < totalSlides; i++) {
    let dot = document.createElement("div");
    dot.classList.add("dot");
    dot.setAttribute("data-index", i);
    dot.addEventListener("click", function () {
      let index = parseInt(this.getAttribute("data-index"));
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  }
}

// ── Show a specific slide ──
function goToSlide(index) {
  for (let i = 0; i < totalSlides; i++) {
    slides[i].classList.remove("active");
  }

  currentIndex = (index + totalSlides) % totalSlides;
  slides[currentIndex].classList.add("active");

  updateDots();
  document.getElementById("current").textContent = currentIndex + 1;
  document.getElementById("caption").textContent = captions[currentIndex];
}

// ── Update active dot ──
function updateDots() {
  let dots = document.querySelectorAll(".dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[currentIndex].classList.add("active");
}

// ── Prev / Next ──
function changeSlide(direction) {
  goToSlide(currentIndex + direction);
  clearInterval(autoPlayTimer);
  startAutoPlay();
}

// ── Auto-play ──
function startAutoPlay() {
  autoPlayTimer = setInterval(function () {
    goToSlide(currentIndex + 1);
  }, 3500);
}

// ── Init ──
function init() {
  document.getElementById("total").textContent = totalSlides;
  buildDots();
  goToSlide(0);
  startAutoPlay();
}

init();
