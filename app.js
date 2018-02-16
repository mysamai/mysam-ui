/* global localStorage, mysam */

// Initialize API (in the browser)
const core = mysam();

// Load the UI
mysam.ui(document.getElementById('content'), core);

localStorage.debug = 'mysam*';
