import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={styles.navigation}>
      <NavLink className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })} to="/" end>
        Home
      </NavLink>
      <NavLink className={({ isActive }) => clsx(styles.navLink, { [styles.active]: isActive })} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;