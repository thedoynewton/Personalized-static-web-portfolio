document.addEventListener('DOMContentLoaded', function () {
  const navIcon = document.querySelector('.nav-icon');
  if (!navIcon) return;

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeKey = 'theme';

  function setTheme(theme) {
    document.body.classList.toggle('light-mode', theme === 'light');
    document.body.classList.toggle('dark-mode', theme === 'dark');
    navIcon.textContent = theme === 'light' ? '🌞' : '🌗';
    localStorage.setItem(themeKey, theme);
  }

  function toggleTheme() {
    const current = localStorage.getItem(themeKey) || (prefersDark ? 'dark' : 'light');
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Initial theme setup
  const savedTheme = localStorage.getItem(themeKey);
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  navIcon.addEventListener('click', toggleTheme);
});