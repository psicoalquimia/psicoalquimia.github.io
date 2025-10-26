/* ============================
   Theme toggle (persistente)
   ============================ */
const themeToggle = document.getElementById('themeToggle');
const iconLight = document.getElementById('iconLight');
const iconDark = document.getElementById('iconDark');

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    iconLight.style.display = 'none';
    iconDark.style.display = 'block';
    localStorage.setItem('siteTheme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    iconLight.style.display = 'block';
    iconDark.style.display = 'none';
    localStorage.removeItem('siteTheme');
  }
}

const savedTheme = localStorage.getItem('siteTheme');
if (savedTheme === 'dark') setTheme('dark');
else setTheme('light');

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  setTheme(isDark ? 'light' : 'dark');
});

/* ============================
   Progress bar
   ============================ */
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = (scrollTop / docHeight) * 100;
  progressBar.style.width = pct + '%';

  // toggle nav shadow
  const nav = document.getElementById('navFixed');
  if (scrollTop > 80) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
});

/* ============================
   Intersection Observer (sections)
   ============================ */
const sections = document.querySelectorAll('main section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

sections.forEach(s => observer.observe(s));

/* ============================
   Parallax for Sobre Mi & Libro images
   ============================ */
const sobreMiParallax = document.getElementById('sobreMiParallax');
const libroParallax = document.getElementById('libroParallax');

function applyParallax() {
  const scrollY = window.scrollY;
  // sobre-mi image: slight vertical parallax when in view
  if (sobreMiParallax) {
    const rect = sobreMiParallax.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const rate = (window.innerHeight - rect.top) * 0.02;
      sobreMiParallax.style.transform = `translateY(${rate}px)`;
    }
  }
  // libro image: similar but smaller rate
  if (libroParallax) {
    const rectL = libroParallax.getBoundingClientRect();
    if (rectL.top < window.innerHeight && rectL.bottom > 0) {
      const rateL = (window.innerHeight - rectL.top) * 0.015;
      libroParallax.style.transform = `translateY(${rateL}px)`;
    }
  }
}

window.addEventListener('scroll', applyParallax);
window.addEventListener('resize', applyParallax);
document.addEventListener('DOMContentLoaded', applyParallax);

/* ============================
   Smooth internal links (anchors)
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
