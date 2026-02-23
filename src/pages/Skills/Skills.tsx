import { supabase } from '../../api/supabase';
import styles from './Skills.module.css';
import type { Skill } from '../../types/Skill';
import { useQuery } from '@tanstack/react-query';

const Skills = () => {
    const { data: skills = [], isLoading, error } = useQuery<Skill[]>({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*, skill_descriptions(id, content)')
        .order('id');
      if (error) throw error;
      return data;
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