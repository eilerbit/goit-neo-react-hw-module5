import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import { API_KEY, BASE_URL } from '../../constants';
import styles from './HomePage.module.css';
import layoutStyles from '../../PageLayout.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/trending/movie/day`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then(response => setMovies(response.data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={layoutStyles.pageContainer}>
      <h1 className={styles.pageTitle}>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;