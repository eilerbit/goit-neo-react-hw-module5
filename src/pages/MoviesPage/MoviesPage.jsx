import { useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import { API_KEY, BASE_URL } from '../../constants';
import styles from './MoviesPage.module.css';
import layoutStyles from '../../PageLayout.module.css';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .get(`${BASE_URL}/search/movie`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: { query },
      })
      .then(response => setMovies(response.data.results))
      .catch(err => console.error(err));
  };

  return (
    <div className={layoutStyles.pageContainer}>
      <h1 className={styles.pageTitle}>Search Movies</h1>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.searchInput}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;