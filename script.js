let slideIndex = [0, 0, 0, 0, 0, 0, 0]; // índice de cada carrusel


const flagsElement = document.getElementById('flags');

const textsToChange = document.querySelectorAll('[data-section]');

const changeLanguage = async (language) => {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();

  for(textToChange of textsToChange){
     const section = textToChange.dataset.section;
     const value = textToChange.dataset.value;

     textToChange.innerHTML = texts[section][value];
  }
  
};

flagsElement.addEventListener('click', (e) => {
  changeLanguage(e.target.parentElement.dataset.lenguage);
});

function showSlides(n, carouselId) {
  const slides = document.querySelectorAll(`#${carouselId} .carousel-image`);
  const thumbnails = document.querySelectorAll(`#thumbnails${carouselId.charAt(carouselId.length - 1)} .thumbnail`);
  
  if (n >= slides.length) {
    slideIndex[carouselId.charAt(carouselId.length - 1) - 1] = 0; // reiniciar el índice si excede
  }
  if (n < 0) {
    slideIndex[carouselId.charAt(carouselId.length - 1) - 1] = slides.length - 1; // volver al último si se vuelve hacia atrás
  }

  slides.forEach((slide) => slide.style.display = "none");
  thumbnails.forEach((thumb) => thumb.classList.remove('active'));
  
  slides[slideIndex[carouselId.charAt(carouselId.length - 1) - 1]].style.display = "block";
  thumbnails[slideIndex[carouselId.charAt(carouselId.length - 1) - 1]].classList.add('active');
}

function changeSlide(n, carouselId) {
  showSlides(slideIndex[carouselId.charAt(carouselId.length - 1) - 1] += n, carouselId);
}

function changeImage(n, carouselId) {
  slideIndex[carouselId.charAt(carouselId.length - 1) - 1] = n;
  showSlides(n, carouselId);
}

// Mostrar el primer slide al cargar
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 1; i <= 7; i++) {
    showSlides(0, `carousel${i}`);
  }
});
