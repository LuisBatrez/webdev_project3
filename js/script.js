document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.slider')) initSlider();
  if (document.getElementById('map')) initMap();
});

function initMap() {
  const chicago = { lat: 41.8781, lng: -87.6298 };
  const iit = { lat: 41.8349, lng: -87.6270 };

  const map = new google.maps.Map(document.getElementById('map'), {
    center: chicago,
    zoom: 12
  });

  const iitMarker = new google.maps.Marker({
    position: iit,
    map: map,
    title: "Illinois Institute of Technology",
    icon: {
      url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      scaledSize: new google.maps.Size(40, 40)
    }
  });

  const iitInfoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 10px;">
        <h3 style="margin: 0; color: #CC0000;">Illinois Institute of Technology</h3>
        <p style="margin: 5px 0;">10 W 35th St, Chicago, IL 60616</p>
        <a href="https://www.iit.edu" target="_blank" style="color: #CC0000;">Visit Website</a>
      </div>
    `
  });

  iitMarker.addListener("click", () => {
    iitInfoWindow.open(map, iitMarker);
  });

  const goToIITBtn = document.getElementById("goToIIT");
  if (goToIITBtn) {
    goToIITBtn.addEventListener("click", () => {
      map.panTo(iit);
      map.setZoom(16);
      iitInfoWindow.open(map, iitMarker);
    });
  }
}

function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (!slides.length || !dotsContainer || !prevBtn || !nextBtn) return;

  let currentSlide = 0;
  let slideInterval;
  const dots = [];

  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function goToSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startSlider() {
    stopSlider();
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopSlider() {
    if (slideInterval) clearInterval(slideInterval);
  }

  nextBtn.addEventListener('click', () => {
    stopSlider();
    nextSlide();
    startSlider();
  });

  prevBtn.addEventListener('click', () => {
    stopSlider();
    prevSlide();
    startSlider();
  });

  const slider = document.querySelector('.slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopSlider);
    slider.addEventListener('mouseleave', startSlider);
  }

  goToSlide(0);
  startSlider();
}

window.initMap = initMap;