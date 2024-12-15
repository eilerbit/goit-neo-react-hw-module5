import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from '../../constants';
import clsx from 'clsx';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();  
  const backLink = location.state?.from || '/';

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then(response => setMovie(response.data))
      .catch(err => console.error(err));
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className={styles.movieDetailsPage}>
      <button className={styles.backButton} onClick={() => navigate(backLink)}>Go Back</button>
      <h1 className={styles.movieTitle}>{movie.title}</h1>
      <img className={styles.moviePoster} src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
      <p className={styles.movieOverview}>{movie.overview}</p>
      <ul className={styles.movieLinks}>
        <li>
          <NavLink
            className={({ isActive }) => clsx(styles.movieLink, { [styles.active]: isActive })}
            to={`cast`}
            state={{ from: backLink }}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx(styles.movieLink, { [styles.active]: isActive })}
            to={`reviews`}
            state={{ from: backLink }}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
}

export default MovieDetailsPage;