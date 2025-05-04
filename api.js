const apiKey = '65876fc2fe1da35d342d5a5cd1035823';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

export async function getMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    console.log(data.results);
    return data.results;
}

export async function getMovieDetails(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const res = await fetch(url);
    return await res.json();
}

export { imageBaseUrl };