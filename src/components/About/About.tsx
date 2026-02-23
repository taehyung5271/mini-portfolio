import styles from './About.module.css';

const About = () => {
    return (
        <section id="about" className={styles.about}>
            <h2 className={styles.title}>About Me</h2>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h3 className={styles.name}>김태형</h3>
                    <p className={styles.role}>Backend Developer</p>
                    <p className={styles.description}>
                        사용자 경험을 중요하게 생각하는 백엔드 개발자입니다.
                        Spring Boot를 주로 사용하며, 깔끔한 코드를 작성하기 위해 노력합니다.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;