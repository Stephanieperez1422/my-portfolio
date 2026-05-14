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
  document.querySelectorAll('.section-page').forEach(function(s) {
    s.classList.remove('active');
  });
  var target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (id === 'final') {
    showSwim('shome');
    document.body.classList.add('final-active');
  } else {
    document.body.classList.remove('final-active');
  }
}

// ══════════════════════════════════════
//  ACCORDION
// ══════════════════════════════════════

function toggleAccordion(header) {
  var body  = header.nextElementSibling;
  var arrow = header.querySelector('.acc-arrow');
  var isOpen = body.classList.contains('open');
  document.querySelectorAll('.accordion-body').forEach(function(b) {
    b.classList.remove('open');
  });
  document.querySelectorAll('.acc-arrow').forEach(function(a) {
    a.classList.remove('open');
  });
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
    setTimeout(function() {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

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
  var taxRateEl  = document.getElementById('tax-rate');
  var taxRate    = taxRateEl ? (parseFloat(taxRateEl.value) || 0) : 0;
  var taxAmount  = subtotal * (taxRate / 100);
  var grandTotal = subtotal + taxAmount;
  var subEl   = document.getElementById('subtotal');
  var taxAmEl = document.getElementById('tax-amount');
  var grandEl = document.getElementById('grand-total');
  if (subEl)   subEl.textContent   = '$' + subtotal.toFixed(2);
  if (taxAmEl) taxAmEl.textContent = '$' + taxAmount.toFixed(2);
  if (grandEl) grandEl.textContent = '$' + grandTotal.toFixed(2);
}

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

var captions = [
  "NYC sticker wall 🎨",
  "Queensboro Bridge, New York City 🌆",
  "Waterfront at dusk 🌅",
  "Hudson River sunset 🌇",
  "White flowers in the garden 🌼",
  "Sunrise on the beach, Puerto Rico 🌅",
  "Crystal clear water, Puerto Rico 🏝️",
  "Sailboat on the ocean at golden hour ⛵"
];

var currentIndex = 0;
var autoPlayTimer;
var slides, totalSlides;

function buildDots() {
  var dotsContainer = document.getElementById("dots");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  for (var i = 0; i < totalSlides; i++) {
    var dot = document.createElement("div");
    dot.classList.add("dot");
    dot.setAttribute("data-index", i);
    dot.addEventListener("click", function() {
      goToSlide(parseInt(this.getAttribute("data-index")));
    });
    dotsContainer.appendChild(dot);
  }
}

function goToSlide(index) {
  for (var i = 0; i < totalSlides; i++) {
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
  var dots = document.querySelectorAll(".dot");
  for (var i = 0; i < dots.length; i++) {
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

window.addEventListener('DOMContentLoaded', initSlider);

// ══════════════════════════════════════
//  SWIM SITE — FINAL SECTION
// ══════════════════════════════════════

function showSwim(id) {
  document.querySelectorAll('.swim-page').forEach(function(p) {
    p.classList.remove('active');
  });
  var target = document.getElementById(id);
  if (target) target.classList.add('active');

  var map = {
    shome:     'snav-home',
    sabout:    'snav-about',
    sservices: 'snav-services',
    sbook:     'snav-book',
    scontact:  'snav-contact'
  };
  document.querySelectorAll('.swim-links li a').forEach(function(a) {
    a.classList.remove('active');
  });
  var el = document.getElementById(map[id]);
  if (el) el.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function submitSwimBook(e) {
  e.preventDefault();
  document.getElementById('swim-booking-form').style.display = 'none';
  document.getElementById('swim-book-success').classList.add('visible');
}

function submitSwimContact(e) {
  e.preventDefault();
  document.getElementById('swim-contact-form').style.display = 'none';
  document.getElementById('swim-contact-success').classList.add('visible');
}
