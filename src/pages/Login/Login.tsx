import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import { authApi } from '../../api/authApi';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        await authApi.signup(username, password);
        // 회원가입 성공하면 바로 로그인
      }

      const data = await authApi.login(username, password);
      dispatch(setUser({ username: data.username, role: data.role }));
      navigate('/');
    } catch (err: any) {
      setError(err.message || (isSignup ? '회원가입 실패' : '로그인 실패'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>{isSignup ? '회원가입' : '로그인'}</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.label}>
          아이디
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
        </label>

        <label className={styles.label}>
          비밀번호
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </label>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? '처리 중...' : isSignup ? '회원가입' : '로그인'}
        </button>
      </form>

      <button
        className={styles.toggleButton}
        onClick={() => {
          setIsSignup(!isSignup);
          setError('');
        }}
      >
        {isSignup ? '이미 계정이 있나요? 로그인' : '계정이 없나요? 회원가입'}
      </button>
    </div>
  );
};

export default Login;
