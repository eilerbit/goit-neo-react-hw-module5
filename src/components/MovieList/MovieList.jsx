import { NavLink, useLocation } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../constants';
import styles from './MovieList.module.css';

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.movieList}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.movieItem}>
          <NavLink
            to={`/movies/${id}`}
            state={{ from: location }}
            className={styles.movieLink}
          >
            <img src={`${IMAGE_BASE_URL}${poster_path}`} alt={title} className={styles.moviePoster} />
            <p className={styles.movieTitle}>{title}</p>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;