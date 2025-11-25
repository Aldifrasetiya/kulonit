// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Carousel Slide Function for Go Digital and Don't Missed It sections
const carouselStates = {
  carousel1: 0,
  carousel2: 0,
};

function slideCarousel(carouselId, direction) {
  const carousel = document.getElementById(carouselId);
  const cardWidth = 350; // card width + margin
  const cardsToShow = window.innerWidth < 768 ? 1 : 3;
  const totalCards = carousel.children.length;
  const maxIndex = totalCards - cardsToShow;

  carouselStates[carouselId] += direction;

  // Boundary checks
  if (carouselStates[carouselId] < 0) {
    carouselStates[carouselId] = 0;
  }
  if (carouselStates[carouselId] > maxIndex) {
    carouselStates[carouselId] = maxIndex;
  }

  const translateX = -carouselStates[carouselId] * cardWidth;
  carousel.style.transform = `translateX(${translateX}px)`;

  // Update button visibility
  updateCarouselButtons(carouselId, maxIndex);
}

function updateCarouselButtons(carouselId, maxIndex) {
  const prevBtn = document.getElementById(`prevBtn${carouselId.slice(-1)}`);
  const nextBtn = document.getElementById(`nextBtn${carouselId.slice(-1)}`);

  if (carouselStates[carouselId] === 0) {
    prevBtn.style.opacity = "0.5";
    prevBtn.style.cursor = "not-allowed";
  } else {
    prevBtn.style.opacity = "1";
    prevBtn.style.cursor = "pointer";
  }

  if (carouselStates[carouselId] >= maxIndex) {
    nextBtn.style.opacity = "0.5";
    nextBtn.style.cursor = "not-allowed";
  } else {
    nextBtn.style.opacity = "1";
    nextBtn.style.cursor = "pointer";
  }
}

// Initialize button states
window.addEventListener("load", () => {
  updateCarouselButtons("carousel1", 3);
  updateCarouselButtons("carousel2", 3);
});

// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert(
    "Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda."
  );
  e.target.reset();
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      mobileMenu.classList.add("hidden");
    }
  });
});

// Add scroll-based animation trigger
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Handle responsive carousel
window.addEventListener("resize", () => {
  carouselStates.carousel1 = 0;
  carouselStates.carousel2 = 0;
  document.getElementById("carousel1").style.transform = "translateX(0px)";
  document.getElementById("carousel2").style.transform = "translateX(0px)";
  updateCarouselButtons("carousel1", 3);
  updateCarouselButtons("carousel2", 3);
});


// Facebook Pixel Code
!(function (f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = "2.0";
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
})(
  window,
  document,
  "script",
  "https://connect.facebook.net/en_US/fbevents.js"
);

// GANTI DENGAN ID PIXEL KAMU
fbq("init", "638091088932825");
fbq("track", "PageView");
