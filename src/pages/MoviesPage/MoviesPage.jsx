import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import { API_KEY, BASE_URL } from '../../constants';
import styles from './MoviesPage.module.css';
import layoutStyles from '../../PageLayout.module.css';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlQuery = searchParams.get('query');
    if (!urlQuery) return;

    axios
      .get(`${BASE_URL}/search/movie`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: { query: urlQuery },
      })
      .then(response => setMovies(response.data.results))
      .catch(err => console.error(err));

    setQuery(urlQuery);
  }, [searchParams]);

  const handleSubmit = e => {
    e.preventDefault();
    const formQuery = e.target.elements.search.value.trim();
    if (!formQuery) return;

    setSearchParams({ query: formQuery });
  };

  return (
    <div className={layoutStyles.pageContainer}>
      <h1 className={styles.pageTitle}>Search Movies</h1>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          className={styles.searchInput}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;