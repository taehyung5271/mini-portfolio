import { useQuery } from '@tanstack/react-query';
import styles from './Blog.module.css';
import { Link } from 'react-router-dom';
import type { Post } from '../../types/Post';
import { supabase } from '../../api/supabase';

const Blog = () => {
  const { data: posts = [], isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;

    }
  })

  if (isLoading) return <p>로딩 중...</p>
  if (error) return <p>에러가 발생했습니다.</p>

  return (
    <div className={styles.blog}>
      <h2 className={styles.title}>Blog</h2>
      <p className={styles.subtitle}>개발하면서 배운 것들을 기록합니다</p>

      <div className={styles.postList}>
        {posts.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.id} className={styles.postCard}>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postSummary}>{post.summary}</p>
            <div className={styles.postMeta}>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
              <span>조회 {post.views}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;