// Smooth scrolling for in-page links (Home, About, Skills, Contact)
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navToggle = document.getElementById('navToggle');

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    // Only smooth-scroll for section links (start with "#")
    if (!href || !href.startsWith('#')) return;

    event.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const headerHeight = header.offsetHeight || 0;
    const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight + 4;

    window.scrollTo({ top: offsetTop, behavior: 'smooth' });

    // Close mobile nav if open
    nav.classList.remove('open');
  });
});

// Mobile nav toggle
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Theme toggle + persistence
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const storedTheme = localStorage.getItem('theme');

if (storedTheme === 'light') {
  document.body.classList.add('light-theme');
  if (themeIcon) themeIcon.textContent = '☀️';
}

themeToggle?.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  if (themeIcon) themeIcon.textContent = isLight ? '☀️' : '🌙';
});

// Simple scroll reveal
const revealElements = document.querySelectorAll(
  '.section-content, .skill-card, .contact-form, .contact-info'
);
revealElements.forEach(el => el.setAttribute('data-reveal', ''));

function handleReveal() {
  const triggerBottom = window.innerHeight * 0.9;
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleReveal);
window.addEventListener('load', handleReveal);

// Contact form demo behavior
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name') || 'friend';
  formStatus.textContent = `Thanks, ${name}! Your message has been noted (demo only).`;
  contactForm.reset();
});

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}