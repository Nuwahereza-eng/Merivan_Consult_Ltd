// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Hamburger Menu Toggle
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const hamburger = document.createElement('button');
hamburger.classList.add('hamburger');
hamburger.textContent = '☰';
header.appendChild(hamburger);

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Auction Slider
const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;

if (!slideElements.length) {
    console.error('No slides found in the slider!');
} else {
    const slideWidth = slideElements[0].offsetWidth;
    const totalSlides = slideElements.length;

    slides.innerHTML += slides.innerHTML;
    const allSlides = document.querySelectorAll('.slide');

    function updateSlider() {
        slides.style.transition = 'transform 0.5s ease';
        slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        if (currentIndex >= totalSlides) {
            setTimeout(() => {
                slides.style.transition = 'none';
                currentIndex = 0;
                slides.style.transform = `translateX(0)`;
            }, 500);
        }
    }

    function autoSlide() {
        currentIndex++;
        updateSlider();
    }

    let slideInterval = setInterval(autoSlide, 3000);

    slides.addEventListener('mouseover', () => clearInterval(slideInterval));
    slides.addEventListener('mouseout', () => slideInterval = setInterval(autoSlide, 3000));

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex <= 0) {
            currentIndex = totalSlides - 1;
            slides.style.transition = 'none';
            slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            setTimeout(() => {
                currentIndex--;
                updateSlider();
            }, 10);
        } else {
            currentIndex--;
            updateSlider();
        }
    });

    // Recalculate slide width on resize for responsiveness
    window.addEventListener('resize', () => {
        const newSlideWidth = slideElements[0].offsetWidth;
        slides.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`;
    });

    updateSlider();
}

// Timer Countdown
document.querySelectorAll('.timer').forEach(timer => {
    const endTime = new Date(timer.getAttribute('data-end')).getTime();
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;
        if (distance < 0) {
            timer.textContent = "Auction Ended";
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        timer.textContent = `Ends in: ${days}d ${hours}h ${minutes}m`;
    }
    updateTimer();
    setInterval(updateTimer, 60000);
});