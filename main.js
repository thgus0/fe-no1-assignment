import { searchMovies, closeModal } from './ui.js';

window.searchMovies = searchMovies;
window.closeModal = closeModal;

document.getElementById('searchInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchMovies();
  }
});
