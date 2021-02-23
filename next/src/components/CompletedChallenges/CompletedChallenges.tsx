import styles from './CompletedChallenges.module.sass';

export function CompletedChallenges() {
	return (
		<div className={styles['completed-container']}>
			<span>Desafios Completos</span>
			<span>5</span>
		</div>
	);
}
