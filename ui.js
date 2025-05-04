import { imageBaseUrl, getMovies, getMovieDetails } from './api.js';

export async function searchMovies() {
    const query = document.getElementById('searchInput').value;
    const movies = await getMovies(query);
    displayMovies(movies);
}

export function displayMovies(movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
          <img src="${imageBaseUrl + movie.poster_path}" alt="${movie.title}">
          <div class="info">
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average}</p>
            <p>${movie.overview.slice(0, 100)}...</p>
          </div>
        `;
        card.onclick = () => showMovieDetails(movie.id);
        movieList.appendChild(card);
    });
}

export async function showMovieDetails(movieId) {
    const movie = await getMovieDetails(movieId);
    document.getElementById('modalDetails').innerHTML = `
        <h2>${movie.title}</h2>
        <p><strong>개봉일:</strong> ${movie.release_date}</p>
        <p><strong>평점:</strong> ⭐ ${movie.vote_average}</p>
        <p>${movie.overview}</p>
      `;
    document.getElementById('movieModal').style.display = 'flex';
}

export function closeModal() {
    document.getElementById('movieModal').style.display = 'none';
}