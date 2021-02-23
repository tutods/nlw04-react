import styles from './ExperienceBar.module.sass';

export function ExperienceBar() {
	return (
		<header className={styles['experience-bar']}>
			<span>0 xp</span>

			<div>
				<div style={{ width: '50%' }} />
				<span className={styles['current-xp']} style={{ left: '50%' }}>
					300 xp
				</span>
			</div>

			<span>600 xp</span>
		</header>
	);
}
