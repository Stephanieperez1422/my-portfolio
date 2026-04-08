/*
Tooplate 2141 Minimal White
https://www.tooplate.com/view/2141-minimal-white
*/

// JavaScript Document

// =========================
// Mobile menu toggle
// =========================
var menuToggle = document.getElementById('menuToggle');
var navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when link is clicked
  var navLinkElems = document.querySelectorAll('.nav-link');
  for (var i = 0; i < navLinkElems.length; i++) {
    navLinkElems[i].addEventListener('click', function () {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  }
}

// =========================
// Navbar scroll effect and active menu highlighting
// =========================
var sections = document.querySelectorAll('section');
var navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function () {
  var navbar = document.getElementById('navbar');

  // Navbar style on scroll
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Active menu highlighting
  var current = '';
  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];
    var sectionTop = section.offsetTop;
    if (scrollY >= (sectionTop - 100)) {
      current = section.getAttribute('id');
    }
  }

  for (var j = 0; j < navItems.length; j++) {
    var item = navItems[j];
    item.classList.remove('active');
    var href = item.getAttribute('href');
    if (!href) continue;

    if (href.charAt(0) === '#') {
      // same-page anchor
      if (href.slice(1) === current) {
        item.classList.add('active');
      }
    } else {
    var path = window.location.pathname.split('/').pop();
    if (href === path) {
      item.classList.add('active');
    }
    }
  }
});

// Trigger scroll event on load to set initial active state
window.dispatchEvent(new Event('scroll'));

// =========================
// Smooth scrolling for navigation links
// =========================
var anchorLinks = document.querySelectorAll('a[href^="#"]');
for (var k = 0; k < anchorLinks.length; k++) {
  anchorLinks[k].addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

// =========================
 // Fade in animation on scroll
// =========================
var observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    }
  }, observerOptions);

  var fadeElems = document.querySelectorAll('.fade-in');
  for (var m = 0; m < fadeElems.length; m++) {
    observer.observe(fadeElems[m]);
  }
}

// =========================
// Contact form submission (only on contact page)
// =========================
var contactForm = document.querySelector('form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Message sent successfully!');
    contactForm.reset();
  });
}

// =========================
// 1. Calorie (TDEE) Calculator
// =========================
var calcBtn = document.getElementById('calculate-btn');

if (calcBtn) {
  var weightInput = document.getElementById('weight');
  var heightInput = document.getElementById('height');
  var ageInput = document.getElementById('age');
  var activitySelect = document.getElementById('activity');
  var resultText = document.getElementById('calorie-result');

  calcBtn.addEventListener('click', function () {
    var weightLbs = parseFloat(weightInput.value);
    var heightIn = parseFloat(heightInput.value);
    var age = parseFloat(ageInput.value);
    var activityFactor = parseFloat(activitySelect.value);

    // Basic validation
    if (isNaN(weightLbs) || isNaN(heightIn) || isNaN(age)) {
      resultText.textContent = 'Please enter your weight, height, and age.';
      return;
    }

    if (weightLbs <= 0 || heightIn <= 0 || age <= 0) {
      resultText.textContent = 'Values must be greater than zero.';
      return;
    }

    // Convert to metric
    var weightKg = weightLbs * 0.453592; // lbs → kg
    var heightCm = heightIn * 2.54;      // in → cm

    // Female Mifflin-St Jeor formula
    // (change -161 to +5 for male)
    var BMR = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

    // TDEE
    var TDEE = Math.round(BMR * activityFactor);

    if (!isFinite(TDEE) || TDEE <= 0) {
      resultText.textContent = 'Something went wrong. Please check your inputs.';
      return;
    }

    resultText.textContent = 'Estimated daily calories (TDEE): ' + TDEE.toLocaleString() + ' kcal/day.';
  });
}

// =========================
// 2. Protein Intake Calculator
// =========================
var proteinBtn = document.getElementById('protein-calc-btn');

