let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-item");
const carousel = document.querySelector(".carousel");

function updateCarousel() {
  // Calculate the offset for the active slide
  const offset = -currentIndex * 100; // Move carousel by 100% per slide
  carousel.style.transform = `translateX(${offset}%)`;

  // Optionally toggle the 'active' class for other effects
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length; // Loop back to the first slide
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop back to the last slide
  updateCarousel();
}

setInterval(() => {
    nextSlide();
  }, 5000)