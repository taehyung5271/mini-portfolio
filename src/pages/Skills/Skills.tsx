import { supabase } from '../../api/supabase';
import styles from './Skills.module.css';
import type { Skill } from '../../types/Skill';
import { useQuery } from '@tanstack/react-query';

const Skills = () => {
    //     const { data: skills = [], isLoading, error } = useQuery<Skill[]>({
    //     queryKey: ['skills'],
    //     queryFn: async () => {
    //       const { data, error } = await supabase
    //         .from('skills')
    //         .select('*, skill_descriptions(id, content)')
    //         .order('id');
    //       if (error) throw error;
    //       return data;
    //     },
    //   });
    const { data: skills = [], isLoading, error } = useQuery<Skill[]>({
        queryKey: ['skills'],
        queryFn: async () => {
            // 1. 직접 쿼리 결과 확인을 위해 로그 추가
            const result = await supabase
                .from('skills')
                .select('*, skill_descriptions(id, content)')
                .order('id');

            // 2. 만약 에러가 있다면 상세히 출력
            if (result.error) {
                console.error("❌ Supabase 에러 발생:", result.error.message, result.error.details);
                throw result.error;
            }

            // 3. 데이터가 들어왔는지, 배열 형태인지 확인
            console.log("✅ Supabase에서 받은 원본 데이터:", result.data);

            return result.data as Skill[];
        },
    });

    if (isLoading) return <p>로딩 중...</p>;
    if (error) return <p>에러가 발생했습니다.</p>;

    const categories = ['Frontend', 'Backend', 'Tools'];

    return (
        <div className={styles.skills}>
            <h2 className={styles.title}>Skills</h2>
            <p className={styles.subtitle}>현재 사용 중인 기술 스택</p>

            {categories.map((category) => (
                <div key={category} className={styles.category}>
                    <h3 className={styles.categoryTitle}>{category}</h3>
                    <div className={styles.cardList}>
                        {skills
                            .filter((skill) => skill.category === category)
                            .map((skill) => (
                                <div key={skill.id} className={styles.card}>
                                    <span className={styles.cardName}>{skill.name}</span>
                                    <ul className={styles.cardDesc}>
                                        {skill.skill_descriptions.map((desc) => (
                                            <li key={desc.id}>{desc.content}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Skills;