if (proteinBtn) {
  var proteinWeightInput = document.getElementById('protein-weight');
  var proteinGoalSelect = document.getElementById('protein-goal');
  var proteinResult = document.getElementById('protein-result');

  proteinBtn.addEventListener('click', function () {
    var weightLbs = parseFloat(proteinWeightInput.value);
    var factor = parseFloat(proteinGoalSelect.value);

    if (isNaN(weightLbs) || weightLbs <= 0) {
      proteinResult.textContent = 'Please enter a valid body weight.';
      return;
    }

    var grams = Math.round(weightLbs * factor);

    proteinResult.textContent = 'Recommended daily protein: around ' + grams + ' g per day.';
  });
}

// =========================
// 3. Macro Breakdown Calculator
// =========================
var macroBtn = document.getElementById('macro-calc-btn');

if (macroBtn) {
  var macroCaloriesInput = document.getElementById('macro-calories');
  var macroGoalSelect = document.getElementById('macro-goal');
  var macroResult = document.getElementById('macro-result');

  macroBtn.addEventListener('click', function () {
    var calories = parseFloat(macroCaloriesInput.value);
    var goal = macroGoalSelect.value;

    if (isNaN(calories) || calories <= 0) {
      macroResult.textContent = 'Please enter a valid calorie target.';
      return;
    }

    var pRatio, fRatio, cRatio, label;

    // Simple macro presets
    if (goal === 'maintenance') {
      pRatio = 0.30; // 30% protein
      fRatio = 0.25; // 25% fat
      cRatio = 0.45; // 45% carbs
      label = 'Maintenance';
    } else if (goal === 'muscle') {
      pRatio = 0.30; // 30% protein
      fRatio = 0.20; // 20% fat
      cRatio = 0.50; // 50% carbs
      label = 'Build muscle / lean bulk';
    } else if (goal === 'fatloss') {
      pRatio = 0.35; // 35% protein
      fRatio = 0.25; // 25% fat
      cRatio = 0.40; // 40% carbs
      label = 'Fat loss';
    } else {
      macroResult.textContent = 'Something went wrong. Please select a goal.';
      return;
    }

    var proteinCalories = calories * pRatio;
    var fatCalories = calories * fRatio;
    var carbCalories = calories * cRatio;

    var proteinGrams = Math.round(proteinCalories / 4);
    var fatGrams = Math.round(fatCalories / 9);
    var carbGrams = Math.round(carbCalories / 4);

    macroResult.innerHTML =
      '<strong>' + label + ' macro breakdown:</strong><br>' +
      'Protein: ' + proteinGrams + ' g (' + Math.round(pRatio * 100) + '%)<br>' +
      'Fat: ' + fatGrams + ' g (' + Math.round(fRatio * 100) + '%)<br>' +
      'Carbs: ' + carbGrams + ' g (' + Math.round(cRatio * 100) + '%)<br>' +
      'Total: ' + calories.toLocaleString() + ' kcal';
  });
}

// =========================
// 4. BMI & Body Composition Estimator
// =========================
var bmiBtn = document.getElementById('bmi-calc-btn');

if (bmiBtn) {
  var bmiWeightInput = document.getElementById('bmi-weight');
  var bmiHeightInput = document.getElementById('bmi-height');
  var bmiResult = document.getElementById('bmi-result');

  bmiBtn.addEventListener('click', function () {
    var weightLbs = parseFloat(bmiWeightInput.value);
    var heightIn = parseFloat(bmiHeightInput.value);

    if (isNaN(weightLbs) || isNaN(heightIn) || weightLbs <= 0 || heightIn <= 0) {
      bmiResult.textContent = 'Please enter a valid weight and height.';
      return;
    }

    // BMI formula (US units)
    var bmi = (weightLbs / (heightIn * heightIn)) * 703;
    var roundedBMI = Math.round(bmi * 10) / 10;

    var category = '';

    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normal weight';
    } else if (bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obesity';
    }

    bmiResult.textContent =
      'BMI: ' + roundedBMI + ' — Category: ' + category +
      '. (Remember: BMI doesn’t separate muscle from fat.)';
  });
}