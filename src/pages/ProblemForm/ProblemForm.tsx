import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProblemForm.module.css';
import { problemApi } from '../../api/problemApi';

const ProblemForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEdit = !!id;

    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('백준');
    const [difficulty, setDifficulty] = useState('쉬움');
    const [status, setStatus] = useState('풀이 완료');
    const [link, setLink] = useState('');
    const [memo, setMemo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isEdit) return;

        const fetchProblem = async () => {
            try {
                const data = await problemApi.getById(Number(id));
                setTitle(data.title);
                setPlatform(data.platform);
                setDifficulty(data.difficulty);
                setStatus(data.status);
                setLink(data.link ='');
                setMemo(data.memo ='');
            } catch {
                alert('문제를 찾을 수 없습니다.');
                navigate('/problems');
            }
        };
        fetchProblem();
    }, [id, isEdit, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const problemData = { title, platform, difficulty, status, link, memo };

        try {
            if (isEdit) {
                await problemApi.update(Number(id), problemData);
            } else {
                await problemApi.create(problemData);
            }
            navigate('/problems');
        } catch {
            alert(isEdit ? '수정 실패' : '등록 실패');
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <h2 className={styles.title}>{isEdit ? '문제 수정' : '문제 추가'}</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    제목
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                        placeholder="문제 이름"
                        required
                    />
                </label>

                <label className={styles.label}>
                    플랫폼
                    <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className={styles.input}
                    >
                        <option value="백준">백준</option>
                        <option value="프로그래머스">프로그래머스</option>
                        <option value="LeetCode">LeetCode</option>
                        <option value="기타">기타</option>
                    </select>
                </label>

                <label className={styles.label}>
                    난이도
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className={styles.input}
                    >
                        <option value="쉬움">쉬움</option>
                        <option value="보통">보통</option>
                        <option value="어려움">어려움</option>
                    </select>
                </label>

                <label className={styles.label}>
                    상태
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={styles.input}
                    >
                        <option value="풀이 완료">풀이 완료</option>
                        <option value="풀이 중">풀이 중</option>
                        <option value="재도전">재도전</option>
                    </select>
                </label>

                <label className={styles.label}>
                    문제 링크
                    <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className={styles.input}
                        placeholder="https://..."
                    />
                </label>

                <label className={styles.label}>
                    메모
                    <textarea
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        className={styles.textarea}
                        placeholder="풀이 방법, 배운 점 등"
                        rows={5}
                    />
                </label>

                <div className={styles.buttons}>
                    <button
                        type="button"
                        onClick={() => navigate('/problems')}
                        className={styles.cancelButton}
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? '저장 중...' : isEdit ? '수정' : '등록'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProblemForm;