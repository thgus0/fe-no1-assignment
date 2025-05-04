const apiKey = '65876fc2fe1da35d342d5a5cd1035823';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

async function searchMovies() {
    const query = document.getElementById('searchInput').value;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(data.results);
    displayMovies(data.results);
}

function displayMovies(movies) {
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

async function showMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const res = await fetch(url);
    const movie = await res.json();

    document.getElementById('modalDetails').innerHTML = `
        <h2>${movie.title}</h2>
        <p><strong>개봉일:</strong> ${movie.release_date}</p>
        <p><strong>평점:</strong> ⭐ ${movie.vote_average}</p>
        <p>${movie.overview}</p>
      `;
    document.getElementById('movieModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('movieModal').style.display = 'none';
}

document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchMovies();
    }
});