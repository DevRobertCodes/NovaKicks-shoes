// Check localStorage to see if dark mode was previously enabled
let darkMode = localStorage.getItem('dark-mode');

// Get the theme toggle button
const themeSwitch = document.getElementById('theme-switch');

// Enable dark mode and save preference
const enableDarkMode = () => {
  document.body.classList.add('dark-mode');
  localStorage.setItem('dark-mode', 'enabled');
};

// Disable dark mode and save preference
const disableDarkMode = () => {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('dark-mode', 'disabled');
};

// On page load, apply the stored theme preference
if (darkMode === 'enabled') {
  enableDarkMode(); // ← Notice the parentheses to call the function
}

// On click, toggle between dark and light mode
themeSwitch.addEventListener('click', () => {
  darkMode = localStorage.getItem('dark-mode'); // Get current status again

  if (darkMode !== 'enabled') {
    enableDarkMode(); // If not enabled, turn it on
  } else {
    disableDarkMode(); // If already enabled, turn it off
  }
});
