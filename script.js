// Szekciók közötti görgetés és navigációs linkek kezelése
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot-slide');
const slides = document.querySelector('.slides');
let currentSlide = 0;

// Diák közötti váltás
dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    const slideId = e.target.getAttribute('data-slide');
    const slideIndex = Array.from(dots).indexOf(dot);
    slides.style.transform = `translateX(-${slideIndex * 33.33}%)`;
    updateActiveDot(slideIndex);
  });
});

function updateActiveDot(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
  currentSlide = index;
}

// Billentyűzetről való váltás jobbra-balra diák között
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' && currentSlide < dots.length - 1) {
    currentSlide++;
    slides.style.transform = `translateX(-${currentSlide * 33.33}%)`;
    updateActiveDot(currentSlide);
  } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
    currentSlide--;
    slides.style.transform = `translateX(-${currentSlide * 33.33}%)`;
    updateActiveDot(currentSlide);
  }
});

// Felfelé nyíl megjelenítése
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

// Görgetéskor váltás a szekciók között
document.addEventListener('wheel', (event) => {
  const direction = event.deltaY > 0 ? 'down' : 'up';
  const sections = document.querySelectorAll('.section');
  const currentSection = document.querySelector('.active') || sections[0];
  
  let newSection;
  
  if (direction === 'down') {
    newSection = currentSection.nextElementSibling;
  } else {
    newSection = currentSection.previousElementSibling;
  }

  if (newSection && newSection.classList.contains('section')) {
    window.scrollTo({
      top: newSection.offsetTop,
      behavior: 'smooth'
    });
    currentSection.classList.remove('active');
    newSection.classList.add('active');
  }
});

// Frissítjük a navigációs pontokat a görgetés alapján
window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  updateActiveDot(current);
});
