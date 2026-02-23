import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import type { Problem } from '../../types/Problem';
import styles from './Problems.module.css';
import { problemApi } from '../../api/problemApi';

const Problems = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const queryClient = useQueryClient();


    const { data: problems = [], isLoading } = useQuery<Problem[]>({
        queryKey: ['problems'],
        queryFn: async () => problemApi.getAll(),

    });

    const handleDelete = async (id: number) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        try {
            await problemApi.delete(id);
            queryClient.invalidateQueries({ queryKey: ['problems'] });
        } catch (error) {
            alert('삭제 실패');
        }

        queryClient.invalidateQueries({ queryKey: ['problems'] });
    };

    if (isLoading) return <p>로딩 중...</p>;

    return (
        <div className={styles.problems}>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.title}>코딩테스트 기록</h2>
                    <p className={styles.subtitle}>풀었던 문제들을 기록합니다</p>
                </div>
                {isLoggedIn && (
                    <Link to="/problems/new" className={styles.addButton}>+ 추가</Link>
                )}
            </div>

            <div className={styles.list}>
                {problems.map((problem) => (
                    <div key={problem.id} className={styles.card}>
                        <div className={styles.cardTop}>
                            <span className={styles.platform}>{problem.platform}</span>
                            <span className={`${styles.difficulty} ${styles[problem.difficulty]}`}>
                                {problem.difficulty}
                            </span>
                            <span className={`${styles.status} ${styles[problem.status === '풀이 완료' ? 'done' : problem.status === '풀이 중' ? 'progress' : 'retry']}`}>
                                {problem.status}
                            </span>
                        </div>
                        <h3 className={styles.cardTitle}>
                            {problem.link ? (
                                <a href={problem.link} target="_blank" rel="noopener noreferrer">
                                    {problem.title}
                                </a>
                            ) : (
                                problem.title
                            )}
                        </h3>
                        {problem.memo && <p className={styles.memo}>{problem.memo}</p>}
                        {isLoggedIn && (
                            <div className={styles.actions}>
                                <Link to={`/problems/edit/${problem.id}`} className={styles.editButton}>수정</Link>
                                <button onClick={() => handleDelete(problem.id)} className={styles.deleteButton}>삭제</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Problems;