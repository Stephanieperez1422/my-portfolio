// ══════════════════════════════════════
//  PROJECT FRAME TOGGLE
// ══════════════════════════════════════

function toggleProject(id, btn) {
  var frame = document.getElementById(id);
  var isOpen = frame.classList.contains('open');
  if (isOpen) {
    frame.classList.remove('open');
    btn.classList.remove('active');
    btn.textContent = 'Open Project ↓';
  } else {
    frame.classList.add('open');
    btn.classList.add('active');
    btn.textContent = 'Close Project ↑';
    setTimeout(function() {
      frame.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

// ══════════════════════════════════════
//  SECTION SWITCHING
// ══════════════════════════════════════

function showSection(id) {
  // Hide all sections
  document.querySelectorAll('.section-page').forEach(function(s) {
    s.classList.remove('active');
  });
  // Show the target section
  var target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ══════════════════════════════════════
//  ACCORDION
// ══════════════════════════════════════

function toggleAccordion(header) {
  var body  = header.nextElementSibling;
  var arrow = header.querySelector('.acc-arrow');
  var isOpen = body.classList.contains('open');

  // Close all accordions first
  document.querySelectorAll('.accordion-body').forEach(function(b) {
    b.classList.remove('open');
  });
  document.querySelectorAll('.acc-arrow').forEach(function(a) {
    a.classList.remove('open');
  });

  // If it wasn't open, open it now
  if (!isOpen) {
    body.classList.add('open');
    arrow.classList.add('open');
  }
}

// ══════════════════════════════════════
//  INVOICE TOGGLE
// ══════════════════════════════════════

function toggleInvoice() {
  var section = document.getElementById('invoice-section');
  var btn     = document.getElementById('invoice-toggle-btn');
  var isOpen  = section.classList.contains('open');

  if (isOpen) {
    section.classList.remove('open');
    btn.classList.remove('active');
    btn.textContent = 'Open Invoice ↓';
  } else {
    section.classList.add('open');
    btn.classList.add('active');
    btn.textContent = 'Close Invoice ↑';
    // Scroll to invoice after a short delay for animation
    setTimeout(function() {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

// Open invoice directly (called from nav dropdown link)
function openInvoice() {
  setTimeout(function() {
    var section = document.getElementById('invoice-section');
    var btn     = document.getElementById('invoice-toggle-btn');
    if (section && !section.classList.contains('open')) {
      section.classList.add('open');
      btn.classList.add('active');
      btn.textContent = 'Close Invoice ↑';
      setTimeout(function() {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, 100);
}

// ══════════════════════════════════════
//  INVOICE CALCULATIONS
// ══════════════════════════════════════

// Set today's date and due date (30 days out)
window.addEventListener('DOMContentLoaded', function() {
  var today = new Date().toISOString().split('T')[0];
  var invDate = document.getElementById('invoice-date');
  var dueDate = document.getElementById('due-date');

  if (invDate) invDate.value = today;
  if (dueDate) {
    var due = new Date();
    due.setDate(due.getDate() + 30);
    dueDate.value = due.toISOString().split('T')[0];
  }

  calculateTotals();
});

function calculateTotals() {
  var rows = document.querySelectorAll('#items-body tr');
  var subtotal = 0;

  rows.forEach(function(row) {
    var qty   = parseFloat(row.querySelector('.qty').value)   || 0;
    var price = parseFloat(row.querySelector('.price').value) || 0;
    var lt    = qty * price;
    row.querySelector('.line-total').textContent = '$' + lt.toFixed(2);
    subtotal += lt;
  });

  var taxRateEl   = document.getElementById('tax-rate');
  var taxRate     = taxRateEl ? (parseFloat(taxRateEl.value) || 0) : 0;
  var taxAmount   = subtotal * (taxRate / 100);
  var grandTotal  = subtotal + taxAmount;

  var subEl   = document.getElementById('subtotal');
  var taxAmEl = document.getElementById('tax-amount');
  var grandEl = document.getElementById('grand-total');

  if (subEl)   subEl.textContent   = '$' + subtotal.toFixed(2);
  if (taxAmEl) taxAmEl.textContent = '$' + taxAmount.toFixed(2);
  if (grandEl) grandEl.textContent = '$' + grandTotal.toFixed(2);
}

// Listen for invoice input changes
document.addEventListener('input', function(e) {
  if (e.target.classList.contains('qty') ||
      e.target.classList.contains('price') ||
      e.target.id === 'tax-rate') {
    calculateTotals();
  }
});

// ══════════════════════════════════════
//  PHOTO SLIDER
// ══════════════════════════════════════

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

let currentIndex = 0;
let autoPlayTimer;
let slides, totalSlides;

function buildDots() {
  let dotsContainer = document.getElementById("dots");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    let dot = document.createElement("div");
    dot.classList.add("dot");
    dot.setAttribute("data-index", i);
    dot.addEventListener("click", function() {
      goToSlide(parseInt(this.getAttribute("data-index")));
    });
    dotsContainer.appendChild(dot);
  }
}

function goToSlide(index) {
  for (let i = 0; i < totalSlides; i++) {
    slides[i].classList.remove("active");
  }
  currentIndex = (index + totalSlides) % totalSlides;
  slides[currentIndex].classList.add("active");
  updateDots();

  var cur = document.getElementById("current");
  var cap = document.getElementById("caption");
  if (cur) cur.textContent = currentIndex + 1;
  if (cap) cap.textContent = captions[currentIndex];
}

function updateDots() {
  let dots = document.querySelectorAll(".dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  if (dots[currentIndex]) dots[currentIndex].classList.add("active");
}

function changeSlide(direction) {
  goToSlide(currentIndex + direction);
  clearInterval(autoPlayTimer);
  startAutoPlay();
}

function startAutoPlay() {
  autoPlayTimer = setInterval(function() {
    goToSlide(currentIndex + 1);
  }, 3500);
}

function initSlider() {
  slides = document.querySelectorAll(".slide");
  totalSlides = slides.length;
  if (totalSlides === 0) return;

  var totalEl = document.getElementById("total");
  if (totalEl) totalEl.textContent = totalSlides;

  buildDots();
  goToSlide(0);
  startAutoPlay();
}

// Init slider on load
window.addEventListener('DOMContentLoaded', initSlider);
