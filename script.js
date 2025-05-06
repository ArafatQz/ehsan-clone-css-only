const slideItems = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const pauseBtn = document.querySelector('.pause');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
const totalSlides = slideItems.length;

// Function to display a specific slide
function showSlide(index) {
  if (index < 0) {
    currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }
  
  slideItems.forEach(slide => slide.classList.remove('active'));
  slideItems[currentIndex].classList.add('active');
  
  updateDots();
}

// Update dots based on current slide
function updateDots() {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Navigation button event listeners
prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

// Dot navigation event listeners
dots.forEach(dot => {
  dot.addEventListener('click', (event) => {
    const index = parseInt(event.target.getAttribute('data-index'));
    showSlide(index);
  });
});

// Auto-play functionality
let autoPlayInterval = setInterval(() => {
  showSlide(currentIndex + 1);
}, 5000);

let isPaused = false;

// Pause button toggle functionality
pauseBtn.addEventListener('click', () => {
  if (isPaused) {
    // Resume auto-play
    autoPlayInterval = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000); // Changed from 3000 to 5000 milliseconds
    pauseBtn.textContent = '||'; // Display pause icon
  } else {
    // Pause auto-play
    clearInterval(autoPlayInterval);
    pauseBtn.textContent = '►'; // Display play/resume icon
  }
  isPaused = !isPaused;
});

// Initialize the carousel
showSlide(currentIndex);
