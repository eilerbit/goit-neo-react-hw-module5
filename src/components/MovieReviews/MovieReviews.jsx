import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../../constants';
import styles from './MovieReviews.module.css';

function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
      axios
        .get(`${BASE_URL}/movie/${movieId}/reviews`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        })
        .then(response => setReviews(response.data.results))
        .catch(err => console.error(err));
    }, [movieId]);
  
    return (
      <div className={styles.movieReviews}>
        <h2 className={styles.sectionTitle}>Reviews</h2>
        {reviews.length > 0 ? (
          <ul className={styles.reviewList}>
            {reviews.map(({ id, author, content }) => (
              <li key={id} className={styles.reviewItem}>
                <h3 className={styles.reviewAuthor}>{author}</h3>
                <p className={styles.reviewContent}>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noReviews}>No reviews found.</p>
        )}
      </div>
    );
  }  
  
  export default MovieReviews;