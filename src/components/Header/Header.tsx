import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../../store/authSlice';
import type { RootState } from '../../store/store';
import { authApi } from '../../api/authApi';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const handleLogout = () => {
        authApi.logout();
        dispatch(clearUser());
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>태형이의 포트폴리오</div>
            <nav className={styles.nav}>
                <Link to="/">About</Link>
                <Link to="/skills">Skills</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/problems">Problems</Link>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className={styles.logoutButton}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </nav>
        </header>
    )
}

export default Header;