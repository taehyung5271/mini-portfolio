import styles from './Header.module.css'
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>태형이의 포트폴리오</div>
            <nav className={styles.nav}>
                <Link to="/">About</Link>
                <Link to="/skills">Skills</Link>
                <Link to="/projects">Projects</Link>

            </nav>
        </header>
    )
}

export default Header;