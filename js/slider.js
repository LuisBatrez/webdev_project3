function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (!slides.length || !dotsContainer || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  let slideInterval;
  const dots = [];

  function createDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  function goToSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startSlider();
  }

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  createDots();
  startSlider();
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.slider')) {
    initSlider();
  }
});