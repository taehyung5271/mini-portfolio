import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from './BlogPost.module.css';
import { supabase } from '../../api/supabase';

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/posts/${slug}.md`);
                if (!response.ok) throw new Error('Not found');
                const text = await response.text();
                setContent(text);

                await supabase.rpc('increment_views', { post_slug: slug })
            } catch {
                setContent('');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) return <p>로딩 중...</p>;
    if (!content) return <p>게시글을 찾을 수 없습니다.</p>;

    return (
        <div className={styles.post}>
            <Link to="/blog" className={styles.back}>← 목록으로</Link>
            <div className={styles.content}>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    );
};

export default BlogPost;