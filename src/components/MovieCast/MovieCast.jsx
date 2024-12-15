import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from '../../constants';
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then(response => setCast(response.data.cast))
      .catch(err => console.error(err));
  }, [movieId]);

  return (
    <div className={styles.movieCast}>
      <h2 className={styles.sectionTitle}>Cast</h2>
      <ul className={styles.castList}>
        {cast.map(({ id, name, character, profile_path }) => (
          <li key={id} className={styles.castItem}>
            <img
                src={profile_path ? `${IMAGE_BASE_URL}${profile_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={name}
                className={styles.castPhoto}
            />
            <p className={styles.castName}>{name} as {character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;