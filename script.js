/* =========================================
   THEME TOGGLE (Dark / Light Mode)
========================================= */
const themeToggle = document.getElementById("themeToggle");
const iconLight = document.getElementById("iconLight");
const iconDark = document.getElementById("iconDark");

// Cargar preferencia previa
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  iconLight.style.display = "none";
  iconDark.style.display = "block";
}

// Alternar tema
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("theme");
    iconLight.style.display = "block";
    iconDark.style.display = "none";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    iconLight.style.display = "none";
    iconDark.style.display = "block";
  }
});

/* =========================================
   PROGRESS BAR (scroll progress)
========================================= */
window.addEventListener("scroll", () => {
  const progressBar = document.getElementById("progressBar");
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";
});

/* =========================================
   ANIMACIÓN DE SECCIONES AL APARECER
========================================= */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});

/* =========================================
   PARALLAX EFFECT
========================================= */
const heroImage = document.getElementById("heroParallax");
const libroImage = document.getElementById("libroParallax");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (heroImage) heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
  if (libroImage) libroImage.style.transform = `translateY(${scrollY * 0.05}px)`;
});

/* =========================================
   SCROLL SUAVE A ENLACES INTERNOS
========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* =========================================
   NAVBAR SHADOW AL HACER SCROLL
========================================= */
const nav = document.getElementById("navFixed");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
  } else {
    nav.style.boxShadow = "none";
  }
});
