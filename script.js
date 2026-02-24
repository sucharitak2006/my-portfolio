// --- Smooth scrolling for navigation links (with header offset) ---
// This makes the page smoothly scroll to the correct section when you click a nav link.
// It also ensures the fixed header doesn't cover up the section title.
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    // Only handle links that go to a section on the current page (start with #)
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    event.preventDefault();
    // Find the section to scroll to
    const target = document.querySelector(href);
    if (!target) return;

    // Calculate how far down to scroll, accounting for the sticky header height
    const headerHeight = header.offsetHeight || 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight + 4;

    // Smooth scroll to that spot
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });

    // If on mobile, close the navigation menu after a link is clicked
    nav.classList.remove('open');
  });
});

// --- Mobile navigation toggle ---
// This part is for the hamburger menu on mobile. Clicking it opens or closes the nav menu.
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// --- Dark / light theme toggle with localStorage ---
// Lets users switch between light and dark mode, and remembers their choice for next time.
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const storedTheme = localStorage.getItem('theme');

// If user previously picked 'light', set light mode and sun icon on page load
if (storedTheme === 'light') {
  document.body.classList.add('light-theme');
  if (themeIcon) themeIcon.textContent = '☀️';
}

// Change theme when the button is clicked
themeToggle?.addEventListener('click', () => {
  // Toggle the 'light-theme' class on body
  const isLight = document.body.classList.toggle('light-theme');
  // Save their preference
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  // Change the icon accordingly
  if (themeIcon) {
    themeIcon.textContent = isLight ? '☀️' : '🌙';
  }
});

// --- Projects filter buttons ---
// Lets users filter which project cards are visible by category (e.g. "All", "Web", etc.)
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');

    // Highlight the selected filter button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Show or hide each project card based on its category
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (!filter || filter === 'all' || filter === category) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// --- Simple scroll reveal animations ---
// As you scroll, different sections fade in or "reveal" themselves for a polished effect.
const revealElements = document.querySelectorAll(
  '.section-content, .skill-card, .project-card, .contact-form, .contact-info'
);
// Mark these elements so CSS/JS can animate them
revealElements.forEach(el => el.setAttribute('data-reveal', ''));

// This function checks which elements are on screen and makes them visible
function handleReveal() {
  const triggerBottom = window.innerHeight * 0.9;

  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add('visible');
    }
  });
}
// Run the reveal function when user scrolls and when the page loads
window.addEventListener('scroll', handleReveal);
window.addEventListener('load', handleReveal);

// --- Contact form (demo-only behavior) ---
// This just fakes a send, shows a "thank you" message, and clears the form.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name');

  formStatus.textContent = `Thanks, ${name || 'friend'}! Your message has been noted (demo only).`;
  contactForm.reset();
});

// --- Footer year ---
// Automatically sets the copyright year in the page footer.
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}