// Mark "Projects" as the current page in the nav
document.addEventListener('DOMContentLoaded', () => {
  const projectsLink = document.querySelector('.nav .nav-link[href="#projects"]');
  if (projectsLink) {
    projectsLink.setAttribute('aria-current', 'page');
  }
});

